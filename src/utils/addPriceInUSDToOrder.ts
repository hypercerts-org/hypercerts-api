import { Database } from "../types/supabaseData.js";
import { getTokenPriceWithCurrencyFromCache } from "./getTokenPriceInUSD.js";
import { formatUnits } from "viem";

export const addPriceInUsdToOrder = async (
  order: Database["public"]["Tables"]["marketplace_orders"]["Row"],
  unitsInHypercerts: bigint,
) => {
  const { price, currency, chainId } = order;
  const tokenPrice = await getTokenPriceWithCurrencyFromCache(
    chainId,
    currency,
  );
  if (!tokenPrice) {
    throw new Error(`Token price not found for ${currency}`);
  }

  const unitsInPercentage = BigInt(unitsInHypercerts) / BigInt(100);
  const pricePerPercentInTokenWei = BigInt(price) * unitsInPercentage;
  const pricePerPercentInToken = formatUnits(
    pricePerPercentInTokenWei,
    tokenPrice.decimals,
  );
  const pricePerPercentInUSD = (
    Number(pricePerPercentInToken) * tokenPrice.price
  ).toFixed(2);

  return {
    ...order,
    pricePerPercentInToken,
    pricePerPercentInUSD,
  };
};
