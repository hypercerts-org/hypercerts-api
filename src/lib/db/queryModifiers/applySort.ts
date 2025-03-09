import { SelectQueryBuilder, Selectable } from "kysely";
import { SortOrder } from "../../../graphql/schemas/enums/sortEnums.js";
import { SupportedDatabases } from "../../../services/database/strategies/QueryStrategy.js";

/**
 * Applies sorting to a query based on the provided arguments.
 * This function processes each sort condition and applies them in sequence to the query.
 *
 * @typeParam DB - The database type extending SupportedDatabases
 * @typeParam T - The table name type (must be a key of DB and a string)
 * @typeParam Args - The arguments type containing optional sortBy property
 *
 * @param query - The Kysely SelectQueryBuilder instance to apply sorting to
 * @param args - The arguments containing sort conditions
 *
 * @returns The modified query with sorting applied
 *
 * @remarks
 * - If no sort conditions are provided (args.sortBy is undefined), returns the original query
 * - Null or undefined sort directions are filtered out
 * - Sort conditions are applied in sequence, maintaining the order specified
 * - TypeScript type checking should prevent invalid field names at compile time
 * - SortOrder.ascending maps to 'asc', SortOrder.descending maps to 'desc'
 *
 * @example
 * ```typescript
 * const query = db.selectFrom('users');
 * const args = {
 *   sortBy: {
 *     name: SortOrder.ascending,
 *     created_at: SortOrder.descending
 *   }
 * };
 * const result = applySort(query, args);
 * ```
 */
export function applySort<
  DB extends SupportedDatabases,
  T extends keyof DB & string,
  Args extends {
    sortBy?: { [K in keyof DB[T]]?: SortOrder | null | undefined };
  },
>(
  query: SelectQueryBuilder<DB, T, Selectable<DB[T]>>,
  args: Args,
): SelectQueryBuilder<DB, T, Selectable<DB[T]>> {
  if (!args.sortBy) {
    console.debug("No sort arguments provided");
    return query;
  }

  // Filter out null/undefined values
  const sortEntries = Object.entries(args.sortBy).filter(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([_, direction]) => direction !== null && direction !== undefined,
  );

  if (sortEntries.length === 0) {
    console.debug("No non-null sort fields found");
    return query;
  }

  let modifiedQuery = query;

  for (const [field, direction] of sortEntries) {
    const orderDirection = direction === SortOrder.ascending ? "asc" : "desc";
    modifiedQuery = modifiedQuery.orderBy(
      field as keyof DB[T] & string,
      orderDirection,
    );
  }

  return modifiedQuery;
}
