import { VerifyTypedDataParameters } from "viem";
import { getEvmClient } from "./getRpcUrl.js";

export const verifyAuthSignedData = async ({
  chainId,
  ...args
}: Pick<
  VerifyTypedDataParameters,
  "address" | "message" | "types" | "signature" | "primaryType"
> & { chainId: number }) => {
  // TODO: If signature = 0x, call safe sdk to verify signature
  // https://github.com/safe-global/safe-apps-sdk/blob/main/packages/safe-apps-sdk/src/safe/index.ts#L57
  // TODO: Check if chain Id is in message, fail otherwise
  // TODO: Check if chain id is same as chain Id for domain
  const client = getEvmClient(chainId);
  return await client.verifyTypedData({
    ...args,
    domain: {
      name: "Hypercerts",
      version: "1",
      chainId,
    },
  });
};
