import { validateAllowlist } from "@hypercerts-org/sdk";
import { parseMerkleTree } from "./parseMerkleTree.js";
import { CreateAllowListRequest } from "../controllers/AllowListController.js";
import { parseEther } from "viem";

export const parseAndValidateMerkleTree = (request: CreateAllowListRequest) => {
  const { allowList, totalUnits } = request;

  const _merkleTree = parseMerkleTree(allowList);

  if (!_merkleTree) {
    return {
      data: _merkleTree,
      valid: false,
      errors: {
        allowListData: "Data could not be parsed to OpenZeppelin MerkleTree",
      },
    };
  }

  const merkleEntries = Array.from(_merkleTree.entries()).map(
    (entry) => entry[1],
  );

  const allowListEntries = merkleEntries
    .map((row) => ({ address: row[0], units: BigInt(row[1]) }))
    .flatMap((entry) => (entry ? [entry] : []));

  const totalUnitsInEntries = allowListEntries.reduce(
    (acc, entry) => acc + entry.units,
    BigInt(0),
  );

  if (totalUnitsInEntries !== BigInt(totalUnits)) {
    return {
      data: _merkleTree,
      valid: false,
      errors: {
        totalUnits:
          "Total units do not match the sum of units in the allowlist",
      },
    };
  }

  if (totalUnitsInEntries !== parseEther("1")) {
    return {
      data: _merkleTree,
      valid: false,
      errors: {
        totalUnits: "Total units should amount to 1 eth in wei (1e18) units",
      },
    };
  }

  return validateAllowlist(allowListEntries, BigInt(totalUnits));
};
