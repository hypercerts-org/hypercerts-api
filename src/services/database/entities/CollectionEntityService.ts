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

@injectable()
export class CollectionService {
  private entityService: EntityService<
    DataDatabase["collections"],
    GetCollectionsArgs
  >;

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

  //TODO can we programatically generate these?
  async getCollections(args: GetCollectionsArgs) {
    return this.entityService.getMany(args);
  }

  async getCollection(args: GetCollectionsArgs) {
    return this.entityService.getSingle(args);
  }

  async getCollectionBlueprintIds(collectionId: string) {
    return await this.dbService
      .getConnection()
      .selectFrom("collection_blueprints")
      .select("blueprint_id")
      .where("collection_id", "=", collectionId)
      .execute();
  }

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

  async getCollectionHypercertIds(collectionId: string) {
    return await this.dbService
      .getConnection()
      .selectFrom("hypercerts")
      .select("hypercert_id")
      .where("collection_id", "=", collectionId)
      .execute();
  }

  async getCollectionHypercerts(collectionId: string) {
    const hypercerts = await this.getCollectionHypercertIds(collectionId);

    const hypercertIds = hypercerts.map((hypercert) => hypercert.hypercert_id);

    return this.hypercertsService.getHypercerts({
      where: { hypercert_id: { in: hypercertIds } },
    });
  }

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

  // Mutations
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

  async deleteAllHypercertsFromCollection(collectionId: string) {
    return this.dbService
      .getConnection()
      .deleteFrom("hypercerts")
      .where("collection_id", "=", collectionId)
      .execute();
  }

  async deleteAllBlueprintsFromCollection(collectionId: string) {
    return this.dbService
      .getConnection()
      .deleteFrom("collection_blueprints")
      .where("collection_id", "=", collectionId)
      .execute();
  }

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
