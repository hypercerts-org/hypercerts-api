import { Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { beforeEach, describe, expect, it } from "vitest";
import { SortOrder } from "../../../../src/graphql/schemas/enums/sortEnums.js";
import {
  composeQueryModifiers,
  createStandardQueryModifier,
  QueryModifier,
} from "../../../../src/lib/db/queryModifiers/queryModifiers.js";
import { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";

// Define test database type
interface TestDatabase extends DataDatabase {
  test_users: {
    id: number;
    name: string;
    age: number;
    active: boolean;
    created_at: Date;
  };
}

describe("queryModifiers", () => {
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
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    // Insert test data
    mem.public.none(`
      INSERT INTO test_users (name, age, active, created_at) VALUES
      ('Alice', 25, true, '2024-01-01'),
      ('Bob', 30, false, '2024-01-02'),
      ('Charlie', 20, true, '2024-01-03');
    `);
  });

  describe("QueryModifier Type", () => {
    it("should allow creation of a valid query modifier", () => {
      const modifier: QueryModifier<
        TestDatabase,
        "test_users",
        { age?: number }
      > = (query, args) => {
        return args.age ? query.where("age", ">=", args.age) : query;
      };

      const result = modifier(db.selectFrom("test_users").selectAll(), {
        age: 25,
      });

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/where.*"age".*>=.*\$1/i);
      expect(parameters).toEqual([25]);
    });
  });

  describe("composeQueryModifiers", () => {
    it("should compose multiple query modifiers into a single function", () => {
      const whereModifier: QueryModifier<TestDatabase, "test_users", any> = (
        query,
        _args,
      ) => query.where("active", "=", true);

      const sortModifier: QueryModifier<TestDatabase, "test_users", any> = (
        query,
        _args,
      ) => query.orderBy("name", "asc");

      const composedModifier = composeQueryModifiers(
        whereModifier,
        sortModifier,
      );
      const result = composedModifier(
        db.selectFrom("test_users").selectAll(),
        {},
      );

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/where.*"active".*=.*\$1.*order by.*"name".*asc/i);
      expect(parameters).toEqual([true]);
    });

    it("should apply modifiers in the correct order", async () => {
      const results: string[] = [];

      const modifier1: QueryModifier<TestDatabase, "test_users", any> = (
        query,
        _args,
      ) => {
        results.push("where");
        return query.where("age", ">", 20);
      };

      const modifier2: QueryModifier<TestDatabase, "test_users", any> = (
        query,
        _args,
      ) => {
        results.push("sort");
        return query.orderBy("name", "asc");
      };

      const modifier3: QueryModifier<TestDatabase, "test_users", any> = (
        query,
        _args,
      ) => {
        results.push("limit");
        return query.limit(2);
      };

      const composedModifier = composeQueryModifiers(
        modifier1,
        modifier2,
        modifier3,
      );

      const result = await composedModifier(
        db.selectFrom("test_users").selectAll(),
        {},
      ).execute();

      expect(results).toEqual(["where", "sort", "limit"]);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Alice");
      expect(result[1].name).toBe("Bob");
    });

    it("should handle undefined return values gracefully", () => {
      const modifier1: QueryModifier<TestDatabase, "test_users", any> = (
        _query,
        _args,
      ) => undefined as any;

      const modifier2: QueryModifier<TestDatabase, "test_users", any> = (
        query,
        _args,
      ) => query.orderBy("name", "asc");

      const composedModifier = composeQueryModifiers(modifier1, modifier2);
      const result = composedModifier(
        db.selectFrom("test_users").selectAll(),
        {},
      );
      const { sql } = result.compile();
      expect(sql).toMatch(/order by.*"name".*asc/i);
    });
  });

  describe("createStandardQueryModifier", () => {
    it("should create a working composed modifier with all components", async () => {
      const standardModifier = createStandardQueryModifier<
        TestDatabase,
        "test_users",
        any
      >("test_users");

      const result = await standardModifier(
        db.selectFrom("test_users").selectAll(),
        {
          where: { age: { gt: 20 } },
          sortBy: { name: SortOrder.ascending },
          first: 2,
          offset: 0,
        },
      ).execute();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Alice");
      expect(result[1].name).toBe("Bob");
    });

    it("should work with partial arguments", async () => {
      const standardModifier = createStandardQueryModifier<
        TestDatabase,
        "test_users",
        any
      >("test_users");

      // Only apply where condition
      const result1 = await standardModifier(
        db.selectFrom("test_users").selectAll(),
        {
          where: { active: { eq: true } },
        },
      ).execute();

      expect(result1.length).toBe(2);
      expect(result1.every((r) => r.active)).toBe(true);

      // Only apply sort
      const result2 = await standardModifier(
        db.selectFrom("test_users").selectAll(),
        {
          sortBy: { age: SortOrder.descending },
        },
      ).execute();

      expect(result2[0].age).toBe(30);
      expect(result2[2].age).toBe(20);

      // Only apply pagination
      const result3 = await standardModifier(
        db.selectFrom("test_users").selectAll(),
        {
          first: 2,
        },
      ).execute();

      expect(result3).toHaveLength(2);
    });

    it("should preserve the type safety of the query builder", () => {
      const standardModifier = createStandardQueryModifier<
        TestDatabase,
        "test_users",
        any
      >("test_users");

      const query = db.selectFrom("test_users").selectAll();

      const result = standardModifier(query, {
        sortBy: { age: SortOrder.ascending },
      });

      // This should compile without type errors
      const { sql } = result.compile();
      expect(sql).toContain("select");
      expect(sql).toContain("order by");
    });
  });
});
