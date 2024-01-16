import type { NextApiRequest, NextApiResponse } from "next";

import {
  HypercertClaimdata,
  HypercertMetadata,
  validateClaimData,
  validateMetaData,
} from "@hypercerts-org/sdk";
import { allowCors, jsonToBlob } from "@/utils";
import { setup } from "@/client";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { getFromIPFS } from "@/utils/getFromIPFS";

type ResponseData = {
  message: string;
  cid?: string;
  errors?: Record<string, string | string[]>;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === "POST") {
    const client = await setup();

    const reqData = req.body;

    // Check if object is hypercert metadata object
    if (!isHypercertMetadata(reqData)) {
      res
        .status(400)
        .json({ message: "Not a valid hypercert metadata object" });
      return;
    }

    // Check if hypercert claim data is valid
    const { valid: claimDataValid, errors: claimDataErrors } =
      validateClaimData(reqData.hypercert);

    if (!claimDataValid) {
      res.status(400).json({
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
        message: "Errors in submitted metadata",
        errors: metaDataErrors,
      });
      return;
    }

    // If allowlist was provided, check if allowlist is valid
    if (reqData.allowList) {
      const { data: allowList, errors } = await getFromIPFS(reqData.allowList);

      if (typeof allowList !== "object" || !allowList) {
        res.status(400).json({
          message: `AllowList data not found. CID: ${reqData.allowList}`,
          errors: { ...errors },
        });
        return;
      }

      try {
        // Parse allowlist as openzeppelin merkle tree
        const merkleTree = StandardMerkleTree.load(allowList);
      } catch (e) {
        res.status(400).json({
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

      res
        .status(200)
        .json({ message: "Data uploaded succesfully", cid: result.toString() });
    } catch (e) {
      const error = e as Error;

      res.status(500).json({
        message: "Error uploading data",
        errors: {
          name: error.name,
          message: error.message,
        },
      });
    }
  } else {
    res.status(405).json({ message: "Not allowed" });
  }
};

// Check on required hypercert metadata fields
const isHypercertMetadata = (data: unknown): data is HypercertMetadata => {
  console.log("DATA", data);
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

export default allowCors(handler);
