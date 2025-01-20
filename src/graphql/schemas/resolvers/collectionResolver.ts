import {
  Args,
  FieldResolver,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";

import { Collection } from "../typeDefs/collectionTypeDefs.js";
import { GetCollectionsArgs } from "../args/collectionArgs.js";

import { createBaseResolver, DataResponse } from "./baseTypes.js";
import GetHypercertsResponse from "./hypercertResolver.js";

@ObjectType()
class GetCollectionsResponse extends DataResponse(Collection) {}

const CollectionBaseResolver = createBaseResolver("collection");

@Resolver(() => Collection)
class CollectionResolver extends CollectionBaseResolver {
  @Query(() => GetCollectionsResponse)
  async collections(@Args() args: GetCollectionsArgs) {
    try {
      const res = await this.supabaseDataService.getCollections(args);

      return {
        data: res.data,
        count: res.count,
      };
    } catch (e) {
      console.error("[CollectionResolver::collections] Error:", e);
      throw new Error(`Error fetching collections: ${(e as Error).message}`);
    }
  }

  @FieldResolver(() => GetHypercertsResponse)
  async hypercerts(@Root() collection: Collection) {
    if (!collection.hypercerts?.length) {
      return [];
    }

    const hypercertIds = collection.hypercerts
      .map((h) => h.hypercert_id)
      .filter((id): id is string => id !== undefined);

    if (hypercertIds.length === 0) {
      return [];
    }

    const hypercerts = await this.getHypercerts({
      where: { hypercert_id: { in: hypercertIds } },
    });

    return hypercerts.data || [];
  }
}

export { CollectionResolver };
