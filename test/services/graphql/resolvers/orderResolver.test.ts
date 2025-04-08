import { container } from "tsyringe";
import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GetOrdersArgs } from "../../../../src/graphql/schemas/args/orderArgs.js";
import { Order } from "../../../../src/graphql/schemas/typeDefs/orderTypeDefs.js";
import { HypercertsService } from "../../../../src/services/database/entities/HypercertsEntityService.js";
import { MarketplaceOrdersService } from "../../../../src/services/database/entities/MarketplaceOrdersEntityService.js";
import { OrderResolver } from "../../../../src/services/graphql/resolvers/orderResolver.js";
import {
  generateMockHypercert,
  generateMockOrder,
} from "../../../utils/testUtils.js";

vi.mock(
  "../../../../src/utils/getTokenPriceInUSD.js",
  async (importOriginal) => {
    const actual =
      await importOriginal<
        typeof import("../../../../src/utils/getTokenPriceInUSD.js")
      >();
    return {
      ...actual,
      getTokenPriceInUSD: vi.fn().mockResolvedValue(100),
    };
  },
);

/**
 * Test suite for OrderResolver.
 * Tests the GraphQL resolver functionality for marketplace orders.
 *
 * Tests cover:
 * - Query resolution for orders with various filters
 * - Field resolution for related entities:
 *   - hypercert: Associated hypercert details and metadata
 * - Error handling for all operations
 * - Price calculation in USD
 */
describe("OrderResolver", () => {
  let resolver: OrderResolver;
  let mockMarketplaceOrdersService: {
    getOrders: Mock;
  };
  let mockHypercertService: {
    getHypercerts: Mock;
    getHypercert: Mock;
    getHypercertMetadata: Mock;
  };
  let mockOrder: ReturnType<typeof generateMockOrder>;
  let mockHypercert: ReturnType<typeof generateMockHypercert>;

  beforeEach(() => {
    // Mock console methods
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});

    // Create mock services
    mockMarketplaceOrdersService = {
      getOrders: vi.fn(),
    };

    mockHypercertService = {
      getHypercerts: vi.fn(),
      getHypercert: vi.fn(),
      getHypercertMetadata: vi.fn(),
    };

    // Register mocks with the DI container
    container.registerInstance(
      MarketplaceOrdersService,
      mockMarketplaceOrdersService as unknown as MarketplaceOrdersService,
    );
    container.registerInstance(
      HypercertsService,
      mockHypercertService as unknown as HypercertsService,
    );

    // Create test data
    mockHypercert = generateMockHypercert();
    mockOrder = generateMockOrder({ hypercert_id: mockHypercert.hypercert_id });

    // Create resolver instance
    resolver = container.resolve(OrderResolver);
  });

  describe("orders query", () => {
    it("should return orders with USD prices for given arguments", async () => {
      // Arrange
      const args: GetOrdersArgs = {
        where: {
          hypercert_id: { eq: mockOrder.hypercert_id },
        },
      };
      const expectedResult = {
        data: [mockOrder],
        count: 1,
      };
      mockMarketplaceOrdersService.getOrders.mockResolvedValue(expectedResult);
      mockHypercertService.getHypercerts.mockResolvedValue({
        data: [{ ...mockHypercert, units: BigInt(1000000) }],
      });

      // Act
      const result = await resolver.orders(args);

      // Assert
      expect(mockMarketplaceOrdersService.getOrders).toHaveBeenCalledWith(args);
      expect(mockHypercertService.getHypercerts).toHaveBeenCalledWith({
        where: {
          hypercert_id: { in: [mockOrder.hypercert_id?.toLowerCase()] },
        },
      });

      console.log(result.data[0]);
      expect(result.data[0]).toHaveProperty("pricePerPercentInUSD");
      expect(result.count).toBe(1);
    });

    it("should handle empty orders response", async () => {
      // Arrange
      mockMarketplaceOrdersService.getOrders.mockResolvedValue({
        data: [],
        count: 0,
      });

      // Act
      const result = await resolver.orders({});

      // Assert
      expect(result).toEqual({
        data: [],
        count: 0,
      });
    });

    it("should handle missing hypercert units", async () => {
      // Arrange
      const ordersResponse = {
        data: [mockOrder],
        count: 1,
      };
      mockMarketplaceOrdersService.getOrders.mockResolvedValue(ordersResponse);
      mockHypercertService.getHypercerts.mockResolvedValue({
        data: [{ ...mockHypercert, units: undefined }],
      });

      // Act
      const result = await resolver.orders({});

      // Assert
      expect(result.data[0]).not.toHaveProperty("priceInUsd");
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining("No hypercert units found for hypercert_id:"),
      );
    });

    it("should throw error on service failure", async () => {
      // Arrange
      const error = new Error("Service error");
      mockMarketplaceOrdersService.getOrders.mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.orders({})).rejects.toThrow(
        "[OrderResolver::orders] Error fetching orders:",
      );
    });
  });

  describe("hypercert field resolver", () => {
    it("should resolve hypercert with metadata", async () => {
      // Arrange
      const mockMetadata = {
        name: "Test Hypercert",
        description: "Test Description",
      };
      mockHypercertService.getHypercert.mockResolvedValue(mockHypercert);
      mockHypercertService.getHypercertMetadata.mockResolvedValue(mockMetadata);

      // Act
      const result = await resolver.hypercert(mockOrder as unknown as Order);

      // Assert
      expect(result).toEqual({
        ...mockHypercert,
        metadata: mockMetadata,
      });
    });

    it("should handle missing required fields", async () => {
      // Arrange
      const invalidOrder = generateMockOrder({ itemIds: undefined });

      // Act
      const result = await resolver.hypercert(invalidOrder as unknown as Order);

      // Assert
      expect(result).toBeNull();
      expect(console.warn).toHaveBeenCalledWith(
        "[OrderResolver::hypercert] Missing tokenId or collectionId",
      );
    });

    it("should handle missing metadata", async () => {
      // Arrange
      mockHypercertService.getHypercert.mockResolvedValue(mockHypercert);
      mockHypercertService.getHypercertMetadata.mockResolvedValue(null);

      // Act
      const result = await resolver.hypercert(mockOrder as unknown as Order);

      // Assert
      expect(result).toEqual({
        ...mockHypercert,
        metadata: null,
      });
    });

    it("should handle service errors gracefully", async () => {
      // Arrange
      const error = new Error("Service error");
      mockHypercertService.getHypercert.mockRejectedValue(error);

      // Act
      const result = await resolver.hypercert(mockOrder as unknown as Order);

      // Assert
      expect(result).toBeNull();
    });
  });
});
