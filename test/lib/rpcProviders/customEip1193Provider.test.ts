import { describe, expect, test, vi } from "vitest";
import { CustomEip1193Provider } from "../../../src/lib/rpcProviders/customEthers1193RpcProvider.js";
import { FetchRequest, FetchResponse } from "ethers";

describe("CustomEip1193Provider", () => {
  const testUrl = "https://test.rpc.url";
  const mockResponse = {
    bodyText: JSON.stringify({ result: "success", id: 1, jsonrpc: "2.0" }),
  };

  test("initializes with string URL", () => {
    const provider = new CustomEip1193Provider({ url: testUrl });
    expect(provider).toBeInstanceOf(CustomEip1193Provider);
  });

  test("initializes with FetchRequest", () => {
    const request = new FetchRequest(testUrl);
    const provider = new CustomEip1193Provider(request);
    expect(provider).toBeInstanceOf(CustomEip1193Provider);
  });

  test("applies custom headers", () => {
    const provider = new CustomEip1193Provider({
      url: testUrl,
      config: { headers: { "X-Custom-Header": "test" } },
    });
    expect(provider).toBeInstanceOf(CustomEip1193Provider);
  });

  test("makes successful RPC request", async () => {
    vi.spyOn(FetchRequest.prototype, "send").mockResolvedValue(
      mockResponse as FetchResponse,
    );

    const provider = new CustomEip1193Provider({ url: testUrl });
    const result = await provider.request({
      method: "eth_blockNumber",
      params: [],
    });

    expect(result).toBe("success");
  });

  test("handles RPC error", async () => {
    const errorResponse = {
      bodyText: JSON.stringify({
        error: { message: "RPC Error" },
        id: 1,
        jsonrpc: "2.0",
      }),
    };

    vi.spyOn(FetchRequest.prototype, "send").mockResolvedValue(
      errorResponse as FetchResponse,
    );

    const provider = new CustomEip1193Provider({ url: testUrl });
    await expect(
      provider.request({ method: "eth_blockNumber" }),
    ).rejects.toThrow("RPC Error");
  });

  test("sends correct JSON-RPC payload", async () => {
    const sendSpy = vi
      .spyOn(FetchRequest.prototype, "send")
      .mockResolvedValue(mockResponse as FetchResponse);

    const provider = new CustomEip1193Provider({ url: testUrl });

    // Get the request before sending
    const fetchRequest = provider["fetchRequest"] as FetchRequest;
    await provider.request({
      method: "eth_call",
      params: ["0x123", "latest"],
    });

    expect(sendSpy).toHaveBeenCalled();

    if (!fetchRequest.body) {
      throw new Error("Body is null");
    }
    const payload = JSON.parse(new TextDecoder().decode(fetchRequest.body));
    expect(payload).toEqual({
      jsonrpc: "2.0",
      id: 1,
      method: "eth_call",
      params: ["0x123", "latest"],
    });
  });
});
