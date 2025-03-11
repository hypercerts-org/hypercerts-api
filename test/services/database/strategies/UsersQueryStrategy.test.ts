import { Kysely } from "kysely";
import { beforeEach, describe, expect, it } from "vitest";
import { UsersQueryStrategy } from "../../../../src/services/database/strategies/UsersQueryStrategy.js";
import { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";
import {
  createTestDataDatabase,
  generateMockUser,
} from "../../../utils/testUtils.js";

describe("UsersQueryStrategy", () => {
  let db: Kysely<DataDatabase>;
  const strategy = new UsersQueryStrategy();
  let mockUser: ReturnType<typeof generateMockUser>;

  beforeEach(async () => {
    ({ db } = await createTestDataDatabase());
    mockUser = generateMockUser();
    await db.insertInto("users").values(mockUser).execute();
  });

  describe("data query building", () => {
    it("should build a query that selects all columns from users table", () => {
      const query = strategy.buildDataQuery(db);
      const { sql } = query.compile();

      expect(sql).toContain("users");
      expect(sql).toMatch(/select \* from "users"/i);
    });

    it("should return the inserted user data", async () => {
      const query = strategy.buildDataQuery(db);
      const result = await query.execute();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: mockUser.id,
        address: mockUser.address,
        chain_id: mockUser.chain_id,
        display_name: mockUser.display_name,
        avatar: mockUser.avatar,
      });
    });
  });

  describe("count query building", () => {
    it("should build a query that counts all records in users table", () => {
      const query = strategy.buildCountQuery(db);
      const { sql } = query.compile();

      expect(sql).toContain("users");
      expect(sql).toMatch(/select count\(\*\) as "count" from "users"/i);
    });

    it("should return correct count of users", async () => {
      const query = strategy.buildCountQuery(db);
      const result = await query.execute();

      expect(result).toHaveLength(1);
      expect(result[0].count).toBe(1);
    });
  });
});
