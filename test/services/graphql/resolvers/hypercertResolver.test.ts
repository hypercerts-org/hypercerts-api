import { beforeEach, describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import { HypercertResolver } from "../../../../src/services/graphql/resolvers/hypercertResolver.js";
import { HypercertsService } from "../../../../src/services/database/entities/HypercertsEntityService.js";
import { MetadataService } from "../../../../src/services/database/entities/MetadataEntityService.js";
import { ContractService } from "../../../../src/services/database/entities/ContractEntityService.js";
import { AttestationService } from "../../../../src/services/database/entities/AttestationEntityService.js";
import { FractionService } from "../../../../src/services/database/entities/FractionEntityService.js";
import { SalesService } from "../../../../src/services/database/entities/SalesEntityService.js";
import { MarketplaceOrdersService } from "../../../../src/services/database/entities/MarketplaceOrdersEntityService.js";
import type { Mock } from "vitest";
import type { GetHypercertsArgs } from "../../../../src/graphql/schemas/args/hypercertsArgs.js";
import type { Hypercert } from "../../../../src/graphql/schemas/typeDefs/hypercertTypeDefs.js";
import { faker } from "@faker-js/faker";
import {
  generateHypercertId,
  generateMockMetadata,
} from "../../../utils/testUtils.js";

describe("HypercertResolver", () => {
  let resolver: HypercertResolver;
  let mockHypercertsService: {
    getHypercerts: Mock;
  };
  let mockMetadataService: {
    getMetadataSingle: Mock;
  };
  let mockContractService: {
    getContract: Mock;
  };
  let mockAttestationService: {
    getAttestations: Mock;
  };
  let mockFractionService: {
    getFractions: Mock;
  };
  let mockSalesService: {
    getSales: Mock;
  };
  let mockMarketplaceOrdersService: {
    getOrders: Mock;
  };

  beforeEach(() => {
    // Mock console methods
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});

    // Create mock services
    mockHypercertsService = {
      getHypercerts: vi.fn(),
    };

    mockMetadataService = {
      getMetadataSingle: vi.fn(),
    };

    mockContractService = {
      getContract: vi.fn(),
    };

    mockAttestationService = {
      getAttestations: vi.fn(),
    };

    mockFractionService = {
      getFractions: vi.fn(),
    };

    mockSalesService = {
      getSales: vi.fn(),
    };

    mockMarketplaceOrdersService = {
      getOrders: vi.fn(),
    };

    // Register mocks with the DI container
    container.registerInstance(
      HypercertsService,
      mockHypercertsService as unknown as HypercertsService,
    );
    container.registerInstance(
      MetadataService,
      mockMetadataService as unknown as MetadataService,
    );
    container.registerInstance(
      ContractService,
      mockContractService as unknown as ContractService,
    );
    container.registerInstance(
      AttestationService,
      mockAttestationService as unknown as AttestationService,
    );
    container.registerInstance(
      FractionService,
      mockFractionService as unknown as FractionService,
    );
    container.registerInstance(
      SalesService,
      mockSalesService as unknown as SalesService,
    );
    container.registerInstance(
      MarketplaceOrdersService,
      mockMarketplaceOrdersService as unknown as MarketplaceOrdersService,
    );

    // Create a new instance for each test
    resolver = container.resolve(HypercertResolver);
  });

  describe("hypercerts query resolver", () => {
    it("should return hypercerts for given arguments", async () => {
      // Arrange
      const args: GetHypercertsArgs = {
        where: {
          hypercert_id: { eq: generateHypercertId() },
        },
      };
      const expectedResult = {
        data: [
          { id: faker.string.uuid(), hypercert_id: generateHypercertId() },
          { id: faker.string.uuid(), hypercert_id: generateHypercertId() },
        ],
        count: 2,
      };
      mockHypercertsService.getHypercerts.mockResolvedValue(expectedResult);

      // Act
      const result = await resolver.hypercerts(args);

      // Assert
      expect(mockHypercertsService.getHypercerts).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should return null when service throws error", async () => {
      // Arrange
      const args: GetHypercertsArgs = {};
      const error = new Error("Service error");
      mockHypercertsService.getHypercerts.mockRejectedValue(error);

      // Act
      const result = await resolver.hypercerts(args);

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HypercertResolver::hypercerts] Error fetching hypercerts:",
        ),
      );
    });
  });

  describe("metadata field resolver", () => {
    it("should resolve metadata for hypercert with uri", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
        uri: `ipfs://${faker.string.alphanumeric(46)}`,
      } as Hypercert;
      const expectedMetadata = generateMockMetadata();
      mockMetadataService.getMetadataSingle.mockResolvedValue(expectedMetadata);

      // Act
      const result = await resolver.metadata(hypercert);

      // Assert
      expect(mockMetadataService.getMetadataSingle).toHaveBeenCalledWith({
        where: { uri: { eq: hypercert.uri } },
      });
      expect(result).toEqual(expectedMetadata);
    });

    it("should return null when hypercert has no uri", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
      } as Hypercert;

      // Act
      const result = await resolver.metadata(hypercert);

      // Assert
      expect(result).toBeNull();
      expect(mockMetadataService.getMetadataSingle).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HypercertResolver::metadata] No uri found for hypercert",
        ),
      );
    });

    it("should return null when service throws error", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
        uri: `ipfs://${faker.string.alphanumeric(46)}`,
      } as Hypercert;
      const error = new Error("Service error");
      mockMetadataService.getMetadataSingle.mockRejectedValue(error);

      // Act
      const result = await resolver.metadata(hypercert);

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HypercertResolver::metadata] Error fetching metadata:",
        ),
      );
    });
  });

  describe("contract field resolver", () => {
    it("should resolve contract for hypercert with contracts_id", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
        contracts_id: faker.string.uuid(),
      } as Hypercert;
      const expectedContract = {
        id: hypercert.contracts_id,
        chain_id: faker.number.int(),
        contract_address: faker.finance.ethereumAddress(),
      };
      mockContractService.getContract.mockResolvedValue(expectedContract);

      // Act
      const result = await resolver.contract(hypercert);

      // Assert
      expect(mockContractService.getContract).toHaveBeenCalledWith({
        where: { id: { eq: hypercert.contracts_id } },
      });
      expect(result).toEqual(expectedContract);
    });

    it("should return null when hypercert has no contracts_id", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
      } as Hypercert;

      // Act
      const result = await resolver.contract(hypercert);

      // Assert
      expect(result).toBeNull();
      expect(mockContractService.getContract).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HypercertResolver::contract] No contract id found for hypercert",
        ),
      );
    });

    it("should return null when service throws error", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
        contracts_id: faker.string.uuid(),
      } as Hypercert;
      const error = new Error("Service error");
      mockContractService.getContract.mockRejectedValue(error);

      // Act
      const result = await resolver.contract(hypercert);

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HypercertResolver::contract] Error fetching contract:",
        ),
      );
    });
  });

  describe("attestations field resolver", () => {
    it("should resolve attestations for hypercert with id", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
      } as Hypercert;
      const expectedAttestations = {
        data: [
          { id: faker.string.uuid(), hypercert_id: hypercert.id },
          { id: faker.string.uuid(), hypercert_id: hypercert.id },
        ],
        count: 2,
      };
      mockAttestationService.getAttestations.mockResolvedValue(
        expectedAttestations,
      );

      // Act
      const result = await resolver.attestations(hypercert);

      // Assert
      expect(mockAttestationService.getAttestations).toHaveBeenCalledWith({
        where: { hypercert: { id: { eq: hypercert.id } } },
      });
      expect(result).toEqual(expectedAttestations);
    });

    it("should return null when hypercert has no id", async () => {
      // Arrange
      const hypercert = {} as Hypercert;

      // Act
      const result = await resolver.attestations(hypercert);

      // Assert
      expect(result).toBeNull();
      expect(mockAttestationService.getAttestations).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HypercertResolver::attestations] No id found for hypercert",
        ),
      );
    });

    it("should return null when service throws error", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
      } as Hypercert;
      const error = new Error("Service error");
      mockAttestationService.getAttestations.mockRejectedValue(error);

      // Act
      const result = await resolver.attestations(hypercert);

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HypercertResolver::attestations] Error fetching attestations:",
        ),
      );
    });
  });

  describe("fractions field resolver", () => {
    it("should resolve fractions for hypercert with hypercert_id", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
        hypercert_id: generateHypercertId(),
      } as Hypercert;
      const expectedFractions = {
        data: [
          { id: faker.string.uuid(), hypercert_id: hypercert.hypercert_id },
          { id: faker.string.uuid(), hypercert_id: hypercert.hypercert_id },
        ],
        count: 2,
      };
      mockFractionService.getFractions.mockResolvedValue(expectedFractions);

      // Act
      const result = await resolver.fractions(hypercert);

      // Assert
      expect(mockFractionService.getFractions).toHaveBeenCalledWith({
        where: { hypercert_id: { eq: hypercert.hypercert_id } },
      });
      expect(result).toEqual(expectedFractions);
    });

    it("should return null when hypercert has no hypercert_id", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
      } as Hypercert;

      // Act
      const result = await resolver.fractions(hypercert);

      // Assert
      expect(result).toBeNull();
      expect(mockFractionService.getFractions).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HypercertResolver::fractions] No hypercert id found for",
        ),
      );
    });

    it("should return null when service throws error", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
        hypercert_id: generateHypercertId(),
      } as Hypercert;
      const error = new Error("Service error");
      mockFractionService.getFractions.mockRejectedValue(error);

      // Act
      const result = await resolver.fractions(hypercert);

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HypercertResolver::fractions] Error fetching fractions:",
        ),
      );
    });
  });

  describe("sales field resolver", () => {
    it("should resolve sales for hypercert with hypercert_id", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
        hypercert_id: generateHypercertId(),
      } as Hypercert;
      const expectedSales = {
        data: [
          { id: faker.string.uuid(), hypercert_id: hypercert.hypercert_id },
          { id: faker.string.uuid(), hypercert_id: hypercert.hypercert_id },
        ],
        count: 2,
      };
      mockSalesService.getSales.mockResolvedValue(expectedSales);

      // Act
      const result = await resolver.sales(hypercert);

      // Assert
      expect(mockSalesService.getSales).toHaveBeenCalledWith({
        where: { hypercert_id: { eq: hypercert.hypercert_id } },
      });
      expect(result).toEqual(expectedSales);
    });

    it("should return null when hypercert has no hypercert_id", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
      } as Hypercert;

      // Act
      const result = await resolver.sales(hypercert);

      // Assert
      expect(result).toBeNull();
      expect(mockSalesService.getSales).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HypercertResolver::sales] No hypercert id found for",
        ),
      );
    });

    it("should return null when service throws error", async () => {
      // Arrange
      const hypercert: Hypercert = {
        id: faker.string.uuid(),
        hypercert_id: generateHypercertId(),
      } as Hypercert;
      const error = new Error("Service error");
      mockSalesService.getSales.mockRejectedValue(error);

      // Act
      const result = await resolver.sales(hypercert);

      // Assert
      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "[HypercertResolver::sales] Error fetching sales:",
        ),
      );
    });
  });
});
