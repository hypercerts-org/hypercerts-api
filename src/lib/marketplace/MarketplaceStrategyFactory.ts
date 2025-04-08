import {
  EOACreateOrderRequest,
  MultisigCreateOrderRequest,
} from "./schemas.js";
import { MarketplaceStrategy } from "./MarketplaceStrategy.js";
import EOACreateOrderStrategy from "./EOACreateOrderStrategy.js";
import MultisigCreateOrderStrategy from "./MultisigCreateOrderStrategy.js";
import { container } from "tsyringe";

export function createMarketplaceStrategy(
  request: MultisigCreateOrderRequest | EOACreateOrderRequest,
): MarketplaceStrategy {
  switch (request.type) {
    case "eoa": {
      return container.resolve(EOACreateOrderStrategy).initialize(request);
    }
    case "multisig": {
      return container.resolve(MultisigCreateOrderStrategy).initialize(request);
    }
    default:
      throw new Error("Invalid marketplace request type");
  }
}
