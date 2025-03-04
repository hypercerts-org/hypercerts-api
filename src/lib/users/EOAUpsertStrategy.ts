import { verifyAuthSignedData } from "../../utils/verifyAuthSignedData.js";
import type { UserResponse } from "../../types/api.js";

import type { EOAUpdateRequest } from "./schemas.js";
import type { UserUpsertStrategy } from "./UserUpsertStrategy.js";
import { UserUpsertError } from "./errors.js";
import { UsersService } from "../../services/database/entities/UsersEntityService.js";

export default class EOAUpsertStrategy implements UserUpsertStrategy {
  constructor(
    private readonly address: string,
    private readonly request: EOAUpdateRequest,
    private readonly usersService: UsersService,
  ) {}

  async execute(): Promise<UserResponse> {
    await this.throwIfInvalidSignature();
    const user = await this.upsertUser();
    return {
      success: true,
      message: "User added or updated successfully",
      data: user,
    };
  }

  private async upsertUser(): Promise<{ address: string }> {
    try {
      const users = await this.usersService.upsertUsers([
        {
          address: this.address,
          display_name: this.request.display_name,
          avatar: this.request.avatar,
          chain_id: this.request.chain_id,
        },
      ]);

      if (!users.length) {
        throw new UserUpsertError(500, "Error adding or updating user");
      }
      return users[0];
    } catch (error) {
      console.error(error);
      throw new UserUpsertError(500, "Error adding or updating user");
    }
  }

  private async throwIfInvalidSignature(): Promise<void> {
    const isValidSignature = await verifyAuthSignedData({
      address: this.address as `0x${string}`,
      types: {
        User: [
          { name: "displayName", type: "string" },
          { name: "avatar", type: "string" },
        ],
        UserUpdateRequest: [{ name: "user", type: "User" }],
      },
      primaryType: "UserUpdateRequest",
      signature: this.request.signature as `0x${string}`,
      message: {
        user: {
          displayName: this.request.display_name || "",
          avatar: this.request.avatar || "",
        },
      },
      requiredChainId: this.request.chain_id,
    });
    if (!isValidSignature) {
      throw new UserUpsertError(401, "Invalid signature");
    }
  }
}
