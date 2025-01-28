import { EvmClientFactory } from "../../client/evmClient.js";

export interface SafeRpcStrategy {
  getUrl(chainId: number): string;
}

export class FilecoinRpcStrategy implements SafeRpcStrategy {
  constructor(private evmClientFactory: typeof EvmClientFactory) {}

  getUrl(chainId: number): string {
    return this.evmClientFactory.getPublicRpcUrl(chainId);
  }
}

export class RandomRpcStrategy implements SafeRpcStrategy {
  constructor(private evmClientFactory: typeof EvmClientFactory) {}

  getUrl(chainId: number): string {
    const urls = this.evmClientFactory.getAllAvailableUrls(chainId);
    if (urls.length === 0) {
      throw new Error(`No RPC URL available for chain ${chainId}`);
    }
    const randomIndex = Math.floor(Math.random() * urls.length);
    return urls[randomIndex];
  }
}

export class RpcStrategyFactory {
  static getStrategy(
    chainId: number,
    evmClientFactory: typeof EvmClientFactory,
  ): SafeRpcStrategy {
    // Filecoin chains use public RPC
    if (chainId === 314 || chainId === 314159) {
      return new FilecoinRpcStrategy(evmClientFactory);
    }
    // All other chains use random selection from available RPCs
    return new RandomRpcStrategy(evmClientFactory);
  }
}
