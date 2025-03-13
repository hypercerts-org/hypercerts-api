import { Insertable, Selectable } from "kysely";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { inject, injectable } from "tsyringe";
import { DataKyselyService, kyselyData } from "../../../client/kysely.js";
import { GetCollectionsArgs } from "../../../graphql/schemas/args/collectionArgs.js";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { BlueprintsService } from "./BlueprintsEntityService.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";
import { HypercertsService } from "./HypercertsEntityService.js";
import { UserInsert, UsersService } from "./UsersEntityService.js";

export type CollectionSelect = Selectable<DataDatabase["collections"]>;
export type CollectionInsert = Insertable<DataDatabase["collections"]>;

/**
 * Service for managing collection entities in the database.
 * Handles CRUD operations and relationships for collections, including hypercerts, blueprints, and admins.
 *
 * Features:
 * - Fetch collections with filtering and pagination
 * - Manage collection contents (hypercerts and blueprints)
 * - Handle collection administrators
 * - Support for complex queries with JSON aggregation
 * - Transaction support for data integrity
 *
 * @injectable Marks the class as injectable for dependency injection with tsyringe
 */
@injectable()
export class CollectionService {
  private entityService: EntityService<
    DataDatabase["collections"],
    GetCollectionsArgs
  >;

  /**
   * Creates a new instance of CollectionService.
   *
   * @param hypercertsService - Service for hypercert-related operations
   * @param dbService - Service for database operations
   * @param blueprintsService - Service for blueprint-related operations
   * @param usersService - Service for user-related operations
   */
  constructor(
    @inject(HypercertsService)
    private hypercertsService: HypercertsService,
    @inject(DataKyselyService)
    private dbService: DataKyselyService,
    @inject(BlueprintsService)
    private blueprintsService: BlueprintsService,
    @inject(UsersService)
    private usersService: UsersService,
  ) {
    this.entityService = createEntityService<
      DataDatabase,
      "collections",
      GetCollectionsArgs
    >("collections", "CollectionEntityService", kyselyData);
  }

  /**
   * Retrieves multiple collections based on provided arguments.
   *
   * @param args - Query arguments for filtering and pagination
   * @returns A promise resolving to an object containing:
   *          - data: Array of collections matching the query
   *          - count: Total number of matching collections
   * @throws {Error} If the database query fails
   */
  async getCollections(args: GetCollectionsArgs) {
    return this.entityService.getMany(args);
  }

  /**
   * Retrieves a single collection based on provided arguments.
   *
   * @param args - Query arguments for filtering
   * @returns A promise resolving to a single collection or undefined if not found
   * @throws {Error} If the database query fails
   */
  async getCollection(args: GetCollectionsArgs) {
    return this.entityService.getSingle(args);
  }

  /**
   * Retrieves blueprint IDs associated with a collection.
   *
   * @param collectionId - ID of the collection
   * @returns Promise resolving to an array of blueprint IDs
   * @throws {Error} If the database query fails
   */
  async getCollectionBlueprintIds(collectionId: string) {
    return await this.dbService
      .getConnection()
      .selectFrom("collection_blueprints")
      .select("blueprint_id")
      .where("collection_id", "=", collectionId)
      .execute();
  }

  /**
   * Retrieves all blueprints associated with a collection.
   *
   * @param collectionId - ID of the collection
   * @returns Promise resolving to an array of blueprints
   * @throws {Error} If the database query fails
   */
  async getCollectionBlueprints(collectionId: string) {
    const collectionBlueprintIds =
      await this.getCollectionBlueprintIds(collectionId);
    const blueprintIds = collectionBlueprintIds.map(
      (blueprint) => blueprint.blueprint_id,
    );

    return this.blueprintsService.getBlueprints({
      where: { id: { in: blueprintIds } },
    });
  }

  /**
   * Retrieves hypercert IDs associated with a collection.
   *
   * @param collectionId - ID of the collection
   * @returns Promise resolving to an array of hypercert IDs
   * @throws {Error} If the database query fails
   */
  async getCollectionHypercertIds(collectionId: string) {
    return await this.dbService
      .getConnection()
      .selectFrom("hypercerts")
      .select("hypercert_id")
      .where("collection_id", "=", collectionId)
      .execute();
  }

  /**
   * Retrieves all hypercerts associated with a collection.
   *
   * @param collectionId - ID of the collection
   * @returns Promise resolving to an array of hypercerts
   * @throws {Error} If the database query fails
   */
  async getCollectionHypercerts(collectionId: string) {
    const hypercerts = await this.getCollectionHypercertIds(collectionId);
    const hypercertIds = hypercerts.map((hypercert) => hypercert.hypercert_id);

    return this.hypercertsService.getHypercerts({
      where: { hypercert_id: { in: hypercertIds } },
    });
  }

