import { FetchRequest, Networkish } from "ethers";
import { describe, expect, test, vi } from "vitest";
import { CustomEthersJsonRpcProvider } from "../../../src/lib/rpcProviders/customEthersJsonRpcProvider.js";

describe("CustomEthersJsonRpcProvider", () => {
  const testUrl = "https://test.rpc.url";
  const mockNetwork: Networkish = {
    chainId: 1,
    name: "test",
  };

  test("initializes with string URL", () => {
    const provider = new CustomEthersJsonRpcProvider({
      url: testUrl,
      network: mockNetwork,
    });
    expect(provider).toBeInstanceOf(CustomEthersJsonRpcProvider);
  });

  test("initializes with FetchRequest", () => {
    const request = new FetchRequest(testUrl);
    const provider = new CustomEthersJsonRpcProvider({
      url: request,
      network: mockNetwork,
    });
    expect(provider).toBeInstanceOf(CustomEthersJsonRpcProvider);
  });

  test("applies custom headers", () => {
    const provider = new CustomEthersJsonRpcProvider({
      url: testUrl,
      config: { headers: { "X-Custom-Header": "test" } },
      network: mockNetwork,
    });

    const headerValue = provider._getConnection().getHeader("x-custom-header");
    expect(headerValue).toBe("test");
  });

  test("applies multiple custom headers", () => {
    const headers = {
      "X-Custom-Header-1": "test1",
      "X-Custom-Header-2": "test2",
      Authorization: "Bearer token",
    };

    const provider = new CustomEthersJsonRpcProvider({
      url: testUrl,
      config: { headers },
      network: mockNetwork,
    });

    const request = provider._getConnection();
    Object.entries(headers).forEach(([key, value]) => {
      expect(request.headers[key.toLowerCase()]).toBe(value);
    });
  });

  test("handles provider options", () => {
    const providerOptions = {
      batchMaxCount: 3,
      polling: true,
      staticNetwork: true,
    };

    const provider = new CustomEthersJsonRpcProvider({
      url: testUrl,
      network: mockNetwork,
      providerOptions,
    });

    expect(provider).toBeInstanceOf(CustomEthersJsonRpcProvider);
    expect(provider._getConnection().url).toEqual(testUrl);
  });

  test("makes successful RPC request", async () => {
    const provider = new CustomEthersJsonRpcProvider({
      url: testUrl,
      network: mockNetwork,
    });

    // Mock with proper hex string format
    vi.spyOn(provider, "send").mockResolvedValue(0x1234);

    const blockNumber = await provider.getBlockNumber();
    expect(blockNumber).toBe(0x1234);
  });

  test("handles RPC errors", async () => {
    const provider = new CustomEthersJsonRpcProvider({
      url: testUrl,
      network: mockNetwork,
    });

    // Mock with proper JSON-RPC error response
    vi.spyOn(provider, "send").mockResolvedValue({
      jsonrpc: "2.0",
      id: 1,
      error: {
        code: -32603,
        message: "Internal error",
      },
    });

    await expect(provider.getBlockNumber()).rejects.toThrow("Internal error");
  });

  test("handles network errors", async () => {
    const provider = new CustomEthersJsonRpcProvider({
      url: testUrl,
      network: mockNetwork,
    });

    // Mock FetchRequest.send to reject with network error
    vi.spyOn(FetchRequest.prototype, "send").mockRejectedValue(
      new Error("Network error"),
    );

    await expect(provider.getBlockNumber()).rejects.toThrow("Network error");
  });

  test("clones FetchRequest in constructor", () => {
    const originalRequest = new FetchRequest(testUrl);
    originalRequest.setHeader("Original", "value");

    const provider = new CustomEthersJsonRpcProvider({
      url: originalRequest,
      network: mockNetwork,
    });

    // Modify original request
    originalRequest.setHeader("Modified", "newvalue");

    // Verify provider's request is independent
    const providerRequest = provider._getConnection();
    expect(providerRequest.getHeader("original")).toBe("value");
    expect(providerRequest.getHeader("modified")).toBeUndefined();
  });
});
