import { Insertable, Selectable, sql, Updateable } from "kysely";
import { inject, singleton } from "tsyringe";
import { DataKyselyService, kyselyData } from "../../../client/kysely.js";
import type { GetBlueprintsArgs } from "../../../graphql/schemas/args/blueprintArgs.js";
import type { DataDatabase } from "../../../types/kyselySupabaseData.js";
import type { EntityService } from "./EntityServiceFactory.js";
import { createEntityService } from "./EntityServiceFactory.js";
import { UsersService } from "./UsersEntityService.js";

export type BlueprintSelect = Selectable<DataDatabase["blueprints"]>;
export type BlueprintInsert = Insertable<DataDatabase["blueprints"]>;
export type BlueprintUpdate = Updateable<DataDatabase["blueprints"]>;

export type BlueprintAdminSelect = Selectable<DataDatabase["users"]>;

/**
 * Service for handling blueprint-related database operations.
 * Provides methods for CRUD operations on blueprints and managing blueprint admins.
 *
 * Features:
 * - Fetch blueprints with filtering and pagination
 * - Manage blueprint administrators
 * - Handle blueprint minting and collection updates
 * - Transaction support for complex operations
 *
 * @singleton Marks the class as a singleton for dependency injection
 */
@singleton()
export class BlueprintsService {
  private entityService: EntityService<
    DataDatabase["blueprints_with_admins"],
    GetBlueprintsArgs
  >;

  /**
   * Creates a new instance of BlueprintsService.
   *
   * @param dbService - Service for database operations
   * @param usersService - Service for user-related operations
   */
  constructor(
    @inject(DataKyselyService) private dbService: DataKyselyService,
    @inject(UsersService) private usersService: UsersService,
  ) {
    this.entityService = createEntityService<
      DataDatabase,
      "blueprints_with_admins",
      GetBlueprintsArgs
    >("blueprints_with_admins", "BlueprintsEntityService", kyselyData);
  }

  /**
   * Retrieves blueprints based on provided arguments.
   *
   * @param args - Query arguments for filtering and pagination
   * @returns Promise resolving to an object containing:
   *          - data: Array of matching blueprints
   *          - count: Total number of matching blueprints
   * @throws Error if database operation fails
   */
  async getBlueprints(args: GetBlueprintsArgs) {
    return this.entityService.getMany(args);
  }

  /**
   * Retrieves a single blueprint based on provided arguments.
   *
   * @param args - Query arguments for filtering
   * @returns Promise resolving to a single blueprint or undefined if not found
   * @throws Error if database operation fails
   */
  async getBlueprint(args: GetBlueprintsArgs) {
    return this.entityService.getSingle(args);
  }

  /**
   * Retrieves administrators for a specific blueprint.
   *
   * @param blueprintId - ID of the blueprint
   * @returns Promise resolving to an array of admin users
   * @throws Error if database operation fails
   */
  async getBlueprintAdmins(blueprintId: number) {
    return await this.dbService
      .getConnection()
      .selectFrom("blueprint_admins")
      .where("blueprint_id", "=", blueprintId)
      .innerJoin("users", "blueprint_admins.user_id", "users.id")
      .selectAll("users")
      .execute();
  }

  /**
   * Deletes a blueprint by ID.
   *
   * @param blueprintId - ID of the blueprint to delete
   * @returns Promise resolving when deletion is complete
   * @throws Error if database operation fails
   */
  async deleteBlueprint(blueprintId: number) {
    return this.dbService
      .getConnection()
      .deleteFrom("blueprints")
      .where("id", "=", blueprintId)
      .execute();
  }

  /**
   * Creates or updates multiple blueprints.
   *
   * @param blueprints - Array of blueprints to create or update
   * @returns Promise resolving to an array of created/updated blueprint IDs
   * @throws Error if database operation fails
   */
  async upsertBlueprints(blueprints: BlueprintInsert[]) {
    return this.dbService
      .getConnection()
      .insertInto("blueprints")
      .values(blueprints)
      .onConflict((oc) =>
        oc.columns(["id"]).doUpdateSet((eb) => ({
          id: eb.ref("excluded.id"),
          form_values: eb.ref("excluded.form_values"),
          minter_address: eb.ref("excluded.minter_address"),
          minted: eb.ref("excluded.minted"),
        })),
      )
      .returning(["id"])
      .execute();
  }

