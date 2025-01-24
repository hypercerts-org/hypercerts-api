import SafeApiKit from "@safe-global/api-kit";

import { SupabaseDataService } from "../services/SupabaseDataService.js";
import { ISafeApiCommand } from "../types/safe-signatures.js";

export abstract class SafeApiCommand implements ISafeApiCommand {
  protected readonly safeAddress: string;
  protected readonly messageHash: string;
  protected readonly chainId: number;
  protected readonly dataService: SupabaseDataService;
  protected readonly safeApiKit: SafeApiKit.default;

  constructor(safeAddress: string, messageHash: string, chainId: number) {
    this.safeAddress = safeAddress;
    this.messageHash = messageHash;
    this.chainId = chainId;
    this.dataService = new SupabaseDataService();
    this.safeApiKit = new SafeApiKit.default({ chainId: BigInt(chainId) });
  }

  abstract execute(): Promise<void>;

  getId(): string {
    return `${this.chainId}-${this.safeAddress}-${this.messageHash}`;
  }
}
