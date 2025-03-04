import { SelectQueryBuilder, Selectable } from "kysely";
import { SupportedDatabases } from "../../../services/database/strategies/QueryStrategy.js";

/**
 * Type for pagination arguments
 */
type PaginationArgs = {
  first?: number;
  offset?: number;
};

/**
 * Applies pagination to a query based on the provided arguments
 * @param query The query to apply pagination to
 * @param args The arguments containing pagination parameters
 * @returns The modified query with pagination applied
 */
export function applyPagination<
  DB extends SupportedDatabases,
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
