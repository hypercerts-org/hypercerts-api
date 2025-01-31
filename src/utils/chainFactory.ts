import { Chain } from "viem";
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  celo,
  filecoin,
  filecoinCalibration,
  mainnet,
  optimism,
  sepolia,
} from "viem/chains";

const SUPPORTED_CHAINS = [
  mainnet,
  optimism,
  base,
  arbitrum,
  celo,
  sepolia,
  arbitrumSepolia,
  baseSepolia,
  filecoin,
  filecoinCalibration,
];

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ChainFactory {
  static getChain(chainId: number): Chain {
    const chains = SUPPORTED_CHAINS.reduce(
      (acc, chain) => {
        acc[chain.id] = chain;
        return acc;
      },
      {} as Record<number, Chain>,
    );

    const chain = chains[chainId];
    if (!chain) throw new Error(`Unsupported chain ID: ${chainId}`);
    return chain;
  }

  static getSupportedChains(): number[] {
    return SUPPORTED_CHAINS.map((chain) => chain.id);
  }
}
