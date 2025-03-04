import _ from "lodash";
import { MarketplaceOrderSelect } from "../services/database/entities/MarketplaceOrdersEntityService.js";

export const getCheapestOrder = (
  orders: (MarketplaceOrderSelect & {
    pricePerPercentInUSD: string;
  })[],
) =>
  _.minBy(orders, (order) => {
    return order.pricePerPercentInUSD;
  });
