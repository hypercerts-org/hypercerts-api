import { VerifyTypedDataParameters } from "viem";
import { EvmClientFactory } from "../client/evmClient.js";

export const verifyAuthSignedData = async ({
  requiredChainId,
  ...args
}: Pick<
  VerifyTypedDataParameters,
  "address" | "message" | "types" | "signature" | "primaryType"
> & { requiredChainId: number }) => {
  const client = EvmClientFactory.createViemClient(requiredChainId);
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
