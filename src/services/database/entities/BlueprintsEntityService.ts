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

@singleton()
export class BlueprintsService {
  private entityService: EntityService<
    DataDatabase["blueprints"],
    GetBlueprintsArgs
  >;

  constructor(
    @inject(DataKyselyService) private dbService: DataKyselyService,
    @inject(UsersService) private usersService: UsersService,
  ) {
    this.entityService = createEntityService<
      DataDatabase,
      "blueprints",
      GetBlueprintsArgs
    >("blueprints", "BlueprintsEntityService", kyselyData);
  }

  async getBlueprints(args: GetBlueprintsArgs) {
    return this.entityService.getMany(args);
  }

  async getBlueprint(args: GetBlueprintsArgs) {
    return this.entityService.getSingle(args);
  }

  async getBlueprintAdmins(blueprintId: number) {
    return await this.dbService
      .getConnection()
      .selectFrom("blueprint_admins")
      .where("blueprint_id", "=", blueprintId)
      .innerJoin("users", "blueprint_admins.user_id", "users.id")
      .selectAll("users")
      .execute();
  }

  // Mutations
  async deleteBlueprint(blueprintId: number) {
    return this.dbService
      .getConnection()
      .deleteFrom("blueprints")
      .where("id", "=", blueprintId)
      .execute();
  }

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
