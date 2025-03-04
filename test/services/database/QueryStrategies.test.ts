import { Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { beforeEach, describe, expect, it } from "vitest";
import { QueryStrategy } from "../../../src/services/database/strategies/QueryStrategy.js";
import type { DataDatabase } from "../../../src/types/kyselySupabaseData.js";
import { BaseQueryArgsType } from "../../../src/lib/graphql/BaseQueryArgs.js";

type GeneratedAlways<T> = import("kysely").GeneratedAlways<T>;

// Mock database for testing
interface TestDatabase extends DataDatabase {
  test_table: {
    id: GeneratedAlways<number>;
    name: string;
    created_at: Date;
    test_reference_table_id: number;
  };
  test_reference_table: {
    id: GeneratedAlways<number>;
    name: string;
  };
}

type TestQueryArgs = BaseQueryArgsType<
  {
    test_reference_table_id?: boolean;
  },
  {
    by?: "test_reference_table_id";
    direction?: "asc" | "desc";
  }
>;

// Example test query strategy implementation
class TestQueryStrategy extends QueryStrategy<
  TestDatabase,
  "test_table",
  TestQueryArgs
> {
  protected readonly tableName = "test_table" as const;

  buildDataQuery(db: Kysely<TestDatabase>, args?: TestQueryArgs) {
    if (!args?.where) {
      return db.selectFrom(this.tableName).selectAll();
    }

    return db
      .selectFrom(this.tableName)
      .selectAll()
      .$if(!!args.where.test_reference_table_id, (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("test_reference_table").whereRef(
              "test_reference_table.id",
              "=",
              "test_table.test_reference_table_id",
            ),
          ),
        );
      });
  }

  buildCountQuery(
    db: Kysely<TestDatabase>,
    args?: BaseQueryArgsType<any, any>,
  ) {
    if (!args?.where) {
      return db
        .selectFrom(this.tableName)
        .select(({ fn }) => [fn.count<number>("id").as("count")]);
    }

    return db
      .selectFrom(this.tableName)
      .select(({ fn }) => [fn.count<number>("id").as("count")])
      .$if(!!args.where.test_reference_table_id, (qb) => {
        return qb.where(({ exists, selectFrom }) =>
          exists(
            selectFrom("test_reference_table").whereRef(
              "test_reference_table.id",
              "=",
              "test_table.test_reference_table_id",
            ),
          ),
        );
      });
  }
}

describe("QueryStrategy", () => {
  let mem: IMemoryDb;

  let kysely: Kysely<TestDatabase>;

  let strategy: TestQueryStrategy;

  beforeEach(() => {
    mem = newDb();
    kysely = mem.adapters.createKysely();
    strategy = new TestQueryStrategy();
  });

  describe("buildDataQuery", () => {
    it("should build a basic select query without filters", () => {
      const query = strategy.buildDataQuery(kysely);
      const compiledQuery = query.compile();

      expect(compiledQuery.sql).toBe('select * from "test_table"');
      expect(compiledQuery.parameters).toEqual([]);
    });

    it("should build a query with reference table filter", () => {
      const query = strategy.buildDataQuery(kysely, {
        where: { test_reference_table_id: true },
      });
      const compiledQuery = query.compile();

      expect(compiledQuery.sql).toBe(
        'select * from "test_table" where exists (select from "test_reference_table" where "test_reference_table"."id" = "test_table"."test_reference_table_id")',
      );
      expect(compiledQuery.parameters).toEqual([]);
    });

    it("should not build a query with a search filter", () => {
      const query = strategy.buildDataQuery(kysely, {
        where: {},
      });
      const compiledQuery = query.compile();

      expect(compiledQuery.sql).toBe('select * from "test_table"');
      expect(compiledQuery.parameters).toEqual([]);
    });
  });

  describe("buildCountQuery", () => {
    it("should build a basic count query without filters", () => {
      const query = strategy.buildCountQuery(kysely);
      const compiledQuery = query.compile();

      expect(compiledQuery.sql).toBe(
        'select count("id") as "count" from "test_table"',
      );
      expect(compiledQuery.parameters).toEqual([]);
    });

    it("should build a count query with search filter", () => {
      const query = strategy.buildCountQuery(kysely, {
        where: { test_reference_table_id: true },
      });
      const compiledQuery = query.compile();

      expect(compiledQuery.sql).toBe(
        'select count("id") as "count" from "test_table" where exists (select from "test_reference_table" where "test_reference_table"."id" = "test_table"."test_reference_table_id")',
      );
      expect(compiledQuery.parameters).toEqual([]);
    });

    it("should not build a count query with a search filter", () => {
      const query = strategy.buildCountQuery(kysely, {
        where: {},
      });
      const compiledQuery = query.compile();

      expect(compiledQuery.sql).toBe(
        'select count("id") as "count" from "test_table"',
      );
      expect(compiledQuery.parameters).toEqual([]);
    });
  });
});
