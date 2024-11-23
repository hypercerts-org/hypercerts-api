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

const feedsPerChain: Record<Partial<ChainId>, Partial<CurrencyFeeds>> = {
  [ChainId.BASE_SEPOLIA]: {
    ETH: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1",
    WETH: "0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1",
    DAI: "0xD1092a65338d049DB68D7Be6bD89d17a0929945e",
    USDC: "0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165",
  },
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
  [ChainId.OPTIMISM]: {
    ETH: "0x13e3Ee699D1909E989722E753853AE30b17e08c5",
    WETH: "0x13e3Ee699D1909E989722E753853AE30b17e08c5",
    DAI: "0x8dBa75e83DA73cc766A7e5a0ee71F656BAb470d6",
    USDC: "0x16a9FA2FDa030272Ce99B29CF780dFA30361E0f3",
  },
  [ChainId.CELO]: {
    CELO: "0x0568fD19986748cEfF3301e55c0eb1E729E0Ab7e",
    cUSD: "0xe38A27BE4E7d866327e09736F3C570F256FFd048",
    USDC: "0xc7A353BaE210aed958a1A2928b654938EC59DaB2",
    USDT: "0x5e37AF40A7A344ec9b03CCD34a250F3dA9a20B02",
  },
  [ChainId.ARBITRUM]: {
    ETH: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
    WETH: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
    DAI: "0xc5C8E77B397E531B8EC06BFb0048328B30E9eCfB",
    USDC: "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
  },
  [ChainId.ARBITRUM_SEPOLIA]: {
    ETH: "0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165",
    WETH: "0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165",
    DAI: "0xb113F5A928BCfF189C998ab20d753a47F9dE5A61",
    USDC: "0x0153002d20B96532C639313c2d54c3dA09109309",
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
