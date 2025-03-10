import { beforeEach, describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import { AttestationResolver } from "../../../../src/services/graphql/resolvers/attestationResolver.js";
import { AttestationService } from "../../../../src/services/database/entities/AttestationEntityService.js";
import { HypercertsService } from "../../../../src/services/database/entities/HypercertsEntityService.js";
import { AttestationSchemaService } from "../../../../src/services/database/entities/AttestationSchemaEntityService.js";
import { MetadataService } from "../../../../src/services/database/entities/MetadataEntityService.js";
import type { Mock } from "vitest";
import type { GetAttestationsArgs } from "../../../../src/graphql/schemas/args/attestationArgs.js";
import type { Attestation } from "../../../../src/graphql/schemas/typeDefs/attestationTypeDefs.js";
import { faker } from "@faker-js/faker";
import { getAddress } from "viem";

describe("AttestationResolver", () => {
  let resolver: AttestationResolver;
  let mockAttestationService: {
    getAttestations: Mock;
  };
  let mockHypercertService: {
    getHypercert: Mock;
  };
  let mockAttestationSchemaService: {
    getAttestationSchema: Mock;
  };
  let mockMetadataService: {
    getMetadataSingle: Mock;
  };

  beforeEach(() => {
    // Create mock services
    mockAttestationService = {
      getAttestations: vi.fn(),
    };

    mockHypercertService = {
      getHypercert: vi.fn(),
    };

    mockAttestationSchemaService = {
      getAttestationSchema: vi.fn(),
    };

    mockMetadataService = {
      getMetadataSingle: vi.fn(),
    };

    // Register mocks with the DI container
    container.registerInstance(
      AttestationService,
      mockAttestationService as unknown as AttestationService,
    );
    container.registerInstance(
      HypercertsService,
      mockHypercertService as unknown as HypercertsService,
    );
    container.registerInstance(
      AttestationSchemaService,
      mockAttestationSchemaService as unknown as AttestationSchemaService,
    );
    container.registerInstance(
      MetadataService,
      mockMetadataService as unknown as MetadataService,
    );

    // Resolve the resolver with mocked dependencies
    resolver = container.resolve(AttestationResolver);
  });

  describe("attestations", () => {
    it("should return attestations for given arguments", async () => {
      // Arrange
      const args: GetAttestationsArgs = {
        where: {
          id: { eq: "test-id" },
        },
      };
      const expectedResult = {
        data: [
          { id: "1", data: { token_id: "123" } },
          { id: "2", data: { token_id: "456" } },
        ],
        count: 2,
      };
      mockAttestationService.getAttestations.mockResolvedValue(expectedResult);

      // Act
      const result = await resolver.attestations(args);

      // Assert
      expect(mockAttestationService.getAttestations).toHaveBeenCalledWith(args);
      expect(result).toEqual(expectedResult);
    });

    it("should handle errors from attestationService", async () => {
      // Arrange
      const error = new Error("Service error");
      mockAttestationService.getAttestations.mockRejectedValue(error);

      // Act & Assert
      await expect(resolver.attestations({})).rejects.toThrow(error);
    });
  });

  describe("hypercert field resolver", () => {
    it("should resolve hypercert for valid attestation data", async () => {
      // Arrange
      const attestation: Attestation = {
        id: "1",
        data: {
          chain_id: "1",
          contract_address: "0x1234567890123456789012345678901234567890",
          token_id: "123",
        },
      } as unknown as Attestation;
      const expectedHypercert = {
        id: "test-hypercert",
        name: "Test Hypercert",
      };
      mockHypercertService.getHypercert.mockResolvedValue(expectedHypercert);

      // Act
      const result = await resolver.hypercert(attestation);

      // Assert
      expect(mockHypercertService.getHypercert).toHaveBeenCalledWith({
        where: {
          hypercert_id: {
            eq: "1-0x1234567890123456789012345678901234567890-123",
          },
        },
      });
      expect(result).toEqual(expectedHypercert);
    });

    it("should return undefined when attestation has no data", async () => {
      // Arrange
      const attestation: Attestation = {
        id: "1",
        data: null,
      } as Attestation;

      // Act
      const result = await resolver.hypercert(attestation);

      // Assert
      expect(result).toBeUndefined();
      expect(mockHypercertService.getHypercert).not.toHaveBeenCalled();
    });

    it("should handle invalid attestation data", async () => {
      // Arrange
      const attestation: Attestation = {
        id: "1",
        data: {
          invalid_data: "test",
        },
      } as Attestation;

      // Act
      const result = await resolver.hypercert(attestation);

      // Assert
      expect(result).toBeUndefined();
      expect(mockHypercertService.getHypercert).not.toHaveBeenCalled();
    });
  });

  describe("eas_schema field resolver", () => {
    it("should resolve schema for attestation with schema id", async () => {
      // Arrange
      const attestation: Attestation = {
        id: "1",
        supported_schemas_id: "schema-1",
      } as Attestation;
      const expectedSchema = {
        id: "schema-1",
        name: "Test Schema",
      };
      mockAttestationSchemaService.getAttestationSchema.mockResolvedValue(
        expectedSchema,
      );

      // Act
      const result = await resolver.eas_schema(attestation);

      // Assert
      expect(
        mockAttestationSchemaService.getAttestationSchema,
      ).toHaveBeenCalledWith({
        where: {
          id: { eq: "schema-1" },
        },
      });
      expect(result).toEqual(expectedSchema);
    });

    it("should return undefined when attestation has no schema id", async () => {
      // Arrange
      const attestation: Attestation = {
        id: "1",
      } as Attestation;

      // Act
      const result = await resolver.eas_schema(attestation);

      // Assert
      expect(result).toBeUndefined();
      expect(
        mockAttestationSchemaService.getAttestationSchema,
      ).not.toHaveBeenCalled();
    });
  });

  describe("metadata field resolver", () => {
    it("should resolve metadata for valid attestation data", async () => {
      // Arrange
      const attestation: Attestation = {
        id: "1",
        data: {
          chain_id: "1",
          contract_address: "0x1234567890123456789012345678901234567890",
          token_id: "123",
        },
      } as unknown as Attestation;
      const expectedMetadata = {
        id: "metadata-1",
        name: "Test Metadata",
      };
      mockMetadataService.getMetadataSingle.mockResolvedValue(expectedMetadata);

      // Act
      const result = await resolver.metadata(attestation);

      // Assert
      expect(mockMetadataService.getMetadataSingle).toHaveBeenCalledWith({
        where: {
          hypercerts: {
            hypercert_id: {
              eq: "1-0x1234567890123456789012345678901234567890-123",
            },
          },
        },
      });
      expect(result).toEqual(expectedMetadata);
    });

    it("should return undefined when attestation has no data", async () => {
      // Arrange
      const attestation: Attestation = {
        id: "1",
        data: null,
      } as Attestation;

      // Act
      const result = await resolver.metadata(attestation);

      // Assert
      expect(result).toBeUndefined();
      expect(mockMetadataService.getMetadataSingle).not.toHaveBeenCalled();
    });
  });

  describe("getHypercertIdFromAttestationData", () => {
    const contract_address = getAddress(faker.finance.ethereumAddress());

    it("should generate correct hypercert id from string bigints", () => {
      const data = {
        chain_id: "11155111",
        contract_address,
        token_id: "123",
      };

      const result = resolver.getHypercertIdFromAttestationData(data);

      expect(result).toBe(`11155111-${contract_address}-123`);
    });

    it("should generate correct hypercert id from number inputs", () => {
      const data = {
        chain_id: 1,
        contract_address,
        token_id: 123,
      };

      const result = resolver.getHypercertIdFromAttestationData(data);

      expect(result).toBe(`1-${contract_address}-123`);
    });

    it("should handle large bigint values", () => {
      const data = {
        chain_id: "9007199254740991000", // Number.MAX_SAFE_INTEGER * 1000
        contract_address,
        token_id: "9007199254740991",
      };

      const result = resolver.getHypercertIdFromAttestationData(data);

      expect(result).toBe(
        `9007199254740991000-${contract_address}-9007199254740991`,
      );
    });

    it("should handle invalid chain_id", () => {
      const data = {
        chain_id: "not_a_bigint",
        contract_address,
        token_id: "123",
      };

      const result = resolver.getHypercertIdFromAttestationData(data);

      expect(result).toBeUndefined();
    });

    it("should handle invalid contract_address", () => {
      const data = {
        chain_id: "1",
        contract_address: "not_an_address",
        token_id: "123",
      };

      const result = resolver.getHypercertIdFromAttestationData(data);

      expect(result).toBeUndefined();
    });

    it("should handle invalid token_id", () => {
      const data = {
        chain_id: "1",
        contract_address,
        token_id: "not_a_bigint",
      };

      const result = resolver.getHypercertIdFromAttestationData(data);

      expect(result).toBeUndefined();
    });

    it("should handle floating point numbers", () => {
      const data = {
        chain_id: 1.5,
        contract_address,
        token_id: "123",
      };

      const result = resolver.getHypercertIdFromAttestationData(data);

      expect(result).toBeUndefined();
    });

    it("should handle missing required fields", () => {
      const data = {
        chain_id: "1",
        // missing contract_address
        token_id: "123",
      };

      const result = resolver.getHypercertIdFromAttestationData(data);

      expect(result).toBeUndefined();
    });

    it("should handle null data", () => {
      const result = resolver.getHypercertIdFromAttestationData(null);

      expect(result).toBeUndefined();
    });

    it("should handle empty object", () => {
      const result = resolver.getHypercertIdFromAttestationData({});

      expect(result).toBeUndefined();
    });

    it("should handle negative bigint values", () => {
      const data = {
        chain_id: "-1",
        contract_address,
        token_id: "123",
      };

      const result = resolver.getHypercertIdFromAttestationData(data);

      expect(result).toBe(`-1-${contract_address}-123`);
    });
  });
});
