import { container } from "tsyringe";
import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DataKyselyService } from "../../../../src/client/kysely.js";
import { GetHyperboardsArgs } from "../../../../src/graphql/schemas/args/hyperboardArgs.js";
import { AllowlistRecordService } from "../../../../src/services/database/entities/AllowListRecordEntityService.js";
import { CollectionService } from "../../../../src/services/database/entities/CollectionEntityService.js";
import { FractionService } from "../../../../src/services/database/entities/FractionEntityService.js";
import { HyperboardService } from "../../../../src/services/database/entities/HyperboardEntityService.js";
import { HypercertsService } from "../../../../src/services/database/entities/HypercertsEntityService.js";
import { MetadataService } from "../../../../src/services/database/entities/MetadataEntityService.js";
import { UsersService } from "../../../../src/services/database/entities/UsersEntityService.js";
import { HyperboardResolver } from "../../../../src/services/graphql/resolvers/hyperboardResolver.js";
import {
  generateHypercertId,
  generateMockBlueprint,
  generateMockCollection,
  generateMockFraction,
  generateMockHyperboard,
  generateMockMetadata,
  generateMockUser,
} from "../../../utils/testUtils.js";

describe("HyperboardResolver", () => {
  let resolver: HyperboardResolver;
  let mockHyperboardService: {
    getHyperboards: Mock;
    getHyperboardCollections: Mock;
    getHyperboardHypercertMetadata: Mock;
    getHyperboardBlueprintMetadata: Mock;
    getHyperboardAdmins: Mock;
  };
  let mockFractionService: {
    getFractions: Mock;
  };
  let mockAllowlistRecordService: {
    getAllowlistRecords: Mock;
  };
  let mockHypercertsService: {
    getHypercerts: Mock;
    getHypercertMetadataSets: Mock;
  };
  let mockUsersService: {
    getUsers: Mock;
  };
  let mockCollectionService: {
    getCollectionHypercertIds: Mock;
    getCollectionBlueprints: Mock;
  };
  let mockHyperboard: ReturnType<typeof generateMockHyperboard>;

  beforeEach(() => {
    // Mock console methods
    vi.spyOn(console, "error").mockImplementation(() => {});

    // Create mock services
    mockHyperboardService = {
      getHyperboards: vi.fn(),
      getHyperboardCollections: vi.fn(),
      getHyperboardHypercertMetadata: vi.fn(),
      getHyperboardBlueprintMetadata: vi.fn(),
      getHyperboardAdmins: vi.fn(),
    };

    mockFractionService = {
      getFractions: vi.fn(),
    };

    mockAllowlistRecordService = {
      getAllowlistRecords: vi.fn(),
    };

    mockHypercertsService = {
      getHypercerts: vi.fn(),
      getHypercertMetadataSets: vi.fn(),
    };

    mockUsersService = {
      getUsers: vi.fn(),
    };

    mockCollectionService = {
      getCollectionHypercertIds: vi.fn(),
      getCollectionBlueprints: vi.fn(),
    };

    // Register mocks with the DI container
    container.registerInstance(
      HyperboardService,
      mockHyperboardService as unknown as HyperboardService,
    );
    container.registerInstance(
      FractionService,
      mockFractionService as unknown as FractionService,
    );
    container.registerInstance(
      AllowlistRecordService,
      mockAllowlistRecordService as unknown as AllowlistRecordService,
    );
    container.registerInstance(
      HypercertsService,
      mockHypercertsService as unknown as HypercertsService,
    );
    container.registerInstance(MetadataService, {} as MetadataService);
    container.registerInstance(
      UsersService,
      mockUsersService as unknown as UsersService,
    );
    container.registerInstance(
      CollectionService,
      mockCollectionService as unknown as CollectionService,
    );
    container.registerInstance(DataKyselyService, {} as DataKyselyService);

    // Create test data
    mockHyperboard = generateMockHyperboard();

    // Create resolver instance
    resolver = container.resolve(HyperboardResolver);
  });

  describe("hyperboards query", () => {
    it("should return hyperboards for given arguments", async () => {
      // Arrange
      const args: GetHyperboardsArgs = {
        where: {
          id: { eq: mockHyperboard.id },
        },
      };
      const expectedResult = {
        data: [mockHyperboard],
        count: 1,
      };
      mockHyperboardService.getHyperboards.mockResolvedValue(expectedResult);

      // Act
      const result = await resolver.hyperboards(args);

      // Assert
      expect(mockHyperboardService.getHyperboards).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should handle errors from hyperboardService", async () => {
      // Arrange
      const error = new Error("Service error");
      mockHyperboardService.getHyperboards.mockRejectedValue(error);

      // Act
      const result = await resolver.hyperboards({});

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HyperboardResolver::hyperboards] Error fetching hyperboards:",
        ),
      );
    });
  });

  describe("sections field resolver", () => {
    it("should resolve sections for a hyperboard", async () => {
      // Arrange
      const mockCollection = generateMockCollection();
      const mockHypercertId = generateHypercertId();
      const mockBlueprint = generateMockBlueprint();
      const mockUser = generateMockUser();
      const mockFraction = generateMockFraction();
      const mockMetadata = generateMockMetadata();

      // Setup mock responses with complete data structures
      mockHyperboardService.getHyperboardCollections.mockResolvedValue({
        data: [mockCollection],
        count: 1,
      });

      mockCollectionService.getCollectionHypercertIds.mockResolvedValue([
        { hypercert_id: mockHypercertId },
      ]);

      mockFractionService.getFractions.mockResolvedValue({
        data: [mockFraction],
        count: 1,
      });

      mockAllowlistRecordService.getAllowlistRecords.mockResolvedValue({
        data: [
          {
            hypercert_id: mockHypercertId,
            user_address: mockUser.address,
            claimed: false,
          },
        ],
        count: 1,
      });

      mockHypercertsService.getHypercerts.mockResolvedValue({
        data: [
          {
            hypercert_id: mockHypercertId,
            uri: mockMetadata.uri,
            units: "100000000",
            name: "Test Hypercert",
          },
        ],
        count: 1,
      });

      mockHypercertsService.getHypercertMetadataSets.mockResolvedValue([
        {
          ...mockMetadata,
          uri: mockMetadata.uri,
          name: "Test Hypercert",
        },
      ]);

      mockCollectionService.getCollectionBlueprints.mockResolvedValue({
        data: [mockBlueprint],
        count: 1,
      });

      mockHyperboardService.getHyperboardHypercertMetadata.mockResolvedValue([
        {
          hypercert_id: mockHypercertId,
          display_size: 1,
        },
      ]);

      mockHyperboardService.getHyperboardBlueprintMetadata.mockResolvedValue([
        {
          blueprint_id: mockBlueprint.id,
          display_size: 1,
        },
      ]);

      mockUsersService.getUsers.mockResolvedValue({
        data: [mockUser],
        count: 1,
      });

      // Act
      const result = await resolver.sections(mockHyperboard);

      // Assert
      expect(result).toBeTruthy();
      if (!result) {
        throw new Error("Result should not be null");
      }

      expect(result).toHaveLength(1);
      expect(result[0].data).toHaveLength(1);
      expect(
        mockHyperboardService.getHyperboardCollections,
      ).toHaveBeenCalledWith(mockHyperboard.id);

      // Verify the section data structure
      const section = result[0].data[0];
      expect(section).toHaveProperty("label");
      expect(section).toHaveProperty("collection");
      expect(section).toHaveProperty("entries");
      expect(section).toHaveProperty("owners");
      expect(section.collection).toBeDefined();
      expect(section.entries).toBeInstanceOf(Array);
      expect(section.owners).toBeInstanceOf(Array);
    });

    it("should return empty sections when hyperboard has no id", async () => {
      // Arrange
      const hyperboardWithoutId = { ...mockHyperboard, id: undefined };

      // Act
      const result = await resolver.sections(hyperboardWithoutId);

      // Assert
      expect(result).toBeNull();
      expect(
        mockHyperboardService.getHyperboardCollections,
      ).not.toHaveBeenCalled();
    });

    it("should handle errors from services", async () => {
      // Arrange
      const error = new Error("Service error");
      mockHyperboardService.getHyperboardCollections.mockRejectedValue(error);

      // Act
      const result = await resolver.sections(mockHyperboard);

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HyperboardResolver::sections] Error fetching sections for hyperboard",
        ),
      );
    });
  });

  describe("owners field resolver", () => {
    it("should resolve owners for a hyperboard", async () => {
      // Arrange
      const mockUsers = [generateMockUser(), generateMockUser()];
      mockHyperboardService.getHyperboardCollections.mockResolvedValue({
        data: [generateMockCollection()],
      });
      mockUsersService.getUsers.mockResolvedValue({ data: mockUsers });

      // Act
      const result = await resolver.owners(mockHyperboard);

      // Assert
      expect(Array.isArray(result)).toBe(true);
      expect(
        mockHyperboardService.getHyperboardCollections,
      ).toHaveBeenCalledWith(mockHyperboard.id);
    });

    it("should handle errors", async () => {
      // Arrange
      const error = new Error("Service error");
      mockHyperboardService.getHyperboardCollections.mockRejectedValue(error);

      // Act
      const result = await resolver.owners(mockHyperboard);

      // Assert
      expect(result).toEqual([]);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HyperboardResolver::sections] Error fetching sections for hyperboard",
        ),
      );
    });
  });

  describe("admins field resolver", () => {
    it("should resolve admins for a hyperboard", async () => {
      // Arrange
      const expectedAdmins = [generateMockUser(), generateMockUser()];
      mockHyperboardService.getHyperboardAdmins.mockResolvedValue(
        expectedAdmins,
      );

      // Act
      const result = await resolver.admins(mockHyperboard);

      // Assert
      expect(mockHyperboardService.getHyperboardAdmins).toHaveBeenCalledWith(
        mockHyperboard.id,
      );
      expect(result).toEqual(expectedAdmins);
    });

    it("should return empty array when hyperboard has no id", async () => {
      // Arrange
      const hyperboardWithoutId = { ...mockHyperboard, id: undefined };

      // Act
      const result = await resolver.admins(hyperboardWithoutId);

      // Assert
      expect(result).toBeNull();
      expect(mockHyperboardService.getHyperboardAdmins).not.toHaveBeenCalled();
    });

    it("should handle errors from hyperboardService", async () => {
      // Arrange
      const error = new Error("Service error");
      mockHyperboardService.getHyperboardAdmins.mockRejectedValue(error);

      // Act
      const result = await resolver.admins(mockHyperboard);

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HyperboardResolver::admins] Error fetching admins for hyperboard",
        ),
      );
    });
  });
});
