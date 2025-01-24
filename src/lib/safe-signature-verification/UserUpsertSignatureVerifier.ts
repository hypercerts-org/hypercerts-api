import { MultisigUserUpdateMessage } from "../users/schemas.js";

import SafeSignatureVerifier from "./SafeSignatureVerifier.js";

export default class UserUpsertSignatureVerifier extends SafeSignatureVerifier {
  private message: MultisigUserUpdateMessage;

  constructor(
    chainId: number,
    safeAddress: `0x${string}`,
    message: MultisigUserUpdateMessage,
  ) {
    super(chainId, safeAddress);
    this.message = message;
  }

  buildTypedData() {
    return {
      types: {
        Metadata: [{ name: "timestamp", type: "uint256" }],
        User: [
          { name: "displayName", type: "string" },
          { name: "avatar", type: "string" },
        ],
        UserUpdateRequest: [
          { name: "metadata", type: "Metadata" },
          { name: "user", type: "User" },
        ],
      },
      primaryType: "UserUpdateRequest",
      message: this.message,
    };
  }
}
