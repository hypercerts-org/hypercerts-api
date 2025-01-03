import { describe, test, expect, vi } from "vitest";
import { parseMerkleTree } from "../../../src/lib/allowlists/parseMerkleTree";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

// Only mock for error cases
vi.mock("@openzeppelin/merkle-tree", async () => {
  /* eslint-disable @typescript-eslint/no-explicit-any */

  const actual = await vi.importActual("@openzeppelin/merkle-tree");
  return {
    ...actual,
    StandardMerkleTree: {
      ...(actual as any).StandardMerkleTree,
      of: (actual as any).StandardMerkleTree.of,
      load: vi.fn().mockImplementation((actual as any).StandardMerkleTree.load),
    },
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */
});

describe("parseMerkleTree", () => {
  const validTree = StandardMerkleTree.of(
    [
      ["0x1234567890123456789012345678901234567890", "100"],
      ["0x2345678901234567890123456789012345678901", "200"],
    ],
    ["address", "uint256"],
  );

  test("successfully parses valid merkle tree JSON", () => {
    const treeJson = JSON.stringify(validTree.dump());
    const result = parseMerkleTree(treeJson);
    expect(result).toBeDefined();
    expect(result?.root).toBe(validTree.root);
  });

  test("successfully parses valid merkle tree object", () => {
    const result = parseMerkleTree(JSON.stringify(validTree.dump()));
    expect(result).toBeDefined();
    expect(result?.root).toBe(validTree.root);
  });

  test("returns undefined for invalid JSON", () => {
    const result = parseMerkleTree("{invalid json}");
    expect(result).toBeUndefined();
  });

  test("returns undefined when StandardMerkleTree.load fails", () => {
    vi.mocked(StandardMerkleTree.load).mockImplementationOnce(() => {
      throw new Error("Invalid merkle tree");
    });

    const result = parseMerkleTree(JSON.stringify(validTree.dump()));
    expect(result).toBeUndefined();
  });

  test("returns undefined for invalid tree format", () => {
    const invalidTree = {
      ...validTree.dump(),
      format: "invalid-format",
    };
    const result = parseMerkleTree(JSON.stringify(invalidTree));
    expect(result).toBeUndefined();
  });

  test("returns undefined for missing values", () => {
    const invalidTree = {
      ...validTree.dump(),
      values: undefined,
    };
    const result = parseMerkleTree(JSON.stringify(invalidTree));
    expect(result).toBeUndefined();
  });

  test("verifies tree properties are accessible", () => {
    const result = parseMerkleTree(JSON.stringify(validTree.dump()));
    expect(result).toBeDefined();
    if (result) {
      expect(result.root).toBe(validTree.root);
      expect(result.entries()).toBeDefined();
      const [[index, value]] = result.entries();
      expect(index).toBe(0);
      expect(value).toBeDefined();
      expect(value[0]).toBe("0x1234567890123456789012345678901234567890");
      expect(value[1]).toBe("100");
    }
  });

  test("handles proof verification", () => {
    const result = parseMerkleTree(JSON.stringify(validTree.dump()));
    expect(result).toBeDefined();
    if (result) {
      expect(result.entries()).toBeDefined();
      const [[index, value]] = result.entries();
      const proof = result.getProof(index);
      expect(Array.isArray(proof)).toBe(true);
      expect(result.verify(value, proof)).toBe(true);
    }
  });
});
