import { faker } from "@faker-js/faker";
import { container } from "tsyringe";
import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CachingKyselyService } from "../../../../src/client/kysely.js";
import type { GetMetadataArgs } from "../../../../src/graphql/schemas/args/metadataArgs.js";
import type { Metadata } from "../../../../src/graphql/schemas/typeDefs/metadataTypeDefs.js";
import { MetadataService } from "../../../../src/services/database/entities/MetadataEntityService.js";
import { MetadataResolver } from "../../../../src/services/graphql/resolvers/metadataResolver.js";
import {
  generateMinimalMockMetadata,
  generateMockMetadata,
} from "../../../utils/testUtils.js";

describe("MetadataResolver", () => {
  let resolver: MetadataResolver;
  let mockMetadataService: {
    getMetadata: Mock;
  };
  let mockCachingKyselyService: {
    getConnection: Mock;
  };
  let mockConnection: {
    selectFrom: Mock;
  };
  let mockQuery: {
    where: Mock;
    select: Mock;
    executeTakeFirst: Mock;
  };

  beforeEach(() => {
    // Create mock services
    mockQuery = {
      where: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      executeTakeFirst: vi.fn(),
    };

    mockConnection = {
      selectFrom: vi.fn().mockReturnValue(mockQuery),
    };

    mockCachingKyselyService = {
      getConnection: vi.fn().mockReturnValue(mockConnection),
    };

    mockMetadataService = {
      getMetadata: vi.fn(),
    };

    // Register mocks with the DI container
    container.registerInstance(
      MetadataService,
      mockMetadataService as unknown as MetadataService,
    );
    container.registerInstance(
      CachingKyselyService,
      mockCachingKyselyService as unknown as CachingKyselyService,
    );

    // Resolve the resolver with mocked dependencies
    resolver = container.resolve(MetadataResolver);
  });

  describe("metadata query resolver", () => {
    it("should return metadata records for given arguments", async () => {
      // Arrange
      const mockMetadata1 = generateMockMetadata();
      const mockMetadata2 = generateMockMetadata();
      const args: GetMetadataArgs = {
        where: {
          uri: { eq: mockMetadata1.uri },
        },
      };
      const expectedResult = {
        data: [mockMetadata1, mockMetadata2],
        count: 2,
      };
      mockMetadataService.getMetadata.mockResolvedValue(expectedResult);

      // Act
      const result = await resolver.metadata(args);

      // Assert
      expect(mockMetadataService.getMetadata).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should handle empty result set", async () => {
      // Arrange
      const args: GetMetadataArgs = {
        where: {
          uri: { eq: `ipfs://${faker.string.alphanumeric(46)}` },
        },
      };
      const expectedResult = {
        data: [],
        count: 0,
      };
      mockMetadataService.getMetadata.mockResolvedValue(expectedResult);

      // Act
      const result = await resolver.metadata(args);

      // Assert
      expect(mockMetadataService.getMetadata).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should handle errors from metadata service", async () => {
      // Arrange
      const args: GetMetadataArgs = {};
      const error = new Error("Service error");
      mockMetadataService.getMetadata.mockRejectedValue(error);

      // Act
      const result = await resolver.metadata(args);

      // Assert
      expect(result).toBeNull();
      expect(mockMetadataService.getMetadata).toHaveBeenCalledWith(args);
    });
  });

  describe("image field resolver", () => {
    it("should resolve image for metadata with uri", async () => {
      // Arrange
      const metadata = generateMinimalMockMetadata();
      const expectedImage = faker.image.dataUri();
      mockQuery.executeTakeFirst.mockResolvedValue({ image: expectedImage });

      // Act
      const result = await resolver.image(metadata as Metadata);

      // Assert
      expect(mockConnection.selectFrom).toHaveBeenCalledWith("metadata");
      expect(mockQuery.where).toHaveBeenCalledWith("uri", "=", metadata.uri);
      expect(mockQuery.select).toHaveBeenCalledWith("image");
      expect(result).toBe(expectedImage);
    });

    it("should return null when metadata has no uri", async () => {
      // Arrange
      const metadata = { id: faker.string.uuid() };

      // Act
      const result = await resolver.image(metadata as Metadata);

      // Assert
      expect(result).toBeNull();
      expect(mockConnection.selectFrom).not.toHaveBeenCalled();
    });

    it("should return null when image query returns no result", async () => {
      // Arrange
      const metadata = generateMinimalMockMetadata();
      mockQuery.executeTakeFirst.mockResolvedValue(null);

      // Act
      const result = await resolver.image(metadata as Metadata);

      // Assert
      expect(result).toBeNull();
      expect(mockConnection.selectFrom).toHaveBeenCalledWith("metadata");
    });

    it("should handle errors from database query", async () => {
      // Arrange
      const metadata = generateMinimalMockMetadata();
      const error = new Error("Database error");
      mockQuery.executeTakeFirst.mockRejectedValue(error);

      // Act
      const result = await resolver.image(metadata as Metadata);

      // Assert
      expect(result).toBeNull();
      expect(mockConnection.selectFrom).toHaveBeenCalledWith("metadata");
    });
  });
});
