import { alchemyApiKey, drpcApiPkey } from "../utils/constants.js";
import { PublicClient, createPublicClient, fallback } from "viem";
import { ChainFactory } from "./chainFactory.js";
import { RpcClientFactory } from "./rpcClientFactory.js";
import { JsonRpcProvider } from "ethers";

interface RpcProvider {
  getUrl(chainId: number): string | undefined;
}

class AlchemyProvider implements RpcProvider {
  getUrl(chainId: number): string | undefined {
    const urls: Record<number, string> = {
      10: `https://opt-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
      8453: `https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
      42220: `https://celo-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
      42161: `https://arb-mainnet.g.alchemy.com/v2/${alchemyApiKey}`,
      421614: `https://arb-sepolia.g.alchemy.com/v2/${alchemyApiKey}`,
      84532: `https://base-sepolia.g.alchemy.com/v2/${alchemyApiKey}`,
      11155111: `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`,
    };
    return urls[chainId];
  }
}

class DrpcProvider implements RpcProvider {
  getUrl(chainId: number): string | undefined {
    const networks: Record<number, string> = {
      10: "optimism",
      8453: "base",
      42220: "celo",
      42161: "arbitrum",
      421614: "arbitrum-sepolia",
    };
    const network = networks[chainId];
    return network
      ? `https://lb.drpc.org/ogrpc?network=${network}&dkey=${drpcApiPkey}`
      : undefined;
  }
}

class GlifProvider implements RpcProvider {
  getUrl(chainId: number): string | undefined {
    const urls: Record<number, string> = {
      314: `https://node.glif.io/space07/lotus/rpc/v1`,
      314159: `https://calibration.node.glif.io/archive/lotus/rpc/v1`,
    };
    return urls[chainId];
  }
}

class AnkrProvider implements RpcProvider {
  getUrl(chainId: number): string | undefined {
    const urls: Record<number, string> = {
      314: "https://rpc.ankr.com/filecoin",
      314159: "https://rpc.ankr.com/filecoin_testnet",
    };
    return urls[chainId];
  }
}

class ChainUpProvider implements RpcProvider {
  getUrl(chainId: number): string | undefined {
    const urls: Record<number, string> = {
      314: "https://filecoin.chainup.net/rpc/v1",
      314159: "https://filecoin-calibration.chainup.net/rpc/v1",
    };
    return urls[chainId];
  }
}

class LavaProvider implements RpcProvider {
  getUrl(chainId: number): string | undefined {
    const urls: Record<number, string> = {
      314: "https://filecoin.lava.build",
      314159: "https://filecoin-testnet.lava.build",
    };
    return urls[chainId];
  }
}

export class EvmClientFactory {
  private static readonly providers: RpcProvider[] = [
    new AlchemyProvider(),
    new DrpcProvider(),
    new GlifProvider(),
    new AnkrProvider(),
    new ChainUpProvider(),
    new LavaProvider(),
  ];

  static createViemClient(chainId: number): PublicClient {
    const urls = EvmClientFactory.getAllAvailableUrls(chainId);
    if (urls.length === 0)
      throw new Error(`No RPC URL available for chain ${chainId}`);

    const transports = urls.map((url) =>
      RpcClientFactory.createViemTransport(chainId, url),
    );

    return createPublicClient({
      chain: ChainFactory.getChain(chainId),
      transport: fallback(transports),
    });
  }

  static createEthersClient(chainId: number): JsonRpcProvider {
    const url = EvmClientFactory.getFirstAvailableUrl(chainId);
    if (!url) throw new Error(`No RPC URL available for chain ${chainId}`);
    return RpcClientFactory.createEthersJsonRpcProvider(chainId, url);
  }

  static getAllAvailableUrls(chainId: number): string[] {
    return EvmClientFactory.providers
      .map((provider) => provider.getUrl(chainId))
      .filter((url): url is string => url !== undefined);
  }

  static getRpcUrl(chainId: number): string {
    const url = EvmClientFactory.getFirstAvailableUrl(chainId);
    if (!url) throw new Error(`No RPC URL available for chain ${chainId}`);
    return url;
  }

  static getPublicRpcUrl(chainId: number): string {
    const chain = ChainFactory.getChain(chainId);
    if (!chain.rpcUrls?.default?.http?.[0]) {
      throw new Error(`No public RPC URL available for chain ${chainId}`);
    }
    return chain.rpcUrls.default.http[0];
  }

  // Keep this for backward compatibility
  static getFirstAvailableUrl(chainId: number): string | undefined {
    return EvmClientFactory.getAllAvailableUrls(chainId)[0];
  }
}

// Public API
export const getSupportedChains = ChainFactory.getSupportedChains;
