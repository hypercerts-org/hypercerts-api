import { Args, ObjectType, Query, Resolver } from "type-graphql";
import { Hyperboard } from "../typeDefs/hyperboardTypeDefs.js";
import { GetHyperboardsArgs } from "../args/hyperboardArgs.js";
import { createBaseResolver, DataResponse } from "./baseTypes.js";
import _ from "lodash";
import { processCollectionToSection } from "../../../utils/processCollectionToSection.js";
import { processSectionsToHyperboardOwnership } from "../../../utils/processSectionsToHyperboardOwnership.js";

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

      const [fractions, allowlistEntries, hypercerts] = await Promise.all([
        this.getFractions({
          where: { hypercert_id: { in: hypercertIds } },
        }).then((res) => res.data),
        this.getAllowlistRecords({
          where: {
            hypercert_id: { in: hypercertIds },
            claimed: { eq: false },
          },
        }).then((res) => res.data),
        this.getHypercerts({
          where: { hypercert_id: { in: hypercertIds } },
        }).then((res) => res.data),
      ]);

      const metadata = await this.getMetadata({
        where: { hypercerts: { hypercert_id: { in: hypercertIds } } },
      })
        .then((res) => res.data)
        .then((res) =>
          res.map((metadata) => {
            const hypercert = hypercerts.find(
              (hypercert) => hypercert.uri === metadata.uri,
            );
            return {
              ...(metadata || {}),
              hypercert_id: hypercert?.hypercert_id,
            };
          }),
        )
        .then((res) => res.map((metadata) => _.omit(metadata, "image")));

      // Get a deduplicated list of all owners
      const ownerAddresses = _.uniq([
        ...fractions.map((x) => x?.owner_address),
        ...allowlistEntries.flatMap((x) => x?.user_address),
        ...(res.data?.flatMap(
          (hyperboard) =>
            hyperboard?.collections?.flatMap((collection) =>
              collection.blueprints.flatMap(
                (blueprint) => blueprint.minter_address,
              ),
            ) || [],
        ) || []),
      ]).filter((x) => !!x) as string[];

      const users = await this.getUsers({
        where: { address: { in: ownerAddresses } },
      }).then((res) => res.data);

      const metadataByUri = _.keyBy(metadata, "uri");
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
            processCollectionToSection({
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
          const owners = processSectionsToHyperboardOwnership(sections);
          return {
            ...hyperboard,
            owners,
            sections: {
              data: sections,
              count: sections.length,
            },
          };
        }) || [];

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

export { HyperboardResolver };
