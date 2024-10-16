import { Database as DataDatabase } from "../types/supabaseData.js";
import { Database as CachingDatabase } from "../types/supabaseCaching.js";
import { parseUnits } from "viem";
import _ from "lodash";
import { calculateBigIntPercentage } from "./calculateBigIntPercentage.js";

export const processCollectionToSection = ({
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
  const displayPerUnit =
    (totalUnits * 10n ** 18n) / (totalOfAllDisplaySizes || 1n);

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
        (BigInt(entry.units || 0) * displayUnitsPerUnit) / 10n ** 14n,
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

  const usersByAddress = _.keyBy(users, "address");
  const fractionsWithDisplayData = fractionsResults.map((fraction) => {
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
        chain_id: fractionsPerOwner[0].displayData.chain_id,
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
            chain_id: fractionsPerOwner[0].displayData.chain_id,
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
