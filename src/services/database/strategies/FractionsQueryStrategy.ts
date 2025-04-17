import { Kysely } from "kysely";
import { GetFractionsArgs } from "../../../graphql/schemas/args/fractionArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { QueryStrategy } from "./QueryStrategy.js";
import { isWhereEmpty } from "../../../lib/strategies/isWhereEmpty.js";

/**
 * Strategy for building database queries for fractions.
 * Implements query logic for fraction retrieval and counting.
 *
 * This strategy extends the base QueryStrategy to provide fraction-specific query building.
 * It handles:
 * - Basic data retrieval from the fractions_view
 * - Filtering based on metadata relationships
 * - Counting operations with appropriate joins
 *
 * @template CachingDatabase - The database type containing the fractions_view table
 */
export class FractionsQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "fractions_view",
  GetFractionsArgs
> {
  protected readonly tableName = "fractions_view" as const;

  /**
   * Builds a query to retrieve fraction data.
   * Handles optional metadata filtering through joins with claims and metadata tables.
   *
   * @param db - Kysely database instance
   * @param args - Optional query arguments for filtering
   * @returns A query builder for retrieving fraction data
   *
   * @example
   * ```typescript
   * // Basic query to select all fractions
   * buildDataQuery(db);
   * // SELECT * FROM fractions_view
   *
   * // Query with metadata filtering
   * buildDataQuery(db, { where: { metadata: { ... } } });
   * // SELECT * FROM fractions_view
   * // WHERE EXISTS (
   * //   SELECT * FROM claims
   * //   LEFT JOIN metadata ON metadata.id = fractions_view.claims_id
   * //   WHERE claims.id = fractions_view.claims_id
   * // )
   * ```
   */
  buildDataQuery(db: Kysely<CachingDatabase>, args?: GetFractionsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).selectAll();
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.metadata), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("claims")
              .whereRef("claims.id", "=", "fractions_view.claims_id")
              .leftJoin("metadata", "metadata.id", "fractions_view.claims_id"),
          ),
        );
      })
      .selectAll(this.tableName);
  }

  /**
   * Builds a query to count fractions.
   * Handles optional metadata filtering through joins with claims and metadata tables.
   *
   * @param db - Kysely database instance
   * @param args - Optional query arguments for filtering
   * @returns A query builder for counting fractions
   *
   * @example
   * ```typescript
   * // Count all fractions
   * buildCountQuery(db);
   * // SELECT COUNT(*) as count FROM fractions_view
   *
   * // Count with metadata filtering
   * buildCountQuery(db, { where: { metadata: { ... } } });
   * // SELECT COUNT(*) as count FROM fractions_view
   * // WHERE EXISTS (
   * //   SELECT * FROM claims
   * //   LEFT JOIN metadata ON metadata.id = fractions_view.claims_id
   * //   WHERE claims.id = fractions_view.claims_id
   * // )
   * ```
   */
  buildCountQuery(db: Kysely<CachingDatabase>, args?: GetFractionsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).select((eb) => {
        return eb.fn.countAll().as("count");
      });
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.metadata), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("claims")
              .whereRef("claims.id", "=", "fractions_view.claims_id")
              .leftJoin("metadata", "metadata.id", "fractions_view.claims_id"),
          ),
        );
      })
      .select((eb) => {
        return eb.fn.countAll().as("count");
      });
  }
}
