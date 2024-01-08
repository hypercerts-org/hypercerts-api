import type { NextApiRequest, NextApiResponse } from "next";

import { AllowlistEntry, validateAllowlist } from "@hypercerts-org/sdk";
import { allowCors, jsonToBlob } from "@/utils";
import { setup } from "@/client";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { isAddress } from "viem";

type AllowListPostRequest = {
  allowList: string;
  totalUnits: string;
};

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

    // Check if object contains openzeppelin merkle tree dump and total units
    if (!isAllowListPostRequest(reqData)) {
      res.status(400).json({ message: "Not a valid merkle tree object" });
      return;
    }

    let merkleTree;

    // If allowlist was provided, check if allowlist is valid
    if (reqData.allowList) {
      try {
        // Parse allowlist as openzeppelin merkle tree
        const _merkleTree = StandardMerkleTree.load(
          JSON.parse(reqData.allowList)
        );

        // Get allowlist entries from merkle tree and validate values
        const merkleEntries = Array.from(_merkleTree.entries());
        const allowListEntries = merkleEntries
          .map((entry) =>
            isAllowListEntry(entry[1])
              ? ({ address: entry[1][0], units: entry[1][1] } as AllowlistEntry)
              : null
          )
          .flatMap((entry) => (entry ? [entry] : []));

        const { valid, errors } = validateAllowlist(
          allowListEntries,
          BigInt(reqData.totalUnits)
        );

        if (!valid) {
          res.status(400).json({
            message: "Errors in submitted allowlist",
            errors,
          });
          return;
        }

        merkleTree = _merkleTree;
      } catch (e) {
        res.status(400).json({
          message: "Allowlist should be a valid openzeppelin merkle tree",
        });
        return;
      }
    }

    if (!merkleTree) {
      res
        .status(500)
        .json({ message: "Something went wrong parsing the allowlist" });
      return;
    }

    const blob = jsonToBlob(JSON.parse(reqData.allowList));

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

const isAllowListEntry = (data: unknown): data is AllowlistEntry => {
  if (!Array.isArray(data)) return false;
  const _address = data[0];
  const _units = data[1];

  return data.length === 2 && isAddress(_address) && isParsableToBigInt(_units);
};

// Check on allowlist dump as string and units as bigint
const isAllowListPostRequest = (
  data: unknown
): data is AllowListPostRequest => {
  return (
    typeof data === "object" &&
    data !== null &&
    "allowList" in data &&
    typeof data.allowList === "string" &&
    "totalUnits" in data &&
    typeof data.totalUnits === "string" &&
    isParsableToBigInt(data.totalUnits)
  );
};

const isParsableToBigInt = (value: unknown): value is number | bigint => {
  if (typeof value === "string") {
    try {
      const parsedValue = BigInt(value);
      return true; // if it was able to parse, return true
    } catch (e) {
      return false; // if an error was thrown, it's not a valid BigInt string
    }
  }

  return false;
};

export default allowCors(handler);
