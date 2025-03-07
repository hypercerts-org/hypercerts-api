import { SelectQueryBuilder, Selectable } from "kysely";
import { SortOrder } from "../../../graphql/schemas/enums/sortEnums.js";
import { SupportedDatabases } from "../../../services/database/strategies/QueryStrategy.js";
import { BaseQueryArgsType } from "../../graphql/BaseQueryArgs.js";
import { applyPagination } from "./applyPagination.js";
import { applySort } from "./applySort.js";
import { applyWhere } from "./applyWhere.js";

/**
 * Type definition for a query modifier function
 */
export type QueryModifier<
  DB extends SupportedDatabases,
  T extends keyof DB & string,
  Args,
> = (
  query: SelectQueryBuilder<DB, T, Selectable<DB[T]>>,
  args: Args,
) => SelectQueryBuilder<DB, T, Selectable<DB[T]>>;

/**
 * Composes multiple query modifiers into a single function
 * @param modifiers The query modifiers to compose
 * @returns A function that applies all modifiers in sequence
 */
export function composeQueryModifiers<
  DB extends SupportedDatabases,
  T extends keyof DB & string,
  Args,
>(...modifiers: QueryModifier<DB, T, Args>[]) {
  return (query: SelectQueryBuilder<DB, T, Selectable<DB[T]>>, args: Args) =>
    modifiers.reduce((q, modifier) => modifier(q, args), query);
}

/**
 * Creates a composed query modifier that applies where, sort, and pagination
 * @param tableName The name of the table to query
 * @returns A function that applies where, sort, and pagination modifiers
 */
export function createStandardQueryModifier<
  DB extends SupportedDatabases,
  T extends keyof DB & string,
  Args extends BaseQueryArgsType<
    // TODO better type definition than object
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
