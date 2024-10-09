import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database as DataDatabase } from "../types/supabaseData.js";
import { supabaseData } from "../client/supabase.js";
import { GetHyperboardsArgs } from "../graphql/schemas/args/hyperboardArgs.js";
import { applyFilters } from "../graphql/schemas/utils/filters.js";
import { applySorting } from "../graphql/schemas/utils/sorting.js";
import { applyPagination } from "../graphql/schemas/utils/pagination.js";
import { GetOrdersArgs } from "../graphql/schemas/args/orderArgs.js";
import {
  HypercertExchangeClient,
  OrderValidatorCode,
} from "@hypercerts-org/marketplace-sdk";
import { ethers } from "ethers";
import { getRpcUrl } from "../utils/getRpcUrl.js";
import { singleton } from "tsyringe";
import { GetUserArgs } from "../graphql/schemas/args/userArgs.js";
import type { DataDatabase as KyselyDataDatabase } from "../types/kyselySupabaseData.js";
import { BaseArgs } from "../graphql/schemas/args/baseArgs.js";
import { kyselyData } from "../client/kysely.js";
import { BaseSupabaseService } from "./BaseSupabaseService.js";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { GetBlueprintArgs } from "../graphql/schemas/args/blueprintArgs.js";

@singleton()
export class SupabaseDataService extends BaseSupabaseService<KyselyDataDatabase> {
  private supabaseData: SupabaseClient<DataDatabase>;

  constructor() {
    super(kyselyData);
    this.supabaseData = supabaseData;
  }

  storeOrder(
    order: DataDatabase["public"]["Tables"]["marketplace_orders"]["Insert"],
  ) {
    return this.supabaseData
      .from("marketplace_orders")
      .insert([order])
      .select("*")
      .single()
      .throwOnError();
  }

  getNonce(address: string, chainId: number) {
    return this.supabaseData
      .from("marketplace_order_nonces")
      .select("*")
      .eq("address", address)
      .eq("chain_id", chainId)
      .maybeSingle();
  }

  createNonce(address: string, chainId: number) {
    return this.supabaseData
      .from("marketplace_order_nonces")
      .insert({
        address,
        chain_id: chainId,
        nonce_counter: 0,
      })
      .select("*")
      .single();
  }

  updateNonce(address: string, chainId: number, nonce: number) {
    return this.supabaseData
      .from("marketplace_order_nonces")
      .update({
        nonce_counter: nonce,
      })
      .eq("address", address)
      .eq("chain_id", chainId)
      .select("*")
      .single();
  }

  getOrders(args: GetOrdersArgs) {
    let query = this.supabaseData.from("marketplace_orders").select("*");

    const { where, sort, offset, first } = args;

    query = applyFilters({ query, where });
    query = applySorting({ query, sort });
    query = applyPagination({ query, pagination: { first, offset } });

    return query;
  }

  getOrdersByTokenId({
    tokenId,
    chainId,
  }: {
    tokenId: string;
    chainId: number;
  }) {
    return this.supabaseData
      .from("marketplace_orders")
      .select("*")
      .contains("itemIds", [tokenId])
      .eq("chainId", chainId)
      .order("createdAt", { ascending: false })
      .throwOnError();
  }

  updateOrders(
    orders: DataDatabase["public"]["Tables"]["marketplace_orders"]["Update"][],
  ) {
    return Promise.all(
      orders.map((order) => {
        if (!order?.id) {
          throw new Error("Order must have an id to update.");
        }
        return this.supabaseData
          .from("marketplace_orders")
          .update(order)
          .eq("id", order.id)
          .throwOnError();
      }),
    );
  }

  getOrdersForFraction(fractionIds: string | string[]) {
    const ids = Array.isArray(fractionIds) ? fractionIds : [fractionIds];
    return this.supabaseData
      .from("marketplace_orders")
      .select("*", { count: "exact" })
      .overlaps("itemIds", ids)
      .order("createdAt", { ascending: false })
      .throwOnError();
  }

  getHyperboards(args: GetHyperboardsArgs) {
    let query = this.supabaseData.from("hyperboards").select(
      `*,
          collections!hyperboard_collections(
            *,
            hypercerts!claims_registry_id_fkey(*),
            blueprints(*),
            blueprint_metadata:hyperboard_blueprint_metadata(*),
            admins:users!collection_admins(*)
          ),
          admins:users!inner(*),
          users!inner(address),
          hypercert_metadata:hyperboard_hypercert_metadata!hyperboard_hypercert_metadata_hyperboard_id_fkey(*)
      `,
      {
        count: "exact",
      },
    );
    const { where, sort, offset, first } = args;

    if (where?.id?.eq) {
      query = query.eq(
        "collections.blueprint_metadata.hyperboard_id",
        where.id.eq,
      );
    }

    // Filter by admin according to https://github.com/orgs/supabase/discussions/16234#discussioncomment-6642525
    if (where?.admin_id?.eq) {
      query = query.eq("users.address", where?.admin_id?.eq);
      delete where.admin_id;
    }

    query = applyFilters({ query, where });
    query = applySorting({ query, sort });
    query = applyPagination({ query, pagination: { first, offset } });

    return query;
  }

