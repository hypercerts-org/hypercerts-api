import { http, Transport } from "viem";
import { CustomEthersJsonRpcProvider } from "../lib/rpcProviders/customEthersJsonRpcProvider.js";
import { filecoinApiKey } from "../utils/constants.js";
import { ChainFactory } from "./chainFactory.js";

interface RpcConfig {
  url: string;
  headers?: Record<string, string>;
  timeout?: number;
}

// Chain-specific RPC configuration factory
class RpcConfigFactory {
  private static readonly DEFAULT_TIMEOUT = 20_000;

  static getConfig(chainId: number, url: string): RpcConfig {
    const baseConfig: RpcConfig = {
      url,
      timeout: this.DEFAULT_TIMEOUT,
    };

    // Chain-specific configurations
    switch (chainId) {
      case 314:
      case 314159:
        return {
          ...baseConfig,
          headers: {
            Authorization: `Bearer ${filecoinApiKey}`,
          },
        };
      default:
        return baseConfig;
    }
  }
}

// Unified client factory for both Viem and Chainsauce clients
export class RpcClientFactory {
  // Creates a Viem transport
  static createViemTransport(chainId: number, url: string): Transport {
    const config = RpcConfigFactory.getConfig(chainId, url);

    const httpConfig: Parameters<typeof http>[1] = {
      timeout: config.timeout,
    };

    if (config.headers) {
      httpConfig.fetchOptions = {
        headers: config.headers,
      };
    }

    return http(config.url, httpConfig);
  }

  static createEthersJsonRpcProvider(chainId: number, url: string) {
    const config = RpcConfigFactory.getConfig(chainId, url);
    const chain = ChainFactory.getChain(chainId);
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    };

    return new CustomEthersJsonRpcProvider({
      url: config.url,
      config: { headers: config.headers },
      network,
    });
  }
}
