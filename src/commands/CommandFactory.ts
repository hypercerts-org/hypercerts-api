import { Database } from "../types/supabaseData.js";
import { ISafeApiCommand } from "../types/safe-signatures.js";

import { UserUpsertCommand } from "./UserUpsertCommand.js";
import { SafeApiCommand } from "./SafeApiCommand.js";

type SignatureRequest =
  Database["public"]["Tables"]["signature_requests"]["Row"];

export function getCommand(request: SignatureRequest): ISafeApiCommand {
  switch (request.purpose) {
    case "update_user_data":
      return new UserUpsertCommand(
        request.safe_address,
        request.message_hash,
        request.chain_id,
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
