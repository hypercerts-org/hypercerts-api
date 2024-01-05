import type { NextApiRequest, NextApiResponse } from "next";

import { validateMetaData } from "@hypercerts-org/sdk";
import { jsonToBlob } from "@/utils";
import { setup } from "@/client";

type ResponseData = {
  message: string;
  cid?: string;
  errors?: Record<string, string | string[]>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const client = await setup();

    const reqData = req.body;

    const { data, valid, errors } = validateMetaData(reqData);

    if (!valid) {
      res.status(400).json({ message: "Errors in submitted data", errors });
      return;
    }

    const blob = jsonToBlob(data);

    const result = await client.uploadFile(blob);

    console.log(result);

    console.log(result.toString());

    res
      .status(200)
      .json({ message: "Data uploaded succesfully", cid: result.toString() });
  } else {
    res.status(405).json({ message: "Not allowed" });
  }
}
