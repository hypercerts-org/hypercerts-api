import { beforeEach, describe, expect, it, vi } from "vitest";
import { AllowlistRecordService } from "../../../../src/services/database/entities/AllowListRecordEntityService.js";

// Create mock outside of describe block to ensure it's available during module mocking
const mockEntityService = {
  getMany: vi.fn(),
  getSingle: vi.fn(),
};

// Mock the module before any tests run
vi.mock(
  "../../../../src/services/database/entities/EntityServiceFactory.js",
  () => ({
    createEntityService: () => mockEntityService,
  }),
);

describe("AllowlistRecordService", () => {
  let service: AllowlistRecordService;

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();

    // Create service instance
    service = new AllowlistRecordService();
  });

  describe("getAllowlistRecords", () => {
    it("should call entityService.getMany with provided arguments", async () => {
      const args = {
        where: {
          hypercert: {
            hypercert_id: { eq: "test-id" },
          },
        },
      };

      await service.getAllowlistRecords(args);

      expect(mockEntityService.getMany).toHaveBeenCalledTimes(1);
      expect(mockEntityService.getMany).toHaveBeenCalledWith(args);
    });

    it("should return the result from entityService.getMany", async () => {
      const expectedResult = {
        data: [{ id: "1", hypercert_id: "test-id" }],
        count: 1,
      };
      mockEntityService.getMany.mockResolvedValue(expectedResult);

      const result = await service.getAllowlistRecords({});

      expect(result).toEqual(expectedResult);
    });

    it("should handle errors from entityService.getMany", async () => {
      const error = new Error("Database error");
      mockEntityService.getMany.mockRejectedValue(error);

      await expect(service.getAllowlistRecords({})).rejects.toThrow(error);
    });
  });

  describe("getAllowlistRecord", () => {
    it("should call entityService.getSingle with provided arguments", async () => {
      const args = {
        where: {
          hypercert: {
            hypercert_id: { eq: "test-id" },
          },
        },
      };

      await service.getAllowlistRecord(args);

      expect(mockEntityService.getSingle).toHaveBeenCalledTimes(1);
      expect(mockEntityService.getSingle).toHaveBeenCalledWith(args);
    });

    it("should return the result from entityService.getSingle", async () => {
      const expectedResult = { id: "1", hypercert_id: "test-id" };
      mockEntityService.getSingle.mockResolvedValue(expectedResult);

      const result = await service.getAllowlistRecord({});

      expect(result).toEqual(expectedResult);
    });

    it("should handle null result from entityService.getSingle", async () => {
      mockEntityService.getSingle.mockResolvedValue(null);

      const result = await service.getAllowlistRecord({});

      expect(result).toBeNull();
    });

    it("should handle errors from entityService.getSingle", async () => {
      const error = new Error("Database error");
      mockEntityService.getSingle.mockRejectedValue(error);

      await expect(service.getAllowlistRecord({})).rejects.toThrow(error);
    });
  });
});
