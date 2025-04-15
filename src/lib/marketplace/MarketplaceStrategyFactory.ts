import {
  EOACreateOrderRequest,
  MultisigCreateOrderRequest,
} from "./schemas.js";
import { MarketplaceStrategy } from "./MarketplaceStrategy.js";
import EOACreateOrderStrategy from "./EOACreateOrderStrategy.js";
import MultisigCreateOrderStrategy from "./MultisigCreateOrderStrategy.js";

export function createMarketplaceStrategy({
  type,
  ...request
}: MultisigCreateOrderRequest | EOACreateOrderRequest): MarketplaceStrategy {
  switch (type) {
    case "eoa":
      return new EOACreateOrderStrategy(
        request as Omit<EOACreateOrderRequest, "type">,
      );
    case "multisig":
      return new MultisigCreateOrderStrategy(
        request as Omit<MultisigCreateOrderRequest, "type">,
      );
    default:
      throw new Error("Invalid marketplace request type");
  }
}
