import { AddOrUpdateUserResponse } from "../../types/api.js";

import MultisigUpsertStrategy from "./MultisigUpsertStrategy.js";
import EOAUpsertStrategy from "./EOAUpsertStrategy.js";
import { EOAUpdateRequest, MultisigUpdateRequest } from "./schemas.js";

export interface UserUpsertStrategy {
  execute(): Promise<AddOrUpdateUserResponse>;
}

export function createStrategy(
  address: string,
  request: MultisigUpdateRequest | EOAUpdateRequest,
): UserUpsertStrategy {
  switch (request.type) {
    case "eoa":
      return new EOAUpsertStrategy(address, request);
    case "multisig":
      return new MultisigUpsertStrategy(address, request);
    default:
      throw new Error("Invalid user update request type");
  }
}
