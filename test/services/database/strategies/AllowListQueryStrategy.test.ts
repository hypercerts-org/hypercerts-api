import { Kysely } from "kysely";
import { IMemoryDb, newDb } from "pg-mem";
import { beforeEach, describe, expect, it } from "vitest";
import { AllowlistQueryStrategy } from "../../../../src/services/database/strategies/AllowlistQueryStrategy.js";
import { CachingDatabase } from "../../../../src/types/kyselySupabaseCaching.js";

type TestDatabase = CachingDatabase;

describe("AllowlistQueryStrategy", () => {
  let db: Kysely<TestDatabase>;
  let mem: IMemoryDb;
  const strategy = new AllowlistQueryStrategy();

  beforeEach(async () => {
    mem = newDb();
    db = mem.adapters.createKysely() as import("kysely").Kysely<TestDatabase>;

    await db.schema
      .createTable("claimable_fractions_with_proofs")
      .addColumn("id", "integer", (b) => b.primaryKey())
      .execute();
  });

  describe("basic functionality", () => {
    it("should query all claimable fractions records", async () => {
      const query = strategy.buildDataQuery(db);

      const { sql } = query.compile();
      expect(sql).toContain("claimable_fractions_with_proofs");
      expect(sql).toMatch(/select \* from "claimable_fractions_with_proofs"/);
      expect(sql).not.toMatch(
        /where exists \(select from "claims" where "claims"."hypercert_id" = "claimable_fractions_with_proofs"."hypercert_id"\)/,
      );
    });

    it("should query all claimable fractions records with hypercert", async () => {
      const query = strategy.buildDataQuery(db, {
        where: {
          hypercert: {
            hypercert_id: { eq: "hyper1" },
          },
        },
      });

      const { sql } = query.compile();
      expect(sql).toContain("claimable_fractions_with_proofs");
      expect(sql).toMatch(
        /where exists \(select from "claims" where "claims"."hypercert_id" = "claimable_fractions_with_proofs"."hypercert_id"\)/,
      );
    });
  });

  describe("count", () => {
    it("should query all claimable fractions records", async () => {
      const query = strategy.buildCountQuery(db);

      const { sql } = query.compile();
      expect(sql).toContain("claimable_fractions_with_proofs");
      expect(sql).toMatch(
        /select count\(\*\) as "count" from "claimable_fractions_with_proofs"/,
      );
      expect(sql).not.toMatch(
        /where exists \(select from "claims" where "claims"."hypercert_id" = "claimable_fractions_with_proofs"."hypercert_id"\)/,
      );
    });

    it("should query all claimable fractions records with hypercert", async () => {
      const query = strategy.buildCountQuery(db, {
        where: {
          hypercert: {
            hypercert_id: { eq: "hyper1" },
          },
        },
      });

      const { sql } = query.compile();
      expect(sql).toContain("claimable_fractions_with_proofs");
      expect(sql).toMatch(
        /where exists \(select from "claims" where "claims"."hypercert_id" = "claimable_fractions_with_proofs"."hypercert_id"\)/,
      );
    });
  });
});
