import { getFromIPFS } from "@hypercerts-org/sdk";
import { tryParseMerkleTree } from "./isParsableToMerkleTree.js";
import { ValidationResult } from "../types/api.js";

export const validateRemoteAllowList = async (uri: string): Promise<ValidationResult<unknown>> => {
  try {
    const allowList = await getFromIPFS(uri, 30000);

    if (!allowList || typeof allowList !== "string") {
      return {
        valid: false,
        errors: {
          message: "Allow list data not found or not of expected type"
        }
      };
    }

    if (tryParseMerkleTree(allowList)) {
      return {
        valid: true,
        data: allowList
      };
    } else {
      return {
        valid: false,
        errors: {
          message: `Allow list at ${uri} should be a valid openzeppelin merkle tree`
        }
      };
    }
  } catch (e) {
    const error = e as Error;

    return {
      valid: false,
      errors: {
        message: error.message
      }
    };

  }


};