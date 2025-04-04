import {
  EOACreateOrderRequest,
  MultisigCreateOrderRequest,
} from "./schemas.js";
import { MarketplaceStrategy } from "./MarketplaceStrategy.js";
import EOACreateOrderStrategy from "./EOACreateOrderStrategy.js";
import MultisigCreateOrderStrategy from "./MultisigCreateOrderStrategy.js";

export function createMarketplaceStrategy(
  request: MultisigCreateOrderRequest | EOACreateOrderRequest,
): MarketplaceStrategy {
  switch (request.type) {
    case "eoa":
      return new EOACreateOrderStrategy(request);
    case "multisig":
      return new MultisigCreateOrderStrategy(request);
    default:
      throw new Error("Invalid marketplace request type");
  }
}
