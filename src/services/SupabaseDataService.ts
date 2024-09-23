import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database as DataDatabase } from "../types/supabaseData.js";
import { supabaseData } from "../client/supabase.js";
import { GetCollectionsArgs } from "../graphql/schemas/args/collectionArgs.js";
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

@singleton()
export class SupabaseDataService {
  private supabaseData: SupabaseClient<DataDatabase>;

  constructor() {
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

  getCollections(args: GetCollectionsArgs) {
    let query = this.supabaseData.from("hyperboards").select("*");

    const { where, sort, offset, first } = args;

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
    return this.supabaseData
      .from("users")
      .upsert(users)
      .select("*")
      .throwOnError();
  }

  async getUsers(args: GetUserArgs) {
    let query = this.supabaseData.from("users").select("*");

    const { where, offset, first } = args;

    query = applyFilters({ query, where });
    query = applySorting({ query });
    query = applyPagination({ query, pagination: { first, offset } });

    return query;
  }
}
