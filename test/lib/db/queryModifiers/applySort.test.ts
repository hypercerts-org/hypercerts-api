import { describe, it, expect, beforeEach } from "vitest";
import { Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { applySort } from "../../../../src/lib/db/queryModifiers/applySort.js";
import { SortOrder } from "../../../../src/graphql/schemas/enums/sortEnums.js";
import { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";

type TestDatabase = DataDatabase & {
  test_users: {
    id: number;
    name: string;
    age: number;
    active: boolean;
    created_at: Date;
    score: number;
  };
};

describe("applySort", () => {
  let db: Kysely<TestDatabase>;
  let mem: IMemoryDb;

  beforeEach(() => {
    mem = newDb();
    db = mem.adapters.createKysely();

    // Create test table
    mem.public.none(`
      CREATE TABLE test_users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        score NUMERIC NOT NULL DEFAULT 0
      );
    `);

    // Insert some test data
    mem.public.none(`
      INSERT INTO test_users (name, age, score, created_at) VALUES
      ('Alice', 25, 100, '2024-01-01'),
      ('Bob', 30, 85, '2024-01-02'),
      ('Charlie', 20, 95, '2024-01-03');
    `);
  });

  describe("basic functionality", () => {
    it("should return original query when no sort is provided", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applySort<TestDatabase, "test_users", any>(baseQuery, {});

      const { sql, parameters } = result.compile();
      expect(sql).not.toContain("order by");
      expect(parameters).toEqual([]);
    });

    it("should apply single ascending sort", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applySort<TestDatabase, "test_users", any>(baseQuery, {
        sortBy: { name: SortOrder.ascending },
      });

      const { sql } = result.compile();
      expect(sql).toMatch(/order by.*"name".*asc/i);
    });

    it("should apply single descending sort", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applySort<TestDatabase, "test_users", any>(baseQuery, {
        sortBy: { age: SortOrder.descending },
      });

      const { sql } = result.compile();
      expect(sql).toMatch(/order by.*"age".*desc/i);
    });
  });

  describe("multiple sort conditions", () => {
    it("should apply multiple sort conditions in order", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applySort<TestDatabase, "test_users", any>(baseQuery, {
        sortBy: {
          score: SortOrder.descending,
          name: SortOrder.ascending,
        },
      });

      const { sql } = result.compile();
      expect(sql).toMatch(/order by.*"score".*desc.*"name".*asc/i);
    });

    it("should handle mixed sort directions", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applySort<TestDatabase, "test_users", any>(baseQuery, {
        sortBy: {
          age: SortOrder.ascending,
          score: SortOrder.descending,
          name: SortOrder.ascending,
        },
      });

      const { sql } = result.compile();
      expect(sql).toMatch(/order by.*"age".*asc.*"score".*desc.*"name".*asc/i);
    });
  });

  describe("edge cases", () => {
    it("should ignore null and undefined sort values", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applySort<TestDatabase, "test_users", any>(baseQuery, {
        sortBy: {
          name: null,
          age: undefined,
          score: SortOrder.ascending,
        },
      });

      const { sql } = result.compile();
      expect(sql).toMatch(/order by.*"score".*asc/i);
      expect(sql).not.toMatch(/"test_users"."name"/);
      expect(sql).not.toMatch(/"test_users"."age"/);
    });

    it("should return original query when all sort values are null/undefined", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applySort<TestDatabase, "test_users", any>(baseQuery, {
        sortBy: {
          name: null,
          age: undefined,
        },
      });

      const { sql } = result.compile();
      expect(sql).not.toContain("order by");
    });
  });

  describe("query builder integration", () => {
    it("should work with existing where conditions", () => {
      const baseQuery = db
        .selectFrom("test_users")
        .selectAll()
        .where("active", "=", true) as any;

      const result = applySort<TestDatabase, "test_users", any>(baseQuery, {
        sortBy: { name: SortOrder.ascending },
      });

      const { sql } = result.compile();
      expect(sql).toContain("where");
      expect(sql).toMatch(/order by.*"name".*asc/i);
    });

    it("should preserve existing order by clauses", () => {
      const baseQuery = db
        .selectFrom("test_users")
        .selectAll()
        .orderBy("id", "asc") as any;

      const result = applySort<TestDatabase, "test_users", any>(baseQuery, {
        sortBy: { name: SortOrder.ascending },
      });

      const { sql } = result.compile();
      expect(sql).toMatch(/order by.*"id".*asc.*"name".*asc/i);
    });

    it("should work with limit and offset", () => {
      const baseQuery = db
        .selectFrom("test_users")
        .selectAll()
        .limit(10)
        .offset(20) as any;

      const result = applySort<TestDatabase, "test_users", any>(baseQuery, {
        sortBy: { name: SortOrder.ascending },
      });

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/order by.*"name".*asc/i);
      expect(sql).toContain("limit");
      expect(sql).toContain("offset");
      expect(parameters).toContain(10);
      expect(parameters).toContain(20);
    });
  });

  describe("data validation", () => {
    it("should correctly sort numeric values", async () => {
      const result = await db
        .selectFrom("test_users")
        .selectAll()
        .orderBy("score", "desc")
        .execute();

      expect(result[0].score).toBe(100);
      expect(result[1].score).toBe(95);
      expect(result[2].score).toBe(85);
    });

    it("should correctly sort text values", async () => {
      const result = await db
        .selectFrom("test_users")
        .selectAll()
        .orderBy("name", "asc")
        .execute();

      expect(result[0].name).toBe("Alice");
      expect(result[1].name).toBe("Bob");
      expect(result[2].name).toBe("Charlie");
    });

    it("should correctly sort dates", async () => {
      const result = await db
        .selectFrom("test_users")
        .selectAll()
        .orderBy("created_at", "asc")
        .execute();

      expect(result[0].name).toBe("Alice"); // 2024-01-01
      expect(result[1].name).toBe("Bob"); // 2024-01-02
      expect(result[2].name).toBe("Charlie"); // 2024-01-03
    });
  });
});
