import { expressionBuilder, Kysely, SqlBool } from "kysely";
import { BaseArgs } from "../graphql/schemas/args/baseArgs.js";
import { SortOrder } from "../graphql/schemas/enums/sortEnums.js";
import { buildWhereCondition } from "../graphql/schemas/utils/filters-kysely.js";

export abstract class BaseSupabaseService<DB> {
  protected db: Kysely<DB>;

  protected constructor(db: Kysely<DB>) {
    this.db = db;
  }

  abstract getDataQuery<T extends keyof DB & string, A extends object>(
    tableName: T,
    args: BaseArgs<A>, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any;

  abstract getCountQuery<T extends keyof DB & string, A extends object>(
    tableName: T,
    args: BaseArgs<A>, // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any;

  handleGetData<T extends keyof DB & string, A extends object>(
    tableName: T,
    args: BaseArgs<A> & {
      first?: number;
      offset?: number;
    },
  ) {
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

  handleGetCount<T extends keyof DB & string, A extends object>(
    tableName: T,
    args: BaseArgs<A> & {
      first?: number;
      offset?: number;
    },
  ) {
    let query = this.getCountQuery(tableName, args);

    const { where } = args;
    const eb = expressionBuilder(query);

    if (where) {
      query = this.applyWhereConditions(query, where, tableName, eb);
    }

    return query;
  }

  private applyWhereConditions<T extends string>(
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
        buildWhereCondition(column, value, tableName, eb),
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
