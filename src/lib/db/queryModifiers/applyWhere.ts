import { expressionBuilder, SelectQueryBuilder, Selectable } from "kysely";
import { SupportedDatabases } from "../../../services/database/strategies/QueryStrategy.js";
import { BaseQueryArgsType } from "../../graphql/BaseQueryArgs.js";
import {
  buildWhereCondition,
  FilterValue,
} from "../../../lib/graphql/buildWhereCondition.js";

/**
 * Applies where conditions to a query based on the provided arguments
 * @param tableName The name of the table to query
 * @param query The query to apply the where conditions to
 * @param args The arguments containing where conditions
 * @returns The modified query with where conditions applied
 */
export function applyWhere<
  DB extends SupportedDatabases,
  T extends keyof DB & string,
  // TODO: cleaner typing than object, object. We'd need to have a general where input type
  Args extends BaseQueryArgsType<object, object>,
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
