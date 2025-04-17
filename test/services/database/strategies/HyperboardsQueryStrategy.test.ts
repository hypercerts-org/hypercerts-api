import { beforeEach, describe, expect, it } from "vitest";
import { HyperboardsQueryStrategy } from "../../../../src/services/database/strategies/HyperboardsQueryStrategy.js";
import { Kysely } from "kysely";
import { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";
import { createTestDataDatabase } from "../../../utils/testUtils.js";

describe("HyperboardsQueryStrategy", () => {
  let db: Kysely<DataDatabase>;
  const strategy = new HyperboardsQueryStrategy();

  beforeEach(async () => {
    ({ db } = await createTestDataDatabase());
  });

  describe("buildDataQuery", () => {
    it("should build a basic query without args", () => {
      const query = strategy.buildDataQuery(db);
      const { sql } = query.compile();
      expect(sql).toMatch(/select \* from "hyperboards"/i);
    });

    it("should build a query with collection filter", () => {
      const query = strategy.buildDataQuery(db, {
        where: {
          collections: {},
        },
      });
      const { sql } = query.compile();
      expect(sql).toContain('select "hyperboards".* from "hyperboards"');
    });

    it("should build a query with admin filter", () => {
      const query = strategy.buildDataQuery(db, {
        where: {
          admins: {},
        },
      });
      const { sql } = query.compile();
      expect(sql).toContain('select "hyperboards".* from "hyperboards"');
    });
  });

  describe("buildCountQuery", () => {
    it("should build a basic count query without args", () => {
      const query = strategy.buildCountQuery(db);
      const { sql } = query.compile();
      expect(sql).toMatch(/select count\(\*\) as "count" from "hyperboards"/i);
    });

    it("should build a count query with collection filter", () => {
      const query = strategy.buildCountQuery(db, {
        where: {
          collections: {},
        },
      });
      const { sql } = query.compile();
      expect(sql).toContain('select count(*) as "count"');
    });

    it("should build a count query with admin filter", () => {
      const query = strategy.buildCountQuery(db, {
        where: {
          admins: {},
        },
      });
      const { sql } = query.compile();
      expect(sql).toContain('select count(*) as "count"');
    });
  });
});