  async validateOrdersByTokenIds({
    tokenIds,
    chainId,
  }: {
    tokenIds: string[];
    chainId: number;
  }) {
    console.log("[marketplace-api] Validating orders by token IDs", tokenIds);
    const ordersToUpdate: {
      id: string;
      invalidated: boolean;
      validator_codes: OrderValidatorCode[];
    }[] = [];
    for (const tokenId of tokenIds) {
      // Fetch all orders for token ID from database
      const { data: matchingOrders, error } = await this.getOrdersByTokenId({
        tokenId,
        chainId,
      });

      if (error) {
        throw new Error(
          `[SupabaseDataService::validateOrderByTokenId] Error fetching orders: ${error.message}`,
        );
      }

      if (!matchingOrders) {
        console.warn(
          `[SupabaseDataService::validateOrderByTokenId] No orders found for tokenId: ${tokenId}`,
        );
        continue;
      }

      // Validate orders using logic in the SDK
      const hec = new HypercertExchangeClient(
        chainId,
        // @ts-expect-error Typing issue with provider
        new ethers.JsonRpcProvider(getRpcUrl(chainId)),
      );
      const validationResults = await hec.checkOrdersValidity(matchingOrders);

      // Determine which orders to update in DB, and update them
      ordersToUpdate.push(
        ...validationResults
          .filter((x) => !x.valid)
          .map(({ validatorCodes, id }) => ({
            id,
            invalidated: true,
            validator_codes: validatorCodes,
          })),
      );
    }
    console.log("[marketplace-api] Invalidating orders", ordersToUpdate);
    await this.updateOrders(ordersToUpdate);
    return ordersToUpdate;
  }

  async deleteOrder(orderId: string) {
    return this.supabaseData
      .from("marketplace_orders")
      .delete()
      .eq("id", orderId)
      .single();
  }

  async upsertUsers(
    users: DataDatabase["public"]["Tables"]["users"]["Insert"][],
  ) {
    return this.db
      .insertInto("users")
      .values(users)
      .onConflict((oc) =>
        oc.constraint("users_address_chain_id").doUpdateSet((eb) => ({
          avatar: eb.ref("excluded.avatar"),
          display_name: eb.ref("excluded.display_name"),
        })),
      )
      .returning(["address"])
      .execute();
  }

  getUsers(args: GetUserArgs) {
    return {
      data: this.handleGetData("users", args),
      count: this.handleGetCount("users", args),
    };
  }

  getBlueprints(args: GetBlueprintArgs) {
    return {
      data: this.handleGetData("blueprints", args),
      count: this.handleGetCount("blueprints", args),
    };
  }

  async upsertHypercerts(
    hypercerts: DataDatabase["public"]["Tables"]["hypercerts"]["Insert"][],
  ) {
    return this.db
      .insertInto("hypercerts")
      .values(hypercerts)
      .onConflict((oc) =>
        oc.columns(["hypercert_id", "collection_id"]).doUpdateSet((eb) => ({
          hypercert_id: eb.ref("excluded.hypercert_id"),
          collection_id: eb.ref("excluded.collection_id"),
        })),
      )
      .returning(["hypercert_id", "collection_id"])
      .execute();
  }

  async upsertCollections(
    collections: DataDatabase["public"]["Tables"]["collections"]["Insert"][],
  ) {
    return this.db
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
      .returning(["id"])
      .execute();
  }

  async upsertHyperboardHypercertMetadata(
    metadata: DataDatabase["public"]["Tables"]["hyperboard_hypercert_metadata"]["Insert"][],
  ) {
    return this.db
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
      .returning(["hyperboard_id", "hypercert_id", "collection_id"])
      .execute();
  }

  async upsertHyperboards(
    hyperboards: DataDatabase["public"]["Tables"]["hyperboards"]["Insert"][],
  ) {
    return this.db
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
      .returning(["id"])
      .execute();
  }

  async getHyperboardById(hyperboardId: string) {
    const res = await this.getHyperboards({
      where: { id: { eq: hyperboardId } },
    });
    return res.data?.[0];
  }

