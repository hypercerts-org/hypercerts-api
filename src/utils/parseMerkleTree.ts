import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

export const parseMerkleTree = (allowList: string) => {
  try {
    return StandardMerkleTree.load(JSON.parse(allowList));
  } catch (e) {
    console.warn("Error loading merkle tree as JSON", e);
  }

  try {
    return StandardMerkleTree.load(allowList as never);
  } catch (e) {
    console.warn("Error loading merkle tree from dump", e);
  }
};
