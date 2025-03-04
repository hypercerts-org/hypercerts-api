import { ISafeApiCommand } from "../types/safe-signatures.js";

import { Selectable } from "kysely";
import { DataDatabase } from "../types/kyselySupabaseData.js";
import { SafeApiCommand } from "./SafeApiCommand.js";
import { UserUpsertCommand } from "./UserUpsertCommand.js";
import { container } from "tsyringe";

export type SignatureRequest = DataDatabase["signature_requests"];

export function getCommand(
  request: Selectable<SignatureRequest>,
): ISafeApiCommand {
  switch (request.purpose) {
    case "update_user_data":
      return container
        .resolve(UserUpsertCommand)
        .initialize(
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
