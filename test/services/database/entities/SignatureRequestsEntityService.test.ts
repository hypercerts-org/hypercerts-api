import { Kysely } from "kysely";
import { container } from "tsyringe";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DataKyselyService } from "../../../../src/client/kysely.js";
import { GetSignatureRequestsArgs } from "../../../../src/graphql/schemas/args/signatureRequestArgs.js";
import { SignatureRequestsService } from "../../../../src/services/database/entities/SignatureRequestsEntityService.js";
import type { DataDatabase } from "../../../../src/types/kyselySupabaseData.js";
import {
  createTestDataDatabase,
  generateMockAddress,
} from "../../../utils/testUtils.js";

const mockDb = vi.fn();

vi.mock("../../../../src/client/kysely.js", () => ({
  get DataKyselyService() {
    return class MockDataKyselyService {
      getConnection() {
        return mockDb();
      }
      get db() {
        return mockDb();
      }
    };
  },
  get kyselyData() {
    return mockDb();
  },
}));

// Helper function to generate mock signature request data
function generateMockSignatureRequest() {
  return {
    safe_address: generateMockAddress(),
    message_hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
    status: "pending" as const,
    purpose: "update_user_data" as const,
    message: JSON.stringify({ test: "data" }),
    timestamp: Math.floor(Date.now() / 1000),
    chain_id: 1,
  };
}

describe("SignatureRequestsService", () => {
  let signatureRequestsService: SignatureRequestsService;
  let db: Kysely<DataDatabase>;

  beforeEach(async () => {
    vi.clearAllMocks();

    // Create test database with signature_requests table
    ({ db } = await createTestDataDatabase());

    mockDb.mockReturnValue(db);

    signatureRequestsService = new SignatureRequestsService(
      container.resolve(DataKyselyService),
    );
  });

  describe("getSignatureRequests", () => {
    it("should return signature requests with correct data", async () => {
      // Arrange
      const mockRequest = generateMockSignatureRequest();
      await db.insertInto("signature_requests").values(mockRequest).execute();

      const args: GetSignatureRequestsArgs = {
        where: {
          safe_address: { eq: mockRequest.safe_address },
        },
      };

      // Act
      const result = await signatureRequestsService.getSignatureRequests(args);

      // Assert
      expect(result.count).toBe(1);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].safe_address).toBe(mockRequest.safe_address);
      expect(result.data[0].message_hash).toBe(mockRequest.message_hash);
      expect(result.data[0].status).toBe(mockRequest.status);
      expect(result.data[0].purpose).toBe(mockRequest.purpose);
    });

    it("should handle empty result set", async () => {
      // Arrange
      const args: GetSignatureRequestsArgs = {};

      // Act
      const result = await signatureRequestsService.getSignatureRequests(args);

      // Assert
      expect(result.count).toBe(0);
      expect(result.data).toHaveLength(0);
    });
  });

  describe("getSignatureRequest", () => {
    it("should return a single signature request", async () => {
      // Arrange
      const mockRequest = generateMockSignatureRequest();
      await db.insertInto("signature_requests").values(mockRequest).execute();

      const args: GetSignatureRequestsArgs = {
        where: {
          safe_address: { eq: mockRequest.safe_address },
          message_hash: { eq: mockRequest.message_hash },
        },
      };

      // Act
      const result = await signatureRequestsService.getSignatureRequest(args);

      // Assert
      expect(result).toBeDefined();
      expect(result?.safe_address).toBe(mockRequest.safe_address);
      expect(result?.message_hash).toBe(mockRequest.message_hash);
      expect(result?.status).toBe(mockRequest.status);
      expect(result?.purpose).toBe(mockRequest.purpose);
    });

    it("should return undefined when request not found", async () => {
      // Arrange
      const args: GetSignatureRequestsArgs = {
        where: {
          safe_address: { eq: generateMockAddress() },
        },
      };

      // Act
      const result = await signatureRequestsService.getSignatureRequest(args);

      // Assert
      expect(result).toBeUndefined();
    });
  });

  describe("addSignatureRequest", () => {
    it("should create a new signature request", async () => {
      // Arrange
      const mockRequest = generateMockSignatureRequest();

      // Act
      const result =
        await signatureRequestsService.addSignatureRequest(mockRequest);

      // Assert
      expect(result).toBeDefined();
      expect(result?.safe_address).toBe(mockRequest.safe_address);
      expect(result?.message_hash).toBe(mockRequest.message_hash);

      // Verify in database
      const dbResult = await db
        .selectFrom("signature_requests")
        .selectAll()
        .where("safe_address", "=", mockRequest.safe_address)
        .where("message_hash", "=", mockRequest.message_hash)
        .executeTakeFirst();

      expect(dbResult).toBeDefined();
      expect(dbResult?.status).toBe(mockRequest.status);
      expect(dbResult?.purpose).toBe(mockRequest.purpose);
    });

    it("should handle duplicate requests", async () => {
      // Arrange
      const mockRequest = generateMockSignatureRequest();
      await db.insertInto("signature_requests").values(mockRequest).execute();

      // Act & Assert
      await expect(
        signatureRequestsService.addSignatureRequest(mockRequest),
      ).rejects.toThrow();
    });
  });

  describe("updateSignatureRequestStatus", () => {
    it("should update status of existing request", async () => {
      // Arrange
      const mockRequest = generateMockSignatureRequest();
      await db.insertInto("signature_requests").values(mockRequest).execute();

      // Act
      await signatureRequestsService.updateSignatureRequestStatus(
        mockRequest.safe_address,
        mockRequest.message_hash,
        "executed",
      );

      // Assert
      const result = await db
        .selectFrom("signature_requests")
        .selectAll()
        .where("safe_address", "=", mockRequest.safe_address)
        .where("message_hash", "=", mockRequest.message_hash)
        .executeTakeFirst();

      expect(result).toBeDefined();
      expect(result?.status).toBe("executed");
    });

    it("should handle non-existent request", async () => {
      // Arrange
      const mockRequest = generateMockSignatureRequest();

      // Act
      await signatureRequestsService.updateSignatureRequestStatus(
        mockRequest.safe_address,
        mockRequest.message_hash,
        "executed",
      );

      // Assert - Should not throw error, but also not update anything
      const result = await db
        .selectFrom("signature_requests")
        .selectAll()
        .where("safe_address", "=", mockRequest.safe_address)
        .where("message_hash", "=", mockRequest.message_hash)
        .executeTakeFirst();

      expect(result).toBeUndefined();
    });
  });
});
