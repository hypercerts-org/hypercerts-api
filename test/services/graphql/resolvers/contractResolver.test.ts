import { beforeEach, describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import { faker } from "@faker-js/faker";
import { getAddress } from "viem";
import { ContractResolver } from "../../../../src/services/graphql/resolvers/contractResolver.js";
import { ContractService } from "../../../../src/services/database/entities/ContractEntityService.js";
import type { Mock } from "vitest";
import type { GetContractsArgs } from "../../../../src/graphql/schemas/args/contractArgs.js";

describe("ContractResolver", () => {
  let resolver: ContractResolver;
  let mockContractService: {
    getContracts: Mock;
  };
  const mockContractAddress = getAddress(faker.finance.ethereumAddress());

  beforeEach(() => {
    // Create mock service
    mockContractService = {
      getContracts: vi.fn(),
    };

    // Register mock with the DI container
    container.registerInstance(
      ContractService,
      mockContractService as unknown as ContractService,
    );

    // Resolve the resolver with mocked dependencies
    resolver = container.resolve(ContractResolver);
  });

  describe("contracts", () => {
    it("should return contracts for given arguments", async () => {
      // Arrange
      const args: GetContractsArgs = {
        where: {
          chain_id: { eq: 1n },
          contract_address: { eq: mockContractAddress },
        },
      };
      const expectedResult = {
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
      mockContractService.getContracts.mockResolvedValue(expectedResult);

      // Act
      const result = await resolver.contracts(args);

      // Assert
      expect(mockContractService.getContracts).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
      expect(result.data[0].contract_address).toBe(mockContractAddress);
      expect(result.data[1].contract_address).toBe(mockContractAddress);
    });

    it("should handle empty result set", async () => {
      // Arrange
      const expectedResult = {
        data: [],
        count: 0,
      };
      mockContractService.getContracts.mockResolvedValue(expectedResult);

      // Act
      const result = await resolver.contracts({});

      // Assert
      expect(result.data).toHaveLength(0);
      expect(result.count).toBe(0);
    });

    it("should handle errors from contractService", async () => {
      // Arrange
      const error = new Error("Service error");
      mockContractService.getContracts.mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.contracts({})).rejects.toThrow(error);
    });
  });
});
