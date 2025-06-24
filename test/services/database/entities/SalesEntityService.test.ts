import { faker } from "@faker-js/faker";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { GetSalesArgs } from "../../../../src/graphql/schemas/args/salesArgs.js";
import type { Sale } from "../../../../src/graphql/schemas/typeDefs/salesTypeDefs.js";
import { SalesService } from "../../../../src/services/database/entities/SalesEntityService.js";
import { generateHypercertId } from "../../../utils/testUtils.js";

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

describe("SalesService", () => {
  let service: SalesService;

  beforeEach(() => {
    service = new SalesService();
  });

  describe("getSales", () => {
    it("should return sales for given arguments", async () => {
      // Arrange
      const args: GetSalesArgs = {
        where: {
          hypercert_id: { eq: generateHypercertId() },
        },
      };
      const expectedResult = {
        data: [
          {
            id: faker.string.uuid(),
            hypercert_id: generateHypercertId(),
            buyer: faker.string.alphanumeric(42),
            seller: faker.string.alphanumeric(42),
            currency: faker.string.alphanumeric(42),
            collection: faker.string.alphanumeric(42),
            transaction_hash: faker.string.alphanumeric(66),
          } as Sale,
        ],
        count: 1,
      };
      mockEntityService.getMany.mockResolvedValue(expectedResult);

      // Act
      const result = await service.getSales(args);

      // Assert
      expect(mockEntityService.getMany).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should handle errors from entity service", async () => {
      // Arrange
      const args: GetSalesArgs = {};
      const error = new Error("Entity service error");
      mockEntityService.getMany.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getSales(args)).rejects.toThrow(error);
    });
  });

  describe("getSale", () => {
    it("should return a single sale for given arguments", async () => {
      // Arrange
      const args: GetSalesArgs = {
        where: {
          id: { eq: faker.string.uuid() },
        },
      };
      const expectedResult = {
        id: faker.string.uuid(),
        hypercert_id: generateHypercertId(),
        buyer: faker.string.alphanumeric(42),
        seller: faker.string.alphanumeric(42),
        currency: faker.string.alphanumeric(42),
        collection: faker.string.alphanumeric(42),
        transaction_hash: faker.string.alphanumeric(66),
      } as Sale;
      mockEntityService.getSingle.mockResolvedValue(expectedResult);

      // Act
      const result = await service.getSale(args);

      // Assert
      expect(mockEntityService.getSingle).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should handle errors from entity service", async () => {
      // Arrange
      const args: GetSalesArgs = {};
      const error = new Error("Entity service error");
      mockEntityService.getSingle.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getSale(args)).rejects.toThrow(error);
    });
  });
});
