import {
  HypercertExchangeClient,
  OrderValidatorCode,
} from "@hypercerts-org/marketplace-sdk";
import type { SupabaseClient } from "@supabase/supabase-js";
import { sql } from "kysely";
import { jsonArrayFrom } from "kysely/helpers/postgres";
import { singleton } from "tsyringe";
import { kyselyData } from "../client/kysely.js";
import { supabaseData } from "../client/supabase.js";
import { BaseArgs } from "../graphql/schemas/args/baseArgs.js";
import { GetBlueprintArgs } from "../graphql/schemas/args/blueprintArgs.js";
import { GetHyperboardsArgs } from "../graphql/schemas/args/hyperboardArgs.js";
import { GetOrdersArgs } from "../graphql/schemas/args/orderArgs.js";
import { GetSignatureRequestArgs } from "../graphql/schemas/args/signatureRequestArgs.js";
import { GetCollectionsArgs } from "../graphql/schemas/args/collectionArgs.js";
import { GetUserArgs } from "../graphql/schemas/args/userArgs.js";
import { applyFilters } from "../graphql/schemas/utils/filters.js";
import { applyPagination } from "../graphql/schemas/utils/pagination.js";
import { applySorting } from "../graphql/schemas/utils/sorting.js";
import type { DataDatabase as KyselyDataDatabase } from "../types/kyselySupabaseData.js";
import type { Database as DataDatabase } from "../types/supabaseData.js";
import { BaseSupabaseService } from "./BaseSupabaseService.js";
import { EvmClientFactory } from "../client/evmClient.js";
import _ from "lodash";

@singleton()
export class SupabaseDataService extends BaseSupabaseService<KyselyDataDatabase> {
  private supabaseData: SupabaseClient<DataDatabase>;

  constructor() {
    super(kyselyData);
    this.supabaseData = supabaseData;
  }

