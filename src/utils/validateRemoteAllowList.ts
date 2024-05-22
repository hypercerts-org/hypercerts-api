import {getFromIPFS, HypercertMetadata} from "@hypercerts-org/sdk";
import {tryParseMerkleTree} from "./isParsableToMerkleTree.js";

export const validateRemoteAllowList = async (metadata: HypercertMetadata) => {

    if (!metadata.allowList) {
        return {
            valid: true,
            data: metadata,
        }
    }

    let allowList;
    try {
        allowList = await getFromIPFS(metadata.allowList, 30000);
    } catch (e) {
        const error = e as Error;

        return {
            valid: false,
            data: allowList,
            errors: {
                message: `Error fetching allow list from provided URI: ${metadata.allowList}`,
                name: error.name,
            },
        }

    }

    if (!allowList || typeof allowList !== "string") {
        return {
            valid: false,
            data: allowList,
            errors: {
                message: "Allowlist data not found or not of expected type",
            },
        }
    }

    if (tryParseMerkleTree(allowList)) {
        return {
            valid: true,
            data: allowList,
        }
    } else {
        return {
            valid: false,
            data: allowList,
            errors: {
                message: "Allowlist should be a valid openzeppelin merkle tree",
                receivedAllowlistCID: metadata.allowList,
            },
        }
    }

}