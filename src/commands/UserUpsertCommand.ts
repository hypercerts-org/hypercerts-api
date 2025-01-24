import { getAddress } from "viem";

import {
  MultisigUserUpdateMessage,
  USER_UPDATE_MESSAGE_SCHEMA,
} from "../lib/users/schemas.js";
import { isTypedMessage } from "../utils/signatures.js";
import UserUpsertSignatureVerifier from "../lib/safe-signature-verification/UserUpsertSignatureVerifier.js";
import { Database } from "../types/supabaseData.js";

import { SafeApiCommand } from "./SafeApiCommand.js";

type SignatureRequest =
  Database["public"]["Tables"]["signature_requests"]["Row"];

export class UserUpsertCommand extends SafeApiCommand {
  async execute(): Promise<void> {
    const signatureRequest = await this.dataService.getSignatureRequest(
      this.safeAddress,
      this.messageHash,
    );

    if (!signatureRequest || signatureRequest.status !== "pending") {
      return;
    }

    const safeMessage = await this.safeApiKit.getMessage(this.messageHash);

    if (!isTypedMessage(safeMessage.message)) {
      throw new Error("Unexpected message type: not EIP712TypedData");
    }

    const message = USER_UPDATE_MESSAGE_SCHEMA.safeParse(
      safeMessage.message.message,
    );
    if (!message.success) {
      console.error("Unexpected message format", message.error);
      throw new Error("Unexpected message format");
    }

    const verifier = new UserUpsertSignatureVerifier(
      Number(signatureRequest.chain_id),
      getAddress(this.safeAddress),
      message.data,
    );

    if (!(await verifier.verify(safeMessage.preparedSignature))) {
      console.error(`Signature verification failed: ${this.getId()}`);
      return;
    }

    await this.updateDatabase(signatureRequest, message.data);
    console.log(`Signature request executed: ${this.getId()}`);
  }

  async updateDatabase(
    signatureRequest: Exclude<SignatureRequest, undefined>,
    message: MultisigUserUpdateMessage,
  ): Promise<void> {
    const users = await this.dataService.upsertUsers([
      {
        address: this.safeAddress,
        chain_id: signatureRequest.chain_id,
        display_name: message.user.displayName,
        avatar: message.user.avatar,
      },
    ]);
    if (!users.length) {
      throw new Error("Error adding or updating user");
    }
    await this.dataService.updateSignatureRequestStatus(
      this.safeAddress,
      this.messageHash,
      "executed",
    );
  }
}
