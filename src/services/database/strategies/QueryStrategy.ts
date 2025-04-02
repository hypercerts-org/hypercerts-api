import { Kysely, Selectable, SelectQueryBuilder } from "kysely";

import type { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import type { DataDatabase } from "../../../types/kyselySupabaseData.js";

export type SupportedDatabase = CachingDatabase | DataDatabase;

/**
 * Abstract base class for building database queries with a consistent interface.
 * Provides a template for creating specialized query strategies for different tables.
 *
 * @template DB - The database type (CachingDatabase | DataDatabase)
 * @template T - The table name (must be a key of DB and a string)
 * @template Args - Query arguments type
 * @template Selection - The selection type for the query
 *
 * Each concrete strategy implementation should:
 * - Define the specific table name as a readonly property
 * - Implement buildDataQuery() to construct SELECT queries with optional table joins
 * - Implement buildCountQuery() to construct COUNT queries with optional table joins
 *
 * Example usage:
 * ```typescript
 * class TableQueryStrategy extends QueryStrategy<Database, "table_name"> {
 *   protected readonly tableName = "table_name";
 *
 *   buildDataQuery(db: Kysely<Database>, args?: BaseQueryArgsType) {
 *     return db.selectFrom(this.tableName)
 *              .selectAll()
 *              .$if(args?.where?.referenceTableId, qb => qb.where(...));
 *   }
 *
 *   buildCountQuery(db: Kysely<Database>, args?: BaseQueryArgsType) {
 *     return db.selectFrom(this.tableName)
 *              .select(({ fn }) => fn.count("id").as("count"))
 *              .$if(args?.where, qb => qb.where(...));
 *   }
 * }
 */
export abstract class QueryStrategy<
  DB extends SupportedDatabase,
  T extends keyof DB & string,
  Args = void,
  Selection = Selectable<DB[T]>,
> {
  protected abstract readonly tableName: T;

  abstract buildDataQuery(
    db: Kysely<DB>,
    args?: Args,
  ): SelectQueryBuilder<DB, T, Selection>;

  abstract buildCountQuery(
    db: Kysely<DB>,
    args?: Args,
  ): SelectQueryBuilder<DB, T, { count: number | string | bigint }>;
}
