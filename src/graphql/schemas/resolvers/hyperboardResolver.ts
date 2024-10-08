import { Args, ObjectType, Query, Resolver } from "type-graphql";
import { Hyperboard } from "../typeDefs/hyperboardTypeDefs.js";
import { GetHyperboardsArgs } from "../args/hyperboardArgs.js";
import { createBaseResolver, DataResponse } from "./baseTypes.js";
import _ from "lodash";
import { parseUnits } from "viem";
import { Database as DataDatabase } from "../../../types/supabaseData.js";
import { Database as CachingDatabase } from "../../../types/supabaseCaching.js";
import { calculateBigIntPercentage } from "../../../utils/calculateBigIntPercentage.js";

@ObjectType()
class GetHyperboardsResponse extends DataResponse(Hyperboard) {}

const HyperboardBaseResolver = createBaseResolver("hyperboard");

@Resolver(() => Hyperboard)
class HyperboardResolver extends HyperboardBaseResolver {
  @Query(() => GetHyperboardsResponse)
  async hyperboards(@Args() args: GetHyperboardsArgs) {
    try {
      const res = await this.supabaseDataService.getHyperboards(args);

      const hypercertIds =
        res.data
          ?.map((hyperboard) =>
            hyperboard.collections.map((collection) =>
              collection.hypercerts.map((hypercert) => hypercert.hypercert_id),
            ),
          )
          .flat(2) || [];

      const fractions = await Promise.all(
        hypercertIds.map((hypercertId) =>
          this.getFractions(
            {
              where: { hypercert_id: { eq: hypercertId } },
            },
            true,
          ),
        ),
      );

      const metadata = await Promise.all(
        hypercertIds.map((hypercertId) =>
          this.getMetadata(
            {
              where: { hypercerts: { hypercert_id: { eq: hypercertId } } },
            },
            true,
          ).then((res) => ({
            ...(res || {}),
            hypercert_id: hypercertId,
          })),
        ),
      ).then((res) => res.map((metadata) => _.omit(metadata, "image")));

      const allowlistEntries = await Promise.all(
        hypercertIds.map((hypercertId) =>
          this.getAllowlistRecords({
            where: { hypercert_id: { eq: hypercertId } },
          }),
        ),
      ).then((res) => res.flatMap((x) => x?.data).filter((x) => !!x));

      const hypercerts = await Promise.all(
        hypercertIds.map((hypercertId) =>
          this.getHypercerts(
            {
              where: { hypercert_id: { eq: hypercertId } },
            },
            true,
          ),
        ),
      );

      // Get a deduplicated list of all owners
      const ownerAddresses = _.uniq([
        ...fractions.map((x) => x?.owner_address),
        ...allowlistEntries.flatMap((x) => x?.owner_address),
        ...(res.data?.flatMap(
          (hyperboard) =>
            hyperboard?.collections?.flatMap((collection) =>
              collection.blueprints.flatMap(
                (blueprint) => blueprint.minter_address,
              ),
            ) || [],
        ) || []),
      ]).filter((x) => !!x) as string[];

      const users = await Promise.all(
        ownerAddresses.map((address) =>
          this.getUsers(
            {
              where: { address: { eq: address } },
            },
            true,
          ),
        ),
      );

      const metadataByUri = _.keyBy(metadata, "uri");
      console.log("collection", JSON.stringify(res, null, 2));
      console.log("fractions", JSON.stringify(fractions, null, 2));
      console.log("metadata", JSON.stringify(metadata, null, 2));
      console.log(
        "allowlist_entries",
        JSON.stringify(allowlistEntries, null, 2),
      );
      console.log(
        "hypercerts",
        JSON.stringify(
          hypercerts
            .filter((x) => !!x)
            .map((hypercert) => ({
              ...hypercert,
              name: metadataByUri[hypercert.uri]?.name,
            })),
          null,
          2,
        ),
      );
      console.log("users", JSON.stringify(users, null, 2));

      const { error, data, count } = res;

      if (error) {
        console.warn(
          `[HyperboardResolver::hyperboards] Error fetching hyperboards: `,
          error,
        );
        return { data };
      }

      const hyperboardWithSections =
        res.data?.map((hyperboard) => {
          const sections = hyperboard.collections.map((collection) =>
            processRegistryForDisplay({
              collection,
              hypercert_metadata: hyperboard.hypercert_metadata,
              blueprints: collection.blueprints,
              fractions: fractions
                .filter((x) => !!x)
                .filter((fraction) =>
                  collection.hypercerts
                    .map((x) => x.hypercert_id)
                    .includes(fraction.hypercert_id),
                ),
              blueprintMetadata: collection.blueprint_metadata,
              allowlistEntries: allowlistEntries
                .filter((entry) => !!entry)
                .filter((entry) =>
                  collection.hypercerts
                    .map((x) => x.hypercert_id)
                    .includes(entry.hypercert_id),
                ),
              hypercerts: hypercerts
                .filter((x) => !!x)
                .map((hypercert) => ({
                  ...hypercert,
                  name: metadataByUri[hypercert.uri]?.name,
                })),
              users: users.filter((x) => !!x),
            }),
          );
          return {
            ...hyperboard,
            sections: {
              data: sections,
              count: sections.length,
            },
          };
        }) || [];

      console.log(
        "processedRegistries",
        JSON.stringify(hyperboardWithSections, null, 2),
      );

      return {
        data: hyperboardWithSections,
        count: count ? count : data?.length,
      };
    } catch (e) {
      throw new Error(
        `[HyperboardResolver::hyperboards] Error fetching hyperboards: ${(e as Error).message}`,
      );
    }
  }
}

