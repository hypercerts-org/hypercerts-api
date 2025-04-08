import { SelectQueryBuilder, Selectable } from "kysely";
import { SupportedDatabase } from "../../../services/database/strategies/QueryStrategy.js";

/**
 * Type definition for pagination parameters
 * @typeParam first - The maximum number of records to return (limit)
 * @typeParam offset - The number of records to skip before starting to return results
 */
type PaginationArgs = {
  first?: number;
  offset?: number;
};

/**
 * Applies pagination to a database query using limit and offset parameters
 *
 * @typeParam DB - The database type extending SupportedDatabases
 * @typeParam T - The table name type (must be a key of DB and a string)
 * @typeParam Args - The pagination arguments type extending PaginationArgs
 *
 * @param query - The Kysely SelectQueryBuilder instance to apply pagination to
 * @param args - The pagination arguments containing optional first (limit) and offset values
 *
 * @returns The modified SelectQueryBuilder instance with pagination applied
 *
 * @remarks
 * - If no 'first' parameter is provided, defaults to a limit of 100 records
 * - If no 'offset' parameter is provided, starts from the beginning (offset 0)
 * - Modifies and returns the input query builder instance
 * - Note: Kysely query builders are mutable by design
 *
 * @example
 * ```typescript
 * const query = db.selectFrom('users');
 * const paginatedQuery = applyPagination(query, { first: 10, offset: 20 });
 * ```
 */
export function applyPagination<
  DB extends SupportedDatabase,
  T extends keyof DB & string,
  Args extends PaginationArgs,
>(
  query: SelectQueryBuilder<DB, T, Selectable<DB[T]>>,
  args: Args,
): SelectQueryBuilder<DB, T, Selectable<DB[T]>> {
  if (args.first) {
    query = query.limit(args.first);
  } else {
    query = query.limit(100); // Default limit
  }

  if (args.offset) {
    query = query.offset(args.offset);
  }

  return query;
}
