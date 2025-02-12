import SQLite from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import { describe, expect, it } from "vitest";
import { SortOrder } from "../../../src/graphql/schemas/enums/sortEnums";
import { BaseSupabaseService } from "../../../src/services/BaseSupabaseService";
import { DataDatabase } from "../../../src/types/kyselySupabaseData";

class TestService extends BaseSupabaseService<DataDatabase> {
  public constructor(db: Kysely<DataDatabase>) {
    super(db);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public testGetData<T extends keyof DataDatabase>(tableName: T, args: any) {
    return this.handleGetData(tableName, args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public testGetCount<T extends keyof DataDatabase>(tableName: T, args: any) {
    return this.handleGetCount(tableName, args);
  }
}

describe("QueryBuilder", () => {
  const db = new Kysely<DataDatabase>({
    dialect: new SqliteDialect({
      database: new SQLite(":memory:"),
    }),
  });

  const service = new TestService(db);

  describe("Query Building", () => {
    it("should build basic select query", () => {
      const query = service.testGetData("marketplace_orders", {});
      const compiledQuery = query.compile();

      expect(compiledQuery.sql).toBe('select * from "marketplace_orders"');
      expect(compiledQuery.parameters).toEqual([]);
    });

    it("should build query with where conditions", () => {
      const query = service.testGetData("marketplace_orders", {
        where: { id: { eq: 1 } },
      });
      const compiledQuery = query.compile();

      expect(compiledQuery.sql).toContain(
        'select * from "marketplace_orders" where "marketplace_orders"."id" =',
      );
      expect(compiledQuery.parameters).toEqual([1]);
    });

    it("should build query with sorting", () => {
      const query = service.testGetData("marketplace_orders", {
        sort: { by: { createdAt: SortOrder.ascending } },
      });
      const compiledQuery = query.compile();

      expect(compiledQuery.sql).toBe(
        'select * from "marketplace_orders" order by "createdAt" asc',
      );
      expect(compiledQuery.parameters).toEqual([]);
    });

    it("should build query with pagination", () => {
      const query = service.testGetData("marketplace_orders", {
        first: 10,
        offset: 20,
      });
      const compiledQuery = query.compile();

      expect(compiledQuery.sql).toBe(
        'select * from "marketplace_orders" limit ? offset ?',
      );
      expect(compiledQuery.parameters).toEqual([10, 20]);
    });

    it("should build count query", () => {
      const query = service.testGetCount("marketplace_orders", {});
      const compiledQuery = query.compile();

      expect(compiledQuery.sql).toBe(
        'select count(*) as "count" from "marketplace_orders"',
      );
      expect(compiledQuery.parameters).toEqual([]);
    });
  });
});