  /**
   * Retrieves all administrators of a collection.
   *
   * @param collectionId - ID of the collection
   * @returns Promise resolving to an array of users who are admins
   * @throws {Error} If the database query fails
   */
  async getCollectionAdmins(collectionId: string) {
    return await this.dbService
      .getConnection()
      .selectFrom("users")
      .innerJoin("collection_admins", "collection_admins.user_id", "users.id")
      .select([
        "users.address",
        "users.chain_id",
        "users.display_name",
        "users.avatar",
      ])
      .where("collection_admins.collection_id", "=", collectionId)
      .execute();
  }

  /**
   * Retrieves detailed collection information including admins.
   * Uses JSON aggregation for efficient data retrieval.
   *
   * @param collectionId - ID of the collection
   * @returns Promise resolving to the collection with admin details
   * @throws {Error} If the database query fails
   */
  // TODO this type and query can be cleaner. Do we need a view?
  async getCollectionById(collectionId: string) {
    return await this.dbService
      .getConnection()
      .selectFrom("collections")
      .select((eb) => [
        "id",
        "chain_ids",
        jsonArrayFrom(
          eb
            .selectFrom("collection_admins")
            .select((eb) => [
              jsonArrayFrom(
                eb
                  .selectFrom("users")
                  .select(["address", "chain_id", "user_id"])
                  .whereRef("user_id", "=", "user_id"),
              ).as("admins"),
            ])
            .whereRef("collection_id", "=", "collections.id"),
        ).as("collection_admins"),
      ])
      .where("id", "=", collectionId)
      .executeTakeFirst();
  }

  /**
   * Creates or updates multiple collections.
   *
   * @param collections - Array of collection data to upsert
   * @returns Promise resolving to the result of the upsert operation
   * @throws {Error} If the database operation fails
   */
  async upsertCollections(collections: CollectionInsert[]) {
    return this.dbService
      .getConnection()
      .insertInto("collections")
      .values(collections)
      .onConflict((oc) =>
        oc.column("id").doUpdateSet((eb) => ({
          id: eb.ref("excluded.id"),
          name: eb.ref("excluded.name"),
          description: eb.ref("excluded.description"),
          chain_ids: eb.ref("excluded.chain_ids"),
          hidden: eb.ref("excluded.hidden"),
        })),
      )
      .execute();
  }

  /**
   * Removes all hypercerts from a collection.
   *
   * @param collectionId - ID of the collection
   * @returns Promise resolving to the result of the delete operation
   * @throws {Error} If the database operation fails
   */
  async deleteAllHypercertsFromCollection(collectionId: string) {
    return this.dbService
      .getConnection()
      .deleteFrom("hypercerts")
      .where("collection_id", "=", collectionId)
      .execute();
  }

  /**
   * Removes all blueprints from a collection.
   *
   * @param collectionId - ID of the collection
   * @returns Promise resolving to the result of the delete operation
   * @throws {Error} If the database operation fails
   */
  async deleteAllBlueprintsFromCollection(collectionId: string) {
    return this.dbService
      .getConnection()
      .deleteFrom("collection_blueprints")
      .where("collection_id", "=", collectionId)
      .execute();
  }

  /**
   * Associates hypercerts with collections.
   *
   * @param hypercerts - Array of hypercert-collection associations to create or update
   * @returns Promise resolving to the result of the upsert operation
   * @throws {Error} If the database operation fails
   */
  async upsertHypercertCollections(
    hypercerts: Insertable<DataDatabase["hypercerts"]>[],
  ) {
    return this.dbService
      .getConnection()
      .insertInto("hypercerts")
      .values(hypercerts)
      .onConflict((oc) =>
        oc.columns(["hypercert_id", "collection_id"]).doUpdateSet((eb) => ({
          hypercert_id: eb.ref("excluded.hypercert_id"),
          collection_id: eb.ref("excluded.collection_id"),
        })),
      )
      .execute();
  }

  /**
   * Adds an administrator to a collection.
   *
   * @param collectionId - ID of the collection
   * @param admin - User data for the new admin
   * @returns Promise resolving to the result of the operation
   * @throws {Error} If the database operation fails
   */
  async addAdminToCollection(collectionId: string, admin: UserInsert) {
    const user = await this.usersService.getOrCreateUser(admin);
    return this.dbService
      .getConnection()
      .insertInto("collection_admins")
      .values([
        {
          collection_id: collectionId,
          user_id: user.id,
        },
      ])
      .onConflict((oc) =>
        oc.columns(["collection_id", "user_id"]).doUpdateSet((eb) => ({
          collection_id: eb.ref("excluded.collection_id"),
          user_id: eb.ref("excluded.user_id"),
        })),
      )
      .executeTakeFirst();
  }

  /**
   * Associates blueprints with a collection.
   *
   * @param values - Array of blueprint-collection associations to create
   * @returns Promise resolving to the result of the insert operation
   * @throws {Error} If the database operation fails
   */
  async addBlueprintsToCollection(
    values: Insertable<DataDatabase["collection_blueprints"]>[],
  ) {
    return this.dbService
      .getConnection()
      .insertInto("collection_blueprints")
      .values(values)
      .onConflict((oc) =>
        oc.columns(["blueprint_id", "collection_id"]).doNothing(),
      )
      .execute();
  }
}
