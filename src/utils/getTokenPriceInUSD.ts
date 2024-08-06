import { ethers } from "ethers";
import { getRpcUrl } from "./getRpcUrl.js";
import { ChainId, currenciesByNetwork } from "@hypercerts-org/marketplace-sdk";

export const getTokenPriceInUSD = async (
  chainId: ChainId,
  tokenAddress: string,
) => {
  const provider = new ethers.JsonRpcProvider(getRpcUrl(chainId));
  // This constant describes the ABI interface of the contract, which will provide the price of ETH
  // It looks like a lot, and it is, but this information is generated when we compile the contract
  // We need to let ethers know how to interact with this contract.
  const aggregatorV3InterfaceABI = [
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "description",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
      name: "getRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];
  // The address of the contract which will provide the price of ETH
  const feedAddress = tokenAddressToFeedAddress(chainId, tokenAddress);

  if (!feedAddress) {
    throw new Error("Token not supported");
  }

  // We create an instance of the contract which we can interact with
  const priceFeed = new ethers.Contract(
    feedAddress,
    aggregatorV3InterfaceABI,
    provider,
  );
  // We get the data from the last round of the contract
  // Determine how many decimals the price feed has (10**decimals)
  const [roundData, decimals] = await Promise.all([
    priceFeed.latestRoundData(),
    priceFeed.decimals(),
  ]);
  // We convert the price to a number and return it
  return Number(
    (roundData.answer.toString() / Math.pow(10, Number(decimals))).toFixed(2),
  );
};

const tokenAddressToFeedAddress = (chainId: ChainId, tokenAddress: string) => {
  const currencies = currenciesByNetwork[chainId];
  const currency = Object.values(currencies).find(
    (currency) => currency.address === tokenAddress,
  );

  if (!currency) {
    throw new Error("Currency not supported");
  }

  const symbol = currency.symbol as keyof (typeof currenciesByNetwork)[ChainId];
  const feedsForChain = feedsPerChain[chainId];

  if (!feedsForChain) {
    throw new Error("Chain not supported");
  }

  return feedsForChain?.[symbol];
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
    // TODO: DAI on CELO not supported
    ETH: "0x1FcD30A73D67639c1cD89ff5746E7585731c083B",
    WETH: "0x1FcD30A73D67639c1cD89ff5746E7585731c083B",
    USDC: "0xc7A353BaE210aed958a1A2928b654938EC59DaB2",
  },
  [ChainId.BASE_SEPOLIA]: {
    ETH: "0x0FB99723Aee6f420beAD13e6bBB79b7E6F034298",
    WETH: "0x0FB99723Aee6f420beAD13e6bBB79b7E6F034298",
    USDC: "0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165",
    DAI: "0xD1092a65338d049DB68D7Be6bD89d17a0929945e",
  },
};