  async deleteHyperboard(hyperboardId: string) {
    return this.db
      .deleteFrom("hyperboards")
      .where("id", "=", hyperboardId)
      .execute();
  }

  async getCollectionById(collectionId: string) {
    return this.db
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

  async addCollectionToHyperboard(hyperboardId: string, collectionId: string) {
    return this.db
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
      .returning(["hyperboard_id", "collection_id"])
      .execute();
  }

  async getOrCreateUser(address: string, chainId: number) {
    const user = await this.db
      .selectFrom("users")
      .select(["id"])
      .where("address", "=", address)
      .where("chain_id", "=", chainId)
      .execute();

    if (user.length === 0) {
      return this.db
        .insertInto("users")
        .values([
          {
            address,
            chain_id: chainId,
          },
        ])
        .returning(["id"])
        .execute()
        .then((res) => res[0]);
    }

    return user[0];
  }

  async addAdminToHyperboard(
    hyperboardId: string,
    adminAddress: string,
    chainId: number,
  ) {
    const user = await this.getOrCreateUser(adminAddress, chainId);
    return this.db
      .insertInto("hyperboard_admins")
      .values([
        {
          hyperboard_id: hyperboardId,
          user_id: user.id,
        },
      ])
      .onConflict((oc) =>
        oc.columns(["hyperboard_id", "user_id"]).doUpdateSet((eb) => ({
          hyperboard_id: eb.ref("excluded.hyperboard_id"),
          user_id: eb.ref("excluded.user_id"),
        })),
      )
      .returning(["hyperboard_id", "user_id"])
      .executeTakeFirst();
  }

  async addAdminToCollection(
    collectionId: string,
    adminAddress: string,
    chainId: number,
  ) {
    const user = await this.getOrCreateUser(adminAddress, chainId);
    return this.db
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
      .returning(["collection_id", "user_id"])
      .executeTakeFirst();
  }

  async upsertBlueprints(
    blueprints: DataDatabase["public"]["Tables"]["blueprints"]["Insert"][],
  ) {
    return this.db
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
    const user = await this.getOrCreateUser(adminAddress, chainId);
    return this.db
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

  async getBlueprintById(blueprintId: number) {
    return this.db
      .selectFrom("blueprints")
      .where("id", "=", blueprintId)
      .select((eb) => [
        "id",
        "created_at",
        "form_values",
        "minter_address",
        "minted",
        jsonArrayFrom(
          eb
            .selectFrom("users")
            .innerJoin(
              "blueprint_admins",
              "blueprint_admins.user_id",
              "users.id",
            )
            .select(["id", "address", "chain_id", "display_name", "avatar"])
            .whereRef("blueprint_admins.blueprint_id", "=", "blueprints.id"),
        ).as("admins"),
      ])
      .executeTakeFirst();
  }

  async deleteBlueprint(blueprintId: number) {
    return this.db
      .deleteFrom("blueprints")
      .where("id", "=", blueprintId)
      .execute();
  }

  getDataQuery<
    DB extends KyselyDataDatabase,
    T extends keyof DB & string,
    A extends object,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  >(tableName: T, args: BaseArgs<A>) {
    switch (tableName) {
      case "users":
        return this.db.selectFrom("users").selectAll();
      case "blueprints":
        return this.db
          .selectFrom("blueprints")
          .select((eb) => [
            "id",
            "created_at",
            "form_values",
            "minter_address",
            "minted",
            jsonArrayFrom(
              eb
                .selectFrom("users")
                .innerJoin(
                  "blueprint_admins",
                  "blueprint_admins.user_id",
                  "users.id",
                )
                .select(["id", "address", "chain_id", "display_name", "avatar"])
                .whereRef(
                  "blueprint_admins.blueprint_id",
                  "=",
                  "blueprints.id",
                ),
            ).as("admins"),
          ]);
      default:
        throw new Error(`Table ${tableName.toString()} not found`);
    }
  }

  getCountQuery<
    DB extends KyselyDataDatabase,
    T extends keyof DB & string,
    A extends object,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  >(tableName: T, args: BaseArgs<A>) {
    switch (tableName) {
      case "users":
        return this.db.selectFrom("users").select((expressionBuilder) => {
          return expressionBuilder.fn.countAll().as("count");
        });
      case "hyperboards":
        return this.db.selectFrom("hyperboards").select((expressionBuilder) => {
          return expressionBuilder.fn.countAll().as("count");
        });
      case "blueprints":
        return this.db.selectFrom("blueprints").select((expressionBuilder) => {
          return expressionBuilder.fn.countAll().as("count");
        });
      default:
        throw new Error(`Table ${tableName.toString()} not found`);
    }
  }
}
