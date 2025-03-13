import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";

import { GetCollectionsArgs } from "../../../graphql/schemas/args/collectionArgs.js";
import { Blueprint } from "../../../graphql/schemas/typeDefs/blueprintTypeDefs.js";
import {
  Collection,
  GetCollectionsResponse,
} from "../../../graphql/schemas/typeDefs/collectionTypeDefs.js";
import { User } from "../../../graphql/schemas/typeDefs/userTypeDefs.js";

import { inject, injectable } from "tsyringe";
import { CollectionService } from "../../database/entities/CollectionEntityService.js";
import { Hypercert } from "../../../graphql/schemas/typeDefs/hypercertTypeDefs.js";

/**
 * GraphQL resolver for Collection operations.
 * Handles queries for collections and resolves related fields like hypercerts, admins, and blueprints.
 *
 * This resolver provides:
 * - Query for fetching collections with optional filtering
 * - Field resolution for hypercerts within a collection
 * - Field resolution for collection admins
 * - Field resolution for blueprints associated with a collection
 *
 * Error Handling:
 * If an operation fails, it will:
 * - Log the error internally for monitoring
 * - Return null/empty data to the client
 * - Include error information in the GraphQL response errors array
 *
 * @injectable Marks the class as injectable for dependency injection with tsyringe
 * @resolver Marks the class as a GraphQL resolver for the Collection type
 */
@injectable()
@Resolver(() => Collection)
class CollectionResolver {
  /**
   * Creates a new instance of CollectionResolver.
   *
   * @param collectionService - Service for handling collection operations
   */
  constructor(
    @inject(CollectionService)
    private collectionService: CollectionService,
  ) {}

  /**
   * Queries collections based on provided arguments.
   * Returns both the matching collections and a total count.
   *
   * @param args - Query arguments for filtering collections
   * @returns A promise that resolves to an object containing:
   *          - data: Array of collections matching the query
   *          - count: Total number of matching collections
   *
   * @example
   * ```graphql
   * query {
   *   collections(
   *     where: {
   *       name: { contains: "Research" }
   *     }
   *   ) {
   *     data {
   *       id
   *       name
   *       description
   *       hypercerts {
   *         id
   *         name
   *       }
   *     }
   *     count
   *   }
   * }
   * ```
   */
  @Query(() => GetCollectionsResponse)
  async collections(@Args() args: GetCollectionsArgs) {
    try {
      return await this.collectionService.getCollections(args);
    } catch (e) {
      console.error(
        `[CollectionResolver::collections] Error fetching collections: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the hypercerts field for a collection.
   * Returns all hypercerts that belong to the specified collection.
   *
   * @param collection - The collection for which to resolve hypercerts
   * @returns A promise resolving to:
   *          - Array of hypercerts if found
   *          - null if collection ID is undefined or an error occurs
   *
   * @example
   * ```graphql
   * query {
   *   collections {
   *     data {
   *       id
   *       name
   *       hypercerts {
   *         id
   *         name
   *         description
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver(() => [Hypercert])
  async hypercerts(@Root() collection: Collection) {
    if (!collection.id) {
      console.error(
        "[CollectionResolver::hypercerts] Collection ID is undefined",
      );
      return null;
    }

    try {
      return await this.collectionService.getCollectionHypercerts(
        collection.id,
      );
    } catch (e) {
      console.error(
        `[CollectionResolver::hypercerts] Error fetching hypercerts: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the admins field for a collection.
   * Returns all users who have admin privileges for the specified collection.
   *
   * @param collection - The collection for which to resolve admins
   * @returns A promise resolving to:
   *          - Array of users if found
   *          - null if collection ID is undefined or an error occurs
   *
   * @example
   * ```graphql
   * query {
   *   collections {
   *     data {
   *       id
   *       name
   *       admins {
   *         id
   *         address
   *         display_name
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver(() => [User])
  async admins(@Root() collection: Collection) {
    if (!collection.id) {
      console.error("[CollectionResolver::admins] Collection ID is undefined");
      return null;
    }

    try {
      return await this.collectionService.getCollectionAdmins(collection.id);
    } catch (e) {
      console.error(
        `[CollectionResolver::admins] Error fetching admins: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the blueprints field for a collection.
   * Returns all blueprints associated with the specified collection.
   *
   * @param collection - The collection for which to resolve blueprints
   * @returns A promise resolving to:
   *          - Array of blueprints if found
   *          - null if collection ID is undefined or an error occurs
   *
   * @example
   * ```graphql
   * query {
   *   collections {
   *     data {
   *       id
   *       name
   *       blueprints {
   *         id
   *         name
   *         description
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver(() => [Blueprint])
  async blueprints(@Root() collection: Collection) {
    if (!collection.id) {
      console.error(
        "[CollectionResolver::blueprints] Collection ID is undefined",
      );
      return null;
    }

    try {
      return await this.collectionService.getCollectionBlueprints(
        collection.id,
      );
    } catch (e) {
      console.error(
        `[CollectionResolver::blueprints] Error fetching blueprints: ${(e as Error).message}`,
      );
      return null;
    }
  }
}

export { CollectionResolver };
