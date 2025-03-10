import { Kysely } from "kysely";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Strategy for building database queries for contracts.
 * Implements query logic for contract retrieval and counting.
 *
 * This strategy extends the base QueryStrategy to provide contract-specific query building.
 * It handles basic data retrieval and counting operations for contracts deployed on various chains.
 *
 * @template CachingDatabase - The database type containing the contracts table
 */
export class ContractsQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "contracts"
> {
  protected readonly tableName = "contracts" as const;

  /**
   * Builds a query to retrieve contract data.
   * Returns a simple SELECT query that retrieves all columns from the contracts table.
   *
   * @param db - Kysely database instance
   * @returns A query builder for retrieving contract data
   *
   * @example
   * ```typescript
   * // Basic query to select all contracts
   * buildDataQuery(db);
   * // SELECT * FROM contracts
   * ```
   */
  buildDataQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).selectAll(this.tableName);
  }

  /**
   * Builds a query to count contracts.
   * Returns a simple COUNT query for the contracts table.
   *
   * @param db - Kysely database instance
   * @returns A query builder for counting contracts
   *
   * @example
   * ```typescript
   * // Count all contracts
   * buildCountQuery(db);
   * // SELECT COUNT(*) as count FROM contracts
   * ```
   */
  buildCountQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).select((eb) => {
      return eb.fn.countAll().as("count");
    });
  }
}
