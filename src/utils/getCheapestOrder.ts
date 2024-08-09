import { Currency } from "@hypercerts-org/marketplace-sdk";
import _ from "lodash";
import { Database } from "../types/supabaseData.js";

export const getCheapestOrder = (
  orders: Database["public"]["Tables"]["marketplace_orders"]["Row"][],
  tokenPricesForChain: Record<string, Currency & { tokenPriceInUSD: number }>,
) =>
  _.minBy(orders, (order) => {
    const token = tokenPricesForChain[order.currency];
    return (
      (BigInt(order.price) * BigInt(Math.floor(token.tokenPriceInUSD * 100))) /
      BigInt(10) ** BigInt(token.decimals)
    );
  });
