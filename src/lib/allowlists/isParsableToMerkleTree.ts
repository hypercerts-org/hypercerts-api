import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

export const tryParseMerkleTree = (allowList: unknown) => {
  try {
    StandardMerkleTree.load(JSON.parse(allowList as string));

    return true;
  } catch (e) {
    console.warn("Error loading merkle tree as JSON", e);
  }

  try {
    StandardMerkleTree.load(allowList as never);

    return true;
  } catch (e) {
    console.warn("Error loading merkle tree from dump", e);
  }

  return false;
};
