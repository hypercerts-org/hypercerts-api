import { describe, test, expect, vi } from "vitest";
import { tryParseMerkleTree } from "../../../src/lib/allowlists/isParsableToMerkleTree";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

// Only mock for error cases
vi.mock("@openzeppelin/merkle-tree", async () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const actual = await vi.importActual("@openzeppelin/merkle-tree");
  return {
    ...actual,
    StandardMerkleTree: {
      of: (actual.StandardMerkleTree as any).of,
      load: vi.fn().mockImplementation((actual as any).StandardMerkleTree.load),
    },
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */
});

describe("tryParseMerkleTree", () => {
  const validTree = StandardMerkleTree.of(
    [
      ["0x1234567890123456789012345678901234567890", "100"],
      ["0x2345678901234567890123456789012345678901", "200"],
    ],
    ["address", "uint256"],
  );

  test("returns true for valid merkle tree JSON", () => {
    const treeJson = JSON.stringify(validTree.dump());
    const result = tryParseMerkleTree(treeJson);
    expect(result).toBe(true);
  });

  test("returns true for valid merkle tree object", () => {
    const result = tryParseMerkleTree(JSON.stringify(validTree.dump()));
    expect(result).toBe(true);
  });

  test("returns false for invalid JSON", () => {
    const result = tryParseMerkleTree("{invalid json}");
    expect(result).toBe(false);
  });

  test("returns false when StandardMerkleTree.load fails", () => {
    vi.mocked(StandardMerkleTree.load).mockImplementationOnce(() => {
      throw new Error("Invalid merkle tree");
    });

    const result = tryParseMerkleTree(JSON.stringify(validTree.dump()));
    expect(result).toBe(false);
  });

  test("returns false for non-object input", () => {
    const result = tryParseMerkleTree("not an object or json");
    expect(result).toBe(false);
  });

  test("handles null input", () => {
    const result = tryParseMerkleTree(null);
    expect(result).toBe(false);
  });

  test("handles undefined input", () => {
    const result = tryParseMerkleTree(undefined);
    expect(result).toBe(false);
  });

  test("returns false for array input", () => {
    const result = tryParseMerkleTree(JSON.stringify([]));
    expect(result).toBe(false);
  });

  test("returns false for invalid tree format", () => {
    const invalidTree = {
      ...validTree.dump(),
      format: "invalid-format",
    };
    const result = tryParseMerkleTree(JSON.stringify(invalidTree));
    expect(result).toBe(false);
  });

  test("returns false for missing values", () => {
    const invalidTree = {
      ...validTree.dump(),
      values: undefined,
    };
    const result = tryParseMerkleTree(JSON.stringify(invalidTree));
    expect(result).toBe(false);
  });
});
