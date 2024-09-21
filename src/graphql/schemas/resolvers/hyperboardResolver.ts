import { Args, ObjectType, Query, Resolver } from "type-graphql";
import { Hyperboard } from "../typeDefs/hyperboardTypeDefs.js";
import { GetHyperboardsArgs } from "../args/hyperboardArgs.js";
import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType()
class GetHyperboardsResponse extends DataResponse(Hyperboard) {}

const HyperboardBaseResolver = createBaseResolver("hyperboard");

@Resolver(() => Hyperboard)
class HyperboardResolver extends HyperboardBaseResolver {
  @Query(() => GetHyperboardsResponse)
  async hyperboards(@Args() args: GetHyperboardsArgs) {
    try {
      const res = await this.supabaseDataService.getHyperboards(args);

      const { data, error, count } = res;

      if (error) {
        console.warn(
          `[HyperboardResolver::hyperboards] Error fetching hyperboards: `,
          error,
        );
        return { data };
      }

      return { data, count: count ? count : data?.length };
    } catch (e) {
      throw new Error(
        `[HyperboardResolver::hyperboards] Error fetching hyperboards: ${(e as Error).message}`,
      );
    }
  }
}

export { HyperboardResolver };
