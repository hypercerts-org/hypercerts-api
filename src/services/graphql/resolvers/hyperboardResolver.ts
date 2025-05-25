import { Selectable } from "kysely";
import _ from "lodash";
import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { DataKyselyService } from "../../../client/kysely.js";
import { GetHyperboardsArgs } from "../../../graphql/schemas/args/hyperboardArgs.js";
import {
  GetHyperboardOwnersResponse,
  GetHyperboardsResponse,
  GetSectionsResponse,
  Hyperboard,
} from "../../../graphql/schemas/typeDefs/hyperboardTypeDefs.js";
import GetUsersResponse from "../../../graphql/schemas/typeDefs/userTypeDefs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { processCollectionToSection } from "../../../utils/processCollectionToSection.js";
import { processSectionsToHyperboardOwnership } from "../../../utils/processSectionsToHyperboardOwnership.js";
import { AllowlistRecordService } from "../../database/entities/AllowListRecordEntityService.js";
import { CollectionService } from "../../database/entities/CollectionEntityService.js";
import { FractionService } from "../../database/entities/FractionEntityService.js";
import { HyperboardService } from "../../database/entities/HyperboardEntityService.js";
import { HypercertsService } from "../../database/entities/HypercertsEntityService.js";
import { MetadataService } from "../../database/entities/MetadataEntityService.js";
import { UsersService } from "../../database/entities/UsersEntityService.js";

/**
 * GraphQL resolver for Hyperboard operations.
 * Handles queries for hyperboards and resolves related fields like sections, owners, and admins.
 *
 * This resolver provides:
 * - Query for fetching hyperboards with optional filtering
 * - Field resolution for sections within a hyperboard
 * - Field resolution for hyperboard owners
 * - Field resolution for hyperboard admins
 *
 * Error Handling:
 * If an operation fails, it will:
 * - Log the error internally for monitoring
 * - Return null/empty data to the client
 * - Include error information in the GraphQL response errors array
 *
 * @injectable Marks the class as injectable for dependency injection with tsyringe
 * @resolver Marks the class as a GraphQL resolver for the Hyperboard type
 */
@injectable()
@Resolver(() => Hyperboard)
class HyperboardResolver {
  /**
   * Creates a new instance of HyperboardResolver.
   *
   * @param hyperboardService - Service for handling hyperboard operations
   * @param fractionsService - Service for handling fraction operations
   * @param allowlistRecordService - Service for handling allowlist records
   * @param hypercertsService - Service for handling hypercerts
   * @param metadataService - Service for handling metadata
   * @param usersService - Service for handling users
   * @param collectionService - Service for handling collections
   * @param dbService - Service for database operations
   */
  constructor(
    @inject(HyperboardService)
    private hyperboardService: HyperboardService,
    @inject(FractionService)
    private fractionsService: FractionService,
    @inject(AllowlistRecordService)
    private allowlistRecordService: AllowlistRecordService,
    @inject(HypercertsService)
    private hypercertsService: HypercertsService,
    @inject(MetadataService)
    private metadataService: MetadataService,
    @inject(UsersService)
    private usersService: UsersService,
    @inject(CollectionService)
    private collectionService: CollectionService,
    @inject(DataKyselyService)
    private dbService: DataKyselyService,
  ) {}

