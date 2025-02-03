import Safe from "@safe-global/protocol-kit";
import { ethers } from "ethers";

const EIP1271_MAGIC_VALUE =
  "0x1626ba7e00000000000000000000000000000000000000000000000000000000";

export interface SignatureVerifierStrategy {
  verify(
    signature: `0x${string}`,
    rpcUrl: string,
    safeAddress: `0x${string}`,
  ): Promise<boolean>;
}

export class SignatureVerifierStrategyFactory {
  static getStrategy(
    chainId: number,
    hashTypedData: `0x${string}`,
  ): SignatureVerifierStrategy {
    switch (chainId) {
      case 314:
      case 314159:
        return new ContractSignatureVerifierStrategy(hashTypedData);
      default:
        return new SafeSignatureVerifierStrategy(hashTypedData);
    }
  }
}

export class SafeSignatureVerifierStrategy
  implements SignatureVerifierStrategy
{
  private hashTypedData: `0x${string}`;
  constructor(hashTypedData: `0x${string}`) {
    this.hashTypedData = hashTypedData;
  }

  async verify(
    signature: `0x${string}`,
    rpcUrl: string,
    safeAddress: `0x${string}`,
  ): Promise<boolean> {
    const safe = await Safe.default.init({
      provider: rpcUrl,
      safeAddress: safeAddress,
    });

    const protocolKit = await safe.connect({});
    return protocolKit.isValidSignature(this.hashTypedData, signature);
  }
}

export class ContractSignatureVerifierStrategy
  implements SignatureVerifierStrategy
{
  private hashTypedData: `0x${string}`;
  constructor(hashTypedData: `0x${string}`) {
    this.hashTypedData = hashTypedData;
  }

  async verify(
    signature: `0x${string}`,
    rpcUrl: string,
    safeAddress: `0x${string}`,
  ): Promise<boolean> {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const iface = new ethers.Interface([
      "function isValidSignature(bytes32 hash, bytes signature) view returns (bytes4)",
    ]);
    const calldata = iface.encodeFunctionData("isValidSignature", [
      this.hashTypedData,
      signature,
    ]);

    try {
      const result = await provider.call({ to: safeAddress, data: calldata });
      return result === EIP1271_MAGIC_VALUE;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }
}
