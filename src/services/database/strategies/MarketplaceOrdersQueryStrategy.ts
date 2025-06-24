import { Kysely } from "kysely";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Strategy for building database queries for marketplace orders.
 * Implements query logic for marketplace order retrieval and counting.
 *
 * This strategy extends the base QueryStrategy to provide marketplace-order-specific query building.
 * It handles:
 * - Basic data retrieval from the marketplace_orders table
 * - Simple counting operations
 *
 * @template DataDatabase - The database type containing the marketplace_orders table
 */
export class MarketplaceOrdersQueryStrategy extends QueryStrategy<
  DataDatabase,
  "marketplace_orders"
> {
  protected readonly tableName = "marketplace_orders" as const;

  /**
   * Builds a query to retrieve marketplace order data.
   * Returns all records from the marketplace_orders table.
   *
   * @param db - Kysely database instance
   * @returns A query builder for retrieving marketplace order data
   *
   * @example
   * ```typescript
   * // Basic query to select all marketplace orders
   * buildDataQuery(db);
   * // SELECT * FROM marketplace_orders
   * ```
   */
  buildDataQuery(db: Kysely<DataDatabase>) {
    return db.selectFrom(this.tableName).selectAll();
  }

  /**
   * Builds a query to count marketplace orders.
   * Returns the total count of records in the marketplace_orders table.
   *
   * @param db - Kysely database instance
   * @returns A query builder for counting marketplace orders
   *
   * @example
   * ```typescript
   * // Count all marketplace orders
   * buildCountQuery(db);
   * // SELECT COUNT(*) as count FROM marketplace_orders
   * ```
   */
  buildCountQuery(db: Kysely<DataDatabase>) {
    return db
      .selectFrom(this.tableName)
      .select((eb) => eb.fn.countAll().as("count"));
  }
}
