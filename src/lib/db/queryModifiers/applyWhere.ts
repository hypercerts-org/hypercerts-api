import { expressionBuilder, SelectQueryBuilder, Selectable } from "kysely";
import { SupportedDatabases } from "../../../services/database/strategies/QueryStrategy.js";
import { BaseQueryArgsType } from "../../graphql/BaseQueryArgs.js";
import { SortOrder } from "../../../graphql/schemas/enums/sortEnums.js";
import {
  buildWhereCondition,
  FilterValue,
} from "../../../lib/graphql/buildWhereCondition.js";

/**
 * Applies where conditions to a query based on the provided arguments.
 * This function processes each condition in the where clause and applies them to the query.
 *
 * @typeParam DB - The database type extending SupportedDatabases
 * @typeParam T - The table name type (must be a key of DB and a string)
 * @typeParam Args - The arguments type extending BaseQueryArgsType
 *
 * @param tableName - The name of the table to query
 * @param query - The Kysely SelectQueryBuilder instance to apply where conditions to
 * @param args - The arguments containing where conditions
 *
 * @returns The modified query with where conditions applied
 *
 * @remarks
 * - If no where conditions are provided (args.where is undefined), returns the original query
 * - Each property in the where object is processed independently
 * - Invalid conditions (those that return undefined from buildWhereCondition) are skipped
 * - The conditions are applied in sequence using AND logic
 *
 * @example
 * ```typescript
 * const query = db.selectFrom('users');
 * const args = {
 *   where: {
 *     name: { eq: "John" },
 *     age: { gt: 18 }
 *   }
 * };
 * const result = applyWhere('users', query, args);
 * ```
 */
export function applyWhere<
  DB extends SupportedDatabases,
  T extends keyof DB & string,
  // TODO: cleaner typing than object, object. We'd need to have a general where input type
  Args extends BaseQueryArgsType<
    object,
    Record<string, SortOrder | null | undefined>
  >,
>(
  tableName: T,
  query: SelectQueryBuilder<DB, T, Selectable<DB[T]>>,
  args: Args,
): SelectQueryBuilder<DB, T, Selectable<DB[T]>> {
  if (!args.where) return query;

  return Object.entries(args.where).reduce((q, [column, value]) => {
    const condition = buildWhereCondition<DB, T>(
      tableName,
      { [column]: value as FilterValue }, // Cast to FilterValue since we know the type from WhereArgs
      expressionBuilder(q),
    );
    return condition ? q.where(condition) : q;
  }, query);
}
