import { describe, it, expect, beforeEach } from "vitest";
import { Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { applyPagination } from "../../../../src/lib/db/queryModifiers/applyPagination.js";
import { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";

interface TestDatabase extends DataDatabase {
  test_users: {
    id: number;
    name: string;
    active: boolean;
    created_at: Date;
  };
}

describe("applyPagination", () => {
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
        active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
  });

  describe("basic functionality", () => {
    it("should apply default limit of 100 when first is not provided", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyPagination(baseQuery, {});

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/limit \$1/);
      expect(parameters).toEqual([100]);
    });

    it("should apply the specified limit when first is provided", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyPagination(baseQuery, { first: 25 });

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/limit \$1/);
      expect(parameters).toEqual([25]);
    });

    it("should apply offset when provided", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyPagination(baseQuery, { offset: 10 });

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/limit \$1 offset \$2/);
      expect(parameters).toEqual([100, 10]); // Default limit and offset
    });

    it("should apply both limit and offset when both are provided", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyPagination(baseQuery, { first: 20, offset: 40 });

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/limit \$1 offset \$2/);
      expect(parameters).toEqual([20, 40]);
    });
  });

  describe("edge cases", () => {
    it("should handle zero values correctly", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyPagination(baseQuery, { first: 0, offset: 0 });

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/limit \$1/);
      expect(sql).not.toMatch(/offset \$2/);
      expect(parameters).toEqual([100]);
    });

    it("should handle undefined values correctly", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyPagination(baseQuery, {
        first: undefined,
        offset: undefined,
      });

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/limit \$1/);
      expect(parameters).toEqual([100]); // Should use default limit
      expect(sql).not.toMatch(/offset/);
    });

    it("should handle large values correctly", () => {
      const baseQuery = db.selectFrom("test_users").selectAll() as any;
      const result = applyPagination(baseQuery, { first: 1000, offset: 5000 });

      const { sql, parameters } = result.compile();
      expect(sql).toMatch(/limit \$1 offset \$2/);
      expect(parameters).toEqual([1000, 5000]);
    });
  });

  describe("query builder integration", () => {
    it("should work with complex queries", () => {
      const baseQuery = db
        .selectFrom("test_users")
        .where("active", "=", true)
        .orderBy("created_at") as any;

      const result = applyPagination(baseQuery, { first: 10, offset: 20 });

      const { sql, parameters } = result.compile();
      expect(sql).toContain("where");
      expect(sql).toContain("order by");
      expect(sql).toMatch(/limit \$\d+ offset \$\d+/);
      expect(parameters).toContain(10);
      expect(parameters).toContain(20);
    });

    it("should preserve existing query modifiers", () => {
      const baseQuery = db
        .selectFrom("test_users")
        .selectAll()
        .where("active", "=", true)
        .orderBy("created_at") as any;

      const result = applyPagination(baseQuery, { first: 10 });

      const { sql, parameters } = result.compile();
      expect(sql).toContain("where");
      expect(sql).toContain("order by");
      expect(sql).toMatch(/limit \$\d+/);
      expect(parameters).toContain(10);
    });
  });
});
