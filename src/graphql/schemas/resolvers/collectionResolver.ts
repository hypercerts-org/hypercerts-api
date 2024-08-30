import { Args, ObjectType, Query, Resolver } from "type-graphql";
import { Collection } from "../typeDefs/collectionTypeDefs.js";
import { GetCollectionsArgs } from "../args/collectionArgs.js";
import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType()
class GetCollectionsResponse extends DataResponse(Collection) {}

const CollectionBaseResolver = createBaseResolver("collection", Collection);

@Resolver(() => Collection)
class CollectionResolver extends CollectionBaseResolver{

  @Query(() => GetCollectionsResponse)
  async collections(@Args() args: GetCollectionsArgs) {
    try {
      const res = await this.supabaseDataService.getCollections(args);

      const { data, error, count } = res;

      if (error) {
        console.warn(
          `[CollectionResolver::collections] Error fetching collections: `,
          error,
        );
        return { data };
      }

      return { data, count: count ? count : data?.length };
    } catch (e) {
      throw new Error(
        `[CollectionResolver::collections] Error fetching collections: ${(e as Error).message}`,
      );
    }
  }
}

export { CollectionResolver };
