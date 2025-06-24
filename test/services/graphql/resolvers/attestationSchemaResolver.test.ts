import { beforeEach, describe, expect, it, vi } from "vitest";
import { container } from "tsyringe";
import { AttestationSchemaResolver } from "../../../../src/services/graphql/resolvers/attestationSchemaResolver.js";
import { AttestationSchemaService } from "../../../../src/services/database/entities/AttestationSchemaEntityService.js";
import { AttestationService } from "../../../../src/services/database/entities/AttestationEntityService.js";
import type { Mock } from "vitest";
import type { GetAttestationSchemasArgs } from "../../../../src/graphql/schemas/args/attestationSchemaArgs.js";
import type { AttestationSchema } from "../../../../src/graphql/schemas/typeDefs/attestationSchemaTypeDefs.js";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

describe("AttestationSchemaResolver", () => {
  let attestationSchemaResolver: AttestationSchemaResolver;
  let mockAttestationSchemaService: {
    getAttestationSchemas: Mock;
  };
  let mockAttestationService: {
    getAttestations: Mock;
  };

  beforeEach(() => {
    mockAttestationSchemaService = {
      getAttestationSchemas: vi.fn(),
    };
    mockAttestationService = {
      getAttestations: vi.fn(),
    };

    container.clearInstances();
    container.registerInstance(
      AttestationSchemaService,
      mockAttestationSchemaService as unknown as AttestationSchemaService,
    );
    container.registerInstance(
      AttestationService,
      mockAttestationService as unknown as AttestationService,
    );

    attestationSchemaResolver = container.resolve(AttestationSchemaResolver);
  });

  describe("attestationSchemas", () => {
    it("should return attestation schemas", async () => {
      const mockSchemas = {
        data: [
          {
            id: "1",
            uid: "schema-1",
            chain_id: "1",
            schema: "test schema 1",
            resolver: ZERO_ADDRESS,
            revocable: true,
            attestations: null,
          },
          {
            id: "2",
            uid: "schema-2",
            chain_id: "1",
            schema: "test schema 2",
            resolver: ZERO_ADDRESS,
            revocable: false,
            attestations: null,
          },
        ],
        count: 2,
      };

      mockAttestationSchemaService.getAttestationSchemas.mockResolvedValue(
        mockSchemas,
      );

      const args: GetAttestationSchemasArgs = {};
      const result = await attestationSchemaResolver.attestationSchemas(args);

      expect(result).toEqual(mockSchemas);
      expect(
        mockAttestationSchemaService.getAttestationSchemas,
      ).toHaveBeenCalledWith(args);
    });

    it("should handle errors from attestationSchemaService", async () => {
      // Arrange
      const error = new Error("Service error");
      mockAttestationSchemaService.getAttestationSchemas.mockRejectedValue(
        error,
      );

      // Act & Assert
      await expect(
        attestationSchemaResolver.attestationSchemas({}),
      ).resolves.toBeNull();
    });
  });

  describe("attestations", () => {
    it("should return attestations for a schema", async () => {
      const mockSchema = {
        id: "1",
        uid: "schema-1",
        chain_id: "1",
        schema: "test schema 1",
        resolver: ZERO_ADDRESS,
        revocable: true,
        attestations: null,
      } as AttestationSchema;

      const mockAttestations = {
        data: [],
        count: 0,
      };

      mockAttestationService.getAttestations.mockResolvedValue(
        mockAttestations,
      );

      const result = await attestationSchemaResolver.attestations(mockSchema);

      expect(result).toEqual(mockAttestations);
      expect(mockAttestationService.getAttestations).toHaveBeenCalledWith({
        where: { supported_schemas_id: { eq: mockSchema.id } },
      });
    });

    it("should handle errors from attestationService", async () => {
      // Arrange
      const schema: AttestationSchema = {
        id: "1",
      } as AttestationSchema;
      const error = new Error("Service error");
      mockAttestationService.getAttestations.mockRejectedValue(error);

      // Act & Assert
      await expect(
        attestationSchemaResolver.attestations(schema),
      ).resolves.toBeNull();
    });
  });
});
