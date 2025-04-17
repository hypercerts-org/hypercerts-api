import { getAddress } from "viem";

import UserUpsertSignatureVerifier from "../lib/safe/signature-verification/UserUpsertSignatureVerifier.js";
import {
  MultisigUserUpdateMessage,
  USER_UPDATE_MESSAGE_SCHEMA,
} from "../lib/users/schemas.js";
import { isTypedMessage } from "../utils/signatures.js";

import { Insertable } from "kysely";
import { inject, injectable } from "tsyringe";
import { SignatureRequestsService } from "../services/database/entities/SignatureRequestsEntityService.js";
import { UsersService } from "../services/database/entities/UsersEntityService.js";
import { SignatureRequest } from "./CommandFactory.js";
import { SafeApiCommand } from "./SafeApiCommand.js";

@injectable()
export class UserUpsertCommand extends SafeApiCommand {
  constructor(
    safeAddress: string,
    messageHash: string,
    chainId: number,
    @inject(SignatureRequestsService)
    private signatureRequestsService: SignatureRequestsService,
    @inject(UsersService)
    private usersService: UsersService,
  ) {
    super(safeAddress, messageHash, chainId);
  }
  async execute(): Promise<void> {
    const signatureRequest =
      await this.signatureRequestsService.getSignatureRequest({
        where: {
          safe_address: { eq: this.safeAddress },
          message_hash: { eq: this.messageHash },
        },
      });

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

    if (
      !(await verifier.verify(safeMessage.preparedSignature as `0x${string}`))
    ) {
      console.error(`Signature verification failed: ${this.getId()}`);
      return;
    }

    await this.updateDatabase(signatureRequest, message.data);
    console.log(`Signature request executed: ${this.getId()}`);
  }

  async updateDatabase(
    signatureRequest: Insertable<SignatureRequest>,
    message: MultisigUserUpdateMessage,
  ): Promise<void> {
    const users = await this.usersService.upsertUsers([
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
    await this.signatureRequestsService.updateSignatureRequestStatus(
      this.safeAddress,
      this.messageHash,
      "executed",
    );
  }

  public initialize(
    safeAddress: string,
    messageHash: string,
    chainId: number,
  ): this {
    this.safeAddress = safeAddress;
    this.messageHash = messageHash;
    this.chainId = chainId;
    return this;
  }
}
