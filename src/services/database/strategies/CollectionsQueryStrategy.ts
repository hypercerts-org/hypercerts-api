import { Kysely } from "kysely";
import { GetCollectionsArgs } from "../../../graphql/schemas/args/collectionArgs.js";
import { isWhereEmpty } from "../../../lib/strategies/isWhereEmpty.js";
import { DataDatabase } from "../../../types/kyselySupabaseData.js";
import { QueryStrategy } from "./QueryStrategy.js";

/**
 * Strategy for building database queries for collections.
 * Implements query logic for collection retrieval and counting.
 *
 * This strategy extends the base QueryStrategy to provide collection-specific query building.
 * It handles:
 * - Basic data retrieval from the collections table
 * - Filtering based on relationships with:
 *   - admins (through collection_admins and users tables)
 *   - blueprints (through collection_blueprints and blueprints tables)
 * - Counting operations with appropriate joins
 *
 * The strategy supports complex queries involving multiple table relationships
 * and ensures proper join conditions are maintained.
 */
export class CollectionsQueryStrategy extends QueryStrategy<
  DataDatabase,
  "collections",
  GetCollectionsArgs
> {
  protected readonly tableName = "collections" as const;

  /**
   * Builds a query to retrieve collection data.
   * Handles optional filtering through joins with related tables.
   *
   * @param db - Kysely database instance
   * @param args - Optional query arguments for filtering
   * @returns A query builder for retrieving collection data
   *
   * @example
   * ```typescript
   * // Basic query without filters
   * buildDataQuery(db);
   * // SELECT * FROM collections
   *
   * // Query with admin filter
   * buildDataQuery(db, { where: { admins: {} } });
   * // SELECT * FROM collections
   * // WHERE EXISTS (
   * //   SELECT * FROM collection_admins
   * //   INNER JOIN users ON users.id = collection_admins.user_id
   * //   WHERE collection_admins.collection_id = collections.id
   * // )
   * ```
   */
  buildDataQuery(db: Kysely<DataDatabase>, args?: GetCollectionsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).selectAll();
    }
    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.admins), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("collection_admins")
              .whereRef(
                "collection_admins.collection_id",
                "=",
                "collections.id",
              )
              .innerJoin("users", "collection_admins.user_id", "users.id"),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.blueprints), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("collection_blueprints as cb")
              .innerJoin("blueprints as b", "b.id", "cb.blueprint_id")
              .whereRef("cb.collection_id", "=", "collections.id"),
          ),
        );
      })
      .selectAll(this.tableName);
  }

  /**
   * Builds a query to count collections.
   * Handles optional filtering through joins with related tables.
   *
   * @param db - Kysely database instance
   * @param args - Optional query arguments for filtering
   * @returns A query builder for counting collections
   *
   * @example
   * ```typescript
   * // Count all collections
   * buildCountQuery(db);
   * // SELECT COUNT(*) as count FROM collections
   *
   * // Count with admin filter
   * buildCountQuery(db, { where: { admins: {} } });
   * // SELECT COUNT(*) as count FROM collections
   * // WHERE EXISTS (
   * //   SELECT * FROM collection_admins
   * //   INNER JOIN users ON users.id = collection_admins.user_id
   * //   WHERE collection_admins.collection_id = collections.id
   * // )
   * ```
   */
  buildCountQuery(db: Kysely<DataDatabase>, args?: GetCollectionsArgs) {
    if (!args) {
      return db.selectFrom(this.tableName).select((eb) => {
        return eb.fn.countAll().as("count");
      });
    }

    return db
      .selectFrom(this.tableName)
      .$if(!isWhereEmpty(args.where?.admins), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("collection_admins")
              .whereRef(
                "collection_admins.collection_id",
                "=",
                "collections.id",
              )
              .innerJoin("users", "collection_admins.user_id", "users.id"),
          ),
        );
      })
      .$if(!isWhereEmpty(args.where?.blueprints), (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("collection_blueprints as cb")
              .innerJoin("blueprints as b", "b.id", "cb.blueprint_id")
              .whereRef("cb.collection_id", "=", "collections.id"),
          ),
        );
      })
      .select((eb) => {
        return eb.fn.countAll().as("count");
      });
  }
}
