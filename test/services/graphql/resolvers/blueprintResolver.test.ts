import { container } from "tsyringe";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { GetBlueprintsArgs } from "../../../../src/graphql/schemas/args/blueprintArgs.js";
import { Blueprint } from "../../../../src/graphql/schemas/typeDefs/blueprintTypeDefs.js";
import { BlueprintsService } from "../../../../src/services/database/entities/BlueprintsEntityService.js";
import { HypercertsService } from "../../../../src/services/database/entities/HypercertsEntityService.js";
import { BlueprintResolver } from "../../../../src/services/graphql/resolvers/blueprintResolver.js";
import {
  generateMockAddress,
  generateMockBlueprint,
} from "../../../utils/testUtils.js";

describe("BlueprintResolver", () => {
  let resolver: BlueprintResolver;
  let mockBlueprintsService: {
    getBlueprints: Mock;
    getBlueprintAdmins: Mock;
  };
  let mockHypercertsService: {
    getHypercerts: Mock;
  };

  beforeEach(() => {
    // Create mock services
    mockBlueprintsService = {
      getBlueprints: vi.fn(),
      getBlueprintAdmins: vi.fn(),
    };
    mockHypercertsService = {
      getHypercerts: vi.fn(),
    };

    // Register mocks with the DI container
    container.registerInstance(
      BlueprintsService,
      mockBlueprintsService as unknown as BlueprintsService,
    );
    container.registerInstance(
      HypercertsService,
      mockHypercertsService as unknown as HypercertsService,
    );

    // Create resolver instance
    resolver = container.resolve(BlueprintResolver);
  });

  describe("blueprints", () => {
    it("should return blueprints data when successful", async () => {
      // Arrange
      const args: GetBlueprintsArgs = {
        where: { id: { eq: 1 } },
      };
      const mockBlueprint = generateMockBlueprint();
      const mockResponse = {
        data: [mockBlueprint as unknown as Blueprint],
        count: 1,
      };
      mockBlueprintsService.getBlueprints.mockResolvedValue(mockResponse);

      // Act
      const result = await resolver.blueprints(args);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(mockBlueprintsService.getBlueprints).toHaveBeenCalledWith(args);
    });

    it("should return null when an error occurs", async () => {
      // Arrange
      const args: GetBlueprintsArgs = {
        where: { id: { eq: 1 } },
      };
      mockBlueprintsService.getBlueprints.mockRejectedValue(
        new Error("Test error"),
      );

      // Act
      const result = await resolver.blueprints(args);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe("admins", () => {
    it("should return admins data when successful", async () => {
      // Arrange
      const blueprint = generateMockBlueprint() as unknown as Blueprint;
      const mockAdmins = [
        {
          address: generateMockAddress(),
          display_name: "Test Admin",
          avatar: "test-avatar",
        },
      ];
      mockBlueprintsService.getBlueprintAdmins.mockResolvedValue(mockAdmins);

      // Act
      const result = await resolver.admins(blueprint);

      // Assert
      expect(result).toEqual(mockAdmins);
      expect(mockBlueprintsService.getBlueprintAdmins).toHaveBeenCalledWith(
        blueprint.id,
      );
    });

    it("should return empty array when blueprint has no id", async () => {
      // Arrange
      const blueprint = generateMockBlueprint() as unknown as Blueprint;
      blueprint.id = undefined;

      // Act
      const result = await resolver.admins(blueprint);

      // Assert
      expect(result).toEqual([]);
      expect(mockBlueprintsService.getBlueprintAdmins).not.toHaveBeenCalled();
    });

    it("should return empty array when an error occurs", async () => {
      // Arrange
      const blueprint = generateMockBlueprint() as unknown as Blueprint;
      mockBlueprintsService.getBlueprintAdmins.mockRejectedValue(
        new Error("Test error"),
      );

      // Act
      const result = await resolver.admins(blueprint);

      // Assert
      expect(result).toEqual([]);
    });
  });

  describe("hypercerts", () => {
    it("should return hypercerts data when successful", async () => {
      // Arrange
      const blueprint = generateMockBlueprint() as unknown as Blueprint;
      const hypercertIds = blueprint.hypercert_ids as string[];
      const mockResponse = {
        data: [
          {
            id: hypercertIds[0],
            hypercert_id: hypercertIds[0],
            metadata: {
              name: "Test Hypercert",
              description: "Test Description",
            },
          },
        ],
        count: 1,
      };
      mockHypercertsService.getHypercerts.mockResolvedValue(mockResponse);

      // Act
      const result = await resolver.hypercerts(blueprint);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(mockHypercertsService.getHypercerts).toHaveBeenCalledWith({
        where: { hypercert_id: { in: hypercertIds } },
      });
    });

    it("should return null when blueprint has no hypercert ids", async () => {
      // Arrange
      const blueprint = generateMockBlueprint() as unknown as Blueprint;
      blueprint.hypercert_ids = [];

      // Act
      const result = await resolver.hypercerts(blueprint);

      // Assert
      expect(result).toBeNull();
      expect(mockHypercertsService.getHypercerts).not.toHaveBeenCalled();
    });

    it("should return null when an error occurs", async () => {
      // Arrange
      const blueprint = generateMockBlueprint() as unknown as Blueprint;
      mockHypercertsService.getHypercerts.mockRejectedValue(
        new Error("Test error"),
      );

      // Act
      const result = await resolver.hypercerts(blueprint);

      // Assert
      expect(result).toBeNull();
    });
  });
});
