import { getAddress } from "viem";

import {
  SAFE_CREATE_ORDER_MESSAGE_SCHEMA,
  SafeCreateOrderMessage,
} from "../lib/marketplace/schemas.js";
import { isTypedMessage } from "../utils/signatures.js";
import MarketplaceCreateOrderSignatureVerifier from "../lib/safe/signature-verification/MarketplaceCreateOrderSignatureVerifier.js";

import { SafeApiCommand } from "./SafeApiCommand.js";
import { getHypercertTokenId } from "../utils/tokenIds.js";

export class MarketplaceCreateOrderCommand extends SafeApiCommand {
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

    const message = SAFE_CREATE_ORDER_MESSAGE_SCHEMA.safeParse(
      safeMessage.message,
    );
    if (!message.success) {
      console.error("Unexpected message format", message.error);
      throw new Error("Unexpected message format");
    }

    const verifier = new MarketplaceCreateOrderSignatureVerifier(
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

    await this.updateDatabase(message.data, safeMessage.preparedSignature);
    console.log(`Signature request executed: ${this.getId()}`);
  }

  private async updateDatabase(
    message: SafeCreateOrderMessage,
    signature: string,
  ): Promise<void> {
    const orderDetails = message.message;
    const tokenId = orderDetails.itemIds[0];
    const hypercertTokenId = getHypercertTokenId(BigInt(tokenId));
    const formattedHypercertId = `${this.chainId}-${orderDetails.collection}-${hypercertTokenId.toString()}`;

    const insertEntity = {
      ...orderDetails,
      chainId: this.chainId,
      signature,
      hypercert_id: formattedHypercertId,
      // TODO: This should actually be BigInt[]. After bitbeckers big rewrite, we should have another look at this.
      // Check https://github.com/hypercerts-org/hypercerts-api/pull/263
      // FYI: https://stackoverflow.com/a/4090577 recommends parseInt to use explicit radix (10)
      amounts: orderDetails.amounts.map((x) => parseInt(x, 10)),
    };

    await this.dataService.storeOrder(insertEntity);

    await this.dataService.updateSignatureRequestStatus(
      this.safeAddress,
      this.messageHash,
      "executed",
    );
  }
}
