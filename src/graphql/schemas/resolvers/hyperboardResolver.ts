import { Selectable } from "kysely";
import _ from "lodash";
import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { DataKyselyService } from "../../../client/kysely.js";
import { AllowlistRecordService } from "../../../services/database/entities/AllowListRecordEntityService.js";
import { CollectionService } from "../../../services/database/entities/CollectionEntityService.js";
import { FractionService } from "../../../services/database/entities/FractionEntityService.js";
import { HyperboardService } from "../../../services/database/entities/HyperboardEntityService.js";
import { HypercertsService } from "../../../services/database/entities/HypercertsEntityService.js";
import { MetadataService } from "../../../services/database/entities/MetadataEntityService.js";
import { UsersService } from "../../../services/database/entities/UsersEntityService.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { processCollectionToSection } from "../../../utils/processCollectionToSection.js";
import { processSectionsToHyperboardOwnership } from "../../../utils/processSectionsToHyperboardOwnership.js";
import { GetHyperboardsArgs } from "../args/hyperboardArgs.js";
import {
  GetHyperboardsResponse,
  Hyperboard,
  HyperboardOwner,
  Section,
  SectionResponseType,
} from "../typeDefs/hyperboardTypeDefs.js";

@injectable()
@Resolver(() => Hyperboard)
class HyperboardResolver {
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

  @Query(() => GetHyperboardsResponse)
  async hyperboards(@Args() args: GetHyperboardsArgs) {
    try {
      return await this.hyperboardService.getHyperboards(args);
    } catch (e) {
      throw new Error(
        `[HyperboardResolver::hyperboards] Error fetching hyperboards: ${(e as Error).message}`,
      );
    }
  }

  // TODO improve calls by for example bulk fetching of all related data and filtering when processing
  // e.g. get all hypercert ids for a collection and then fetch all fractions for those hypercert ids
  // and then filter the fractions by the hypercert ids
  @FieldResolver(() => [Section])
  async sections(
    @Root() hyperboard: Hyperboard,
  ): Promise<SectionResponseType[]> {
    try {
      if (!hyperboard.id) {
        throw new Error(`[HyperboardResolver::sections] Hyperboard has no id`);
      }

      const hyperboardId = hyperboard.id;

      // Build sections from hyperboard
      // Every section has a collection
      // A section currently only has 1 collection
      // A hyperboard currention only has 1 section
      const { data: collections } =
        await this.hyperboardService.getHyperboardCollections(hyperboard.id);

      const sections = await Promise.all(
        collections.map(async (collection) => {
          // Get all hypercert IDs for each collection
          const collectionHypercertIds = await Promise.all(
            collections?.map((collection) => {
              if (!collection.id) {
                throw new Error(
                  `[HyperboardResolver::sections] Collection has no id`,
                );
              }

              return this.collectionService.getCollectionHypercertIds(
                collection.id,
              );
            }) ?? [],
          );

          const hypercertIds = collectionHypercertIds.flatMap(
            (collectionHypercertIds) =>
              collectionHypercertIds.map(
                (hypercertId) => hypercertId.hypercert_id,
              ),
          );

          // Get fractions, allowlist entries, hypercerts, and metadata for each hypercert ID on the board
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
              this.metadataService.getMetadata({
                where: { hypercerts: { hypercert_id: { in: hypercertIds } } },
              }),
            ]);

          const metadataByUri = _.keyBy(metadata.data, "uri");

          // get blueprints
          const collectionBlueprints =
            await this.collectionService.getCollectionBlueprints(collection.id);

          // Get all blueprints from all collections
          const blueprints =
            collectionBlueprints.data?.map((blueprint) => blueprint) || [];

          const users = await this.getUsers(
            fractions,
            allowlistEntries,
            blueprints,
          );

          // get hyperboard hypercert metadata
          const hyperboardHypercertMetadata =
            await this.hyperboardService.getHyperboardHypercertMetadata(
              hyperboardId,
            );

          const blueprintMetadata =
            await this.hyperboardService.getHyperboardBlueprintMetadata(
              hyperboardId,
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
            users: users.filter((x) => !!x),
          });
        }),
      );

      return [{ data: sections, count: sections.length }];
    } catch (e) {
      console.debug("Error parsing sections for: ", hyperboard.id);
      throw new Error(
        `[HyperboardResolver::sections] Error fetching sections: ${(e as Error).message}`,
      );
    }
  }

  @FieldResolver(() => [HyperboardOwner])
  async owners(@Root() hyperboard: Hyperboard) {
    const sections = await this.sections(hyperboard);
    // TODO are owners for the full hyperboard or grouped per section?
    // For now, we'll assume it's for the full hyperboard
    const allSections = sections.flatMap((section) => section.data || []);

    return processSectionsToHyperboardOwnership(allSections);
  }

  @FieldResolver(() => [HyperboardOwner])
  async admins(@Root() hyperboard: Hyperboard) {
    if (!hyperboard.id) {
      throw new Error(`[HyperboardResolver::admins] Hyperboard has no id`);
    }

    return await this.hyperboardService.getHyperboardAdmins(hyperboard.id);
  }

  private async getUsers(
    fractions: Selectable<CachingDatabase["fractions_view"]>[],
    allowlistEntries: Selectable<
      CachingDatabase["claimable_fractions_with_proofs"]
    >[],
    blueprints: Selectable<DataDatabase["blueprints"]>[],
  ) {
    const ownerAddresses = _.uniq([
      ...fractions.map((x) => x?.owner_address),
      ...allowlistEntries.flatMap((x) => x?.user_address),
      ...blueprints.map((blueprint) => blueprint.minter_address),
    ]).filter((x) => !!x);

    return this.usersService
      .getUsers({
        where: { address: { in: ownerAddresses } },
      })
      .then((res) => res.data);
  }

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

  private enrichHypercertsWithMetadata(
    hypercerts: Selectable<CachingDatabase["claims"]>[],
    metadataByUri: Record<string, Selectable<CachingDatabase["metadata"]>>,
  ) {
    return hypercerts
      .filter((x) => !!x)
      .map((hypercert) => ({
        ...hypercert,
        name: (hypercert.uri && metadataByUri[hypercert.uri]?.name) || "",
      }));
  }
}

export { HyperboardResolver };
