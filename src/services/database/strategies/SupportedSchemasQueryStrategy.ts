import { Kysely } from "kysely";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Strategy for querying supported EAS (Ethereum Attestation Service) schemas.
 * Provides a simple query interface for the supported_schemas table.
 *
 * This strategy extends the base QueryStrategy to provide schema-specific query building.
 * It handles basic data retrieval and counting operations without complex joins or filtering.
 *
 * @template CachingDatabase - The database type containing the supported_schemas table
 */
export class SupportedSchemasQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "supported_schemas"
> {
  protected readonly tableName = "supported_schemas" as const;

  /**
   * Builds a query to retrieve supported schema data.
   * Returns a simple SELECT query that retrieves all columns from the supported_schemas table.
   *
   * @param db - Kysely database instance
   * @returns A query builder for retrieving supported schema data
   *
   * @example
   * ```typescript
   * // Basic query to select all supported schemas
   * buildDataQuery(db);
   * // SELECT * FROM supported_schemas
   * ```
   */
  buildDataQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).selectAll();
  }

  /**
   * Builds a query to count supported schemas.
   * Returns a simple COUNT query for the supported_schemas table.
   *
   * @param db - Kysely database instance
   * @returns A query builder for counting supported schemas
   *
   * @example
   * ```typescript
   * // Count all supported schemas
   * buildCountQuery(db);
   * // SELECT COUNT(*) as count FROM supported_schemas
   * ```
   */
  buildCountQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).select((eb) => {
      return eb.fn.countAll().as("count");
    });
  }
}