  /**
   * Adds an administrator to a blueprint.
   * Creates the user if they don't exist.
   *
   * @param blueprintId - ID of the blueprint
   * @param adminAddress - Ethereum address of the admin
   * @param chainId - Chain ID where the admin address is valid
   * @returns Promise resolving to the created/updated admin record
   * @throws Error if database operation fails
   */
  async addAdminToBlueprint(
    blueprintId: number,
    adminAddress: string,
    chainId: number,
  ) {
    const user = await this.usersService.getOrCreateUser({
      address: adminAddress,
      chain_id: chainId,
    });

    return this.dbService
      .getConnection()
      .insertInto("blueprint_admins")
      .values([
        {
          blueprint_id: blueprintId,
          user_id: user.id,
        },
      ])
      .onConflict((oc) =>
        oc.columns(["blueprint_id", "user_id"]).doUpdateSet((eb) => ({
          blueprint_id: eb.ref("excluded.blueprint_id"),
          user_id: eb.ref("excluded.user_id"),
        })),
      )
      .returning(["blueprint_id", "user_id"])
      .executeTakeFirst();
  }

  /**
   * Mints a blueprint and updates related collections.
   * This operation:
   * 1. Gets all blueprint hyperboard metadata
   * 2. Inserts the new hypercert into collections
   * 3. Updates hyperboard metadata
   * 4. Marks the blueprint as minted
   * 5. Removes the blueprint from collections
   *
   * All operations are wrapped in a transaction for atomicity.
   *
   * @param blueprintId - ID of the blueprint to mint
   * @param hypercertId - ID of the newly created hypercert
   * @returns Promise resolving when all operations are complete
   * @throws Error if any database operation fails (triggers rollback)
   */
  async mintBlueprintAndSwapInCollections(
    blueprintId: number,
    hypercertId: string,
  ) {
    await this.dbService
      .getConnection()
      .transaction()
      .execute(async (trx) => {
        // Get all blueprint hyperboard metadata for this blueprint
        const oldBlueprintMetadata = await trx
          .deleteFrom("hyperboard_blueprint_metadata")
          .where("blueprint_id", "=", blueprintId)
          .returning(["hyperboard_id", "collection_id", "display_size"])
          .execute();

        if (oldBlueprintMetadata.length) {
          // Insert the new hypercert for each collection
          await trx
            .insertInto("hypercerts")
            .values(
              oldBlueprintMetadata.map((oldBlueprintMetadata) => ({
                hypercert_id: hypercertId,
                collection_id: oldBlueprintMetadata.collection_id,
              })),
            )
            .onConflict((oc) =>
              oc
                .columns(["hypercert_id", "collection_id"])
                .doUpdateSet((eb) => ({
                  hypercert_id: eb.ref("excluded.hypercert_id"),
                  collection_id: eb.ref("excluded.collection_id"),
                })),
            )
            .returning(["hypercert_id", "collection_id"])
            .execute();

          // Insert the new hypercert metadata for each collection
          await trx
            .insertInto("hyperboard_hypercert_metadata")
            .values(
              oldBlueprintMetadata.map((oldBlueprintMetadata) => ({
                hyperboard_id: oldBlueprintMetadata.hyperboard_id,
                hypercert_id: hypercertId,
                collection_id: oldBlueprintMetadata.collection_id,
                display_size: oldBlueprintMetadata.display_size,
              })),
            )
            .onConflict((oc) =>
              oc
                .columns(["hyperboard_id", "hypercert_id", "collection_id"])
                .doUpdateSet((eb) => ({
                  hypercert_id: eb.ref("excluded.hypercert_id"),
                  collection_id: eb.ref("excluded.collection_id"),
                  hyperboard_id: eb.ref("excluded.hyperboard_id"),
                  display_size: eb.ref("excluded.display_size"),
                })),
            )
            .returning(["hyperboard_id", "hypercert_id", "collection_id"])
            .execute();
        }

        // Set blueprint to minted
        await trx
          .updateTable("blueprints")
          .set((eb) => ({
            minted: true,
            hypercert_ids: sql`array_append(${eb.ref("hypercert_ids")}, ${hypercertId})`,
          }))
          .where("id", "=", blueprintId)
          .execute();

        // Delete blueprint from collections, because it has been replaced by a hypercert
        await trx
          .deleteFrom("collection_blueprints")
          .where("blueprint_id", "=", blueprintId)
          .execute();
      });
  }
}
