import { MarketplaceOrderSelect } from "../services/database/entities/MarketplaceOrdersEntityService.js";
import { getTokenPriceWithCurrencyFromCache } from "./getTokenPriceInUSD.js";
import { formatUnits } from "viem";

export const addPriceInUsdToOrder = async (
  order: MarketplaceOrderSelect,
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

  if (!tokenPrice.decimals) {
    throw new Error(
      `Token price data incomplete for ${currency}: decimals missing`,
    );
  }

  if (!tokenPrice.price) {
    throw new Error(
      `Token price data incomplete for ${currency}: price missing`,
    );
  }

  const unitsInPercentage = BigInt(unitsInHypercerts) / BigInt(100);
  const pricePerPercentInTokenWei = BigInt(price) * unitsInPercentage;
  const pricePerPercentInToken = formatUnits(
    pricePerPercentInTokenWei,
    tokenPrice.decimals,
  );
  const pricePerPercentInUSD =
    Number(pricePerPercentInToken) * tokenPrice.price;

  return {
    ...order,
    pricePerPercentInToken,
    pricePerPercentInUSD,
  };
};
