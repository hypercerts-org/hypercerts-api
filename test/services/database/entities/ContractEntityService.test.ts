import { beforeEach, describe, expect, it, vi } from "vitest";
import { faker } from "@faker-js/faker";
import { getAddress } from "viem";
import { ContractService } from "../../../../src/services/database/entities/ContractEntityService.js";
import type { GetContractsArgs } from "../../../../src/graphql/schemas/args/contractArgs.js";

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

describe("ContractService", () => {
  let service: ContractService;
  const mockContractAddress = getAddress(faker.finance.ethereumAddress());

  beforeEach(() => {
    vi.clearAllMocks();
    service = new ContractService();
  });

  describe("getContracts", () => {
    it("should return contracts with correct data", async () => {
      // Arrange
      const args: GetContractsArgs = {
        where: {
          chain_id: { eq: 1n },
          contract_address: { eq: mockContractAddress },
        },
      };
      const mockResponse = {
        data: [
          {
            id: "1",
            chain_id: 1n,
            contract_address: mockContractAddress,
            start_block: 1000000n,
          },
          {
            id: "2",
            chain_id: 1n,
            contract_address: mockContractAddress,
            start_block: 2000000n,
          },
        ],
        count: 2,
      };
      mockEntityService.getMany.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getContracts(args);

      // Assert
      expect(mockEntityService.getMany).toHaveBeenCalledWith(args);
      expect(result.count).toBe(2);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].contract_address).toBe(mockContractAddress);
      expect(result.data[1].contract_address).toBe(mockContractAddress);
    });

    it("should handle empty result set", async () => {
      // Arrange
      const mockResponse = {
        data: [],
        count: 0,
      };
      mockEntityService.getMany.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getContracts({});

      // Assert
      expect(result.count).toBe(0);
      expect(result.data).toHaveLength(0);
    });

    it("should handle errors from entityService.getMany", async () => {
      // Arrange
      const error = new Error("Database error");
      mockEntityService.getMany.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getContracts({})).rejects.toThrow(error);
    });
  });

  describe("getContract", () => {
    it("should return a single contract", async () => {
      // Arrange
      const args: GetContractsArgs = {
        where: {
          chain_id: { eq: 1n },
          contract_address: { eq: mockContractAddress },
        },
      };
      const mockResponse = {
        id: "1",
        chain_id: 1n,
        contract_address: mockContractAddress,
        start_block: 1000000n,
      };
      mockEntityService.getSingle.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getContract(args);

      // Assert
      expect(mockEntityService.getSingle).toHaveBeenCalledWith(args);
      expect(result).toEqual(mockResponse);
      expect(result?.contract_address).toBe(mockContractAddress);
    });

    it("should return undefined when contract is not found", async () => {
      // Arrange
      mockEntityService.getSingle.mockResolvedValue(undefined);

      // Act
      const result = await service.getContract({});

      // Assert
      expect(result).toBeUndefined();
      expect(mockEntityService.getSingle).toHaveBeenCalledWith({});
    });

    it("should handle errors from entityService.getSingle", async () => {
      // Arrange
      const error = new Error("Database error");
      mockEntityService.getSingle.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getContract({})).rejects.toThrow(error);
    });
  });
});
