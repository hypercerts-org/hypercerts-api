import { container } from "tsyringe";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { GetMetadataArgs } from "../../../../src/graphql/schemas/args/metadataArgs.js";
import { MetadataService } from "../../../../src/services/database/entities/MetadataEntityService.js";

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

describe("MetadataService", () => {
  let service: MetadataService;

  beforeEach(() => {
    // Create a new instance for each test
    service = container.resolve(MetadataService);
  });

  describe("getMetadata", () => {
    it("should return metadata records for given arguments", async () => {
      // Arrange
      const args: GetMetadataArgs = {
        where: {
          uri: { eq: "ipfs://test" },
        },
      };
      const expectedResult = {
        data: [
          { id: "1", name: "Test 1", uri: "ipfs://test" },
          { id: "2", name: "Test 2", uri: "ipfs://test" },
        ],
        count: 2,
      };
      mockEntityService.getMany.mockResolvedValue(expectedResult);

      // Act
      const result = await service.getMetadata(args);

      // Assert
      expect(mockEntityService.getMany).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should handle empty result set", async () => {
      // Arrange
      const args: GetMetadataArgs = {
        where: {
          uri: { eq: "non-existent" },
        },
      };
      const expectedResult = {
        data: [],
        count: 0,
      };
      mockEntityService.getMany.mockResolvedValue(expectedResult);

      // Act
      const result = await service.getMetadata(args);

      // Assert
      expect(mockEntityService.getMany).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should handle errors from entity service", async () => {
      // Arrange
      const args: GetMetadataArgs = {};
      const error = new Error("Database error");
      mockEntityService.getMany.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getMetadata(args)).rejects.toThrow(error);
    });
  });

  describe("getMetadataSingle", () => {
    it("should return a single metadata record for given arguments", async () => {
      // Arrange
      const args: GetMetadataArgs = {
        where: {
          uri: { eq: "ipfs://test" },
        },
      };
      const expectedResult = {
        id: "1",
        name: "Test",
        uri: "ipfs://test",
      };
      mockEntityService.getSingle.mockResolvedValue(expectedResult);

      // Act
      const result = await service.getMetadataSingle(args);

      // Assert
      expect(mockEntityService.getSingle).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should return undefined when no record is found", async () => {
      // Arrange
      const args: GetMetadataArgs = {
        where: {
          uri: { eq: "non-existent" },
        },
      };
      mockEntityService.getSingle.mockResolvedValue(undefined);

      // Act
      const result = await service.getMetadataSingle(args);

      // Assert
      expect(mockEntityService.getSingle).toHaveBeenCalledWith(args);
      expect(result).toBeUndefined();
    });

    it("should handle errors from entity service", async () => {
      // Arrange
      const args: GetMetadataArgs = {};
      const error = new Error("Database error");
      mockEntityService.getSingle.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getMetadataSingle(args)).rejects.toThrow(error);
    });
  });
});
