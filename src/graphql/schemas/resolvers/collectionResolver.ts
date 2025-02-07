import {
  Args,
  FieldResolver,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";

import { GetCollectionsArgs } from "../args/collectionArgs.js";
import { Collection } from "../typeDefs/collectionTypeDefs.js";
import { Blueprint } from "../typeDefs/blueprintTypeDefs.js";
import { User } from "../typeDefs/userTypeDefs.js";

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
      return this.getCollections(args);
    } catch (e) {
      console.error("[CollectionResolver::collections] Error:", e);
      throw new Error(`Error fetching collections: ${(e as Error).message}`);
    }
  }

  @FieldResolver(() => GetHypercertsResponse)
  async hypercerts(@Root() collection: Collection) {
    if (!collection.id) {
      console.error(
        "[CollectionResolver::hypercerts] Collection ID is undefined",
      );
      return [];
    }

    const hypercerts = await this.supabaseDataService.getCollectionHypercerts(
      collection.id,
    );

    if (!hypercerts?.length) {
      return [];
    }

    const hypercertIds = hypercerts
      .map((h) => h.hypercert_id)
      .filter((id): id is string => id !== undefined);

    if (hypercertIds.length === 0) {
      return [];
    }

    const hypercertsData = await this.getHypercerts({
      where: { hypercert_id: { in: hypercertIds } },
    });

    return hypercertsData.data || [];
  }

  @FieldResolver(() => [User])
  async admins(@Root() collection: Collection) {
    if (!collection.id) {
      console.error("[CollectionResolver::admins] Collection ID is undefined");
      return [];
    }

    const admins = await this.supabaseDataService.getCollectionAdmins(
      collection.id,
    );
    return admins || [];
  }

  @FieldResolver(() => [Blueprint])
  async blueprints(@Root() collection: Collection) {
    if (!collection.id) {
      console.error(
        "[CollectionResolver::blueprints] Collection ID is undefined",
      );
      return [];
    }

    const blueprints = await this.supabaseDataService.getCollectionBlueprints(
      collection.id,
    );
    return blueprints || [];
  }
}

export { CollectionResolver };
