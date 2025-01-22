import * as viem from "viem";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { EvmClientFactory } from "../../src/client/evmClient.js";
import { RpcClientFactory } from "../../src/client/rpcClientFactory.js";

vi.mock("@/utils/constants", () => ({
  indexerEnvironment: "test",
  alchemyApiKey: "mock-alchemy-key",
  infuraApiKey: "mock-infura-key",
  drpcApiPkey: "mock-drpc-key",
  filecoinApiKey: "mock-filecoin-key",
  Environment: { TEST: "test", PROD: "prod" },
}));

vi.mock("@/client/rpcClientFactory", () => ({
  RpcClientFactory: {
    createViemTransport: vi.fn().mockReturnValue({
      request: vi.fn(),
      retryCount: 3,
      timeout: 20_000,
    }),
    createEthersJsonRpcProvider: vi.fn(),
    createEip1193Provider: vi.fn(),
  },
}));

vi.mock("@/client/chainFactory", () => ({
  ChainFactory: {
    getChain: vi.fn().mockReturnValue({
      id: 10,
      name: "optimism",
      network: "optimism",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: {
        default: { http: ["https://example.com"] },
        public: { http: ["https://example.com"] },
      },
    }),
    getSupportedChains: vi
      .fn()
      .mockReturnValue([11155111, 84532, 421614, 314159]),
  },
}));

vi.mock("viem", () => ({
  createPublicClient: vi.fn(),
  fallback: vi.fn((transports) => transports),
  http: vi.fn((url) => ({ url })),
}));

describe("EvmClientFactory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllAvailableUrls", () => {
    it("returns all available URLs for supported chain", () => {
      const sepoliaUrls = EvmClientFactory.getAllAvailableUrls(11155111);
      expect(sepoliaUrls).toHaveLength(1); // Alchemy for Sepolia
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

  describe("createViemClient", () => {
    it("creates client with fallback transport for supported chain", () => {
      EvmClientFactory.createViemClient(10);

      expect(viem.createPublicClient).toHaveBeenCalledWith({
        chain: expect.any(Object),
        transport: expect.any(Array),
      });

      expect(RpcClientFactory.createViemTransport).toHaveBeenCalledWith(
        10,
        expect.stringContaining("alchemy.com"),
      );
    });

    it("throws error for unsupported chain", () => {
      expect(() => EvmClientFactory.createViemClient(999999)).toThrow(
        "No RPC URL available for chain 999999",
      );
    });
  });

  describe("createEthersClient", () => {
    it("creates ethers provider for supported chain", () => {
      EvmClientFactory.createEthersClient(10);
      expect(RpcClientFactory.createEthersJsonRpcProvider).toHaveBeenCalledWith(
        10,
        expect.stringContaining("alchemy.com"),
      );
    });

    it("throws error for unsupported chain", () => {
      expect(() => EvmClientFactory.createEthersClient(999999)).toThrow(
        "No RPC URL available for chain 999999",
      );
    });
  });

  describe("createEip1193Client", () => {
    it("creates EIP-1193 provider for supported chain", () => {
      EvmClientFactory.createEip1193Client(10);
      expect(RpcClientFactory.createEip1193Provider).toHaveBeenCalledWith(
        10,
        expect.stringContaining("alchemy.com"),
      );
    });

    it("throws error for unsupported chain", () => {
      expect(() => EvmClientFactory.createEip1193Client(999999)).toThrow(
        "No RPC URL available for chain 999999",
      );
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

describe("RPC URL Helper", () => {
  describe("getRpcUrl", () => {
    it("returns URL for supported chain", () => {
      const url = EvmClientFactory.getRpcUrl(11155111);
      expect(url).toContain("alchemy.com");
      expect(url).toContain("mock-alchemy-key");
    });

    it("throws error for unsupported chain", () => {
      expect(() => EvmClientFactory.getRpcUrl(999999)).toThrow(
        "No RPC URL available for chain 999999",
      );
    });

    it("returns Glif URL for Filecoin chains", () => {
      const url = EvmClientFactory.getRpcUrl(314159);
      expect(url).toContain("glif.io");
    });
  });
});
