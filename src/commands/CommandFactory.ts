import { Database } from "../types/supabaseData.js";
import { ISafeApiCommand } from "../types/safe-signatures.js";

import { MarketplaceCreateOrderCommand } from "./MarketplaceCreateOrderCommand.js";
import { SafeApiCommand } from "./SafeApiCommand.js";
import { UserUpsertCommand } from "./UserUpsertCommand.js";

type SignatureRequest =
  Database["public"]["Tables"]["signature_requests"]["Row"];

export function getCommand(request: SignatureRequest): ISafeApiCommand {
  switch (request.purpose) {
    case "update_user_data":
      return new UserUpsertCommand(
        request.safe_address,
        request.message_hash,
        // The type is lying. It's a string.
        Number(request.chain_id),
      );
    case "create_marketplace_order":
      return new MarketplaceCreateOrderCommand(
        request.safe_address,
        request.message_hash,
        Number(request.chain_id),
      );
    default:
      console.warn("Unrecognized purpose:", request.purpose);
      return new NoopCommand();
  }
}

class NoopCommand extends SafeApiCommand implements ISafeApiCommand {
  constructor() {
    super("", "", 0);
  }

  async execute(): Promise<void> {}
}
