import { SelectQueryBuilder, Selectable } from "kysely";
import { SortOrder } from "../../../graphql/schemas/enums/sortEnums.js";
import { SupportedDatabase } from "../../../services/database/strategies/QueryStrategy.js";
import { BaseQueryArgsType } from "../../graphql/BaseQueryArgs.js";
import { applyPagination } from "./applyPagination.js";
import { applySort } from "./applySort.js";
import { applyWhere } from "./applyWhere.js";

/**
 * Type definition for a query modifier function.
 * Query modifiers are functions that take a query and arguments and return a modified query.
 * They are used to compose complex queries from simpler, reusable parts.
 *
 * @typeParam DB - The database type extending SupportedDatabases
 * @typeParam T - The table name type (must be a key of DB and a string)
 * @typeParam Args - The arguments type containing query modification parameters
 *
 * @param query - The Kysely SelectQueryBuilder instance to modify
 * @param args - The arguments containing modification parameters
 * @returns The modified SelectQueryBuilder instance
 *
 * @example
 * ```typescript
 * const sortModifier: QueryModifier<DB, "users", SortArgs> = (query, args) => {
 *   return args.sortBy ? query.orderBy(args.sortBy) : query;
 * };
 * ```
 */
export type QueryModifier<
  DB extends SupportedDatabase,
  T extends keyof DB & string,
  Args,
> = (
  query: SelectQueryBuilder<DB, T, Selectable<DB[T]>>,
  args: Args,
) => SelectQueryBuilder<DB, T, Selectable<DB[T]>>;

/**
 * Composes multiple query modifiers into a single function.
 * The modifiers are applied in sequence, with each modifier receiving the query
 * produced by the previous modifier.
 *
 * @typeParam DB - The database type extending SupportedDatabases
 * @typeParam T - The table name type (must be a key of DB and a string)
 * @typeParam Args - The arguments type containing query modification parameters
 *
 * @param modifiers - The query modifiers to compose, applied in order
 * @returns A function that applies all modifiers in sequence
 *
 * @remarks
 * - Modifiers are applied left to right
 * - Each modifier receives the query produced by the previous modifier
 * - If a modifier returns undefined or null, the original query is used
 * - The args object is passed unchanged to each modifier
 *
 * @example
 * ```typescript
 * const fullModifier = composeQueryModifiers(
 *   applyWhere,
 *   applySort,
 *   applyPagination
 * );
 * const result = fullModifier(query, { where: {...}, sortBy: {...} });
 * ```
 */
export function composeQueryModifiers<
  DB extends SupportedDatabase,
  T extends keyof DB & string,
  Args,
>(...modifiers: QueryModifier<DB, T, Args>[]) {
  return (query: SelectQueryBuilder<DB, T, Selectable<DB[T]>>, args: Args) =>
    modifiers.reduce((q, modifier) => {
      const result = modifier(q, args);
      return result ?? q; // Fall back to previous query if modifier returns null/undefined
    }, query);
}

/**
 * Creates a composed query modifier that applies where, sort, and pagination in a standard order.
 * This is a convenience function that combines the most commonly used query modifiers.
 *
 * @typeParam DB - The database type extending SupportedDatabases
 * @typeParam T - The table name type (must be a key of DB and a string)
 * @typeParam Args - The arguments type extending BaseQueryArgsType
 *
 * @param tableName - The name of the table to query
 * @returns A function that applies where, sort, and pagination modifiers in sequence
 *
 * @remarks
 * - Modifiers are applied in this order: where → sort → pagination
 * - Where conditions are applied first to filter the dataset
 * - Sort is applied next to order the filtered results
 * - Pagination is applied last to limit the final result set
 * - Each modifier is optional and will be skipped if its args are not provided
 *
 * @example
 * ```typescript
 * const usersModifier = createStandardQueryModifier<DB, "users", UserQueryArgs>("users");
 * const result = usersModifier(query, {
 *   where: { active: true },
 *   sortBy: { created_at: SortOrder.descending },
 *   first: 10,
 *   offset: 0
 * });
 * ```
 */
export function createStandardQueryModifier<
  DB extends SupportedDatabase,
  T extends keyof DB & string,
  Args extends BaseQueryArgsType<
    object,
    { [K in keyof DB[T]]?: SortOrder | null | undefined }
  >,
>(tableName: T) {
  return composeQueryModifiers<DB, T, Args>(
    (query, args) => applyWhere<DB, T, Args>(tableName, query, args),
    applySort,
    applyPagination,
  );
}

export { applyPagination, applySort, applyWhere };
