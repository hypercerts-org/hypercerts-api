import { parseUnits } from "viem";
import _ from "lodash";
import { calculateBigIntPercentage } from "./calculateBigIntPercentage.js";
import { Section } from "../graphql/schemas/typeDefs/hyperboardTypeDefs.js";
import { DataDatabase } from "../types/kyselySupabaseData.js";
import { CachingDatabase } from "../types/kyselySupabaseCaching.js";
import { Selectable } from "kysely";

interface ProcessCollectionToSectionArgs {
  collection: Selectable<DataDatabase["collections"]>;
  hyperboardHypercertMetadata: Selectable<
    DataDatabase["hyperboard_hypercert_metadata"]
  >[];
  blueprints: Selectable<DataDatabase["blueprints"]>[];
  blueprintMetadata: Selectable<
    DataDatabase["hyperboard_blueprint_metadata"]
  >[];
  fractions: Selectable<CachingDatabase["fractions_view"]>[];
  allowlistEntries: Selectable<
    CachingDatabase["claimable_fractions_with_proofs"]
  >[];
  hypercerts: (Selectable<CachingDatabase["claims"]> & {
    name: string;
  })[];
  users: Selectable<DataDatabase["users"]>[];
}

export const processCollectionToSection = ({
  blueprintMetadata,
  hyperboardHypercertMetadata,
  blueprints,
  fractions,
  allowlistEntries,
  collection,
  hypercerts,
  users,
}: ProcessCollectionToSectionArgs): Section => {
  const NUMBER_OF_UNITS_IN_HYPERCERT = parseUnits("1", 8);
  // Calculate the total number of units in all claims and blueprints combined
  const totalUnitsInBlueprints =
    BigInt(blueprints.length) * NUMBER_OF_UNITS_IN_HYPERCERT;
  const totalUnitsInClaims = hypercerts.reduce(
    (acc, hypercert) => acc + BigInt(hypercert.units || 0),
    0n,
  );
  const totalUnits = totalUnitsInClaims + totalUnitsInBlueprints;

  const totalOfAllDisplaySizes = [
    ...hyperboardHypercertMetadata,
    ...blueprintMetadata,
  ].reduce((acc, curr) => acc + BigInt(curr?.display_size || 0), 0n);
  // Calculate the amount of surface per display size unit
  const displayPerUnit =
    (totalUnits * 10n ** 18n) / (totalOfAllDisplaySizes || 1n);

  const hypercertsByHypercertId = _.keyBy(hypercerts, "hypercert_id");
  const hypercertMetadataByHypercertId = _.keyBy(
    hyperboardHypercertMetadata,
    "hypercert_id",
  );
  const fractionsByHypercertId = _.groupBy(fractions, "hypercert_id");
  const fractionsResults = Object.entries(fractionsByHypercertId)
    .map(([hypercertId, fractions]) => {
      const metadata = hypercertMetadataByHypercertId[hypercertId];
      const hypercert = hypercertsByHypercertId[hypercertId];

      if (!hypercert) {
        throw new Error(
          `[HyperboardResolver::processCollectionToSection] Hypercert not found for ${hypercertId}`,
        );
      }

      if (!metadata) {
        console.log(hypercertId, hypercertMetadataByHypercertId);
        throw new Error(
          `[HyperboardResolver::processCollectionToSection] Metadata not found for ${hypercertId}`,
        );
      }

      if (!metadata.display_size) {
        throw new Error(
          `[HyperboardResolver::processCollectionToSection] Metadata display size not found for ${hypercertId}`,
        );
      }

      // The total number of 'display units' available for this claim
      const totalDisplayUnitsForClaim =
        BigInt(metadata.display_size) * displayPerUnit;

      // The total number of units in this claim
      const totalUnitsInClaim = BigInt(hypercert.units || 0);

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
        units: BigInt(fraction.units || 0),
      }));
    })
    .flat();

  const allowlistResults = allowlistEntries
    .filter((entry) => !entry.claimed)
    .map((entry) => {
      if (!entry.hypercert_id) {
        throw new Error(
          `[HyperboardResolver::processCollectionToSection] Allowlist entry does not have a hypercert_id`,
        );
      }
      // Calculate the number of units per display unit
      const hypercert = hypercertsByHypercertId[entry.hypercert_id];

      if (!hypercert) {
        throw new Error(
          `[HyperboardResolver::processCollectionToSection] Hypercert not found for ${entry.hypercert_id}`,
        );
      }

      if (!hypercert.units) {
        throw new Error(
          `[HyperboardResolver::processCollectionToSection] Hypercert does not have units`,
        );
      }

      const displayUnitsPerUnit = displayPerUnit / BigInt(hypercert.units);
      return {
        owner: entry.user_address,
        unitsAdjustedForDisplaySize:
          (BigInt(entry.units || 0) * displayUnitsPerUnit) / 10n ** 14n,
        isBlueprint: false,
        hypercertId: entry.hypercert_id,
        units: BigInt(entry.units || 0),
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
        `[HyperboardResolver::processCollectionToSection] Blueprint metadata not found for ${blueprint.id}`,
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
      units: NUMBER_OF_UNITS_IN_HYPERCERT,
    };
  });

  const usersByAddress = _.keyBy(users, "address");
  const fractionsWithDisplayData = fractionsResults.map((fraction) => {
    if (!fraction.owner) {
      throw new Error(
        `[HyperboardResolver::processCollectionToSection] Fraction does not have an owner address`,
      );
    }
    return {
      ...fraction,
      units: fraction.units,
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
        `[HyperboardResolver::processCollectionToSection] Fraction does not have an owner`,
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

  const fractionsByHypercertsId = _.groupBy(
    [...fractionsWithDisplayData, ...bluePrintsAndAllowlistWithDisplayData],
    "hypercertId",
  );

  const blueprintsByBlueprintId = _.keyBy(blueprints, "id");

  const entries = Object.entries(fractionsByHypercertsId).map(
    ([id, entriesById]) => {
      const is_blueprint = entriesById.every((x) => x.isBlueprint);

      let unitsForHypercert: bigint;
      let name: string;
      if (is_blueprint) {
        unitsForHypercert = NUMBER_OF_UNITS_IN_HYPERCERT;
        // @ts-expect-error form value types
        name = blueprintsByBlueprintId[id]?.form_values?.title;
      } else {
        const hypercert = hypercertsByHypercertId[id];

        if (!hypercert) {
          throw new Error(
            `[HyperboardResolver::processCollectionToSection] Hypercert not found for ${id}`,
          );
        }

        if (!hypercert?.units) {
          throw new Error(
            `[HyperboardResolver::processCollectionToSection] Hypercert not found for ${id}`,
          );
        }

        unitsForHypercert = BigInt(hypercert.units);

        if (!hypercert?.name) {
          throw new Error(
            `[HyperboardResolver::processCollectionToSection] Hypercert name not found for ${id}`,
          );
        }

        name = hypercert.name;
      }

      if (!unitsForHypercert) {
        throw new Error(
          `[HyperboardResolver::processCollectionToSection] Units not found for ${id}`,
        );
      }

      const owners = _.chain(entriesById)
        .groupBy((fraction) => fraction.ownerId)
        .mapValues((fractionsPerOwner) => {
          // Calculate the total number of units for this owner
          // We do not have to adjust for display size, as this is within a single hypercert
          const totalUnitsForOwner = fractionsPerOwner.reduce(
            (acc, curr) => acc + curr.units,
            0n,
          );
          const percentage = calculateBigIntPercentage(
            totalUnitsForOwner,
            unitsForHypercert,
          );
          return {
            percentage,
            chain_id: fractionsPerOwner[0].displayData.chain_id,
            avatar: fractionsPerOwner[0].displayData.avatar || undefined,
            display_name:
              fractionsPerOwner[0].displayData.display_name || undefined,
            address: fractionsPerOwner[0].displayData.address,
            units: totalUnitsForOwner,
          };
        })
        .values()
        .value();
      const displayMetadata =
        hypercertMetadataByHypercertId[id] ||
        blueprintMetadataByBlueprintId[id];

      const display_size = displayMetadata?.display_size;
      if (!display_size) {
        throw new Error(
          `[HyperboardResolver::processCollectionToSection] Display size not found for ${id} while processing section ${collection.id}`,
        );
      }

      const percentage_of_section =
        (display_size / Number(totalOfAllDisplaySizes)) * 100;

      return {
        id,
        is_blueprint,
        percentage_of_section,
        display_size,
        total_units: unitsForHypercert,
        name,
        percentage: 100,
        owners: {
          data: owners.map((owner) => ({
            ...owner,
            percentage: owner.percentage,
            units: owner.units,
          })),
          count: owners.length,
        },
      };
    },
  );

  const owners = _.chain(entries)
    .flatMap((entry) => {
      const metadata =
        hypercertMetadataByHypercertId[entry.id] ||
        blueprintMetadataByBlueprintId[entry.id];
      const display_size = metadata?.display_size;
      if (display_size === null) {
        throw new Error(
          `[HyperboardResolver::processCollectionToSection] Display size not found for ${entry.id} while processing section ${collection.id}`,
        );
      }
      return entry.owners.data.map((owner) => ({
        ...owner,
        percentage: (owner.percentage || 0) * display_size,
      }));
    })
    .groupBy((owner) => owner.address)
    .mapValues((owners) => {
      const percentage_owned =
        owners.reduce((acc, curr) => acc + curr.percentage, 0) /
        Number(totalOfAllDisplaySizes);
      return {
        avatar: owners[0].avatar || undefined,
        display_name: owners[0].display_name || undefined,
        address: owners[0].address,
        chain_id: owners[0].chain_id,
        percentage_owned,
      };
    })
    .values()
    .value();

  return {
    collection,
    label: collection.name,
    entries: entries || [],
    owners: {
      data: owners || [],
      count: owners?.length || 0,
    },
  };
};
