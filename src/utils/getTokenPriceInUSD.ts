import {
  ChainId,
  currenciesByNetwork,
  Currency,
} from "@hypercerts-org/marketplace-sdk";
import { formatUnits, getAddress } from "viem";
import { getEvmClient } from "./getRpcUrl.js";
import { AggregatorV3Abi } from "../abis/AggregatorV3Abi.js";
import { LRUCache } from "lru-cache";

export const getTokenPriceInUSD = async (
  chainId: ChainId,
  tokenAddress: string,
) => {
  const client = getEvmClient(chainId);

  // The address of the contract which will provide the price of ETH
  const feedAddress = tokenAddressToFeedAddress(chainId, tokenAddress);

  if (!feedAddress) {
    throw new Error(`Feed address not found for ${tokenAddress}`);
  }

  const priceFeed = {
    abi: AggregatorV3Abi,
    address: feedAddress,
  };

  let roundData: bigint;
  let decimals: number;

  if (chainId === ChainId.BASE_SEPOLIA) {
    // Base sepolia does not support multichain
    const roundDataResult = await client.readContract({
      ...priceFeed,
      functionName: "latestRoundData",
    });

    const decimalsResult = await client.readContract({
      ...priceFeed,
      functionName: "decimals",
    });

    roundData = roundDataResult[1];
    decimals = decimalsResult;
  } else {
    const [roundDataResult, decimalsResult] = await client.multicall({
      contracts: [
        { ...priceFeed, functionName: "latestRoundData" },
        { ...priceFeed, functionName: "decimals" },
      ],
    });

    if (roundDataResult.status === "failure") {
      throw new Error(
        `Failed to fetch round data result: ${roundDataResult.error}`,
      );
    }

    if (decimalsResult.status === "failure") {
      throw new Error(
        `Failed to fetch decimals result: ${decimalsResult.error}`,
      );
    }

    roundData = roundDataResult.result[1];
    decimals = decimalsResult.result;
  }

  if (!roundData || !decimals) {
    throw new Error(
      `Failed to fetch round data or decimals for ${tokenAddress} on ${chainId}`,
    );
  }

  // We convert the price to a number and return it
  return Number(formatUnits(roundData * BigInt(100), decimals)) / 100;
};

const tokenAddressToFeedAddress = (chainId: ChainId, tokenAddress: string) => {
  const currencies = currenciesByNetwork[chainId];
  const currency = Object.values(currencies).find(
    (currency) => getAddress(currency.address) === getAddress(tokenAddress),
  );

  if (!currency) {
    throw new Error(`Currency not found for address ${tokenAddress}`);
  }

  const symbol = currency.symbol as keyof (typeof currenciesByNetwork)[ChainId];
  const feedsForChain = feedsPerChain[chainId];

  if (!feedsForChain) {
    throw new Error(`No feeds found for chain ${chainId}`);
  }

  return feedsForChain?.[symbol] as `0x${string}` | undefined;
};

export const getTokenPricesForChain = async (chainId: ChainId) => {
  const currencies = currenciesByNetwork[chainId];
  const prices = await Promise.all(
    Object.values(currencies).map(async (currency: Currency) => {
      const tokenPriceInUSD = await getTokenPriceFromCache(
        chainId,
        currency.address,
      );
      if (!tokenPriceInUSD) {
        throw new Error(
          `Token price not found for ${currency.address} on chain ${chainId}`,
        );
      }
      return { ...currency, tokenPriceInUSD };
    }),
  );

  return prices.reduce(
    (acc, result) => {
      return { ...acc, [result.address]: result };
    },
    {} as Record<string, Currency & { tokenPriceInUSD: number }>,
  );
};

type CurrencyFeeds = Record<
  keyof (typeof currenciesByNetwork)[ChainId],
  string
>;

const feedsPerChain: Record<ChainId, Partial<CurrencyFeeds>> = {
  [ChainId.SEPOLIA]: {
    ETH: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    WETH: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    DAI: "0x14866185B1962B63C3Ea9E03Bc1da838bab34C19",
    USDC: "0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E",
  },
  [ChainId.HARDHAT]: {
    ETH: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    WETH: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    DAI: "0x14866185B1962B63C3Ea9E03Bc1da838bab34C19",
    USDC: "0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E",
  },
  [ChainId.BASE]: {
    ETH: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
    WETH: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
    DAI: "0x591e79239a7d679378eC8c847e5038150364C78F",
    USDC: "0x7e860098F58bBFC8648a4311b374B1D669a2bc6B",
  },
  [ChainId.OPTIMISM]: {
    ETH: "0xb7B9A39CC63f856b90B364911CC324dC46aC1770",
    WETH: "0xb7B9A39CC63f856b90B364911CC324dC46aC1770",
    DAI: "0x8dBa75e83DA73cc766A7e5a0ee71F656BAb470d6",
    USDC: "0x16a9FA2FDa030272Ce99B29CF780dFA30361E0f3",
  },
  [ChainId.CELO]: {
    ETH: "0x1FcD30A73D67639c1cD89ff5746E7585731c083B",
    WETH: "0x1FcD30A73D67639c1cD89ff5746E7585731c083B",
    USDC: "0xc7A353BaE210aed958a1A2928b654938EC59DaB2",
    DAI: "0xc7A353BaE210aed958a1A2928b654938EC59DaB2",
  },
  [ChainId.BASE_SEPOLIA]: {
    ETH: "0x0FB99723Aee6f420beAD13e6bBB79b7E6F034298",
    WETH: "0x0FB99723Aee6f420beAD13e6bBB79b7E6F034298",
    USDC: "0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165",
    DAI: "0xD1092a65338d049DB68D7Be6bD89d17a0929945e",
  },
};

export const tokenPriceCache = new LRUCache({
  // Allocate memory for a thousand items
  max: 1000,
  // Cache for one minut
  ttl: 1000 * 60,
  allowStale: false,

  fetchMethod: (key: string | object) => {
    if (typeof key !== "string") {
      throw new Error("Currency key must be a string");
    }
    const [chainId, currencyAddress] = key.split("-");
    console.log(
      `Updating cached token price for ${currencyAddress} on chain ${chainId}`,
    );
    return getTokenPriceInUSD(parseInt(chainId), currencyAddress);
  },
});

export const getTokenPriceFromCache = (
  chainId: number,
  currencyAddress: string,
) => {
  return tokenPriceCache.fetch(`${chainId}-${currencyAddress}`);
};

export const getTokenPriceWithCurrencyFromCache = async (
  chainId: ChainId,
  currencyAddress: string,
) => {
  const tokenPriceInUSD = await getTokenPriceFromCache(
    chainId,
    currencyAddress,
  );
  const currency = Object.values(currenciesByNetwork[chainId]).find(
    (currency) => getAddress(currency.address) === getAddress(currencyAddress),
  );
  return { ...currency, price: tokenPriceInUSD };
};