  async mintBlueprintAndSwapInCollections(
    blueprintId: number,
    hypercertId: string,
  ) {
    await this.db.transaction().execute(async (trx) => {
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
            oc.columns(["hypercert_id", "collection_id"]).doUpdateSet((eb) => ({
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
    return {
      data: this.handleGetData("marketplace_orders", args),
      count: this.handleGetCount("marketplace_orders", args),
    };
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
    const ordersToUpdate: {
      id: string;
      invalidated: boolean;
      validator_codes: OrderValidatorCode[];
    }[] = [];
    const getOrdersResults = await Promise.all(
      tokenIds.map(async (tokenId) =>
        this.getOrdersByTokenId({
          tokenId,
          chainId,
        }),
      ),
    );

    if (getOrdersResults.some((res) => res.error)) {
      throw new Error(
        `[SupabaseDataService::validateOrderByTokenId] Error fetching orders: ${getOrdersResults.find((res) => res.error)?.error?.message}`,
      );
    }

    const matchingOrders = getOrdersResults
      .flatMap((res) => res.data)
      .filter((x) => x !== null);

    // Validate orders using logic in the SDK
    const hec = new HypercertExchangeClient(
      chainId,
      // @ts-expect-error Typing issue with provider
      EvmClientFactory.createEthersClient(chainId),
    );
    const validationResults = await hec.checkOrdersValidity(matchingOrders);

    // Determine all orders that have changed validity or validator codes so we don't
    // update the order if it hasn't changed
    for (const order of matchingOrders) {
      const validationResult = validationResults.find(
        (result) => result.id === order.id,
      );

      if (!validationResult) {
        throw new Error(
          `[SupabaseDataService::validateOrderByTokenId] No validation result found for order ${order.id}`,
        );
      }

      const currentOrderIsValid = !order.invalidated;

      // If the order validity has changed, we need to update the order and add the validator codes
      if (validationResult.valid !== currentOrderIsValid) {
        ordersToUpdate.push({
          id: order.id,
          invalidated: !validationResult.valid,
          validator_codes: validationResult.validatorCodes,
        });
        continue;
      }

      if (
        order.validator_codes === null &&
        validationResult.validatorCodes.every(
          (code) => code === OrderValidatorCode.ORDER_EXPECTED_TO_BE_VALID,
        )
      ) {
        // Orders are added to the database by default with validator_codes set to null
        // The contract will return an array of ORDER_EXPECTED_TO_BE_VALID if the order is valid
        // In this special case we won't have to update the order
        continue;
      }

      // If the validator codes have changed, we need to update the order
      if (!_.isEqual(validationResult.validatorCodes, order.validator_codes)) {
        ordersToUpdate.push({
          id: order.id,
          invalidated: !validationResult.valid,
          validator_codes: validationResult.validatorCodes,
        });
      }
    }

    console.log(
      "[SupabaseDataService::validateOrderByTokenId] Updating orders from validation results",
      ordersToUpdate,
    );
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
      data: this.handleGetData("blueprints_with_admins", args),
      count: this.handleGetCount("blueprints_with_admins", args),
    };
  }

  async deleteAllHypercertsFromCollection(collectionId: string) {
    return this.db
      .deleteFrom("hypercerts")
      .where("collection_id", "=", collectionId)
      .returning("hypercert_id")
      .execute();
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

  getCollections(args: GetCollectionsArgs) {
    return {
      data: this.handleGetData("collections", args),
      count: this.handleGetCount("collections", args),
    };
  }

  async getCollectionHypercerts(collectionId: string) {
    return this.db
      .selectFrom("hypercerts")
      .select(["hypercert_id", "collection_id"])
      .where("collection_id", "=", collectionId)
      .execute();
  }

  async getCollectionAdmins(collectionId: string) {
    return this.db
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

  async getCollectionBlueprints(collectionId: string) {
    return this.db
      .selectFrom("blueprints")
      .innerJoin(
        "collection_blueprints",
        "collection_blueprints.blueprint_id",
        "blueprints.id",
      )
      .selectAll("blueprints")
      .where("collection_blueprints.collection_id", "=", collectionId)
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

  async deleteAllBlueprintsFromCollection(collectionId: string) {
    return this.db
      .deleteFrom("collection_blueprints")
      .where("collection_id", "=", collectionId)
      .returning("blueprint_id")
      .execute();
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

  async upsertHyperboardBlueprintMetadata(
    metadata: DataDatabase["public"]["Tables"]["hyperboard_blueprint_metadata"]["Insert"][],
  ) {
    return this.db
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
      .returning(["hyperboard_id", "blueprint_id", "collection_id"])
      .execute();
  }

  async addBlueprintsToCollection(
    values: DataDatabase["public"]["Tables"]["collection_blueprints"]["Insert"][],
  ) {
    return this.db
      .insertInto("collection_blueprints")
      .values(values)
      .onConflict((oc) =>
        oc.columns(["blueprint_id", "collection_id"]).doNothing(),
      )
      .returning(["blueprint_id", "collection_id"])
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

  async addSignatureRequest(
    request: DataDatabase["public"]["Tables"]["signature_requests"]["Insert"],
  ) {
    return this.db
      .insertInto("signature_requests")
      .values(request)
      .returning(["safe_address", "message_hash"])
      .execute();
  }

  async getSignatureRequest(safe_address: string, message_hash: string) {
    return this.db
      .selectFrom("signature_requests")
      .selectAll()
      .where("safe_address", "=", safe_address)
      .where("message_hash", "=", message_hash)
      .executeTakeFirst();
  }

  async updateSignatureRequestStatus(
    safe_address: string,
    message_hash: string,
    status: DataDatabase["public"]["Enums"]["signature_request_status_enum"],
  ) {
    return this.db
      .updateTable("signature_requests")
      .set({ status })
      .where("safe_address", "=", safe_address)
      .where("message_hash", "=", message_hash)
      .execute();
  }

  getSignatureRequests(args: GetSignatureRequestArgs) {
    return {
      data: this.handleGetData("signature_requests", args),
      count: this.handleGetCount("signature_requests", args),
    };
  }

  getDataQuery<
    DB extends KyselyDataDatabase,
    T extends keyof DB & string,
    A extends object,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  >(tableName: T, args: BaseArgs<A>) {
    switch (tableName) {
      case "blueprints_with_admins":
      case "blueprints":
        return this.db.selectFrom("blueprints_with_admins").selectAll();
      case "orders":
      case "marketplace_orders":
        return this.db.selectFrom("marketplace_orders").selectAll();
      case "users":
        return this.db.selectFrom("users").selectAll();
      case "signature_requests":
        return this.db.selectFrom("signature_requests").selectAll();
      case "collections":
        return this.db.selectFrom("collections").selectAll();
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
      case "blueprints_with_admins":
      case "blueprints":
        return this.db
          .selectFrom("blueprints_with_admins")
          .select((expressionBuilder) => {
            return expressionBuilder.fn.countAll().as("count");
          });
      case "hyperboards":
        return this.db.selectFrom("hyperboards").select((expressionBuilder) => {
          return expressionBuilder.fn.countAll().as("count");
        });
      case "orders":
      case "marketplace_orders":
        return this.db
          .selectFrom("marketplace_orders")
          .select((expressionBuilder) => {
            return expressionBuilder.fn.countAll().as("count");
          });
      case "signature_requests":
        return this.db
          .selectFrom("signature_requests")
          .select((expressionBuilder) => {
            return expressionBuilder.fn.countAll().as("count");
          });
      case "users":
        return this.db.selectFrom("users").select((expressionBuilder) => {
          return expressionBuilder.fn.countAll().as("count");
        });
      case "collections":
        return this.db.selectFrom("collections").select((expressionBuilder) => {
          return expressionBuilder.fn.countAll().as("count");
        });
      default:
        throw new Error(`Table ${tableName.toString()} not found`);
    }
  }
}
