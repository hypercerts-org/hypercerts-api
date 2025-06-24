import { expressionBuilder, Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { beforeEach, describe, expect, it } from "vitest";
import {
  buildWhereCondition,
  WhereFilter,
} from "../../../../src/lib/db/queryModifiers/buildWhereCondition.js";
import { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";

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
  claims: {
    id: GeneratedAlways<number>;
    uri: string;
    hypercert_id: string;
  };
  fractions_view: {
    id: GeneratedAlways<number>;
    amount: number;
    hypercert_id: string;
  };
}

const cleanSql = (sql: string) => sql.replace(/\s+/g, " ").trim();

describe("buildWhereCondition", () => {
  let mem: IMemoryDb;

  let kysely: Kysely<TestDatabase>;

  beforeEach(() => {
    mem = newDb();
    kysely = mem.adapters.createKysely();
  });

  describe("Basic Filters", () => {
    it("should build simple equality condition", () => {
      const query = kysely.selectFrom("test_table").selectAll();

      const where: WhereFilter = { id: { eq: "123" } };

      const condition = buildWhereCondition<TestDatabase, "test_table">(
        "test_table",
        where,
        expressionBuilder(query),
      );

      if (!condition) {
        throw new Error("Expected condition to be defined");
      }

      const compiledQuery = kysely
        .selectFrom("test_table")
        .where(condition)
        .compile();

      const expectedSql =
        'select from "test_table" where "test_table"."id" = $1';
      expect(cleanSql(compiledQuery.sql)).toBe(cleanSql(expectedSql));
      expect(compiledQuery.parameters).toEqual(["123"]);
    });

    it("should build numeric comparison conditions", () => {
      const query = kysely.selectFrom("test_table").selectAll();
      const where: WhereFilter = { age: { gt: 18, lte: 65 } };

      const condition = buildWhereCondition<TestDatabase, "test_table">(
        "test_table",
        where,
        expressionBuilder(query),
      );

      if (!condition) {
        throw new Error("Expected condition to be defined");
      }

      const compiledQuery = kysely
        .selectFrom("test_table")
        .where(condition)
        .compile();

      const expectedSql =
        'select from "test_table" where ("test_table"."age" > $1 and "test_table"."age" <= $2)';
      expect(cleanSql(compiledQuery.sql)).toBe(cleanSql(expectedSql));
      expect(compiledQuery.parameters).toEqual([18, 65]);
    });

    it("should build string search conditions", () => {
      const query = kysely.selectFrom("test_table").selectAll();
      const where: WhereFilter = { name: { contains: "john" } };

      const condition = buildWhereCondition<TestDatabase, "test_table">(
        "test_table",
        where,
        expressionBuilder(query),
      );

      if (!condition) {
        throw new Error("Expected condition to be defined");
      }

      const compiledQuery = kysely
        .selectFrom("test_table")
        .where(condition)
        .compile();

      const expectedSql =
        'select from "test_table" where lower("test_table"."name") like lower($1)';
      expect(cleanSql(compiledQuery.sql)).toBe(cleanSql(expectedSql));
      expect(compiledQuery.parameters).toEqual(["%john%"]);
    });

    it("should build array conditions", () => {
      const query = kysely.selectFrom("test_table").selectAll();
      const where: WhereFilter = {
        roles: { arrayContains: ["admin", "user"] },
      };

      const condition = buildWhereCondition<TestDatabase, "test_table">(
        "test_table",
        where,
        expressionBuilder(query),
      );

      if (!condition) {
        throw new Error("Expected condition to be defined");
      }

      const compiledQuery = kysely
        .selectFrom("test_table")
        .where(condition)
        .compile();

      const expectedSql =
        'select from "test_table" where "test_table"."roles" @> ARRAY[$1, $2]';
      expect(cleanSql(compiledQuery.sql)).toBe(cleanSql(expectedSql));
      expect(compiledQuery.parameters).toEqual(["admin", "user"]);
    });
  });

  describe("Nested Filters", () => {
    it("should build condition for standard foreign key relation", () => {
      const query = kysely.selectFrom("test_table").selectAll();
      const where: WhereFilter = {
        company: {
          name: { eq: "Acme" },
        },
      };

      const condition = buildWhereCondition<TestDatabase, "test_table">(
        "test_table",
        where,
        expressionBuilder(query),
      );

      if (!condition) {
        throw new Error("Expected condition to be defined");
      }

      const compiledQuery = kysely
        .selectFrom("test_table")
        .where(condition)
        .compile();

      const expectedSql =
        'select from "test_table" where exists ( select from "company" where "company".id = "test_table".company_id and "company"."name" = $1 )';
      expect(cleanSql(compiledQuery.sql)).toBe(cleanSql(expectedSql));
      expect(compiledQuery.parameters).toEqual(["Acme"]);
    });

    it("should build condition for custom relation from TABLE_RELATIONS", () => {
      const query = kysely.selectFrom("claims").selectAll();
      const where: WhereFilter = {
        fractions_view: {
          amount: { gt: 100 },
        },
      };

      const condition = buildWhereCondition<TestDatabase, "claims">(
        "claims",
        where,
        expressionBuilder(query),
      );

      if (!condition) {
        throw new Error("Expected condition to be defined");
      }

      const compiledQuery = kysely
        .selectFrom("claims")
        .where(condition)
        .compile();

      // Using the actual relation defined in TABLE_RELATIONS
      const expectedSql =
        'select from "claims" where exists ( select from "fractions_view" where claims.hypercert_id = fractions_view.hypercert_id and "fractions_view"."amount" > $1 )';
      expect(cleanSql(compiledQuery.sql)).toBe(cleanSql(expectedSql));
      expect(compiledQuery.parameters).toEqual([100]);
    });

    it("should handle multiple nested conditions", () => {
      const query = kysely.selectFrom("test_table").selectAll();
      const where: WhereFilter = {
        claims: {
          uri: { eq: "test-uri" },
        },
        fractions_view: {
          amount: { gt: 100 },
        },
      };

      const condition = buildWhereCondition<TestDatabase, "test_table">(
        "test_table",
        where,
        expressionBuilder(query),
      );

      if (!condition) {
        throw new Error("Expected condition to be defined");
      }

      const compiledQuery = kysely
        .selectFrom("test_table")
        .where(condition)
        .compile();

      const expectedSql =
        'select from "test_table" where (exists ( select from "claims" where "claims".id = "test_table".claims_id and "claims"."uri" = $1 ) and exists ( select from "fractions_view" where "fractions_view".id = "test_table".fractions_view_id and "fractions_view"."amount" > $2 ))';
      expect(cleanSql(compiledQuery.sql)).toBe(cleanSql(expectedSql));
      expect(compiledQuery.parameters).toEqual(["test-uri", 100]);
    });
  });

  describe("Edge Cases", () => {
    it("should return undefined for empty where clause", () => {
      const query = kysely.selectFrom("test_table").selectAll();
      const where = {};

      const condition = buildWhereCondition<TestDatabase, "test_table">(
        "test_table",
        where,
        expressionBuilder(query),
      );

      if (condition) {
        throw new Error("Expected condition to be undefined");
      }
    });

    it("should ignore undefined values", () => {
      const query = kysely.selectFrom("test_table").selectAll();
      const where: WhereFilter = {
        id: { eq: undefined },
        name: { eq: "test" },
      };

      const condition = buildWhereCondition<TestDatabase, "test_table">(
        "test_table",
        where,
        expressionBuilder(query),
      );

      if (!condition) {
        throw new Error("Expected condition to be defined");
      }

      const compiledQuery = kysely
        .selectFrom("test_table")
        .where(condition)
        .compile();

      const expectedSql =
        'select from "test_table" where "test_table"."name" = $1';
      expect(cleanSql(compiledQuery.sql)).toBe(cleanSql(expectedSql));
      expect(compiledQuery.parameters).toEqual(["test"]);
    });

    it("should handle table prefix mapping", () => {
      const query = kysely.selectFrom("test_table").selectAll();
      const where: WhereFilter = {
        hypercert: {
          id: { eq: "123" },
        },
      };

      const condition = buildWhereCondition<TestDatabase, "test_table">(
        "test_table",
        where,
        expressionBuilder(query),
      );

      if (!condition) {
        throw new Error("Expected condition to be defined");
      }

      const compiledQuery = kysely
        .selectFrom("test_table")
        .where(condition)
        .compile();

      const expectedSql =
        'select from "test_table" where exists ( select from "claims" where "claims".id = "test_table".claims_id and "claims"."id" = $1 )';
      expect(cleanSql(compiledQuery.sql)).toBe(cleanSql(expectedSql));
      expect(compiledQuery.parameters).toEqual(["123"]);
    });
  });

  describe("Complex Queries", () => {
    it("should build complex nested conditions with multiple operators", () => {
      const query = kysely.selectFrom("test_table").selectAll();
      const where: WhereFilter = {
        age: { gte: 18, lte: 65 },
        name: { contains: "john" },
        company: {
          name: { eq: "Acme" },
          size: { gt: 100 },
        },
      };

      const condition = buildWhereCondition<TestDatabase, "test_table">(
        "test_table",
        where,
        expressionBuilder(query),
      );

      if (!condition) {
        throw new Error("Expected condition to be defined");
      }

      const compiledQuery = kysely
        .selectFrom("test_table")
        .where(condition)
        .compile();

      const expectedSql =
        'select from "test_table" where ("test_table"."age" >= $1 and "test_table"."age" <= $2 and lower("test_table"."name") like lower($3) and exists ( select from "company" where "company".id = "test_table".company_id and ("company"."name" = $4 and "company"."size" > $5) ))';
      expect(cleanSql(compiledQuery.sql)).toBe(cleanSql(expectedSql));
      expect(compiledQuery.parameters).toEqual([18, 65, "%john%", "Acme", 100]);
    });
  });
});
