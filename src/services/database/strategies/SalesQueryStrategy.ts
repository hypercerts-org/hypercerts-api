import { Kysely } from "kysely";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Query strategy for handling sales-related database operations.
 * This strategy provides functionality to:
 * 1. Build queries for fetching sales data
 * 2. Build queries for counting sales
 *
 * The strategy is used by the SalesService to construct and execute database queries.
 * It extends the base QueryStrategy class to provide sales-specific query building.
 */
export class SalesQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "sales"
> {
  protected readonly tableName = "sales" as const;

  /**
   * Builds a query to fetch sales data.
   *
   * @param db - The Kysely database instance
   * @returns A query builder configured to select all fields from the sales table
   */
  buildDataQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).selectAll();
  }

  /**
   * Builds a query to count sales.
   *
   * @param db - The Kysely database instance
   * @returns A query builder configured to count all rows in the sales table
   */
  buildCountQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).select((eb) => {
      return eb.fn.countAll().as("count");
    });
  }
}
