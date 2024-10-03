import { VerifyTypedDataParameters } from "viem";
import { getEvmClient } from "./getRpcUrl.js";

export const verifyAuthSignedData = async ({
  requiredChainId,
  ...args
}: Pick<
  VerifyTypedDataParameters,
  "address" | "message" | "types" | "signature" | "primaryType"
> & { requiredChainId: number }) => {
  // TODO: If signature = 0x, call safe sdk to verify signature
  // https://github.com/safe-global/safe-apps-sdk/blob/main/packages/safe-apps-sdk/src/safe/index.ts#L57
  const client = getEvmClient(requiredChainId);
  try {
    return await client.verifyTypedData({
      ...args,
      domain: {
        name: "Hypercerts",
        version: "1",
        chainId: requiredChainId,
      },
    });
  } catch (e) {
    console.error("Error verifying signature");
    console.error(e);
    return false;
  }
};
