import { Database } from "../types/supabaseData.js";
import { getTokenPriceWithCurrencyFromCache } from "./getTokenPriceInUSD.js";
import { formatUnits } from "viem";

export const addPriceInUsdToOrder = async (
  order: Database["public"]["Tables"]["marketplace_orders"]["Row"],
) => {
  const { price, currency, chainId } = order;
  const tokenPrice = await getTokenPriceWithCurrencyFromCache(
    chainId,
    currency,
  );
  if (!tokenPrice) {
    throw new Error(`Token price not found for ${currency}`);
  }

  const priceInToken = formatUnits(BigInt(price), tokenPrice.decimals);
  const priceInUSD = (Number(priceInToken) * tokenPrice.price).toString();

  return {
    ...order,
    priceInUSD,
  };
};
