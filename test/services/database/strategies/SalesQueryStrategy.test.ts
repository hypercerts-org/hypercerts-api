import { Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { beforeEach, describe, expect, it } from "vitest";
import { SalesQueryStrategy } from "../../../../src/services/database/strategies/SalesQueryStrategy.js";
import { CachingDatabase } from "../../../../src/types/kyselySupabaseCaching.js";

type TestDatabase = CachingDatabase;

describe("SalesQueryStrategy", () => {
  let db: Kysely<TestDatabase>;
  let mem: IMemoryDb;
  const strategy = new SalesQueryStrategy();

  beforeEach(async () => {
    mem = newDb();
    db = mem.adapters.createKysely() as Kysely<TestDatabase>;

    // Create required tables
    await db.schema
      .createTable("sales")
      .addColumn("id", "integer", (b) => b.primaryKey())
      .addColumn("fraction_id", "varchar")
      .addColumn("amount", "integer")
      .addColumn("price", "integer")
      .addColumn("timestamp", "timestamp")
      .execute();
  });

  describe("buildDataQuery", () => {
    it("should build a query to select all fields from sales table", () => {
      // Act
      const query = strategy.buildDataQuery(db);
      const { sql } = query.compile();

      // Assert
      expect(sql).toBe('select * from "sales"');
    });
  });

  describe("buildCountQuery", () => {
    it("should build a query to count all rows in sales table", () => {
      // Act
      const query = strategy.buildCountQuery(db);
      const { sql } = query.compile();

      // Assert
      expect(sql).toBe('select count(*) as "count" from "sales"');
    });
  });
});
