import { Currency, Maker } from "@hypercerts-org/marketplace-sdk";
import _ from "lodash";

export const getCheapestOrder = (
  orders: Pick<Maker, "price" | "currency">[],
  tokenPricesForChain: Record<string, Currency & { tokenPriceInUSD: number }>,
) =>
  _.minBy(orders, (order) => {
    const token = tokenPricesForChain[order.currency];
    return (
      (BigInt(order.price) * BigInt(Math.floor(token.tokenPriceInUSD * 100))) /
      BigInt(10) ** BigInt(token.decimals)
    );
  });
