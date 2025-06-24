import {
  EOACreateOrderRequest,
  MultisigCreateOrderRequest,
} from "./schemas.js";
import { MarketplaceStrategy } from "./MarketplaceStrategy.js";
import EOACreateOrderStrategy from "./EOACreateOrderStrategy.js";
import MultisigCreateOrderStrategy from "./MultisigCreateOrderStrategy.js";
import { container } from "tsyringe";

export function createMarketplaceStrategy({
  type,
  ...request
}: MultisigCreateOrderRequest | EOACreateOrderRequest): MarketplaceStrategy {
  switch (type) {
    case "eoa": {
      return container
        .resolve(EOACreateOrderStrategy)
        .initialize(request as Omit<EOACreateOrderRequest, "type">);
    }
    case "multisig": {
      return container
        .resolve(MultisigCreateOrderStrategy)
        .initialize(request as Omit<MultisigCreateOrderRequest, "type">);
    }
    default:
      throw new Error("Invalid marketplace request type");
  }
}
