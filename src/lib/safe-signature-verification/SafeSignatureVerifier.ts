import { hashTypedData, type HashTypedDataParameters } from "viem";
import { getRpcUrl } from "../../utils/getRpcUrl.js";
import Safe from "@safe-global/protocol-kit";

export default abstract class SafeSignatureVerifier {
  protected chainId: number;
  protected safeAddress: `0x${string}`;
  protected rpcUrl: string;

  constructor(chainId: number, safeAddress: `0x${string}`) {
    const rpcUrl = getRpcUrl(chainId);

    if (!rpcUrl) {
      throw new Error(`Unsupported chain ID: ${chainId}`);
    }
    this.chainId = chainId;
    this.safeAddress = safeAddress;
    this.rpcUrl = rpcUrl;
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
      safeAddress: this.safeAddress as `0x${string}`,
    });

    const protocolKit = await safe.connect({});
    return protocolKit.isValidSignature(this.hashTypedData(), signature);
  }
}
