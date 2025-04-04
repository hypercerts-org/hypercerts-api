import { SafeCreateOrderMessage } from "../../marketplace/schemas.js";
import SafeSignatureVerifier from "./SafeSignatureVerifier.js";

export default class MarketplaceCreateOrderSignatureVerifier extends SafeSignatureVerifier {
  private message: SafeCreateOrderMessage;

  constructor(
    chainId: number,
    safeAddress: `0x${string}`,
    message: SafeCreateOrderMessage,
  ) {
    super(chainId, safeAddress);
    this.message = message;
  }

  buildTypedData() {
    return {
      types: {
        Maker: [
          { name: "quoteType", type: "uint8" },
          { name: "globalNonce", type: "uint256" },
          { name: "subsetNonce", type: "uint256" },
          { name: "orderNonce", type: "uint256" },
          { name: "strategyId", type: "uint256" },
          { name: "collectionType", type: "uint8" },
          { name: "collection", type: "address" },
          { name: "currency", type: "address" },
          { name: "signer", type: "address" },
          { name: "startTime", type: "uint256" },
          { name: "endTime", type: "uint256" },
          { name: "price", type: "uint256" },
          { name: "itemIds", type: "uint256[]" },
          { name: "amounts", type: "uint256[]" },
          { name: "additionalParameters", type: "bytes" },
        ],
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
      },
      primaryType: "Maker",
      message: this.message.message,
    };
  }
}
