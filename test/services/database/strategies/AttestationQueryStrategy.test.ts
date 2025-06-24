import { Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { beforeEach, describe, expect, it } from "vitest";
import { AttestationsQueryStrategy } from "../../../../src/services/database/strategies/AttestationQueryStrategy.js";
import { CachingDatabase } from "../../../../src/types/kyselySupabaseCaching.js";

type TestDatabase = CachingDatabase;

describe("AttestationsQueryStrategy", () => {
  let db: Kysely<TestDatabase>;
  let mem: IMemoryDb;
  const strategy = new AttestationsQueryStrategy();

  beforeEach(async () => {
    mem = newDb();
    db = mem.adapters.createKysely() as Kysely<TestDatabase>;

    // Create required tables
    await db.schema
      .createTable("attestations")
      .addColumn("id", "integer", (b) => b.primaryKey())
      .addColumn("supported_schemas_id", "varchar")
      .addColumn("claims_id", "integer")
      .execute();

    await db.schema
      .createTable("supported_schemas")
      .addColumn("id", "varchar", (b) => b.primaryKey())
      .execute();

    await db.schema
      .createTable("claims")
      .addColumn("id", "integer", (b) => b.primaryKey())
      .execute();
  });

  describe("basic functionality", () => {
    it("should query all attestations records", async () => {
      const query = strategy.buildDataQuery(db);

      const { sql } = query.compile();
      expect(sql).toContain("attestations");
      expect(sql).toMatch(/select \* from "attestations"/i);
      expect(sql).not.toMatch(/where exists/i);
    });

    it("should query attestations with eas_schema filter", async () => {
      const query = strategy.buildDataQuery(db, {
        where: {
          eas_schema: {
            id: { eq: "schema-1" },
          },
        },
      });

      const { sql } = query.compile();
      expect(sql).toContain("attestations");
      expect(sql).toMatch(/select \* from "attestations"/i);
      expect(sql).toMatch(
        /select .* from "supported_schemas" where "supported_schemas"."id" = "attestations"."supported_schemas_id"/i,
      );
    });

    it("should query attestations with hypercert filter", async () => {
      const query = strategy.buildDataQuery(db, {
        where: {
          hypercert: {
            id: { eq: "claim-1" },
          },
        },
      });

      const { sql } = query.compile();
      expect(sql).toContain("attestations");
      expect(sql).toMatch(/select \* from "attestations"/i);
      expect(sql).toMatch(
        /select .* from "claims" where "claims"."id" = "attestations"."claims_id"/i,
      );
    });

    it("should query attestations with both eas_schema and hypercert filters", async () => {
      const query = strategy.buildDataQuery(db, {
        where: {
          eas_schema: {
            id: { eq: "schema-1" },
          },
          hypercert: {
            id: { eq: "claim-1" },
          },
        },
      });

      const { sql } = query.compile();
      expect(sql).toContain("attestations");
      expect(sql).toMatch(/select \* from "attestations"/i);
      expect(sql).toMatch(
        /select .* from "supported_schemas" where "supported_schemas"."id" = "attestations"."supported_schemas_id"/i,
      );
      expect(sql).toMatch(
        /select .* from "claims" where "claims"."id" = "attestations"."claims_id"/i,
      );
    });
  });

  describe("count", () => {
    it("should count all attestations records", async () => {
      const query = strategy.buildCountQuery(db);

      const { sql } = query.compile();
      expect(sql).toContain("attestations");
      expect(sql).toMatch(/select count\(\*\) as "count" from "attestations"/i);
      expect(sql).not.toMatch(/where exists/i);
    });

    it("should count attestations with eas_schema filter", async () => {
      const query = strategy.buildCountQuery(db, {
        where: {
          eas_schema: {
            id: { eq: "schema-1" },
          },
        },
      });

      const { sql } = query.compile();
      expect(sql).toContain("attestations");
      expect(sql).toMatch(/select count\(\*\) as "count" from "attestations"/i);
      expect(sql).toMatch(
        /select .* from "supported_schemas" where "supported_schemas"."id" = "attestations"."supported_schemas_id"/i,
      );
    });

    it("should count attestations with hypercert filter", async () => {
      const query = strategy.buildCountQuery(db, {
        where: {
          hypercert: {
            id: { eq: "claim-1" },
          },
        },
      });

      const { sql } = query.compile();
      expect(sql).toContain("attestations");
      expect(sql).toMatch(/select count\(\*\) as "count" from "attestations"/i);
      expect(sql).toMatch(
        /select .* from "claims" where "claims"."id" = "attestations"."claims_id"/i,
      );
    });

    it("should count attestations with both eas_schema and hypercert filters", async () => {
      const query = strategy.buildCountQuery(db, {
        where: {
          eas_schema: {
            id: { eq: "schema-1" },
          },
          hypercert: {
            id: { eq: "claim-1" },
          },
        },
      });

      const { sql } = query.compile();
      expect(sql).toContain("attestations");
      expect(sql).toMatch(/select count\(\*\) as "count" from "attestations"/i);
      expect(sql).toMatch(
        /select .* from "supported_schemas" where "supported_schemas"."id" = "attestations"."supported_schemas_id"/i,
      );
      expect(sql).toMatch(
        /select .* from "claims" where "claims"."id" = "attestations"."claims_id"/i,
      );
    });
  });
});
