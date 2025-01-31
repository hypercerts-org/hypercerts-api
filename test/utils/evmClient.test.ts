import { describe, expect, it, vi } from "vitest";
import { EvmClientFactory, getRpcUrl } from "../../src/utils/evmClient.js";

vi.mock("@/utils/constants", () => ({
  environment: "test",
  alchemyApiKey: "mock-alchemy-key",
  infuraApiKey: "mock-infura-key",
  drpcApiPkey: "mock-drpc-key",
  filecoinApiKey: "mock-filecoin-key",
  Environment: { TEST: "test", PROD: "prod" },
}));

vi.mock("@/clients/rpcClientFactory", () => ({
  UnifiedRpcClientFactory: {
    createViemTransport: vi.fn().mockReturnValue({
      request: vi.fn(),
      retryCount: 3,
      timeout: 20_000,
    }),
  },
}));

vi.mock("./chainFactory", () => ({
  ChainFactory: {
    getChain: vi.fn(),
  },
}));

vi.mock("viem", () => ({
  createPublicClient: vi.fn(),
  fallback: vi.fn((transports) => transports),
  http: vi.fn((url) => ({ url })),
}));

describe("EvmClient", () => {
  describe("EvmClientFactory", () => {
    describe("getAllAvailableUrls", () => {
      it("returns all available URLs for supported chain", () => {
        const sepoliaUrls = EvmClientFactory.getAllAvailableUrls(11155111);
        expect(sepoliaUrls).toHaveLength(1); // Alchemy for Optimism
        expect(sepoliaUrls[0]).toContain("alchemy.com");

        const opUrls = EvmClientFactory.getAllAvailableUrls(10);
        expect(opUrls).toHaveLength(3); // Alchemy, Infura, DRPC for Optimism
        expect(opUrls[0]).toContain("alchemy.com");
        expect(opUrls[1]).toContain("infura.io");
        expect(opUrls[2]).toContain("drpc.org");
      });

      it("returns empty array for unsupported chain", () => {
        const urls = EvmClientFactory.getAllAvailableUrls(999999);
        expect(urls).toHaveLength(0);
      });
    });

    describe("getFirstAvailableUrl", () => {
      it("returns first available URL for supported chain", () => {
        const url = EvmClientFactory.getFirstAvailableUrl(11155111);
        expect(url).toContain("alchemy.com");
      });

      it("returns undefined for unsupported chain", () => {
        const url = EvmClientFactory.getFirstAvailableUrl(999999);
        expect(url).toBeUndefined();
      });
    });
  });

  describe("getRpcUrl", () => {
    it("should return URL for supported chain", () => {
      const url = getRpcUrl(11155111);
      expect(url).toContain("alchemy.com");
      expect(url).toContain("mock-alchemy-key");
    });

    it("should throw error for unsupported chain", () => {
      expect(() => getRpcUrl(999999)).toThrow(
        "No RPC URL available for chain 999999",
      );
    });
  });
});

describe("RPC Providers", () => {
  describe("getRpcUrl", () => {
    it("should return Alchemy URL for supported chains", () => {
      const url = getRpcUrl(11155111); // Sepolia
      expect(url).toContain("alchemy.com");
      expect(url).toContain("alchemy-key");
    });

    it("should return Infura URL when Alchemy is not available", () => {
      const url = getRpcUrl(42220); // Celo
      expect(url).toContain("infura.io");
      expect(url).toContain("infura-key");
    });

    it("should return Glif URL for Filecoin", () => {
      const url = getRpcUrl(314159);
      expect(url).toContain("glif.io");
    });

    it("should throw error for unsupported chain", () => {
      expect(() => getRpcUrl(999999)).toThrow(
        "No RPC URL available for chain 999999",
      );
    });
  });
});
