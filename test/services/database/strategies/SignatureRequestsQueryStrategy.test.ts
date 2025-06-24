import { Kysely } from "kysely";
import { beforeEach, describe, expect, it } from "vitest";
import { SignatureRequestsQueryStrategy } from "../../../../src/services/database/strategies/SignatureRequestsQueryStrategy.js";
import { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";
import {
  createTestDataDatabase,
  generateMockSignatureRequest,
} from "../../../utils/testUtils.js";

describe("SignatureRequestsQueryStrategy", () => {
  let db: Kysely<DataDatabase>;
  const strategy = new SignatureRequestsQueryStrategy();
  let mockRequest: ReturnType<typeof generateMockSignatureRequest>;

  beforeEach(async () => {
    ({ db } = await createTestDataDatabase());

    mockRequest = generateMockSignatureRequest();
    mockRequest.message = JSON.parse(mockRequest.message as string);
    await db.insertInto("signature_requests").values(mockRequest).execute();
  });

  describe("data query building", () => {
    it("should build a query that selects all columns from signature_requests table", () => {
      const query = strategy.buildDataQuery(db);
      const { sql } = query.compile();

      expect(sql).toContain("signature_requests");
      expect(sql).toMatch(/select \* from "signature_requests"/i);
    });

    it("should return the inserted signature request data", async () => {
      const query = strategy.buildDataQuery(db);
      const result = await query.execute();

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        safe_address: mockRequest.safe_address,
        message_hash: mockRequest.message_hash,
        chain_id: mockRequest.chain_id,
        timestamp: mockRequest.timestamp,
        message: mockRequest.message,
        purpose: mockRequest.purpose,
        status: mockRequest.status,
      });
    });

    it("should handle filtering by safe_address", async () => {
      const query = strategy
        .buildDataQuery(db)
        .where("safe_address", "=", mockRequest.safe_address);
      const result = await query.execute();

      expect(result).toHaveLength(1);
      expect(result[0].safe_address).toBe(mockRequest.safe_address);
    });

    it("should handle filtering by status", async () => {
      const query = strategy
        .buildDataQuery(db)
        .where("status", "=", mockRequest.status);
      const result = await query.execute();

      expect(result).toHaveLength(1);
      expect(result[0].status).toBe(mockRequest.status);
    });
  });

  describe("count query building", () => {
    it("should build a query that counts all records in signature_requests table", () => {
      const query = strategy.buildCountQuery(db);
      const { sql } = query.compile();

      expect(sql).toContain("signature_requests");
      expect(sql).toMatch(
        /select count\(\*\) as "count" from "signature_requests"/i,
      );
    });

    it("should return correct count of signature requests", async () => {
      const query = strategy.buildCountQuery(db);
      const result = await query.execute();

      expect(result).toHaveLength(1);
      expect(result[0].count).toBe(1);
    });

    it("should return correct count when filtered", async () => {
      // Add another request with different status
      await db
        .insertInto("signature_requests")
        .values({
          ...mockRequest,
          safe_address: mockRequest.safe_address + "1",
          message_hash: mockRequest.message_hash + "1",
          status: "executed",
        })
        .execute();

      const query = strategy
        .buildCountQuery(db)
        .where("status", "=", "pending");
      const result = await query.execute();

      expect(result).toHaveLength(1);
      expect(result[0].count).toBe(1);
    });
  });
});
