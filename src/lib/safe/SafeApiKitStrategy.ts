import SafeApiKit from "@safe-global/api-kit";

export interface SafeApiKitStrategy {
  createInstance(): SafeApiKit.default;
}

export class FilecoinMainnetStrategy implements SafeApiKitStrategy {
  createInstance(): SafeApiKit.default {
    return new SafeApiKit.default({
      chainId: BigInt(314),
      txServiceUrl: "https://transaction.safe.filecoin.io/",
    });
  }
}

export class FilecoinTestnetStrategy implements SafeApiKitStrategy {
  createInstance(): SafeApiKit.default {
    return new SafeApiKit.default({
      chainId: BigInt(314159),
      txServiceUrl: "https://transaction-testnet.safe.filecoin.io/",
    });
  }
}

export class DefaultSafeApiStrategy implements SafeApiKitStrategy {
  constructor(private chainId: number) {}

  createInstance(): SafeApiKit.default {
    return new SafeApiKit.default({
      chainId: BigInt(this.chainId),
    });
  }
}

export class SafeApiStrategyFactory {
  static getStrategy(chainId: number): SafeApiKitStrategy {
    switch (chainId) {
      case 314:
        return new FilecoinMainnetStrategy();
      case 314159:
        return new FilecoinTestnetStrategy();
      default:
        return new DefaultSafeApiStrategy(chainId);
    }
  }
}
