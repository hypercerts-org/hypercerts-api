import { container } from "tsyringe";
import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetCollectionsArgs } from "../../../../src/graphql/schemas/args/collectionArgs.js";
import type { Collection } from "../../../../src/graphql/schemas/typeDefs/collectionTypeDefs.js";
import { CollectionService } from "../../../../src/services/database/entities/CollectionEntityService.js";
import { CollectionResolver } from "../../../../src/services/graphql/resolvers/collectionResolver.js";
import { faker } from "@faker-js/faker";
import {
  generateMockBlueprint,
  generateMockUser,
} from "../../../utils/testUtils.js";

describe("CollectionResolver", () => {
  let resolver: CollectionResolver;
  let mockCollectionService: {
    getCollections: Mock;
    getCollectionHypercerts: Mock;
    getCollectionAdmins: Mock;
    getCollectionBlueprints: Mock;
  };
  let mockCollection: Collection;

  beforeEach(() => {
    // Mock console methods
    vi.spyOn(console, "error").mockImplementation(() => {});

    // Create mock service
    mockCollectionService = {
      getCollections: vi.fn(),
      getCollectionHypercerts: vi.fn(),
      getCollectionAdmins: vi.fn(),
      getCollectionBlueprints: vi.fn(),
    };

    // Register mock with the DI container
    container.registerInstance(
      CollectionService,
      mockCollectionService as unknown as CollectionService,
    );

    // Create test data
    mockCollection = {
      id: faker.string.uuid(),
      name: faker.company.name(),
      description: faker.lorem.paragraph(),
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.recent().toISOString(),
    } as Collection;

    // Create resolver instance
    resolver = container.resolve(CollectionResolver);
  });

  describe("collections query", () => {
    it("should return collections for given arguments", async () => {
      // Arrange
      const args: GetCollectionsArgs = {
        where: {
          name: { contains: mockCollection.name },
        },
      };
      const expectedResult = {
        data: [mockCollection],
        count: 1,
      };
      mockCollectionService.getCollections.mockResolvedValue(expectedResult);

      // Act
      const result = await resolver.collections(args);

      // Assert
      expect(mockCollectionService.getCollections).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should handle errors from collectionService", async () => {
      // Arrange
      const error = new Error("Service error");
      mockCollectionService.getCollections.mockRejectedValue(error);

      // Act
      const result = await resolver.collections({});

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[CollectionResolver::collections] Error fetching collections:",
        ),
      );
    });
  });

  describe("hypercerts field resolver", () => {
    it("should resolve hypercerts for a collection", async () => {
      // Arrange
      const expectedHypercerts = [
        { id: faker.string.uuid(), name: faker.company.name() },
        { id: faker.string.uuid(), name: faker.company.name() },
      ];
      mockCollectionService.getCollectionHypercerts.mockResolvedValue(
        expectedHypercerts,
      );

      // Act
      const result = await resolver.hypercerts(mockCollection);

      // Assert
      expect(
        mockCollectionService.getCollectionHypercerts,
      ).toHaveBeenCalledWith(mockCollection.id);
      expect(result).toEqual(expectedHypercerts);
    });

    it("should return null when collection has no id", async () => {
      // Arrange
      const collectionWithoutId = { ...mockCollection, id: undefined };

      // Act
      const result = await resolver.hypercerts(collectionWithoutId);

      // Assert
      expect(result).toBeNull();
      expect(
        mockCollectionService.getCollectionHypercerts,
      ).not.toHaveBeenCalled();
    });

    it("should handle errors from collectionService", async () => {
      // Arrange
      const error = new Error("Service error");
      mockCollectionService.getCollectionHypercerts.mockRejectedValue(error);

      // Act
      const result = await resolver.hypercerts(mockCollection);

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[CollectionResolver::hypercerts] Error fetching hypercerts:",
        ),
      );
    });
  });

  describe("admins field resolver", () => {
    it("should resolve admins for a collection", async () => {
      // Arrange
      const expectedAdmins = [generateMockUser(), generateMockUser()];
      mockCollectionService.getCollectionAdmins.mockResolvedValue(
        expectedAdmins,
      );

      // Act
      const result = await resolver.admins(mockCollection);

      // Assert
      expect(mockCollectionService.getCollectionAdmins).toHaveBeenCalledWith(
        mockCollection.id,
      );
      expect(result).toEqual(expectedAdmins);
    });

    it("should return null when collection has no id", async () => {
      // Arrange
      const collectionWithoutId = { ...mockCollection, id: undefined };

      // Act
      const result = await resolver.admins(collectionWithoutId);

      // Assert
      expect(result).toBeNull();
      expect(mockCollectionService.getCollectionAdmins).not.toHaveBeenCalled();
    });

    it("should handle errors from collectionService", async () => {
      // Arrange
      const error = new Error("Service error");
      mockCollectionService.getCollectionAdmins.mockRejectedValue(error);

      // Act
      const result = await resolver.admins(mockCollection);

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[CollectionResolver::admins] Error fetching admins:",
        ),
      );
    });
  });

  describe("blueprints field resolver", () => {
    it("should resolve blueprints for a collection", async () => {
      // Arrange
      const expectedBlueprints = [
        generateMockBlueprint(),
        generateMockBlueprint(),
      ];
      mockCollectionService.getCollectionBlueprints.mockResolvedValue(
        expectedBlueprints,
      );

      // Act
      const result = await resolver.blueprints(mockCollection);

      // Assert
      expect(
        mockCollectionService.getCollectionBlueprints,
      ).toHaveBeenCalledWith(mockCollection.id);
      expect(result).toEqual(expectedBlueprints);
    });

    it("should return null when collection has no id", async () => {
      // Arrange
      const collectionWithoutId = { ...mockCollection, id: undefined };

      // Act
      const result = await resolver.blueprints(collectionWithoutId);

      // Assert
      expect(result).toBeNull();
      expect(
        mockCollectionService.getCollectionBlueprints,
      ).not.toHaveBeenCalled();
    });

    it("should handle errors from collectionService", async () => {
      // Arrange
      const error = new Error("Service error");
      mockCollectionService.getCollectionBlueprints.mockRejectedValue(error);

      // Act
      const result = await resolver.blueprints(mockCollection);

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[CollectionResolver::blueprints] Error fetching blueprints:",
        ),
      );
    });
  });
});
