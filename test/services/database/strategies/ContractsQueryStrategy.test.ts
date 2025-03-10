import { Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { beforeEach, describe, expect, it } from "vitest";
import { ContractsQueryStrategy } from "../../../../src/services/database/strategies/ContractsQueryStrategy.js";
import { CachingDatabase } from "../../../../src/types/kyselySupabaseCaching.js";

type TestDatabase = CachingDatabase;

/**
 * Test suite for ContractsQueryStrategy.
 * Verifies the query building functionality for contract data.
 *
 * Tests cover:
 * - Basic data query construction
 * - Count query construction
 * - Table structure and relationships
 */
describe("ContractsQueryStrategy", () => {
  let db: Kysely<TestDatabase>;
  let mem: IMemoryDb;
  const strategy = new ContractsQueryStrategy();

  beforeEach(async () => {
    mem = newDb();
    db = mem.adapters.createKysely() as Kysely<TestDatabase>;

    // Create required tables with appropriate columns and relationships
    await db.schema
      .createTable("contracts")
      .addColumn("id", "varchar", (b) => b.primaryKey())
      .addColumn("chain_id", "integer")
      .addColumn("contract_address", "varchar")
      .addColumn("start_block", "integer")
      .execute();

    // Create related tables
    await db.schema
      .createTable("claims")
      .addColumn("id", "integer", (b) => b.primaryKey())
      .addColumn("contracts_id", "varchar")
      .execute();
  });

  describe("data query building", () => {
    it("should build a query that selects all columns from contracts table", async () => {
      const query = strategy.buildDataQuery(db);
      const { sql } = query.compile();

      expect(sql).toContain("contracts");
      expect(sql).toMatch(/select "contracts"\.\* from "contracts"/i);
    });
  });

  describe("count query building", () => {
    it("should build a query that counts all records in contracts table", async () => {
      const query = strategy.buildCountQuery(db);
      const { sql } = query.compile();

      expect(sql).toContain("contracts");
      expect(sql).toMatch(/select count\(\*\) as "count" from "contracts"/i);
    });
  });
});
