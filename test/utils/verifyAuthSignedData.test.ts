import { describe, it, expect, vi, beforeEach } from "vitest";
import { verifyAuthSignedData } from "../../src/utils/verifyAuthSignedData.js";

const mockVerifyTypedData = vi.hoisted(() => vi.fn());

vi.mock("../../src/client/evmClient.js", () => ({
  EvmClientFactory: {
    createViemClient: vi.fn().mockReturnValue({
      verifyTypedData: mockVerifyTypedData,
      account: undefined,
      batch: undefined,
      cacheTime: 0,
      chain: undefined,
      key: "mock",
      name: "Mock Client",
      pollingInterval: 0,
      request: vi.fn(),
      transport: { type: "mock" },
      type: "publicClient",
      uid: "mock-client",
    }),
  },
}));

describe("verifyAuthSignedData", () => {
  beforeEach(() => {
    mockVerifyTypedData.mockReset();
  });

  it("verifies hypercerts domain added to message", async () => {
    mockVerifyTypedData.mockResolvedValue(true);

    const result = await verifyAuthSignedData({
      address: "0x123",
      message: { test: "message" },
      types: { Test: [{ name: "test", type: "string" }] },
      signature: "0xsignature",
      primaryType: "Test",
      requiredChainId: 11155111,
    });

    expect(result).toBe(true);
    expect(mockVerifyTypedData).toHaveBeenCalledWith({
      address: "0x123",
      message: { test: "message" },
      types: { Test: [{ name: "test", type: "string" }] },
      signature: "0xsignature",
      primaryType: "Test",
      domain: {
        name: "Hypercerts",
        version: "1",
        chainId: 11155111,
      },
    });
  });

  it("returns false on verification error", async () => {
    mockVerifyTypedData.mockRejectedValue(new Error("Verification failed"));

    const result = await verifyAuthSignedData({
      address: "0x123",
      message: { test: "message" },
      types: { Test: [{ name: "test", type: "string" }] },
      signature: "0xsignature",
      primaryType: "Test",
      requiredChainId: 11155111,
    });

    expect(result).toBe(false);
  });
});
