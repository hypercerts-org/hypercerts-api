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
import { expressionBuilder, Kysely } from "kysely";
import { generateFilterValues } from "../graphql/schemas/utils/filters-kysely.js";
import { SortOrder } from "../graphql/schemas/enums/sortEnums.js";
import { kyselyData } from "../client/kysely.js";

@singleton()
export class SupabaseDataService {
  private supabaseData: SupabaseClient<DataDatabase>;
  public readonly db: Kysely<KyselyDataDatabase>;

  constructor() {
    this.supabaseData = supabaseData;
    this.db = kyselyData;
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
    let query = this.supabaseData
      .from("hyperboards")
      .select("*, collections(*, hypercerts(*))", { count: "exact" });

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

  getDataQuery<
    DB extends KyselyDataDatabase,
    T extends keyof DB & string,
    A extends object,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  >(tableName: T, args: BaseArgs<A>) {
    switch (tableName) {
      case "users":
        return this.db.selectFrom("users").selectAll();
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
      default:
        throw new Error(`Table ${tableName.toString()} not found`);
    }
  }

  // Generalized query builder and handler of filter, sort, and pagination
  handleGetData<
    DB extends KyselyDataDatabase,
    T extends keyof DB & string,
    A extends object,
  >(
    tableName: T,
    args: BaseArgs<A> & {
      first?: number;
      offset?: number;
    },
  ) {
    let query = this.getDataQuery(tableName, args);

    const { where, first, offset, sort } = args;
    const eb = expressionBuilder(query);

    if (where) {
      query = query.where(
        eb.and(
          Object.entries(where).flatMap(([column, value]) => {
            if (!column || !value) return [];

            if (typeof value === "object" && !Array.isArray(value)) {
              return Object.entries(value).flatMap(([_column, _value]) => {
                if (!_column || !_value) return [];

                const res = generateFilterValues(column, _column, _value);
                if (res.length > 0) {
                  return eb(
                    `${tableName.toString()}.${res[0]}`,
                    res[1],
                    res[2],
                  );
                }

                const filters = [];
                for (const [operator, operand] of Object.entries(_value)) {
                  if (!operand) continue;

                  const _table = column;

                  const [_col, _symbol, _input] = generateFilterValues(
                    `${_table}.${_column}`,
                    operator,
                    operand,
                  );

                  filters.push(eb(_col, _symbol, _input));
                }

                return filters.flat();
              });
            }

            return column && value ? eb(column, "=", value) : [];
          }),
        ),
      );
    }

    if (sort) {
      if (sort?.by) {
        const { by } = sort;
        for (const [column, direction] of Object.entries(by)) {
          if (!column || !direction) continue;

          const dir: "asc" | "desc" =
            direction === SortOrder.ascending ? "asc" : "desc";

          query = query.orderBy(column, dir);
        }
      }
    }

    if (first) query = query.limit(first);
    if (offset) query = query.offset(offset);

    return query;
  }

  handleGetCount<
    DB extends KyselyDataDatabase,
    T extends keyof DB & string,
    A extends object,
  >(
    tableName: T,
    args: BaseArgs<A> & {
      first?: number;
      offset?: number;
    },
  ) {
    let query = this.getCountQuery(tableName, args);

    const { where } = args;
    const eb = expressionBuilder(query);

    if (where) {
      query = query.where(
        eb.and(
          Object.entries(where).flatMap(([column, value]) => {
            if (!column || !value) return [];

            if (typeof value === "object" && !Array.isArray(value)) {
              return Object.entries(value).flatMap(([_column, _value]) => {
                if (!_column || !_value) return [];

                const res = generateFilterValues(column, _column, _value);
                if (res.length > 0) {
                  return eb(
                    `${tableName.toString()}.${res[0]}`,
                    res[1],
                    res[2],
                  );
                }

                const filters = [];
                for (const [operator, operand] of Object.entries(_value)) {
                  if (!operand) continue;

                  const _table = column;

                  const [_col, _symbol, _input] = generateFilterValues(
                    `${_table}.${_column}`,
                    operator,
                    operand,
                  );
                  filters.push(eb(_col, _symbol, _input));
                }

                return filters.flat();
              });
            }
            return column && value ? eb(column, "=", value) : [];
          }),
        ),
      );
    }

    return query;
  }

  async addHypercertsToCollection(
    collectionId: string,
    hypercerts: Omit<
      DataDatabase["public"]["Tables"]["hypercerts"]["Insert"],
      "collection_id"
    >[],
  ) {
    return this.supabaseData
      .from("hypercerts")
      .insert(
        hypercerts.map((hypercert) => ({
          ...hypercert,
          collection_id: collectionId,
        })),
      )
      .select("*")
      .throwOnError();
  }

  async createHyperboard(
    hyperboard: DataDatabase["public"]["Tables"]["hyperboards"]["Insert"],
  ) {
    return this.supabaseData
      .from("hyperboards")
      .insert([hyperboard])
      .select("*")
      .single()
      .throwOnError();
  }

  async addCollectionToHyperboard(hyperboardId: string, collectionId: string) {
    return this.supabaseData
      .from("hyperboard_collections")
      .insert([
        {
          hyperboard_id: hyperboardId,
          collection_id: collectionId,
        },
      ])
      .select("*")
      .throwOnError();
  }

  async getHyperboardById(hyperboardId: string) {
    return this.supabaseData
      .from("hyperboards")
      .select("*")
      .eq("id", hyperboardId)
      .maybeSingle()
      .throwOnError();
  }

  async deleteHyperboard(hyperboardId: string) {
    return this.supabaseData
      .from("hyperboards")
      .delete()
      .eq("id", hyperboardId)
      .single()
      .throwOnError();
  }

  async upsertHyperboards(
    hyperboards: DataDatabase["public"]["Tables"]["hyperboards"]["Insert"][],
  ) {
    return this.supabaseData
      .from("hyperboards")
      .upsert(
        hyperboards.map((hb) => ({ ...hb, id: hb.id || crypto.randomUUID() })),
      )
      .select("*")
      .throwOnError();
  }

  async upsertCollections(
    collections: DataDatabase["public"]["Tables"]["collections"]["Insert"][],
  ) {
    return this.supabaseData
      .from("collections")
      .upsert(
        collections.map((c) => ({ ...c, id: c.id || crypto.randomUUID() })),
      )
      .select("*")
      .throwOnError();
  }

  async upsertHypercerts(
    hypercerts: DataDatabase["public"]["Tables"]["hypercerts"]["Insert"][],
  ) {
    return this.supabaseData
      .from("hypercerts")
      .upsert(
        hypercerts.map((hc) => ({ ...hc, id: hc.id || crypto.randomUUID() })),
      )
      .select("*")
      .throwOnError();
  }
}
