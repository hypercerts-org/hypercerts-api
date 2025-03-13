import { Kysely } from "kysely";
import { beforeEach, describe, expect, it } from "vitest";
import { CollectionsQueryStrategy } from "../../../../src/services/database/strategies/CollectionsQueryStrategy.js";
import { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";
import {
  createTestDataDatabase,
  generateMockCollection,
} from "../../../utils/testUtils.js";

type TestDatabase = DataDatabase;

/**
 * Test suite for CollectionsQueryStrategy.
 * Verifies the query building functionality for collection data.
 *
 * Tests cover:
 * - Basic data query construction
 * - Query construction with admin filters
 * - Query construction with blueprint filters
 * - Count query construction
 * - Table structure and relationships
 */
describe("CollectionsQueryStrategy", () => {
  let db: Kysely<TestDatabase>;
  const strategy = new CollectionsQueryStrategy();
  let mockCollection: ReturnType<typeof generateMockCollection>;

  beforeEach(async () => {
    // Create test database with schema
    ({ db } = await createTestDataDatabase());
    mockCollection = generateMockCollection();
  });

  describe("data query building", () => {
    it("should build a basic query that selects all columns from collections table", async () => {
      const query = strategy.buildDataQuery(db);
      const { sql } = query.compile();

      expect(sql).toContain("collections");
      expect(sql).toMatch(/select \* from "collections"/i);
    });

    it("should build a query with admin filter", async () => {
      const query = strategy.buildDataQuery(db, {
        where: {
          admins: { address: { eq: mockCollection.admins[0].address } },
        },
      });
      const { sql } = query.compile();

      expect(sql).toContain("collections");
      expect(sql).toContain("collection_admins");
      expect(sql).toContain("users");
    });

    it("should build a query with blueprint filter", async () => {
      const query = strategy.buildDataQuery(db, {
        where: { blueprints: { id: { eq: mockCollection.blueprints[0].id } } },
      });
      const { sql } = query.compile();

      expect(sql).toContain("collections");
      expect(sql).toContain("collection_blueprints");
      expect(sql).toContain("blueprints");
    });

    it("should build a query with both admin and blueprint filters", async () => {
      const query = strategy.buildDataQuery(db, {
        where: {
          admins: { address: { eq: mockCollection.admins[0].address } },
          blueprints: { id: { eq: mockCollection.blueprints[0].id } },
        },
      });
      const { sql } = query.compile();

      expect(sql).toContain("collections");
      expect(sql).toContain("collection_admins");
      expect(sql).toContain("users");
      expect(sql).toContain("collection_blueprints");
      expect(sql).toContain("blueprints");
    });
  });

  describe("count query building", () => {
    it("should build a basic count query", async () => {
      const query = strategy.buildCountQuery(db);
      const { sql } = query.compile();

      expect(sql).toContain("collections");
      expect(sql).toMatch(/select count\(\*\) as "count" from "collections"/i);
    });

    it("should build a count query with admin filter", async () => {
      const query = strategy.buildCountQuery(db, {
        where: {
          admins: { address: { eq: mockCollection.admins[0].address } },
        },
      });
      const { sql } = query.compile();

      expect(sql).toContain("collections");
      expect(sql).toContain("collection_admins");
      expect(sql).toContain("users");
    });

    it("should build a count query with blueprint filter", async () => {
      const query = strategy.buildCountQuery(db, {
        where: { blueprints: { id: { eq: mockCollection.blueprints[0].id } } },
      });
      const { sql } = query.compile();

      expect(sql).toContain("collections");
      expect(sql).toContain("collection_blueprints");
      expect(sql).toContain("blueprints");
    });

    it("should build a count query with both admin and blueprint filters", async () => {
      const query = strategy.buildCountQuery(db, {
        where: {
          admins: { address: { eq: mockCollection.admins[0].address } },
          blueprints: { id: { eq: mockCollection.blueprints[0].id } },
        },
      });
      const { sql } = query.compile();

      expect(sql).toContain("collections");
      expect(sql).toContain("collection_admins");
      expect(sql).toContain("users");
      expect(sql).toContain("collection_blueprints");
      expect(sql).toContain("blueprints");
    });
  });
});
