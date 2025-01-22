import { http } from "viem";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RpcClientFactory } from "../../src/client/rpcClientFactory.js";
import { CustomEip1193Provider } from "../../src/lib/rpcProviders/customEthers1193RpcProvider.js";
import { CustomEthersJsonRpcProvider } from "../../src/lib/rpcProviders/customEthersJsonRpcProvider.js";

const mockFetch = vi.fn();
global.fetch = mockFetch;

vi.mock("@/client/chainFactory", () => ({
  ChainFactory: {
    getChain: vi.fn().mockReturnValue({
      id: 1,
      name: "test",
      contracts: { ensRegistry: { address: "0x123" } },
    }),
  },
}));

vi.mock("viem", () => ({
  http: vi.fn().mockReturnValue({
    request: vi.fn(),
    retryCount: 3,
    timeout: 20_000,
    config: { request: vi.fn() },
    value: { request: vi.fn() },
    transport: () => ({ request: vi.fn() }),
  }),
  createPublicClient: vi.fn(),
}));

vi.mock("@/utils/constants", () => ({
  filecoinApiKey: "mock-filecoin-key",
}));

describe("RpcClientFactory", () => {
  const testUrl = "https://test.rpc.url";
  const testChainId = 1;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createViemTransport", () => {
    it("creates basic transport without headers", () => {
      RpcClientFactory.createViemTransport(testChainId, testUrl);

      expect(http).toHaveBeenCalledWith(testUrl, {
        timeout: 20_000,
      });
    });

    it("creates transport with headers for Filecoin chains", () => {
      RpcClientFactory.createViemTransport(314, testUrl);

      expect(http).toHaveBeenCalledWith(testUrl, {
        timeout: 20_000,
        fetchOptions: {
          headers: {
            Authorization: "Bearer mock-filecoin-key",
          },
        },
      });
    });
  });

  describe("createEthersJsonRpcProvider", () => {
    it("creates provider without headers", () => {
      const provider = RpcClientFactory.createEthersJsonRpcProvider(
        testChainId,
        testUrl,
      );

      expect(provider).toBeInstanceOf(CustomEthersJsonRpcProvider);
    });

    it("creates provider with headers for Filecoin chains", () => {
      const provider = RpcClientFactory.createEthersJsonRpcProvider(
        314,
        testUrl,
      );

      expect(provider).toBeInstanceOf(CustomEthersJsonRpcProvider);
      // Additional checks for headers could be added if we expose them
    });
  });

  describe("createEip1193Provider", () => {
    it("creates provider without headers", () => {
      const provider = RpcClientFactory.createEip1193Provider(
        testChainId,
        testUrl,
      );

      expect(provider).toBeInstanceOf(CustomEip1193Provider);
    });

    it("creates provider with headers for Filecoin chains", () => {
      const provider = RpcClientFactory.createEip1193Provider(314, testUrl);

      expect(provider).toBeInstanceOf(CustomEip1193Provider);
      // Additional checks for headers could be added if we expose them
    });
  });
});
