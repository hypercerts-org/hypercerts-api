import { Kysely } from "kysely";
import { beforeEach, describe, expect, it } from "vitest";
import { FractionsQueryStrategy } from "../../../../src/services/database/strategies/FractionsQueryStrategy.js";
import { CachingDatabase } from "../../../../src/types/kyselySupabaseCaching.js";
import {
  createTestCachingDatabase,
  generateMockFraction,
} from "../../../utils/testUtils.js";

describe("FractionsQueryStrategy", () => {
  let db: Kysely<CachingDatabase>;
  const strategy = new FractionsQueryStrategy();
  let mockFraction: ReturnType<typeof generateMockFraction>;

  beforeEach(async () => {
    // Setup test database with additional metadata table
    ({ db } = await createTestCachingDatabase(async (db) => {
      await db.schema
        .createTable("metadata")
        .addColumn("id", "varchar", (b) => b.primaryKey())
        .addColumn("uri", "varchar")
        .execute();
    }));

    mockFraction = generateMockFraction();

    // Insert mock data
    await db.insertInto("fractions_view").values(mockFraction).execute();
  });

  describe("data query building", () => {
    it("should build a basic query that selects all columns from fractions_view table", async () => {
      const query = strategy.buildDataQuery(db);
      const { sql } = query.compile();

      expect(sql).toContain("fractions_view");
      expect(sql).toContain('select * from "fractions_view"');
    });

    it("should build a query with metadata join when metadata filter is present", async () => {
      const query = strategy.buildDataQuery(db, {
        where: { metadata: { uri: { eq: "test-uri" } } },
      });
      const { sql } = query.compile();

      expect(sql).toContain("fractions_view");
      expect(sql).toContain("claims");
      expect(sql).toContain("metadata");
      expect(sql).toMatch(/exists.*from "claims".*left join "metadata"/i);
    });

    it("should not include metadata join when metadata filter is empty", async () => {
      const query = strategy.buildDataQuery(db, {
        where: { metadata: {} },
      });
      const { sql } = query.compile();

      expect(sql).not.toContain("metadata");
      expect(sql).not.toContain("claims");
    });
  });

  describe("count query building", () => {
    it("should build a basic count query", async () => {
      const query = strategy.buildCountQuery(db);
      const { sql } = query.compile();

      expect(sql).toContain("fractions_view");
      expect(sql).toMatch(
        /select count\(\*\) as "count" from "fractions_view"/i,
      );
    });

    it("should build a count query with metadata join when metadata filter is present", async () => {
      const query = strategy.buildCountQuery(db, {
        where: { metadata: { uri: { eq: "test-uri" } } },
      });
      const { sql } = query.compile();

      expect(sql).toContain("fractions_view");
      expect(sql).toContain("claims");
      expect(sql).toContain("metadata");
      expect(sql).toMatch(/exists.*from "claims".*left join "metadata"/i);
      expect(sql).toMatch(/select count\(\*\) as "count"/i);
    });

    it("should not include metadata join in count query when metadata filter is empty", async () => {
      const query = strategy.buildCountQuery(db, {
        where: { metadata: {} },
      });
      const { sql } = query.compile();

      expect(sql).not.toContain("metadata");
      expect(sql).not.toContain("claims");
      expect(sql).toMatch(
        /select count\(\*\) as "count" from "fractions_view"/i,
      );
    });
  });
});
