import { parseClaimOrFractionId } from "@hypercerts-org/sdk";
import { container } from "tsyringe";
import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { GetFractionsArgs } from "../../../../src/graphql/schemas/args/fractionArgs.js";
import type { Fraction } from "../../../../src/graphql/schemas/typeDefs/fractionTypeDefs.js";
import { FractionService } from "../../../../src/services/database/entities/FractionEntityService.js";
import { MarketplaceOrdersService } from "../../../../src/services/database/entities/MarketplaceOrdersEntityService.js";
import { MetadataService } from "../../../../src/services/database/entities/MetadataEntityService.js";
import { SalesService } from "../../../../src/services/database/entities/SalesEntityService.js";
import { FractionResolver } from "../../../../src/services/graphql/resolvers/fractionResolver.js";
import { generateMockFraction } from "../../../utils/testUtils.js";

vi.mock("@hypercerts-org/sdk", () => ({
  parseClaimOrFractionId: vi.fn(),
}));

describe("FractionResolver", () => {
  let resolver: FractionResolver;
  let mockFractionService: {
    getFractions: Mock;
  };
  let mockMetadataService: {
    getMetadataSingle: Mock;
  };
  let mockSalesService: {
    getSales: Mock;
  };
  let mockMarketplaceOrdersService: {
    getOrders: Mock;
  };
  let mockFraction: Fraction;

  beforeEach(() => {
    // Create mock services
    mockFractionService = {
      getFractions: vi.fn(),
    };

    mockMetadataService = {
      getMetadataSingle: vi.fn(),
    };

    mockSalesService = {
      getSales: vi.fn(),
    };

    mockMarketplaceOrdersService = {
      getOrders: vi.fn(),
    };

    // Register mocks with the DI container
    container.registerInstance(
      FractionService,
      mockFractionService as unknown as FractionService,
    );
    container.registerInstance(
      MetadataService,
      mockMetadataService as unknown as MetadataService,
    );
    container.registerInstance(
      SalesService,
      mockSalesService as unknown as SalesService,
    );
    container.registerInstance(
      MarketplaceOrdersService,
      mockMarketplaceOrdersService as unknown as MarketplaceOrdersService,
    );

    // Create test data
    mockFraction = generateMockFraction();

    // Resolve the resolver with mocked dependencies
    resolver = container.resolve(FractionResolver);
  });

  describe("fractions query", () => {
    it("should return fractions for given arguments", async () => {
      // Arrange
      const args: GetFractionsArgs = {
        where: { hypercert_id: { eq: mockFraction.hypercert_id } },
      };
      const expectedResult = {
        data: [mockFraction],
        count: 1,
      };
      mockFractionService.getFractions.mockResolvedValue(expectedResult);

      // Act
      const result = await resolver.fractions(args);

      // Assert
      expect(mockFractionService.getFractions).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should handle errors from fractionService", async () => {
      // Arrange
      const error = new Error("Service error");
      mockFractionService.getFractions.mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.fractions({})).resolves.toBeNull();
    });
  });

  describe("metadata field resolver", () => {
    it("should resolve metadata for valid fraction data", async () => {
      // Arrange
      const expectedMetadata = {
        id: "test-metadata",
        name: "Test Metadata",
      };
      mockMetadataService.getMetadataSingle.mockResolvedValue(expectedMetadata);

      // Act
      const result = await resolver.metadata(mockFraction);

      // Assert
      expect(mockMetadataService.getMetadataSingle).toHaveBeenCalledWith({
        where: { hypercerts: { id: { eq: mockFraction.claims_id } } },
      });
      expect(result).toEqual(expectedMetadata);
    });

    it("should return null when fraction has no claims_id", async () => {
      // Arrange
      const fractionWithoutClaimsId: Fraction = {
        ...mockFraction,
        claims_id: undefined,
      };

      // Act
      const result = await resolver.metadata(fractionWithoutClaimsId);

      // Assert
      expect(result).toBeNull();
      expect(mockMetadataService.getMetadataSingle).not.toHaveBeenCalled();
    });
  });

  describe("orders field resolver", () => {
    it("should resolve orders for valid fraction data", async () => {
      // Arrange
      const parsedId = "123";
      (parseClaimOrFractionId as Mock).mockReturnValue({ id: parsedId });
      const expectedOrders = {
        data: [{ id: "order-1" }],
        count: 1,
      };
      mockMarketplaceOrdersService.getOrders.mockResolvedValue(expectedOrders);

      // Act
      const result = await resolver.orders(mockFraction);

      // Assert
      expect(mockMarketplaceOrdersService.getOrders).toHaveBeenCalledWith({
        where: {
          itemIds: {
            arrayContains: [parsedId],
          },
        },
      });
      expect(result).toEqual(expectedOrders);
    });

    it("should return null when fraction has no fraction_id", async () => {
      // Arrange
      const fractionWithoutId: Fraction = {
        ...mockFraction,
        fraction_id: undefined,
      };

      // Act
      const result = await resolver.orders(fractionWithoutId);

      // Assert
      expect(result).toBeNull();
      expect(mockMarketplaceOrdersService.getOrders).not.toHaveBeenCalled();
    });

    it("should handle invalid fraction_id parsing", async () => {
      // Arrange
      (parseClaimOrFractionId as Mock).mockReturnValue({ id: undefined });

      // Act
      const result = await resolver.orders(mockFraction);

      // Assert
      expect(result).toBeNull();
      expect(mockMarketplaceOrdersService.getOrders).not.toHaveBeenCalled();
    });

    it("should handle errors from marketplaceOrdersService", async () => {
      // Arrange
      (parseClaimOrFractionId as Mock).mockReturnValue({ id: "123" });
      const error = new Error("Service error");
      mockMarketplaceOrdersService.getOrders.mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.orders(mockFraction)).resolves.toBeNull();
    });
  });

  describe("sales field resolver", () => {
    it("should resolve sales for valid fraction data", async () => {
      // Arrange
      const parsedId = "123";
      (parseClaimOrFractionId as Mock).mockReturnValue({ id: parsedId });
      const expectedSales = {
        data: [{ id: "sale-1" }],
        count: 1,
      };
      mockSalesService.getSales.mockResolvedValue(expectedSales);

      // Act
      const result = await resolver.sales(mockFraction);

      // Assert
      expect(mockSalesService.getSales).toHaveBeenCalledWith({
        where: {
          item_ids: {
            arrayContains: [parsedId],
          },
        },
      });
      expect(result).toEqual(expectedSales);
    });

    it("should return null when fraction has no fraction_id", async () => {
      // Arrange
      const fractionWithoutId: Fraction = {
        ...mockFraction,
        fraction_id: undefined,
      };

      // Act
      const result = await resolver.sales(fractionWithoutId);

      // Assert
      expect(result).toBeNull();
      expect(mockSalesService.getSales).not.toHaveBeenCalled();
    });

    it("should handle invalid fraction_id parsing", async () => {
      // Arrange
      (parseClaimOrFractionId as Mock).mockReturnValue({ id: undefined });

      // Act
      const result = await resolver.sales(mockFraction);

      // Assert
      expect(result).toBeNull();
      expect(mockSalesService.getSales).not.toHaveBeenCalled();
    });

    it("should handle errors from salesService", async () => {
      // Arrange
      (parseClaimOrFractionId as Mock).mockReturnValue({ id: "123" });
      const error = new Error("Service error");
      mockSalesService.getSales.mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.sales(mockFraction)).resolves.toBeNull();
    });
  });
});
