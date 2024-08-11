import _ from "lodash";
import { Database } from "../types/supabaseData.js";

export const getCheapestOrder = (
  orders: (Database["public"]["Tables"]["marketplace_orders"]["Row"] & {
    pricePerPercentInUSD: string;
  })[],
) =>
  _.minBy(orders, (order) => {
    return order.pricePerPercentInUSD;
  });
