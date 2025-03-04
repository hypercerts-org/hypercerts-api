import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";

import { GetCollectionsArgs } from "../args/collectionArgs.js";
import { Blueprint } from "../typeDefs/blueprintTypeDefs.js";
import {
  Collection,
  GetCollectionsResponse,
} from "../typeDefs/collectionTypeDefs.js";
import { User } from "../typeDefs/userTypeDefs.js";

import { inject, injectable } from "tsyringe";
import { CollectionService } from "../../../services/database/entities/CollectionEntityService.js";
import { Hypercert } from "../typeDefs/hypercertTypeDefs.js";

@injectable()
@Resolver(() => Collection)
class CollectionResolver {
  constructor(
    @inject(CollectionService)
    private collectionService: CollectionService,
  ) {}

  @Query(() => GetCollectionsResponse)
  async collections(@Args() args: GetCollectionsArgs) {
    return this.collectionService.getCollections(args);
  }

  @FieldResolver(() => [Hypercert])
  async hypercerts(@Root() collection: Collection) {
    if (!collection.id) {
      console.error(
        "[CollectionResolver::hypercerts] Collection ID is undefined",
      );
      return [];
    }

    return await this.collectionService.getCollectionHypercerts(collection.id);
  }

  @FieldResolver(() => [User])
  async admins(@Root() collection: Collection) {
    if (!collection.id) {
      console.error("[CollectionResolver::admins] Collection ID is undefined");
      return [];
    }

    return await this.collectionService.getCollectionAdmins(collection.id);
  }

  @FieldResolver(() => [Blueprint])
  async blueprints(@Root() collection: Collection) {
    if (!collection.id) {
      console.error(
        "[CollectionResolver::blueprints] Collection ID is undefined",
      );
      return [];
    }

    return await this.collectionService.getCollectionBlueprints(collection.id);
  }
}

export { CollectionResolver };
