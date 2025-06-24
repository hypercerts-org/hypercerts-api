import { Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { beforeEach, describe, expect, it } from "vitest";
import { MetadataQueryStrategy } from "../../../../src/services/database/strategies/MetadataQueryStrategy.js";
import { CachingDatabase } from "../../../../src/types/kyselySupabaseCaching.js";

type TestDatabase = CachingDatabase;

describe("MetadataQueryStrategy", () => {
  let db: Kysely<TestDatabase>;
  let mem: IMemoryDb;
  const strategy = new MetadataQueryStrategy();

  beforeEach(async () => {
    mem = newDb();
    db = mem.adapters.createKysely() as Kysely<TestDatabase>;

    // Create test tables
    await db.schema
      .createTable("metadata")
      .addColumn("id", "text", (b) => b.primaryKey())
      .addColumn("name", "text")
      .addColumn("description", "text")
      .addColumn("uri", "text")
      .execute();
  });

  describe("data query building", () => {
    it("should build a basic query that selects supported columns", async () => {
      // Act
      const query = strategy.buildDataQuery(db);
      const { sql } = query.compile();

      // Assert
      expect(sql).toContain("metadata");
      expect(sql).toContain("select");
      expect(sql).toContain(`"metadata"."id"`);
      expect(sql).toContain(`"metadata"."name"`);
      expect(sql).toContain(`"metadata"."description"`);
      expect(sql).toContain(`"metadata"."uri"`);
      expect(sql).toContain(`"metadata"."properties"`);
      expect(sql).not.toContain("image"); // Image is excluded from supported columns
    });
  });

  describe("count query building", () => {
    it("should build a basic count query", async () => {
      // Act
      const query = strategy.buildCountQuery(db);
      const { sql } = query.compile();

      // Assert
      expect(sql).toContain("metadata");
      expect(sql).toMatch(/count\(\*\)/i);
      expect(sql).toMatch(/as "count"/i);
    });
  });
});
