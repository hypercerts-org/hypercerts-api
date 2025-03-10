import { beforeEach, describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import { HypercertsService } from "../../../../src/services/database/entities/HypercertsEntityService.js";
import { CachingKyselyService } from "../../../../src/client/kysely.js";
import type { Mock } from "vitest";
import type { GetHypercertsArgs } from "../../../../src/graphql/schemas/args/hypercertsArgs.js";
import { faker } from "@faker-js/faker";
import {
  generateHypercertId,
  generateMockMetadata,
} from "../../../utils/testUtils.js";

// Create mock entity service
const mockEntityService = {
  getMany: vi.fn(),
  getSingle: vi.fn(),
};

let mockConnection: {
  selectFrom: Mock;
};
let mockQuery: {
  leftJoin: Mock;
  selectAll: Mock;
  where: Mock;
  execute: Mock;
  executeTakeFirst: Mock;
};

// Mock the createEntityService function
vi.mock(
  "../../../../src/services/database/entities/EntityServiceFactory.js",
  () => ({
    createEntityService: () => mockEntityService,
  }),
);

describe("HypercertsService", () => {
  let service: HypercertsService;

  beforeEach(() => {
    // Mock console methods
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});

    // Create mock query builder
    mockQuery = {
      leftJoin: vi.fn().mockReturnThis(),
      selectAll: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      execute: vi.fn(),
      executeTakeFirst: vi.fn(),
    };

    // Create mock connection
    mockConnection = {
      selectFrom: vi.fn().mockReturnValue(mockQuery),
    };

    // Create mock caching service
    const mockCachingKyselyService = {
      getConnection: vi.fn().mockReturnValue(mockConnection),
    };

    // Register mocks with the DI container
    container.registerInstance(
      CachingKyselyService,
      mockCachingKyselyService as unknown as CachingKyselyService,
    );

    // Create a new instance for each test
    service = container.resolve(HypercertsService);
  });

  describe("getHypercerts", () => {
    it("should return hypercerts for given arguments", async () => {
      // Arrange
      const args: GetHypercertsArgs = {
        where: {
          hypercert_id: { eq: generateHypercertId() },
        },
      };
      const expectedResult = {
        data: [
          { id: faker.string.uuid(), hypercert_id: generateHypercertId() },
          { id: faker.string.uuid(), hypercert_id: generateHypercertId() },
        ],
        count: 2,
      };
      mockEntityService.getMany.mockResolvedValue(expectedResult);

      // Act
      const result = await service.getHypercerts(args);

      // Assert
      expect(mockEntityService.getMany).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should handle errors from entity service", async () => {
      // Arrange
      const args: GetHypercertsArgs = {};
      const error = new Error("Database error");
      mockEntityService.getMany.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getHypercerts(args)).rejects.toThrow(error);
    });
  });

  describe("getHypercert", () => {
    it("should return a single hypercert for given arguments", async () => {
      // Arrange
      const hypercertId = generateHypercertId();
      const args: GetHypercertsArgs = {
        where: {
          hypercert_id: { eq: hypercertId },
        },
      };
      const expectedResult = {
        id: faker.string.uuid(),
        hypercert_id: hypercertId,
      };
      mockEntityService.getSingle.mockResolvedValue(expectedResult);

      // Act
      const result = await service.getHypercert(args);

      // Assert
      expect(mockEntityService.getSingle).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should return undefined when no record is found", async () => {
      // Arrange
      const args: GetHypercertsArgs = {
        where: {
          hypercert_id: { eq: generateHypercertId() },
        },
      };
      mockEntityService.getSingle.mockResolvedValue(undefined);

      // Act
      const result = await service.getHypercert(args);

      // Assert
      expect(result).toBeUndefined();
      expect(mockEntityService.getSingle).toHaveBeenCalledWith(args);
    });

    it("should handle errors from entity service", async () => {
      // Arrange
      const args: GetHypercertsArgs = {};
      const error = new Error("Database error");
      mockEntityService.getSingle.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getHypercert(args)).rejects.toThrow(error);
    });
  });

  describe("getHypercertMetadata", () => {
    it("should return metadata when searching by claims_id", async () => {
      // Arrange
      const claimsId = faker.string.uuid();
      const expectedMetadata = generateMockMetadata();
      mockQuery.executeTakeFirst.mockResolvedValue(expectedMetadata);

      // Act
      const result = await service.getHypercertMetadata({
        claims_id: claimsId,
      });

      // Assert
      expect(mockConnection.selectFrom).toHaveBeenCalledWith("metadata");
      expect(mockQuery.leftJoin).toHaveBeenCalledWith(
        "claims",
        "metadata.uri",
        "claims.uri",
      );
      expect(mockQuery.selectAll).toHaveBeenCalledWith("metadata");
      expect(mockQuery.where).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toEqual(expectedMetadata);
    });

    it("should return metadata when searching by hypercert_id", async () => {
      // Arrange
      const hypercertId = generateHypercertId();
      const expectedMetadata = generateMockMetadata();
      mockQuery.executeTakeFirst.mockResolvedValue(expectedMetadata);

      // Act
      const result = await service.getHypercertMetadata({
        hypercert_id: hypercertId,
      });

      // Assert
      expect(mockConnection.selectFrom).toHaveBeenCalledWith("metadata");
      expect(mockQuery.leftJoin).toHaveBeenCalledWith(
        "claims",
        "metadata.uri",
        "claims.uri",
      );
      expect(mockQuery.selectAll).toHaveBeenCalledWith("metadata");
      expect(mockQuery.where).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toEqual(expectedMetadata);
    });

    it("should return undefined when no record is found", async () => {
      // Arrange
      const hypercertId = generateHypercertId();
      mockQuery.executeTakeFirst.mockResolvedValue(undefined);

      // Act
      const result = await service.getHypercertMetadata({
        hypercert_id: hypercertId,
      });

      // Assert
      expect(result).toBeUndefined();
      expect(mockConnection.selectFrom).toHaveBeenCalledWith("metadata");
    });

    it("should return null when no arguments are provided", async () => {
      // Act
      const result = await service.getHypercertMetadata({});

      // Assert
      expect(result).toBeNull();
      expect(mockConnection.selectFrom).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HypercertsService::getHypercertMetadata] No claims_id or hypercert_id provided",
        ),
      );
    });

    it("should handle database errors", async () => {
      // Arrange
      const claimsId = faker.string.uuid();
      const error = new Error("Database error");
      mockQuery.executeTakeFirst.mockRejectedValue(error);

      // Act & Assert
      await expect(
        service.getHypercertMetadata({ claims_id: claimsId }),
      ).rejects.toThrow();
    });
  });

  describe("getHypercertMetadataSets", () => {
    it("should return metadata sets when searching by claims_ids", async () => {
      // Arrange
      const claimsIds = [faker.string.uuid(), faker.string.uuid()];
      const expectedMetadata = [generateMockMetadata(), generateMockMetadata()];
      mockQuery.execute.mockResolvedValue(expectedMetadata);

      // Act
      const result = await service.getHypercertMetadataSets({
        claims_ids: claimsIds,
      });

      // Assert
      expect(mockConnection.selectFrom).toHaveBeenCalledWith("metadata");
      expect(mockQuery.leftJoin).toHaveBeenCalledWith(
        "claims",
        "metadata.uri",
        "claims.uri",
      );
      expect(mockQuery.selectAll).toHaveBeenCalledWith("metadata");
      expect(mockQuery.where).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toEqual(expectedMetadata);
    });

    it("should return metadata sets when searching by hypercert_ids", async () => {
      // Arrange
      const hypercertIds = [generateHypercertId(), generateHypercertId()];
      const expectedMetadata = [generateMockMetadata(), generateMockMetadata()];
      mockQuery.execute.mockResolvedValue(expectedMetadata);

      // Act
      const result = await service.getHypercertMetadataSets({
        hypercert_ids: hypercertIds,
      });

      // Assert
      expect(mockConnection.selectFrom).toHaveBeenCalledWith("metadata");
      expect(mockQuery.leftJoin).toHaveBeenCalledWith(
        "claims",
        "metadata.uri",
        "claims.uri",
      );
      expect(mockQuery.selectAll).toHaveBeenCalledWith("metadata");
      expect(mockQuery.where).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toEqual(expectedMetadata);
    });

    it("should return empty array when no records are found", async () => {
      // Arrange
      const hypercertIds = [generateHypercertId()];
      mockQuery.execute.mockResolvedValue([]);

      // Act
      const result = await service.getHypercertMetadataSets({
        hypercert_ids: hypercertIds,
      });

      // Assert
      expect(result).toEqual([]);
      expect(mockConnection.selectFrom).toHaveBeenCalledWith("metadata");
    });

    it("should return null when no arguments are provided", async () => {
      // Act
      const result = await service.getHypercertMetadataSets({});

      // Assert
      expect(result).toBeNull();
      expect(mockConnection.selectFrom).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HypercertsService::getHypercertMetadataSets] No claims_ids or hypercert_ids provided",
        ),
      );
    });

    it("should handle database errors", async () => {
      // Arrange
      const claimsIds = [faker.string.uuid(), faker.string.uuid()];
      const error = new Error("Database error");
      mockQuery.execute.mockRejectedValue(error);

      // Act & Assert
      await expect(
        service.getHypercertMetadataSets({ claims_ids: claimsIds }),
      ).rejects.toThrow();
    });
  });
});
