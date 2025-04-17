import { UserResponse } from "../../types/api.js";
import { container } from "tsyringe";
import { UsersService } from "../../services/database/entities/UsersEntityService.js";
import { SignatureRequestsService } from "../../services/database/entities/SignatureRequestsEntityService.js";

import MultisigUpsertStrategy from "./MultisigUpsertStrategy.js";
import EOAUpsertStrategy from "./EOAUpsertStrategy.js";
import { EOAUpdateRequest, MultisigUpdateRequest } from "./schemas.js";

export interface UserUpsertStrategy {
  execute(): Promise<UserResponse>;
}

export function createStrategy(
  address: string,
  request: MultisigUpdateRequest | EOAUpdateRequest,
): UserUpsertStrategy {
  switch (request.type) {
    case "eoa": {
      const usersService = container.resolve(UsersService);
      return new EOAUpsertStrategy(address, request, usersService);
    }
    case "multisig": {
      const signatureRequestsService = container.resolve(
        SignatureRequestsService,
      );
      return new MultisigUpsertStrategy(
        address,
        request,
        signatureRequestsService,
      );
    }
    default:
      throw new Error("Invalid user update request type");
  }
}
