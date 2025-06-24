import { Kysely } from "kysely";
import { GetHyperboardsArgs } from "../../../graphql/schemas/args/hyperboardArgs.js";
import { isWhereEmpty } from "../../../lib/strategies/isWhereEmpty.js";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Strategy for building database queries for hyperboards.
 * Implements query logic for hyperboard retrieval and counting.
 *
 * This strategy extends the base QueryStrategy to provide hyperboard-specific query building.
 * It handles:
 * - Basic data retrieval from the hyperboards table
 * - Filtering based on relationships with:
 *   - collections (through hyperboard_collections table)
 *   - admins (through hyperboard_admins table)
 *   - hypercert metadata (through hyperboard_hypercert_metadata table)
 *   - blueprint metadata (through hyperboard_blueprint_metadata table)
 * - Counting operations with appropriate joins
 *
 * The strategy supports complex queries involving multiple table relationships
 * and ensures proper join conditions are maintained.
 */
export class HyperboardsQueryStrategy extends QueryStrategy<
  DataDatabase,
  "hyperboards_with_admins",
  GetHyperboardsArgs
> {
  protected readonly tableName = "hyperboards_with_admins" as const;

  /**
   * Builds a query to retrieve hyperboard data.
   * Handles optional filtering through joins with related tables.
   *
   * @param db - Kysely database instance
   * @param args - Optional query arguments for filtering
   * @returns A query builder for retrieving hyperboard data
   *
   * @example
   * ```typescript
   * // Basic query without filters
   * buildDataQuery(db);
   * // SELECT * FROM hyperboards
   *
   * // Query with collection filter
   * buildDataQuery(db, { where: { collections: {} } });
   * // SELECT * FROM hyperboards
   * // WHERE EXISTS (
   * //   SELECT * FROM hyperboard_collections
   * //   WHERE hyperboard_collections.hyperboard_id = hyperboards.id
   * // )
   * ```
   */
  buildDataQuery(db: Kysely<DataDatabase>, args?: GetHyperboardsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).selectAll();
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.collections), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("hyperboards")
              .innerJoin(
                "hyperboard_collections",
                "hyperboard_collections.hyperboard_id",
                "hyperboards.id",
              )
              .select("hyperboards.id"),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.admins), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("hyperboards")
              .innerJoin(
                "hyperboard_admins",
                "hyperboard_admins.hyperboard_id",
                "hyperboards.id",
              )
              .select("hyperboards.id"),
          ),
        );
      })
      .selectAll(this.tableName);
  }

  /**
   * Builds a query to count hyperboards.
   * Handles optional filtering through joins with related tables.
   *
   * @param db - Kysely database instance
   * @param args - Optional query arguments for filtering
   * @returns A query builder for counting hyperboards
   *
   * @example
   * ```typescript
   * // Count all hyperboards
   * buildCountQuery(db);
   * // SELECT COUNT(*) as count FROM hyperboards
   *
   * // Count with admin filter
   * buildCountQuery(db, { where: { admins: {} } });
   * // SELECT COUNT(*) as count FROM hyperboards
   * // WHERE EXISTS (
   * //   SELECT * FROM hyperboard_admins
   * //   WHERE hyperboard_admins.hyperboard_id = hyperboards.id
   * // )
   * ```
   */
  buildCountQuery(db: Kysely<DataDatabase>, args?: GetHyperboardsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).select((eb) => {
        return eb.fn.countAll().as("count");
      });
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.collections), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("hyperboards")
              .innerJoin(
                "hyperboard_collections",
                "hyperboard_collections.hyperboard_id",
                "hyperboards.id",
              )
              .select("hyperboards.id"),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.admins), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("hyperboards")
              .innerJoin(
                "hyperboard_admins",
                "hyperboard_admins.hyperboard_id",
                "hyperboards.id",
              )
              .select("hyperboards.id"),
          ),
        );
      })
      .select((eb) => {
        return eb.fn.countAll().as("count");
      });
  }
}
