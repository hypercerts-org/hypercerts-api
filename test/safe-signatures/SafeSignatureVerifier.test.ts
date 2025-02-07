import { describe, it, expect, vi } from "vitest";
import Verifier from "../../src/lib/safe/signature-verification/UserUpsertSignatureVerifier.js";

// Fix the import paths and mock implementations
vi.mock("../../src/client/evmClient.js", () => ({
  EvmClientFactory: {
    create: vi.fn().mockReturnValue({
      verifyMessage: vi.fn().mockResolvedValue(true),
    }),
    getAllAvailableUrls: vi
      .fn()
      .mockReturnValue(["mock-rpc-url-1", "mock-rpc-url-2"]),
    getPublicRpcUrl: vi.fn().mockReturnValue("mock-public-rpc-url"),
  },
}));

vi.mock("../../src/lib/safe/safe-rpc-urls.js", () => ({
  RpcStrategyFactory: {
    getStrategy: vi.fn().mockReturnValue({
      getUrl: vi.fn().mockReturnValue("mock-rpc-url"),
    }),
  },
}));

// Testing hashing of typed data via UserUpsertSignatureVerifier
describe("hashTypedMessage", () => {
  it("should hash the typed message correctly", () => {
    const verifier = new Verifier(
      11155111,
      "0x379756bB61A632Cd3C5C5Ce4F3768f4815feaCda",
      {
        metadata: {
          timestamp: 1732812295136,
        },
        user: {
          displayName: "test name",
          avatar: "https://example.org/image",
        },
      },
    );
    expect(verifier.hashTypedData()).toBe(
      "0x56b9d12b9b854c0b80f253af1686aa70b14a5bc55ca94f98db6a947bd7660d7a",
    );
  });

  it("should throw with missing fields", () => {
    expect(() => {
      const verifier = new Verifier(
        11155111,
        "0x379756bB61A632Cd3C5C5Ce4F3768f4815feaCda",
        {
          metadata: {
            timestamp: 1732812295136,
          },
          user: {},
        },
      );
      verifier.hashTypedData();
    }).toThrow();
  });

  it("should handle special characters", () => {
    const verifier = new Verifier(
      11155111,
      "0x379756bB61A632Cd3C5C5Ce4F3768f4815feaCda",
      {
        metadata: {
          timestamp: 1732812295136,
        },
        user: {
          displayName: "Test with special chars: éèàù@#$%^&*()_+",
          avatar: "",
        },
      },
    );
    expect(verifier.hashTypedData()).toBeDefined();
  });

  it("should handle large data", () => {
    const largeMessage = "a".repeat(10000);
    const verifier = new Verifier(
      11155111,
      "0x379756bB61A632Cd3C5C5Ce4F3768f4815feaCda",
      {
        metadata: {
          timestamp: 1732812295136,
        },
        user: {
          displayName: largeMessage,
          avatar: "",
        },
      },
    );
    expect(verifier.hashTypedData()).toBeDefined();
  });

  it("should handle empty strings", () => {
    const verifier = new Verifier(
      11155111,
      "0x379756bB61A632Cd3C5C5Ce4F3768f4815feaCda",
      {
        metadata: {
          timestamp: 1732812295136,
        },
        user: {
          displayName: "",
          avatar: "",
        },
      },
    );
    expect(verifier.hashTypedData()).toBe(
      "0xa0752bebdb2725e200a8f2ebb6ad12f35b2566710f18c51e625276b267f623b9",
    );
  });
});
