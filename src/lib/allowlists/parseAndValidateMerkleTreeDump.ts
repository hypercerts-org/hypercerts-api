import { validateAllowlist } from "@hypercerts-org/sdk";
import { parseMerkleTree } from "./parseMerkleTree.js";
import { ValidateAllowListRequest } from "../../types/api.js";

export const parseAndValidateMerkleTree = (
  request: ValidateAllowListRequest,
) => {
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

  const allowListEntries = Array.from(_merkleTree.entries()).map((entry) => ({
    address: entry[1][0],
    units: BigInt(entry[1][1]),
  }));

  const totalUnitsInEntries = allowListEntries.reduce(
    (acc, entry) => acc + entry.units,
    BigInt(0),
  );

  if (totalUnits) {
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

    if (totalUnitsInEntries !== 100_000_000n) {
      return {
        data: _merkleTree,
        valid: false,
        errors: {
          totalUnits: "Total units should amount to 100M (100_000_000) units",
        },
      };
    }
  }

  return validateAllowlist(allowListEntries, totalUnitsInEntries);
};