  /**
   * Queries hyperboards based on provided arguments.
   * Returns both the matching hyperboards and a total count.
   *
   * @param args - Query arguments for filtering hyperboards
   * @returns A promise that resolves to an object containing:
   *          - data: Array of hyperboards matching the query
   *          - count: Total number of matching hyperboards
   *
   * @example
   * ```graphql
   * query {
   *   hyperboards(
   *     where: {
   *       name: { contains: "Research" }
   *     }
   *   ) {
   *     data {
   *       id
   *       name
   *       sections {
   *         data {
   *           id
   *           name
   *         }
   *       }
   *     }
   *     count
   *   }
   * }
   * ```
   */
  @Query(() => GetHyperboardsResponse)
  async hyperboards(@Args() args: GetHyperboardsArgs) {
    try {
      return await this.hyperboardService.getHyperboards(args);
    } catch (e) {
      console.error(
        `[HyperboardResolver::hyperboards] Error fetching hyperboards: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the sections field for a hyperboard.
   * Returns all sections that belong to the specified hyperboard.
   *
   * @param hyperboard - The hyperboard for which to resolve sections
   * @returns A promise resolving to:
   *          - Array of sections if found
   *          - null if hyperboard ID is undefined or an error occurs
   *
   * @example
   * ```graphql
   * query {
   *   hyperboards {
   *     data {
   *       id
   *       name
   *       sections {
   *         data {
   *           id
   *           name
   *           collection {
   *             id
   *             name
   *           }
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver(() => GetSectionsResponse)
  async sections(@Root() hyperboard: Hyperboard) {
    if (!hyperboard.id) {
      console.error(
        "[HyperboardResolver::sections] Hyperboard ID is undefined",
      );
      return null;
    }

    try {
      const hyperboardId = hyperboard.id;

      // Get collections for this hyperboard
      const { data: collections } =
        await this.hyperboardService.getHyperboardCollections(hyperboardId);

      // Process each collection into a section
      const sections = await Promise.all(
        collections.map(async (collection) => {
          if (!collection.id) {
            throw new Error(
              `[HyperboardResolver::sections] Collection has no id`,
            );
          }

          // Get all hypercert IDs for the collection
          const collectionHypercertIds =
            await this.collectionService.getCollectionHypercertIds(
              collection.id,
            );

          const hypercertIds = collectionHypercertIds.map(
            (hypercertId) => hypercertId.hypercert_id,
          );

          // Fetch all related data in parallel
          const [fractions, allowlistEntries, hypercerts, metadata] =
            await Promise.all([
              this.fractionsService
                .getFractions({
                  where: { hypercert_id: { in: hypercertIds } },
                })
                .then((res) => res.data),
              this.allowlistRecordService
                .getAllowlistRecords({
                  where: {
                    hypercert_id: { in: hypercertIds },
                    claimed: { eq: false },
                  },
                })
                .then((res) => res.data),
              this.hypercertsService
                .getHypercerts({
                  where: { hypercert_id: { in: hypercertIds } },
                })
                .then((res) => res.data),
              this.hypercertsService.getHypercertMetadataSets({
                hypercert_ids: hypercertIds,
              }),
            ]);

          const metadataByUri = _.keyBy(metadata, "uri");

          // Get blueprints and metadata
          const [
            collectionBlueprints,
            hyperboardHypercertMetadata,
            blueprintMetadata,
          ] = await Promise.all([
            this.collectionService.getCollectionBlueprints(collection.id),
            this.hyperboardService.getHyperboardHypercertMetadata(hyperboardId),
            this.hyperboardService.getHyperboardBlueprintMetadata(hyperboardId),
          ]);

          const blueprints = collectionBlueprints.data || [];

          // Get users for all entities
          const users = await this.getUsers(
            fractions,
            allowlistEntries,
            blueprints,
          );

          return processCollectionToSection({
            collection,
            hyperboardHypercertMetadata,
            blueprints,
            fractions: this.filterValidFractions(fractions, hypercertIds),
            blueprintMetadata,
            allowlistEntries: this.filterValidAllowlistEntries(
              allowlistEntries,
              hypercertIds,
            ),
            hypercerts: this.enrichHypercertsWithMetadata(
              hypercerts,
              metadataByUri,
            ),
            users: users?.filter((x) => !!x) || [],
          });
        }),
      );

      return { data: sections, count: sections.length };
    } catch (e) {
      console.error(
        `[HyperboardResolver::sections] Error fetching sections for hyperboard ${hyperboard.id}: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the owners field for a hyperboard.
   * Returns all users who own fractions or have allowlist entries in the hyperboard.
   *
   * @param hyperboard - The hyperboard for which to resolve owners
   * @returns A promise resolving to:
   *          - Array of owners if found
   *          - null if an error occurs
   */
  @FieldResolver(() => GetHyperboardOwnersResponse)
  async owners(@Root() hyperboard: Hyperboard) {
    try {
      const sections = await this.sections(hyperboard);

      if (!sections) {
        return [];
      }

      return processSectionsToHyperboardOwnership(sections.data);
    } catch (e) {
      console.error(
        `[HyperboardResolver::owners] Error fetching owners for hyperboard ${hyperboard.id}: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the admins field for a hyperboard.
   * Returns all users who have admin privileges for the specified hyperboard.
   *
   * @param hyperboard - The hyperboard for which to resolve admins
   * @returns A promise resolving to:
   *          - Array of admins if found
   *          - null if hyperboard ID is undefined or an error occurs
   */
  @FieldResolver(() => GetUsersResponse)
  async admins(@Root() hyperboard: Hyperboard) {
    if (!hyperboard.id) {
      console.error("[HyperboardResolver::admins] Hyperboard ID is undefined");
      return null;
    }

    try {
      return await this.hyperboardService.getHyperboardAdmins(hyperboard.id);
    } catch (e) {
      console.error(
        `[HyperboardResolver::admins] Error fetching admins for hyperboard ${hyperboard.id}: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Helper method to fetch users for fractions, allowlist entries, and blueprints.
   * Deduplicates user addresses and fetches user data in bulk.
   */
  private async getUsers(
    fractions: Selectable<CachingDatabase["fractions_view"]>[],
    allowlistEntries: Selectable<
      CachingDatabase["claimable_fractions_with_proofs"]
    >[],
    blueprints: Selectable<DataDatabase["blueprints_with_admins"]>[],
  ) {
    try {
      const ownerAddresses = _.uniq([
        ...fractions.map((x) => x?.owner_address),
        ...allowlistEntries.flatMap((x) => x?.user_address),
        ...blueprints.map((blueprint) => blueprint.minter_address),
      ]).filter((x): x is string => !!x);

      return await this.usersService
        .getUsers({
          where: { address: { in: ownerAddresses } },
        })
        .then((res) => res.data);
    } catch (e) {
      console.error(
        `[HyperboardResolver::getUsers] Error fetching users: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Helper method to filter valid fractions.
   * Ensures fractions have hypercert IDs and belong to the given set of hypercert IDs.
   */
  private filterValidFractions(
    fractions: Selectable<CachingDatabase["fractions_view"]>[],
    hypercertIds: string[],
  ) {
    return fractions.filter(
      (fraction): fraction is NonNullable<typeof fraction> =>
        !!fraction?.hypercert_id &&
        hypercertIds.includes(fraction.hypercert_id),
    );
  }

  /**
   * Helper method to filter valid allowlist entries.
   * Ensures entries have hypercert IDs and belong to the given set of hypercert IDs.
   */
  private filterValidAllowlistEntries(
    allowlistEntries: Selectable<
      CachingDatabase["claimable_fractions_with_proofs"]
    >[],
    hypercertIds: string[],
  ) {
    return allowlistEntries.filter(
      (entry): entry is NonNullable<typeof entry> =>
        !!entry?.hypercert_id && hypercertIds.includes(entry.hypercert_id),
    );
  }

  /**
   * Helper method to enrich hypercerts with their metadata.
   * Combines hypercert data with metadata from the metadata URI.
   */
  private enrichHypercertsWithMetadata(
    hypercerts: Selectable<CachingDatabase["claims"]>[],
    metadataByUri: Record<string, Selectable<CachingDatabase["metadata"]>>,
  ) {
    return hypercerts.map((hypercert) => ({
      ...hypercert,
      name: (hypercert.uri && metadataByUri[hypercert.uri]?.name) || "",
    }));
  }
}

export { HyperboardResolver };
