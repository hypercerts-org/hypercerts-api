import { z } from "zod";
import SafeApiKit, { type SafeApiKitConfig } from "@safe-global/api-kit";

import { SignatureRequestPurpose } from "../../graphql/schemas/typeDefs/signatureRequestTypeDefs.js";
import { SupabaseDataService } from "../../services/SupabaseDataService.js";
import { AddOrUpdateUserResponse } from "../../types/api.js";
import { isTypedMessage } from "../../utils/signatures.js";

import type { UserUpsertStrategy } from "./UserUpsertStrategy.js";
import type { MultisigUpdateRequest } from "./schemas.js";
import { UserUpsertError } from "./errors.js";

const MESSAGE_SCHEMA = z.object({
  metadata: z.object({
    timestamp: z
      .number()
      .int()
      .refine(
        (val) => String(val).length === 10,
        "Timestamp must be a Unix timestamp in seconds (10 digits)",
      ),
  }),
  user: z.object({
    displayName: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

export default class MultisigUpdateStrategy implements UserUpsertStrategy {
  private readonly dataService: SupabaseDataService;
  // Safe SDKs only support CommonJS, so TS interprets `SafeApiKit` as a namespace.
  // https://docs.safe.global/sdk/overview
  // Hence the explicit `default` here and on the instantiation further down.
  private readonly safeApiKit: SafeApiKit.default;

  constructor(
    private readonly address: string,
    private readonly request: MultisigUpdateRequest,
  ) {
    const config: SafeApiKitConfig = {
      chainId: BigInt(request.chain_id),
    };
    this.safeApiKit = new SafeApiKit.default(config);
    this.dataService = new SupabaseDataService();
  }

  // We could check if it's a 1 of 1 and execute right away
  async execute(): Promise<AddOrUpdateUserResponse> {
    const { message } = await this.safeApiKit.getMessage(
      this.request.messageHash,
    );

    if (!isTypedMessage(message)) {
      throw new UserUpsertError(
        500,
        "Safe message is not a typed user update message.",
      );
    }
    const parseResult = MESSAGE_SCHEMA.safeParse(message.message);
    if (!parseResult.success) {
      throw new UserUpsertError(
        400,
        parseResult.error.errors.map((e) => e.message).join("; "),
      );
    }
    console.log("Creating signature request for", parseResult);
    await this.dataService.addSignatureRequest({
      chain_id: this.request.chain_id,
      safe_address: this.address,
      message_hash: this.request.messageHash,
      message: parseResult.data,
      purpose: SignatureRequestPurpose.UPDATE_USER_DATA,
      timestamp: parseResult.data.metadata.timestamp,
    });

    return {
      success: true,
      message: "Signature request created successfully",
      data: null,
    };
  }
}
