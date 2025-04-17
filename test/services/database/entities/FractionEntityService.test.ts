import { beforeEach, describe, expect, it, vi } from "vitest";
import { FractionService } from "../../../../src/services/database/entities/FractionEntityService.js";
import { generateMockFraction } from "../../../utils/testUtils.js";
import type { GetFractionsArgs } from "../../../../src/graphql/schemas/args/fractionArgs.js";

const mockEntityService = {
  getMany: vi.fn(),
  getSingle: vi.fn(),
};

// Mock the createEntityService function
vi.mock(
  "../../../../src/services/database/entities/EntityServiceFactory.js",
  () => ({
    createEntityService: () => mockEntityService,
  }),
);

describe("FractionService", () => {
  let service: FractionService;
  let mockFraction: ReturnType<typeof generateMockFraction>;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new FractionService();
    mockFraction = generateMockFraction();
  });

  describe("getFractions", () => {
    it("should return fractions with correct data", async () => {
      // Arrange
      const args: GetFractionsArgs = {};
      const mockResponse = {
        data: [mockFraction],
        count: 1,
      };
      mockEntityService.getMany.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getFractions(args);

      // Assert
      expect(mockEntityService.getMany).toHaveBeenCalledWith(args);
      expect(result.data).toHaveLength(1);
      expect(result.data[0]).toEqual(mockFraction);
      expect(result.count).toBe(1);
    });

    it("should return empty array when no fractions match criteria", async () => {
      // Arrange
      const args: GetFractionsArgs = {
        where: { hypercert_id: { eq: "non-existent-id" } },
      };
      const mockResponse = {
        data: [],
        count: 0,
      };
      mockEntityService.getMany.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getFractions(args);

      // Assert
      expect(mockEntityService.getMany).toHaveBeenCalledWith(args);
      expect(result.data).toHaveLength(0);
      expect(result.count).toBe(0);
    });

    it("should handle errors from entityService.getMany", async () => {
      // Arrange
      const error = new Error("Database error");
      mockEntityService.getMany.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getFractions({})).rejects.toThrow(error);
    });
  });

  describe("getFraction", () => {
    it("should return a single fraction by id", async () => {
      // Arrange
      const args: GetFractionsArgs = {
        where: { id: { eq: mockFraction.id } },
      };
      mockEntityService.getSingle.mockResolvedValue(mockFraction);

      // Act
      const result = await service.getFraction(args);

      // Assert
      expect(mockEntityService.getSingle).toHaveBeenCalledWith(args);
      expect(result).toEqual(mockFraction);
    });

    it("should return undefined when fraction not found", async () => {
      // Arrange
      const args: GetFractionsArgs = {
        where: { id: { eq: "non-existent-id" } },
      };
      mockEntityService.getSingle.mockResolvedValue(undefined);

      // Act
      const result = await service.getFraction(args);

      // Assert
      expect(mockEntityService.getSingle).toHaveBeenCalledWith(args);
      expect(result).toBeUndefined();
    });

    it("should handle errors from entityService.getSingle", async () => {
      // Arrange
      const error = new Error("Database error");
      mockEntityService.getSingle.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getFraction({})).rejects.toThrow(error);
    });
  });
});
