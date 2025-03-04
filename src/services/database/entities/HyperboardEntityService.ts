import { Insertable, Selectable, Updateable } from "kysely";
import { inject, injectable } from "tsyringe";
import { DataKyselyService, kyselyData } from "../../../client/kysely.js";
import { GetHyperboardsArgs } from "../../../graphql/schemas/args/hyperboardArgs.js";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { CollectionService } from "./CollectionEntityService.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";
import { UserInsert, UsersService } from "./UsersEntityService.js";

export type HyperboardSelect = Selectable<DataDatabase["hyperboards"]>;
export type HyperboardInsert = Insertable<DataDatabase["hyperboards"]>;
export type HyperboardUpdate = Updateable<DataDatabase["hyperboards"]>;

export type HyperboardCollectionSelect = Selectable<
  DataDatabase["hyperboard_collections"]
>;
export type HyperboardAdminSelect = Selectable<
  DataDatabase["hyperboard_admins"]
>;
export type HyperboardAdminInsert = Insertable<
  DataDatabase["hyperboard_admins"]
>;
export type HyperboardHypercertMetadataSelect = Selectable<
  DataDatabase["hyperboard_hypercert_metadata"]
>;
export type HyperboardBlueprintMetadataSelect = Selectable<
  DataDatabase["hyperboard_blueprint_metadata"]
>;
export type HyperboardHypercertMetadataInsert = Insertable<
  DataDatabase["hyperboard_hypercert_metadata"]
>;
export type HyperboardBlueprintMetadataInsert = Insertable<
  DataDatabase["hyperboard_blueprint_metadata"]
>;

@injectable()
export class HyperboardService {
  private entityService: EntityService<
    DataDatabase["hyperboards"],
    GetHyperboardsArgs
  >;

  constructor(
    @inject(DataKyselyService) private dbService: DataKyselyService,
    @inject(CollectionService) private collectionService: CollectionService,
    @inject(UsersService) private usersService: UsersService,
  ) {
    this.entityService = createEntityService<
      DataDatabase,
      "hyperboards",
      GetHyperboardsArgs
    >("hyperboards", "HyperboardEntityService", kyselyData);
  }

  async getHyperboards(args: GetHyperboardsArgs) {
    return this.entityService.getMany(args);
  }

  async getHyperboard(args: GetHyperboardsArgs) {
    return this.entityService.getSingle(args);
  }

  // Relations
  async getHyperboardCollections(hyperboardId: string) {
    const hyperboardCollections = await this.dbService
      .getConnection()
      .selectFrom("hyperboard_collections")
      .where("hyperboard_id", "=", hyperboardId)
      .select("collection_id")
      .execute();

    const collectionIds = hyperboardCollections.map(
      (collection) => collection.collection_id,
    );
    return this.collectionService.getCollections({
      where: {
        id: {
          in: collectionIds,
        },
      },
    });
  }

  async getHyperboardAdmins(hyperboardId: string) {
    const hyperboardAdminIds = await this.dbService
      .getConnection()
      .selectFrom("hyperboard_admins")
      .where("hyperboard_id", "=", hyperboardId)
      .select("user_id")
      .execute();

    const userIds = hyperboardAdminIds.map((admin) => admin.user_id);
    return this.usersService.getUsers({
      where: {
        id: {
          in: userIds,
        },
      },
    });
  }

  // Metadata
  async getHyperboardHypercertMetadata(
    hyperboardId: string,
  ): Promise<HyperboardHypercertMetadataSelect[]> {
    return this.dbService
      .getConnection()
      .selectFrom("hyperboard_hypercert_metadata")
      .where("hyperboard_id", "=", hyperboardId as unknown as string)
      .selectAll()
      .execute();
  }

  async getHyperboardBlueprintMetadata(
    hyperboardId: string,
  ): Promise<HyperboardBlueprintMetadataSelect[]> {
    return this.dbService
      .getConnection()
      .selectFrom("hyperboard_blueprint_metadata")
      .where("hyperboard_id", "=", hyperboardId as unknown as string)
      .selectAll()
      .execute();
  }

  // Mutations
  async deleteHyperboard(hyperboardId: string) {
    return this.dbService
      .getConnection()
      .deleteFrom("hyperboards")
      .where("id", "=", hyperboardId)
      .executeTakeFirstOrThrow();
  }

  async upsertHyperboard(hyperboards: HyperboardInsert[]) {
    return this.dbService
      .getConnection()
      .insertInto("hyperboards")
      .values(hyperboards)
      .onConflict((oc) =>
        oc.column("id").doUpdateSet((eb) => ({
          id: eb.ref("excluded.id"),
          name: eb.ref("excluded.name"),
          chain_ids: eb.ref("excluded.chain_ids"),
          background_image: eb.ref("excluded.background_image"),
          grayscale_images: eb.ref("excluded.grayscale_images"),
          tile_border_color: eb.ref("excluded.tile_border_color"),
        })),
      )
      .returningAll()
      .execute();
  }

  async upsertHyperboardHypercertMetadata(
    metadata: HyperboardHypercertMetadataInsert[],
  ) {
    return this.dbService
      .getConnection()
      .insertInto("hyperboard_hypercert_metadata")
      .values(metadata)
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
      .returningAll()
      .execute();
  }

  async upsertHyperboardBlueprintMetadata(
    metadata: HyperboardBlueprintMetadataInsert[],
  ) {
    return this.dbService
      .getConnection()
      .insertInto("hyperboard_blueprint_metadata")
      .values(metadata)
      .onConflict((oc) =>
        oc
          .columns(["hyperboard_id", "blueprint_id", "collection_id"])
          .doUpdateSet((eb) => ({
            blueprint_id: eb.ref("excluded.blueprint_id"),
            collection_id: eb.ref("excluded.collection_id"),
            hyperboard_id: eb.ref("excluded.hyperboard_id"),
            display_size: eb.ref("excluded.display_size"),
          })),
      )
      .returningAll()
      .execute();
  }

  async addCollectionToHyperboard(hyperboardId: string, collectionId: string) {
    return this.dbService
      .getConnection()
      .insertInto("hyperboard_collections")
      .values([
        {
          hyperboard_id: hyperboardId,
          collection_id: collectionId,
        },
      ])
      .onConflict((oc) =>
        oc.columns(["hyperboard_id", "collection_id"]).doUpdateSet((eb) => ({
          hyperboard_id: eb.ref("excluded.hyperboard_id"),
          collection_id: eb.ref("excluded.collection_id"),
        })),
      )
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async addAdminToHyperboard(hyperboardId: string, user: UserInsert) {
    const { id: user_id } = await this.usersService.getOrCreateUser(user);
    return this.dbService
      .getConnection()
      .insertInto("hyperboard_admins")
      .values([
        {
          hyperboard_id: hyperboardId,
          user_id,
        },
      ])
      .onConflict((oc) =>
        oc.columns(["hyperboard_id", "user_id"]).doUpdateSet((eb) => ({
          hyperboard_id: eb.ref("excluded.hyperboard_id"),
          user_id: eb.ref("excluded.user_id"),
        })),
      )
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
