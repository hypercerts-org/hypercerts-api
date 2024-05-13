import type {Request, Response} from "express";
import {
    type HypercertClaimdata,
    type HypercertMetadata,
    validateClaimData,
    validateMetaData,
    getFromIPFS,
} from "@hypercerts-org/sdk";
import {jsonToBlob} from "../../../utils/jsonToBlob.js";
import {setup} from "../../../client/w3up.js";
import {StandardMerkleTree} from "@openzeppelin/merkle-tree";
import type {ResponseData} from "../../../types/api.js";

export const metadataHandler = async (
    req: Request,
    res: Response<ResponseData<{ cid: string }>>
) => {
    if (req.method === "POST") {
        const client = await setup();

        const reqData = req.body;

        // Check if object is hypercert metadata object
        if (!isHypercertMetadata(reqData)) {
            res.status(400).json({
                success: false,
                message: "Not a valid hypercert metadata object",
            });
            return;
        }

        // Check if hypercert claim data is valid
        const {valid: claimDataValid, errors: claimDataErrors} =
            validateClaimData(reqData.hypercert);

        if (!claimDataValid) {
            res.status(400).json({
                success: false,
                message: "Errors in submitted claim data",
                errors: claimDataErrors,
            });
            return;
        }

        // Check if metadata is valid
        const {
            data: metaData,
            valid: metaDataValid,
            errors: metaDataErrors,
        } = validateMetaData(reqData);

        if (!metaDataValid) {
            res.status(400).json({
                success: false,
                message: "Errors in submitted metadata",
                errors: metaDataErrors,
            });
            return;
        }

        // If allowlist was provided, check if allowlist is valid
        if (reqData.allowList) {
            let allowList;
            try {
                allowList = await getFromIPFS(reqData.allowList, 30000);
            } catch (e) {
                const error = e as Error;

                res.status(400).json({
                    success: false,
                    message: `Error getting allowlist from IPFS. CID: ${reqData.allowList}`,
                    errors: {message: error.message, name: error.name},
                });
                return;
            }

            if (!allowList || typeof allowList !== "string") {
                res.status(400).json({
                    success: false,
                    message: `AllowList data not found. CID: ${reqData.allowList}`,
                    errors: {
                        message: "Allowlist data not found or not of expected type",
                    },
                });
                return;
            }

            try {
                // Parse allowlist as openzeppelin merkle tree
                const merkleTree = StandardMerkleTree.load(JSON.parse(allowList));
            } catch (e) {
                res.status(400).json({
                    success: false,
                    message: "Allowlist should be a valid openzeppelin merkle tree",
                    errors: {
                        receivedAllowlistCID: reqData.allowList,
                        allowListFromIPFS: allowList,
                    },
                });
                return;
            }
        }

        const blob = jsonToBlob(metaData);

        try {
            const result = await client.uploadFile(blob);

            res.status(200).json({
                success: true,
                message: "Data uploaded succesfully",
                data: {cid: result.toString()},
            });
        } catch (e) {
            const error = e as Error;

            res.status(500).json({
                success: false,
                message: "Error uploading data",
                errors: {
                    name: error.name,
                    message: error.message,
                },
            });
        }
    } else {
        res.status(405).json({success: false, message: "Not allowed"});
    }
};

// Check on required hypercert metadata fields
const isHypercertMetadata = (data: unknown): data is HypercertMetadata => {
    return (
        typeof data === "object" &&
        data !== null &&
        "hypercert" in data &&
        typeof data.hypercert === "object" &&
        isHypercertClaimData(data.hypercert) &&
        "name" in data &&
        typeof data.name === "string" &&
        "description" in data &&
        typeof data.description === "string" &&
        "image" in data &&
        typeof data.image === "string"
    );
};

const isHypercertClaimData = (data: unknown): data is HypercertClaimdata => {
    return (
        typeof data === "object" &&
        data !== null &&
        "impact_scope" in data &&
        "work_scope" in data &&
        "work_timeframe" in data &&
        "impact_timeframe" in data &&
        "contributors" in data &&
        "rights" in data &&
        typeof data.impact_scope === "object" &&
        typeof data.work_scope === "object" &&
        typeof data.work_timeframe === "object" &&
        typeof data.impact_timeframe === "object" &&
        typeof data.contributors === "object" &&
        typeof data.rights === "object"
    );
};
