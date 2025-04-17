import { beforeEach, describe, expect, it, vi } from "vitest";
import type { GetAttestationSchemasArgs } from "../../../../src/graphql/schemas/args/attestationSchemaArgs.js";
import { AttestationSchemaService } from "../../../../src/services/database/entities/AttestationSchemaEntityService.js";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

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

describe("AttestationSchemaService", () => {
  let service: AttestationSchemaService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AttestationSchemaService();
  });

  describe("getAttestationSchemas", () => {
    it("should return attestation schemas", async () => {
      // Arrange
      const args: GetAttestationSchemasArgs = {
        where: {
          id: { eq: "test-id" },
        },
      };
      const mockResponse = {
        data: [
          {
            id: "1",
            chain_id: 1,
            schema: { type: "test" },
            resolver: ZERO_ADDRESS,
            revocable: true,
          },
          {
            id: "2",
            chain_id: 1,
            schema: { type: "test2" },
            resolver: ZERO_ADDRESS,
            revocable: false,
          },
        ],
        count: 2,
      };
      mockEntityService.getMany.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getAttestationSchemas(args);

      // Assert
      expect(mockEntityService.getMany).toHaveBeenCalledWith(args);
      expect(result.count).toBe(2);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].id).toBe("1");
      expect(result.data[1].id).toBe("2");
    });

    it("should handle empty result set", async () => {
      // Arrange
      const mockResponse = {
        data: [],
        count: 0,
      };
      mockEntityService.getMany.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getAttestationSchemas({});

      // Assert
      expect(result.count).toBe(0);
      expect(result.data).toHaveLength(0);
    });

    it("should handle errors from entityService.getMany", async () => {
      // Arrange
      const error = new Error("Database error");
      mockEntityService.getMany.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getAttestationSchemas({})).rejects.toThrow(error);
    });
  });

  describe("getAttestationSchema", () => {
    it("should return a single attestation schema", async () => {
      // Arrange
      const args: GetAttestationSchemasArgs = {
        where: {
          id: { eq: "test-id" },
        },
      };
      const mockResponse = {
        id: "1",
        chain_id: 1,
        schema: { type: "test" },
        resolver: ZERO_ADDRESS,
        revocable: true,
      };
      mockEntityService.getSingle.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getAttestationSchema(args);

      // Assert
      expect(mockEntityService.getSingle).toHaveBeenCalledWith(args);
      expect(result).toEqual(mockResponse);
    });

    it("should return undefined when schema is not found", async () => {
      // Arrange
      mockEntityService.getSingle.mockResolvedValue(undefined);

      // Act
      const result = await service.getAttestationSchema({});

      // Assert
      expect(result).toBeUndefined();
      expect(mockEntityService.getSingle).toHaveBeenCalledWith({});
    });

    it("should handle errors from entityService.getSingle", async () => {
      // Arrange
      const error = new Error("Database error");
      mockEntityService.getSingle.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getAttestationSchema({})).rejects.toThrow(error);
    });
  });
});
