import Safe from "@safe-global/protocol-kit";
import { getAddress, hashTypedData, type HashTypedDataParameters } from "viem";

import { EvmClientFactory } from "../../../client/evmClient.js";

import { RpcStrategyFactory } from "../safe-rpc-urls.js";

export default abstract class SafeSignatureVerifier {
  protected chainId: number;
  protected safeAddress: `0x${string}`;
  protected rpcUrl: string;

  constructor(chainId: number, safeAddress: `0x${string}`) {
    this.chainId = chainId;
    this.safeAddress = getAddress(safeAddress);
    this.rpcUrl = RpcStrategyFactory.getStrategy(
      chainId,
      EvmClientFactory,
    ).getUrl(chainId);
  }

  hashTypedData() {
    const parameters = this.buildTypedData();

    return hashTypedData({
      domain: {
        name: "Hypercerts",
        version: "1",
        chainId: this.chainId,
        verifyingContract: this.safeAddress,
      },
      ...parameters,
    });
  }

  abstract buildTypedData(): Omit<HashTypedDataParameters, "domain">;

  async verify(signature: string): Promise<boolean> {
    const safe = await Safe.default.init({
      provider: this.rpcUrl,
      safeAddress: this.safeAddress,
    });

    const protocolKit = await safe.connect({});
    return protocolKit.isValidSignature(this.hashTypedData(), signature);
  }
}
