import {
  Body,
  Controller,
  Path,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import type {
  AddOrUpdateUserRequest,
  AddOrUpdateUserResponse,
  ApiResponse,
} from "../types/api.js";
import { z } from "zod";
import { SupabaseDataService } from "../services/SupabaseDataService.js";
import { verifyAuthSignedData } from "../utils/verifyAuthSignedData.js";
import { UserUpsertError } from "../lib/users/errors.js";

const inputSchema = z.object({
  display_name: z.string().optional(),
  avatar: z.string().optional(),
  signature: z.string(),
  chain_id: z.number(),
});

@Route("v1/users")
@Tags("Users")
export class UserController extends Controller {
  /**
   * Add or update a user
   */
  @Post(`{address}`)
  @SuccessResponse(201, "User updated successfully", "application/json")
  @Response<ApiResponse>(422, "Unprocessable content", {
    success: false,
    message: "Errors while validating user",
  })
  public async addOrUpdateUser(
    @Path() address: string,
    @Body() requestBody: AddOrUpdateUserRequest,
  ): Promise<AddOrUpdateUserResponse> {
    try {
      const parsedBody = parseInput(requestBody);
      await throwIfInvalidSignature(address, parsedBody);
      const user = await upsertUser(address, parsedBody);
      return this.successResponse(user);
    } catch (error) {
      return this.errorResponse(error);
    }
  }

  successResponse(data: { address: string }) {
    this.setStatus(201);
    return {
      success: true,
      message: "User added or updated successfully",
      data,
    };
  }

  errorResponse(error: unknown) {
    if (error instanceof UserUpsertError) {
      this.setStatus(error.code);
      return {
        success: false,
        message: error.message,
        data: null,
        errors: error.errors,
      };
    }
    // Default error
    this.setStatus(500);
    return {
      success: false,
      message: "Error adding or updating user",
      data: null,
    };
  }
}

function parseInput(input: unknown): z.infer<typeof inputSchema> {
  const parsedBody = inputSchema.safeParse(input);
  if (!parsedBody.success) {
    const userUpdateError = new UserUpsertError(400, "Invalid input");
    userUpdateError.errors = JSON.parse(parsedBody.error.toString());
    throw userUpdateError;
  }
  return parsedBody.data;
}

async function throwIfInvalidSignature(
  address: string,
  parsedBody: z.infer<typeof inputSchema>,
): Promise<void> {
  const isValidSignature = await verifyAuthSignedData({
    address: address as `0x${string}`,
    types: {
      User: [
        { name: "displayName", type: "string" },
        { name: "avatar", type: "string" },
      ],
      UserUpdateRequest: [{ name: "user", type: "User" }],
    },
    primaryType: "UserUpdateRequest",
    signature: parsedBody.signature as `0x${string}`,
    message: {
      user: {
        displayName: parsedBody.display_name || "",
        avatar: parsedBody.avatar || "",
      },
    },
    requiredChainId: parsedBody.chain_id,
  });
  if (!isValidSignature) {
    throw new UserUpsertError(401, "Invalid signature");
  }
}

async function upsertUser(
  address: string,
  parsedBody: z.infer<typeof inputSchema>,
): Promise<{ address: string }> {
  const dataService = new SupabaseDataService();
  try {
    const users = await dataService.upsertUsers([
      {
        address,
        display_name: parsedBody.display_name,
        avatar: parsedBody.avatar,
        chain_id: parsedBody.chain_id,
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
