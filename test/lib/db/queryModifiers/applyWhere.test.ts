import { describe, it, expect, beforeEach } from "vitest";
import { Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { applyWhere } from "../../../../src/lib/db/queryModifiers/applyWhere.js";
import { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";

type TestDatabase = DataDatabase & {
  test_users: {
    id: number;
    name: string;
    age: number;
    active: boolean;
    created_at: Date;
    tags: string[];
  };
};

describe("applyWhere", () => {
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
        tags TEXT[] NOT NULL DEFAULT '{}'
      );
    `);
  });

  describe("basic functionality", () => {
    it("should return original query when no where clause is provided", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyWhere<TestDatabase, "test_users", any>(
        "test_users",
        baseQuery,
        {},
      );

      const { sql, parameters } = result.compile();
      expect(sql).not.toContain("where");
      expect(parameters).toEqual([]);
    });

    it("should apply simple equality condition", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyWhere<TestDatabase, "test_users", any>(
        "test_users",
        baseQuery,
        {
          where: { name: { eq: "John" } },
        },
      );

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/where.*"test_users"."name".*=.*\$1/i);
      expect(parameters).toEqual(["John"]);
    });

    it("should apply multiple conditions with AND", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyWhere<TestDatabase, "test_users", any>(
        "test_users",
        baseQuery,
        {
          where: {
            name: { eq: "John" },
            age: { gt: 18 },
          },
        },
      );

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(
        /where.*"test_users"."name".*=.*\$1.*and.*"test_users"."age".*>.*\$2/i,
      );
      expect(parameters).toEqual(["John", 18]);
    });
  });

  describe("comparison operators", () => {
    it("should handle greater than condition", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyWhere<TestDatabase, "test_users", any>(
        "test_users",
        baseQuery,
        {
          where: { age: { gt: 18 } },
        },
      );

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/where.*"test_users"."age".*>.*\$1/i);
      expect(parameters).toEqual([18]);
    });

    it("should handle less than or equal condition", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyWhere<TestDatabase, "test_users", any>(
        "test_users",
        baseQuery,
        {
          where: { age: { lte: 65 } },
        },
      );

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/where.*"test_users"."age".*<=.*\$1/i);
      expect(parameters).toEqual([65]);
    });
  });

  describe("text search conditions", () => {
    it("should handle contains condition", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyWhere<TestDatabase, "test_users", any>(
        "test_users",
        baseQuery,
        {
          where: { name: { contains: "oh" } },
        },
      );

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(
        /where.*lower.*"test_users"."name".*like.*lower.*\$1/i,
      );
      expect(parameters).toEqual(["%oh%"]);
    });

    it("should handle startsWith condition", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyWhere<TestDatabase, "test_users", any>(
        "test_users",
        baseQuery,
        {
          where: { name: { startsWith: "Jo" } },
        },
      );

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(
        /where.*lower.*"test_users"."name".*like.*lower.*\$1/i,
      );
      expect(parameters).toEqual(["Jo%"]);
    });
  });

  describe("array conditions", () => {
    it("should handle array contains condition", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyWhere<TestDatabase, "test_users", any>(
        "test_users",
        baseQuery,
        {
          where: { tags: { arrayContains: ["tag1", "tag2"] } },
        },
      );

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/where.*"test_users"."tags".*@>.*array\[\$1, \$2\]/i);
      expect(parameters).toEqual(["tag1", "tag2"]);
    });
  });

  describe("query builder integration", () => {
    it("should work with complex queries", () => {
      const baseQuery = db
        .selectFrom("test_users")
        .selectAll()
        .orderBy("created_at") as any;

      const result = applyWhere<TestDatabase, "test_users", any>(
        "test_users",
        baseQuery,
        {
          where: {
            active: { eq: true },
            age: { gt: 18 },
          },
        },
      );

      const { sql, parameters } = result.compile();
      expect(sql).toContain("where");
      expect(sql).toContain("order by");
      expect(parameters).toEqual([true, 18]);
    });

    it("should preserve existing query modifiers", () => {
      const baseQuery = db
        .selectFrom("test_users")
        .selectAll()
        .orderBy("created_at")
        .limit(10) as any;

      const result = applyWhere<TestDatabase, "test_users", any>(
        "test_users",
        baseQuery,
        {
          where: { active: { eq: true } },
        },
      );

      const { sql, parameters } = result.compile();
      expect(sql).toContain("where");
      expect(sql).toContain("order by");
      expect(sql).toContain("limit");
      expect(parameters).toEqual([true, 10]);
    });
  });
});
