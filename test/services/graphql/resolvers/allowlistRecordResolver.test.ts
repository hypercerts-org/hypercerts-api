import { beforeEach, describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import { AllowlistRecordResolver } from "../../../../src/services/graphql/resolvers/allowlistRecordResolver.js";
import { AllowlistRecordService } from "../../../../src/services/database/entities/AllowListRecordEntityService.js";
import { HypercertsService } from "../../../../src/services/database/entities/HypercertsEntityService.js";
import type { GetAllowlistRecordsArgs } from "../../../../src/graphql/schemas/args/allowlistRecordArgs.js";
import type { AllowlistRecord } from "../../../../src/graphql/schemas/typeDefs/allowlistRecordTypeDefs.js";
import type { Mock } from "vitest";

describe("AllowlistRecordResolver", () => {
  let resolver: AllowlistRecordResolver;
  let mockAllowlistRecordService: {
    getAllowlistRecords: Mock;
    getAllowlistRecord: Mock;
  };
  let mockHypercertsService: {
    getHypercert: Mock;
  };

  beforeEach(() => {
    // Create mock services
    mockAllowlistRecordService = {
      getAllowlistRecords: vi.fn(),
      getAllowlistRecord: vi.fn(),
    };

    mockHypercertsService = {
      getHypercert: vi.fn(),
    };

    // Register mocks with the DI container
    container.registerInstance(
      AllowlistRecordService,
      mockAllowlistRecordService as unknown as AllowlistRecordService,
    );
    container.registerInstance(
      HypercertsService,
      mockHypercertsService as unknown as HypercertsService,
    );

    // Resolve the resolver with mocked dependencies
    resolver = container.resolve(AllowlistRecordResolver);
  });

  describe("allowlistRecords", () => {
    it("should return allowlist records for given arguments", async () => {
      // Arrange
      const args: GetAllowlistRecordsArgs = {
        where: {
          hypercert: {
            hypercert_id: { eq: "test-id" },
          },
        },
      };
      const expectedResult = {
        data: [
          { id: "1", hypercert_id: "test-id" },
          { id: "2", hypercert_id: "test-id" },
        ],
        count: 2,
      };
      mockAllowlistRecordService.getAllowlistRecords.mockResolvedValue(
        expectedResult,
      );

      // Act
      const result = await resolver.allowlistRecords(args);

      // Assert
      expect(
        mockAllowlistRecordService.getAllowlistRecords,
      ).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should handle errors from allowlistRecordService", async () => {
      // Arrange
      const args: GetAllowlistRecordsArgs = {};
      const error = new Error("Service error");
      mockAllowlistRecordService.getAllowlistRecords.mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.allowlistRecords(args)).rejects.toThrow(error);
    });
  });

  describe("hypercert field resolver", () => {
    it("should resolve hypercert for an allowlist record", async () => {
      // Arrange
      const allowlistRecord: AllowlistRecord = {
        id: "1",
        hypercert_id: "test-hypercert-id",
      } as AllowlistRecord;
      const expectedHypercert = {
        id: "test-hypercert-id",
        name: "Test Hypercert",
      };
      mockHypercertsService.getHypercert.mockResolvedValue(expectedHypercert);

      // Act
      const result = await resolver.hypercert(allowlistRecord);

      // Assert
      expect(mockHypercertsService.getHypercert).toHaveBeenCalledWith({
        where: { hypercert_id: { eq: "test-hypercert-id" } },
      });
      expect(result).toEqual(expectedHypercert);
    });

    it("should handle null hypercert result", async () => {
      // Arrange
      const allowlistRecord: AllowlistRecord = {
        id: "1",
        hypercert_id: "non-existent-id",
      } as AllowlistRecord;
      mockHypercertsService.getHypercert.mockResolvedValue(null);

      // Act
      const result = await resolver.hypercert(allowlistRecord);

      // Assert
      expect(mockHypercertsService.getHypercert).toHaveBeenCalledWith({
        where: { hypercert_id: { eq: "non-existent-id" } },
      });
      expect(result).toBeNull();
    });

    it("should handle errors from hypercertsService", async () => {
      // Arrange
      const allowlistRecord: AllowlistRecord = {
        id: "1",
        hypercert_id: "error-id",
      } as AllowlistRecord;
      const error = new Error("Service error");
      mockHypercertsService.getHypercert.mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.hypercert(allowlistRecord)).rejects.toThrow(error);
    });
  });
});
