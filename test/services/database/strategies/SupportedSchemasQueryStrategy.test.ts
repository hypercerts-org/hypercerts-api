import { Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { beforeEach, describe, expect, it } from "vitest";
import { SupportedSchemasQueryStrategy } from "../../../../src/services/database/strategies/SupportedSchemasQueryStrategy.js";
import { CachingDatabase } from "../../../../src/types/kyselySupabaseCaching.js";

type TestDatabase = CachingDatabase;

/**
 * Test suite for SupportedSchemasQueryStrategy.
 * Verifies the query building functionality for supported EAS schemas.
 *
 * Tests cover:
 * - Basic data query construction
 * - Count query construction
 * - Table structure and relationships
 */
describe("SupportedSchemasQueryStrategy", () => {
  let db: Kysely<TestDatabase>;
  let mem: IMemoryDb;
  const strategy = new SupportedSchemasQueryStrategy();

  beforeEach(async () => {
    mem = newDb();
    db = mem.adapters.createKysely() as Kysely<TestDatabase>;

    // Create required tables with appropriate columns and relationships
    await db.schema
      .createTable("supported_schemas")
      .addColumn("id", "varchar", (b) => b.primaryKey())
      .addColumn("chain_id", "integer")
      .addColumn("schema", "jsonb")
      .addColumn("resolver", "jsonb")
      .addColumn("revocable", "boolean")
      .execute();

    await db.schema
      .createTable("attestations")
      .addColumn("id", "integer", (b) => b.primaryKey())
      .addColumn("supported_schemas_id", "varchar")
      .execute();
  });

  describe("data query building", () => {
    it("should build a query that selects all columns from supported_schemas table", async () => {
      const query = strategy.buildDataQuery(db);
      const { sql } = query.compile();

      expect(sql).toContain("supported_schemas");
      expect(sql).toMatch(/select \* from "supported_schemas"/i);
    });
  });

  describe("count query building", () => {
    it("should build a query that counts all records in supported_schemas table", async () => {
      const query = strategy.buildCountQuery(db);
      const { sql } = query.compile();

      expect(sql).toContain("supported_schemas");
      expect(sql).toMatch(
        /select count\(\*\) as "count" from "supported_schemas"/i,
      );
    });
  });
});