const processRegistryForDisplay = ({
  blueprintMetadata,
  hypercert_metadata,
  blueprints,
  fractions,
  allowlistEntries,
  collection,
  hypercerts,
  users,
}: {
  collection: DataDatabase["public"]["Tables"]["collections"]["Row"];
  hypercert_metadata: DataDatabase["public"]["Tables"]["hyperboard_hypercert_metadata"]["Row"][];
  blueprints: DataDatabase["public"]["Tables"]["blueprints"]["Row"][];
  blueprintMetadata: DataDatabase["public"]["Tables"]["hyperboard_blueprint_metadata"]["Row"][];
  fractions: CachingDatabase["public"]["Views"]["fractions_view"]["Row"][];
  allowlistEntries: CachingDatabase["public"]["Views"]["claimable_fractions_with_proofs"]["Row"][];
  hypercerts: CachingDatabase["public"]["Tables"]["claims"]["Row"][];
  users: DataDatabase["public"]["Tables"]["users"]["Row"][];
}) => {
  const NUMBER_OF_UNITS_IN_HYPERCERT = parseUnits("1", 8);
  // Calculate the total number of units in all claims, allowlistEntries and blueprints combined
  const totalUnitsInAllowlistEntries = allowlistEntries.reduce(
    (acc, entry) => acc + BigInt(entry.units || 0),
    0n,
  );
  const totalUnitsInBlueprints =
    BigInt(blueprints.length) * NUMBER_OF_UNITS_IN_HYPERCERT;
  const totalUnitsInClaims = fractions.reduce(
    (acc, fraction) => acc + BigInt(fraction.units || 0),
    0n,
  );
  const totalUnits =
    totalUnitsInClaims + totalUnitsInBlueprints + totalUnitsInAllowlistEntries;

  const totalOfAllDisplaySizes = [
    ...hypercert_metadata,
    ...blueprintMetadata,
  ].reduce((acc, curr) => acc + BigInt(curr?.display_size || 0), 0n);
  // Calculate the amount of surface per display size unit
  const displayPerUnit = (totalUnits * 10n ** 18n) / totalOfAllDisplaySizes;

  const hypercertsByHypercertId = _.keyBy(hypercerts, "hypercert_id");
  const hypercertMetadataByHypercertId = _.keyBy(
    hypercert_metadata,
    "hypercert_id",
  );
  const fractionsByHypercertId = _.groupBy(fractions, "hypercert_id");
  const fractionsResults = Object.entries(fractionsByHypercertId)
    .map(([hypercertId, fractions]) => {
      const metadata = hypercertMetadataByHypercertId[hypercertId];
      const hypercert = hypercertsByHypercertId[hypercertId];

      if (!hypercert) {
        throw new Error(
          `[HyperboardResolver::processRegistryForDisplay] Hypercert not found for ${hypercertId}`,
        );
      }

      if (!metadata) {
        console.log(hypercertId, hypercertMetadataByHypercertId);
        throw new Error(
          `[HyperboardResolver::processRegistryForDisplay] Metadata not found for ${hypercertId}`,
        );
      }

      if (!metadata.display_size) {
        throw new Error(
          `[HyperboardResolver::processRegistryForDisplay] Metadata display size not found for ${hypercertId}`,
        );
      }

      // The total number of 'display units' available for this claim
      const totalDisplayUnitsForClaim =
        BigInt(metadata.display_size) * displayPerUnit;

      // The total number of units in this claim
      const totalUnitsInClaim = fractions.reduce(
        (acc, curr) => acc + BigInt(curr.units || 0),
        0n,
      );

      if (totalUnitsInClaim === 0n) {
        return [];
      }

      // Calculate the number of units per display unit
      const displayUnitsPerUnit = totalDisplayUnitsForClaim / totalUnitsInClaim;

      // Calculate the relative number of units per fraction
      return fractions.map((fraction) => ({
        id: fraction.fraction_id,
        owner: fraction.owner_address,
        unitsAdjustedForDisplaySize:
          (BigInt(fraction.units || 0) * displayUnitsPerUnit) / 10n ** 14n,
        isBlueprint: false,
        hypercertId,
        hypercertOwnerAddress: hypercert.owner_address,
      }));
    })
    .flat();

  const allowlistResults = allowlistEntries.map((entry) => {
    if (!entry.hypercert_id) {
      throw new Error(
        `[HyperboardResolver::processRegistryForDisplay] Allowlist entry does not have a hypercert_id`,
      );
    }
    // Calculate the number of units per display unit
    const hypercert = hypercertsByHypercertId[entry.hypercert_id];

    if (!hypercert) {
      throw new Error(
        `[HyperboardResolver::processRegistryForDisplay] Hypercert not found for ${entry.hypercert_id}`,
      );
    }

    if (!hypercert.units) {
      throw new Error(
        `[HyperboardResolver::processRegistryForDisplay] Hypercert does not have units`,
      );
    }

    const displayUnitsPerUnit = displayPerUnit / BigInt(hypercert.units);
    return {
      owner: entry.user_address,
      unitsAdjustedForDisplaySize:
        (BigInt(hypercert.units) * displayUnitsPerUnit) / 10n ** 14n,
      isBlueprint: true,
      hypercertId: entry.hypercert_id,
      hypercertOwnerAddress: undefined,
    };
  });

  const blueprintMetadataByBlueprintId = _.keyBy(
    blueprintMetadata,
    "blueprint_id",
  );
  const blueprintResults = blueprints.map((blueprint) => {
    const blueprintMeta = blueprintMetadataByBlueprintId[blueprint.id];

    if (!blueprintMeta) {
      throw new Error(
        `[HyperboardResolver::processRegistryForDisplay] Blueprint metadata not found for ${blueprint.id}`,
      );
    }

    const totalDisplayUnitsForClaim =
      BigInt(blueprintMeta.display_size || 1) * displayPerUnit;

    // The total number of units in this claim

    // Calculate the number of units per display unit
    const displayUnitsPerUnit =
      totalDisplayUnitsForClaim / NUMBER_OF_UNITS_IN_HYPERCERT;
    return {
      owner: blueprint.minter_address,
      unitsAdjustedForDisplaySize:
        (NUMBER_OF_UNITS_IN_HYPERCERT * displayUnitsPerUnit) / 10n ** 14n,
      isBlueprint: true,
      hypercertId: blueprint.id,
      hypercertOwnerAddress: undefined,
    };
  });

  // TODO: Are we dropping fraction specific data?
  // // Fetch fallback display data
  // const fractionSpecificDisplayDataResponse = await getFractionsDisplayData(
  //   fractions
  //     .map((x) => x.fractions)
  //     .flat()
  //     .map((x) => x.fraction_id!.toLowerCase()),
  //   registry.chain_id,
  // );
  //

  const usersByAddress = _.keyBy(users, "address");
  console.log("usersByAddress", JSON.stringify(usersByAddress, null, 2));
  const fractionsWithDisplayData = fractionsResults.map((fraction) => {
    // TODO: Are we dropping fraction specific data?
    // const fractionSpecificDisplayData =
    //   fractionSpecificDisplayDataResponse.data?.find(
    //     (x) => x.fraction_id.toLowerCase() === fraction.id!.toLowerCase(),
    //   );
    // if (
    //   fraction.owner === fraction.hypercertOwnerAddress &&
    //   fractionSpecificDisplayData
    // ) {
    //   return {
    //     ...fraction,
    //     displayData: fractionSpecificDisplayData,
    //     ownerId: fractionSpecificDisplayData.value,
    //   };
    // }
    if (!fraction.owner) {
      throw new Error(
        `[HyperboardResolver::processRegistryForDisplay] Fraction does not have an owner address`,
      );
    }
    return {
      ...fraction,
      displayData: {
        ...(usersByAddress[fraction.owner] || { address: fraction.owner }),
        value: fraction.owner,
      },
      ownerId: fraction.owner,
    };
  });

  const bluePrintsAndAllowlistWithDisplayData = [
    ...blueprintResults,
    ...allowlistResults,
  ].map((fraction) => {
    if (!fraction.owner) {
      throw new Error(
        `[HyperboardResolver::processRegistryForDisplay] Fraction does not have an owner`,
      );
    }
    return {
      ...fraction,
      displayData: {
        ...(usersByAddress[fraction.owner] || { address: fraction.owner }),
        value: fraction.owner,
      },
      ownerId: fraction.owner,
    };
  });
  const totalUnitsAdjustedForDisplaySizeInAllEntries = [
    ...fractionsWithDisplayData,
    ...bluePrintsAndAllowlistWithDisplayData,
  ].reduce((acc, curr) => acc + curr.unitsAdjustedForDisplaySize, 0n);
  // Group by owner, merge with display data and calculate total value of all fractions per owner
  const owners = _.chain([
    ...fractionsWithDisplayData,
    ...bluePrintsAndAllowlistWithDisplayData,
  ])
    .groupBy((fraction) => fraction.ownerId)
    .mapValues((fractionsPerOwner) => {
      const totalUnitsAdjustedForDisplaySizeForOwner = fractionsPerOwner.reduce(
        (acc, curr) => acc + curr.unitsAdjustedForDisplaySize,
        0n,
      );
      const percentage_owned = calculateBigIntPercentage(
        totalUnitsAdjustedForDisplaySizeForOwner,
        totalUnitsAdjustedForDisplaySizeInAllEntries,
      );
      return {
        avatar: fractionsPerOwner[0].displayData.avatar,
        display_name: fractionsPerOwner[0].displayData.display_name,
        address: fractionsPerOwner[0].displayData.address,
        percentage_owned,
      };
    })
    .values()
    .value();

  const fractionsByHypercertsId = _.groupBy(
    [...fractionsWithDisplayData, ...bluePrintsAndAllowlistWithDisplayData],
    "hypercertId",
  );

  const blueprintsByBlueprintId = _.keyBy(blueprints, "id");

  const entries = Object.entries(fractionsByHypercertsId).map(
    ([id, entriesById]) => {
      const is_blueprint = entriesById.every((x) => x.isBlueprint);
      const allUnitsAdjustedForDisplaySize = entriesById.reduce(
        (acc, curr) => acc + curr.unitsAdjustedForDisplaySize,
        0n,
      );

      const owners = _.chain(entriesById)
        .groupBy((fraction) => fraction.ownerId)
        .mapValues((fractionsPerOwner) => {
          const totalUnitsAdjustedForDisplaySizeForOwner =
            fractionsPerOwner.reduce(
              (acc, curr) => acc + curr.unitsAdjustedForDisplaySize,
              0n,
            );
          const percentage = calculateBigIntPercentage(
            totalUnitsAdjustedForDisplaySizeForOwner,
            allUnitsAdjustedForDisplaySize,
          );
          return {
            percentage,
            avatar: fractionsPerOwner[0].displayData.avatar,
            display_name: fractionsPerOwner[0].displayData.display_name,
            address: fractionsPerOwner[0].displayData.address,
            units: fractionsPerOwner.reduce(
              (acc, curr) => acc + curr.unitsAdjustedForDisplaySize,
              0n,
            ),
          };
        })
        .values()
        .value();
      const displayMetadata =
        hypercertMetadataByHypercertId[id] ||
        blueprintMetadataByBlueprintId[id];
      const hypercert = hypercertsByHypercertId[id];
      const blueprint = blueprintsByBlueprintId[id];

      const display_size = displayMetadata?.display_size;
      if (!display_size) {
        throw new Error(
          `[HyperboardResolver::processRegistryForDisplay] Display size not found for ${id} while processing section ${collection.id}`,
        );
      }

      const percentage_of_section =
        (display_size / Number(totalOfAllDisplaySizes)) * 100;

      return {
        id,
        is_blueprint,
        percentage_of_section,
        display_size,
        total_units: BigInt(hypercert?.units || NUMBER_OF_UNITS_IN_HYPERCERT),
        name: hypercert?.name || blueprint?.form_values?.name,
        percentage: 100,
        owners,
      };
    },
  );

  return {
    collection,
    label: collection.name,
    entries,
    owners,
  };
};

export { HyperboardResolver };
