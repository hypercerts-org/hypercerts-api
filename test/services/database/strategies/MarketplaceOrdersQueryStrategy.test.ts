import { Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { beforeEach, describe, expect, it } from "vitest";
import { MarketplaceOrdersQueryStrategy } from "../../../../src/services/database/strategies/MarketplaceOrdersQueryStrategy.js";
import { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";

type TestDatabase = DataDatabase;

describe("MarketplaceOrdersQueryStrategy", () => {
  let db: Kysely<TestDatabase>;
  let mem: IMemoryDb;
  const strategy = new MarketplaceOrdersQueryStrategy();

  beforeEach(async () => {
    mem = newDb();
    db = mem.adapters.createKysely() as Kysely<TestDatabase>;

    // Create required tables
    await db.schema
      .createTable("marketplace_orders")
      .addColumn("id", "varchar", (b) => b.primaryKey())
      .addColumn("status", "varchar")
      .addColumn("buyer_address", "varchar")
      .addColumn("seller_address", "varchar")
      .addColumn("created_at", "timestamp")
      .execute();
  });

  describe("basic functionality", () => {
    it("should query all marketplace orders records", async () => {
      const query = strategy.buildDataQuery(db);

      const { sql } = query.compile();
      expect(sql).toContain("marketplace_orders");
      expect(sql).toMatch(/select \* from "marketplace_orders"/i);
    });

    it("should count marketplace orders records", async () => {
      const query = strategy.buildCountQuery(db);

      const { sql } = query.compile();
      expect(sql).toContain("marketplace_orders");
      expect(sql).toMatch(
        /select count\(\*\) as "count" from "marketplace_orders"/i,
      );
    });
  });
});
