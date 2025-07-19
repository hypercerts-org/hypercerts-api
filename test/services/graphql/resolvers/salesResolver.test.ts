import { container } from "tsyringe";
import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { GetSalesArgs } from "../../../../src/graphql/schemas/args/salesArgs.js";
import type { Sale } from "../../../../src/graphql/schemas/typeDefs/salesTypeDefs.js";
import { SalesService } from "../../../../src/services/database/entities/SalesEntityService.js";
import { HypercertsService } from "../../../../src/services/database/entities/HypercertsEntityService.js";
import { SalesResolver } from "../../../../src/services/graphql/resolvers/salesResolver.js";
import { faker } from "@faker-js/faker";
import { generateHypercertId } from "../../../utils/testUtils.js";

describe("SalesResolver", () => {
  let resolver: SalesResolver;
  let mockSalesService: {
    getSales: Mock;
  };
  let mockHypercertsService: {
    getHypercert: Mock;
    getHypercertMetadata: Mock;
  };
  let mockSale: Sale;

  beforeEach(() => {
    // Mock console methods
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});

    // Create mock services
    mockSalesService = {
      getSales: vi.fn(),
    };

    mockHypercertsService = {
      getHypercert: vi.fn(),
      getHypercertMetadata: vi.fn(),
    };

    // Register mocks with the DI container
    container.registerInstance(
      SalesService,
      mockSalesService as unknown as SalesService,
    );
    container.registerInstance(
      HypercertsService,
      mockHypercertsService as unknown as HypercertsService,
    );

    // Create test data
    mockSale = {
      id: faker.string.uuid(),
      hypercert_id: generateHypercertId(),
      buyer: faker.string.alphanumeric(42),
      seller: faker.string.alphanumeric(42),
      currency: faker.string.alphanumeric(42),
      collection: faker.string.alphanumeric(42),
      transaction_hash: faker.string.alphanumeric(66),
    } as Sale;

    // Create a new instance for each test
    resolver = container.resolve(SalesResolver);
  });

  describe("sales query resolver", () => {
    it("should return sales for given arguments", async () => {
      // Arrange
      const args: GetSalesArgs = {
        where: {
          hypercert_id: { eq: generateHypercertId() },
        },
      };
      const expectedResult = {
        data: [mockSale],
        count: 1,
      };
      mockSalesService.getSales.mockResolvedValue(expectedResult);

      // Act
      const result = await resolver.sales(args);

      // Assert
      expect(mockSalesService.getSales).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should return null when service throws error", async () => {
      // Arrange
      const args: GetSalesArgs = {};
      const error = new Error("Service error");
      mockSalesService.getSales.mockRejectedValue(error);

      // Act
      const result = await resolver.sales(args);

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining("[SalesResolver::sales] Error fetching sales:"),
      );
    });
  });

  describe("hypercert field resolver", () => {
    it("should resolve hypercert for sale with hypercert_id", async () => {
      // Arrange
      const expectedHypercert = {
        id: faker.string.uuid(),
        hypercert_id: mockSale.hypercert_id,
        metadata: null,
      };
      mockHypercertsService.getHypercert.mockResolvedValue(expectedHypercert);

      // Act
      const result = await resolver.hypercert(mockSale);

      // Assert
      expect(mockHypercertsService.getHypercert).toHaveBeenCalledWith({
        where: {
          hypercert_id: {
            eq: mockSale.hypercert_id,
          },
        },
      });
      expect(result).toEqual(expectedHypercert);
    });

    it("should return null when sale has no hypercert_id", async () => {
      // Arrange
      const saleWithoutId: Sale = {
        ...mockSale,
        hypercert_id: undefined,
      };

      // Act
      const result = await resolver.hypercert(saleWithoutId);

      // Assert
      expect(result).toBeNull();
      expect(mockHypercertsService.getHypercert).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          "[SalesResolver::hypercert_id] Missing hypercert_id",
        ),
      );
    });

    it("should return null when service throws error", async () => {
      // Arrange
      const error = new Error("Service error");
      mockHypercertsService.getHypercert.mockRejectedValue(error);

      // Act
      const result = await resolver.hypercert(mockSale);

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[SalesResolver::hypercert] Error fetching hypercert:",
        ),
      );
    });
  });
});
