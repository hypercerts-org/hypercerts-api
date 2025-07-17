import { HypercertExchangeClient } from "@hypercerts-org/marketplace-sdk";
import { Insertable, Selectable, Updateable } from "kysely";
import { inject, injectable } from "tsyringe";
import { EvmClientFactory } from "../../../client/evmClient.js";
import { DataKyselyService, kyselyData } from "../../../client/kysely.js";
import type { GetOrdersArgs } from "../../../graphql/schemas/args/orderArgs.js";
import { SortOrder } from "../../../graphql/schemas/enums/sortEnums.js";
import type { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { createEntityService, EntityService } from "./EntityServiceFactory.js";

export type MarketplaceOrderSelect = Selectable<
  DataDatabase["marketplace_orders"]
>;
export type MarketplaceOrderInsert = Insertable<
  DataDatabase["marketplace_orders"]
>;
export type MarketplaceOrderUpdate = Updateable<
  DataDatabase["marketplace_orders"]
>;

export type MarketplaceOrderNonceSelect = Selectable<
  DataDatabase["marketplace_order_nonces"]
>;
export type MarketplaceOrderNonceInsert = Insertable<
  DataDatabase["marketplace_order_nonces"]
>;
export type MarketplaceOrderNonceUpdate = Updateable<
  DataDatabase["marketplace_order_nonces"]
>;

/**
 * Service class for managing marketplace orders in the database.
 * Handles CRUD operations for orders and their associated nonces.
 *
 * This service provides methods to:
 * - Query and manage marketplace orders
 * - Handle order nonces for transaction validation
 * - Validate orders against token IDs
 * - Perform batch operations on orders
 *
 * @injectable
 */
@injectable()
export class MarketplaceOrdersService {
  private entityService: EntityService<
    DataDatabase["marketplace_orders"],
    GetOrdersArgs
  >;

  /**
   * Initializes a new instance of the MarketplaceOrdersService.
   * Creates an EntityService instance for the marketplace_orders table.
   *
   * @param dbService - The database service instance for direct database operations
   */
  constructor(@inject(DataKyselyService) private dbService: DataKyselyService) {
    this.entityService = createEntityService<
      DataDatabase,
      "marketplace_orders",
      GetOrdersArgs
    >("marketplace_orders", "MarketplaceOrdersEntityService", kyselyData);
  }

  /**
   * Retrieves multiple orders based on the provided arguments.
   *
   * @param args - Query arguments for filtering orders
   * @returns Promise resolving to an object containing order data and count
   */
  async getOrders(args: GetOrdersArgs) {
    return this.entityService.getMany(args);
  }

  /**
   * Retrieves a single order based on the provided arguments.
   *
   * @param args - Query arguments for filtering the order
   * @returns Promise resolving to a single order record or undefined if not found
   */
  async getOrder(args: GetOrdersArgs) {
    return this.entityService.getSingle(args);
  }

  // TODO can this be a getOrders call?
  /**
   * Retrieves orders associated with specific token IDs.
   *
   * @param tokenIds - Array of token IDs to search for
   * @param chainId - Chain ID to filter orders by
   * @returns Promise resolving to matching orders
   */
  async getOrdersByTokenIds(tokenIds: string[], chainId: number) {
    return this.entityService.getMany({
      where: {
        itemIds: {
          arrayOverlaps: tokenIds,
        },
        chainId: { eq: chainId },
      },
      sortBy: { createdAt: SortOrder.descending },
    });
  }

  /**
   * Creates a new nonce record for order validation.
   *
   * @param nonce - The nonce record to create
   * @returns Promise resolving to the created nonce counter
   * @throws {Error} If the database operation fails
   */
  async createNonce(nonce: MarketplaceOrderNonceInsert) {
    return this.dbService
      .getConnection()
      .insertInto("marketplace_order_nonces")
      .values(nonce)
      .returning("nonce_counter")
      .executeTakeFirstOrThrow();
  }

  /**
   * Retrieves a nonce record for a specific address and chain.
   *
   * @param nonce - Object containing address and chain_id
   * @returns Promise resolving to the nonce record or undefined if not found
   */
  async getNonce(
    nonce: Pick<MarketplaceOrderNonceSelect, "address" | "chain_id">,
  ) {
    if (!nonce.address || !nonce.chain_id) {
      throw new Error("Address and chain ID are required");
    }

    return (
      this.dbService
        .getConnection()
        .selectFrom("marketplace_order_nonces")
        .selectAll()
        .where("address", "=", nonce.address)
        .where("chain_id", "=", nonce.chain_id)
        .executeTakeFirst()
        // TODO: Investigate why chain_id and nonce_counter are returned as strings
        .then((res) => ({
          ...res,
          chain_id: Number(res?.chain_id),
          nonce_counter: Number(res?.nonce_counter),
        }))
    );
  }

  /**
   * Updates a nonce record's counter.
   *
   * @param nonce - The nonce record to update
   * @returns Promise resolving to the updated nonce record
   * @throws {Error} If address or chain ID is missing
   */
  async updateNonce(nonce: MarketplaceOrderNonceUpdate) {
    if (!nonce.address || !nonce.chain_id) {
      throw new Error("Address and chain ID are required");
    }

    return this.dbService
      .getConnection()
      .updateTable("marketplace_order_nonces")
      .set({ nonce_counter: nonce.nonce_counter })
      .where("address", "=", nonce.address)
      .where("chain_id", "=", nonce.chain_id)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  /**
   * Creates a new marketplace order.
   *
   * @param order - The order record to create
   * @returns Promise resolving to the created order
   * @throws {Error} If the database operation fails
   */
  async storeOrder(order: MarketplaceOrderInsert) {
    return this.dbService
      .getConnection()
      .insertInto("marketplace_orders")
      .values(order)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  /**
   * Updates an existing marketplace order.
   *
   * @param order - The order record to update
   * @returns Promise resolving to the updated order
   * @throws {Error} If order ID is missing or unknown
   */
  async updateOrder(order: MarketplaceOrderUpdate) {
    if (!order.id) {
      throw new Error("Order ID is required");
    }

    return this.dbService
      .getConnection()
      .updateTable("marketplace_orders")
      .set(order)
      .where("id", "=", order.id)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  /**
   * Updates multiple marketplace orders.
   *
   * @param orders - Array of order records to update
   * @returns Promise resolving to array of updated orders
   * @throws {Error} If any order ID is missing
   */
  async updateOrders(orders: MarketplaceOrderUpdate[]) {
    const results = [];
    for (const order of orders) {
      if (!order.id) {
        throw new Error("Order ID is required for update");
      }

      const result = await this.dbService
        .getConnection()
        .updateTable("marketplace_orders")
        .set(order)
        .where("id", "=", order.id)
        .returningAll()
        .executeTakeFirstOrThrow();

      results.push(result);
    }

    return results;
  }

  /**
   * Upserts multiple marketplace orders.
   *
   * @param orders - Array of order records to upsert
   * @returns Promise resolving to array of upserted orders
   */
  async upsertOrders(orders: MarketplaceOrderInsert[]) {
    return this.dbService
      .getConnection()
      .insertInto("marketplace_orders")
      .values(orders)
      .onConflict((oc) =>
        oc.column("id").doUpdateSet((eb) => ({
          invalidated: eb.ref("excluded.invalidated"),
          validator_codes: eb.ref("excluded.validator_codes"),
        })),
      )
      .returningAll()
      .execute();
  }

  /**
   * Deletes a marketplace order.
   *
   * @param orderId - ID of the order to delete
   * @returns Promise resolving to the deleted order
   * @throws {Error} If the database operation fails
   */
  async deleteOrder(orderId: string) {
    return this.dbService
      .getConnection()
      .deleteFrom("marketplace_orders")
      .where("id", "=", orderId)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  /**
   * Validates orders associated with specific token IDs.
   * Uses the HypercertExchangeClient to check order validity.
   *
   * @param tokenIds - Array of token IDs to validate orders for
   * @param chainId - Chain ID to filter orders by
   * @returns Promise resolving to array of updated invalid orders
   * @throws {Error} If validation or update fails
   */
  async validateOrdersByTokenIds(tokenIds: string[], chainId: number) {
    const ordersToUpdate: MarketplaceOrderUpdate[] = [];
    for (const tokenId of tokenIds) {
      const { data: matchingOrders } = await this.getOrdersByTokenIds(
        [tokenId],
        chainId,
      );

      if (!matchingOrders) {
        console.warn(
          `[SupabaseDataService::validateOrderByTokenId] No orders found for tokenId: ${tokenId}`,
        );
        continue;
      }

      const hec = new HypercertExchangeClient(
        chainId,
        // @ts-expect-error Typing issue with provider
        EvmClientFactory.createEthersClient(chainId),
      );
      const validationResults = await hec.checkOrdersValidity(
        matchingOrders.map((order) => ({
          ...order,
          chainId: Number(order.chainId),
        })),
      );

      // filter all orders that have changed validity or validator codes
      const _changedOrders = validationResults
        .filter((x) => {
          const order = matchingOrders.find((y) => y.id === x.id);
          return (
            order?.invalidated !== x.valid ||
            order?.validator_codes !== x.validatorCodes
          );
        })
        .map((x) => ({
          id: x.id,
          invalidated: !x.valid,
          validator_codes: x.validatorCodes,
        }));

      ordersToUpdate.push(..._changedOrders);
    }

    return await this.updateOrders(ordersToUpdate);
  }
}
