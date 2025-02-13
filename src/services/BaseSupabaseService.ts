import { expressionBuilder, Kysely, SqlBool } from "kysely";
import { BaseQueryArgs } from "../graphql/schemas/args/baseArgs.js";
import { SortOrder } from "../graphql/schemas/enums/sortEnums.js";
import { buildWhereCondition } from "../graphql/schemas/utils/filters-kysely.js";
import { CachingDatabase } from "../types/kyselySupabaseCaching.js";
import { DataDatabase } from "../types/kyselySupabaseData.js";
import { QueryStrategyFactory } from "./database/QueryBuilder.js";

export abstract class BaseSupabaseService<
  DB extends CachingDatabase | DataDatabase,
> {
  protected constructor(protected db: Kysely<DB>) {}

  protected getDataQuery<T extends keyof DB>(
    tableName: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args: BaseQueryArgs,
  ) {
    const strategy = QueryStrategyFactory.getStrategy<T, DB>(tableName);
    return strategy.buildDataQuery(this.db, args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected getCountQuery<T extends keyof DB, A extends BaseArgs<any>>(
    tableName: T,
    args: A,
  ) {
    const strategy = QueryStrategyFactory.getStrategy<T, DB>(tableName);
    return strategy.buildCountQuery(this.db, args);
  }

  protected handleGetData<
    T extends keyof DB,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TRecord extends Record<string, any>,
  >(tableName: T, args: BaseArgs<TRecord>) {
    let query = this.getDataQuery(tableName, args);

    const { where, first, offset, sort } = args;
    const eb = expressionBuilder(query);

    if (where) {
      query = this.applyWhereConditions(query, where, tableName, eb);
    }

    if (sort?.by) {
      query = this.applySorting(query, sort.by);
    }

    if (first) query = query.limit(first);
    if (offset) query = query.offset(offset);

    return query;
  }

  protected handleGetCount<
    T extends keyof DB,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TRecord extends Record<string, any>,
  >(tableName: T, args: BaseArgs<TRecord>) {
    let query = this.getCountQuery(tableName, args);

    const { where } = args;
    const eb = expressionBuilder(query);

    if (where) {
      query = this.applyWhereConditions(query, where, tableName, eb);
    }

    return query;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private applyWhereConditions<T extends keyof DB>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    query: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    where: any,
    tableName: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eb: any,
  ) {
    const conditions = Object.entries(where)
      .map(([column, value]) =>
        buildWhereCondition(column, value, String(tableName), eb),
      )
      .filter(Boolean);

    return conditions.reduce((q, condition) => {
      return q.where(condition as SqlBool);
    }, query);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private applySorting(query: any, sortBy: any) {
    for (const [column, direction] of Object.entries(sortBy)) {
      if (!column || !direction) continue;
      const dir: "asc" | "desc" =
        direction === SortOrder.ascending ? "asc" : "desc";
      query = query.orderBy(column, dir);
    }
    return query;
  }
}
