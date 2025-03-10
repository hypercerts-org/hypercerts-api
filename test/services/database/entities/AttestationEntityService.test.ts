import { beforeEach, describe, expect, it, vi } from "vitest";
import type { GetAttestationsArgs } from "../../../../src/graphql/schemas/args/attestationArgs.js";
import { AttestationService } from "../../../../src/services/database/entities/AttestationEntityService.js";
import type { Json } from "../../../../src/types/supabaseCaching.js";

type AttestationData = {
  id: string;
  data: Record<string, Json>;
  [key: string]: Json | undefined;
};

type ParsedData = {
  token_id: string;
  other_field: string;
  [key: string]: string | undefined;
};

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

describe("AttestationService", () => {
  let service: AttestationService;

  beforeEach(() => {
    vi.clearAllMocks();
    service = new AttestationService();
  });

  describe("getAttestations", () => {
    it("should return attestations with parsed data", async () => {
      // Arrange
      const args: GetAttestationsArgs = {
        where: {
          id: { eq: "test-id" },
        },
      };
      const mockResponse = {
        data: [
          {
            id: "1",
            data: {
              token_id: "123456789",
              uid: "0x123456789",
            },
          },
          {
            id: "2",
            data: {
              token_id: "987654321",
              uid: "0x123456789",
            },
          },
        ] as AttestationData[],
        count: 2,
      };
      mockEntityService.getMany.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getAttestations(args);

      // Assert
      expect(mockEntityService.getMany).toHaveBeenCalledWith(args);
      expect(result.count).toBe(2);
      expect(result.data).toHaveLength(2);
      const data0 = result.data[0].data as Record<string, string>;
      const data1 = result.data[1].data as Record<string, string>;
      expect(data0.token_id).toBe("123456789");
      expect(data1.token_id).toBe("987654321");
    });

    it("should handle attestations without token_id in data", async () => {
      // Arrange
      const mockResponse = {
        data: [
          {
            id: "1",
            data: {
              other_field: "value",
            },
            other_field: "value",
          },
        ] as AttestationData[],
        count: 1,
      };
      mockEntityService.getMany.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getAttestations({});

      // Assert
      expect(mockEntityService.getMany).toHaveBeenCalledWith({});
      expect(result.count).toBe(1);
      const data = result.data[0].data as Record<string, string>;
      expect(data.other_field).toBe("value");
      expect(data.token_id).toBeUndefined();
    });

    it("should handle empty result set", async () => {
      // Arrange
      const mockResponse = {
        data: [],
        count: 0,
      };
      mockEntityService.getMany.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getAttestations({});

      // Assert
      expect(result.count).toBe(0);
      expect(result.data).toHaveLength(0);
    });

    it("should handle errors from entityService.getMany", async () => {
      // Arrange
      const error = new Error("Database error");
      mockEntityService.getMany.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getAttestations({})).rejects.toThrow(error);
    });
  });

  describe("getAttestation", () => {
    it("should return a single attestation", async () => {
      // Arrange
      const args: GetAttestationsArgs = {
        where: {
          id: { eq: "test-id" },
        },
      };
      const mockResponse = {
        id: "1",
        data: {
          token_id: "123456789",
          uid: "0x123456789",
        },
      } as AttestationData;
      mockEntityService.getSingle.mockResolvedValue(mockResponse);

      // Act
      const result = await service.getAttestation(args);

      // Assert
      expect(mockEntityService.getSingle).toHaveBeenCalledWith(args);
      expect(result).toEqual(mockResponse);
    });

    it("should return undefined when attestation is not found", async () => {
      // Arrange
      mockEntityService.getSingle.mockResolvedValue(undefined);

      // Act
      const result = await service.getAttestation({});

      // Assert
      expect(result).toBeUndefined();
      expect(mockEntityService.getSingle).toHaveBeenCalledWith({});
    });

    it("should handle errors from entityService.getSingle", async () => {
      // Arrange
      const error = new Error("Database error");
      mockEntityService.getSingle.mockRejectedValue(error);

      // Act & Assert
      await expect(service.getAttestation({})).rejects.toThrow(error);
    });
  });

  describe("parseAttestation", () => {
    it("should convert token_id to string", () => {
      // Arrange
      const data = {
        token_id: 123456789n,
        other_field: "value",
      };

      // Act
      const result = service.parseAttestation(data as unknown as Json);

      // Assert
      expect(result).not.toBeNull();
      if (result && typeof result === "object" && !Array.isArray(result)) {
        const parsed = result as ParsedData;
        expect(parsed.token_id).toBe("123456789");
        expect(parsed.other_field).toBe("value");
      }
    });

    it("should handle string token_id", () => {
      // Arrange
      const data = {
        token_id: "123456789",
        other_field: "value",
      };

      // Act
      const result = service.parseAttestation(data as unknown as Json);

      // Assert
      expect(result).not.toBeNull();
      if (result && typeof result === "object" && !Array.isArray(result)) {
        const parsed = result as ParsedData;
        expect(parsed.token_id).toBe("123456789");
        expect(parsed.other_field).toBe("value");
      }
    });

    it("should handle null data", () => {
      // Act
      const result = service.parseAttestation(null);

      // Assert
      expect(result).toBeNull();
    });

    it("should handle data without token_id", () => {
      // Arrange
      const data = {
        other_field: "value",
      };

      // Act
      const result = service.parseAttestation(data as unknown as Json);

      // Assert
      expect(result).toEqual(data);
    });

    it("should handle empty object", () => {
      // Act
      const result = service.parseAttestation({} as Json);

      // Assert
      expect(result).toEqual({});
    });

    it("should handle token_id with null value", () => {
      // Arrange
      const data = {
        token_id: null,
        other_field: "value",
      };

      // Act
      const result = service.parseAttestation(data as unknown as Json);

      // Assert
      expect(result).toEqual(data);
    });
  });
});
