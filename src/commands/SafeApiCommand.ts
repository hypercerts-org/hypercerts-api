import SafeApiKit from "@safe-global/api-kit";

import { SafeApiStrategyFactory } from "../lib/safe/SafeApiKitStrategy.js";
import { ISafeApiCommand } from "../types/safe-signatures.js";

export abstract class SafeApiCommand implements ISafeApiCommand {
  protected safeAddress: string;
  protected messageHash: string;
  protected chainId: number;
  protected safeApiKit: SafeApiKit.default;

  constructor(safeAddress: string, messageHash: string, chainId: number) {
    this.safeAddress = safeAddress;
    this.messageHash = messageHash;
    this.chainId = chainId;
    this.safeApiKit =
      SafeApiStrategyFactory.getStrategy(chainId).createInstance();
  }

  abstract execute(): Promise<void>;

  getId(): string {
    return `${this.chainId}-${this.safeAddress}-${this.messageHash}`;
  }
}
