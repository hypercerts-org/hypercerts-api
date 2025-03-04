import { SelectQueryBuilder, Selectable } from "kysely";
import { SortOrder } from "../../../graphql/schemas/enums/sortEnums.js";
import { SupportedDatabases } from "../../../services/database/strategies/QueryStrategy.js";

/**
 * Applies sorting to a query based on the provided arguments
 * @param query The query to apply sorting to
 * @param args The arguments containing sort conditions
 * @returns The modified query with sorting applied
 */
export function applySort<
  DB extends SupportedDatabases,
  T extends keyof DB & string,
  Args extends { sortBy: { [K in keyof DB[T]]?: SortOrder | null } },
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

    try {
      modifiedQuery = modifiedQuery.orderBy(
        field as keyof DB[T] & string,
        orderDirection,
      );
    } catch (error) {
      // Silently ignore invalid sort fields
    }
  }

  return modifiedQuery;
}
