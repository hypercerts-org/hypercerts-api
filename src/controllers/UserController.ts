import { z } from "zod";
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
  BaseResponse,
  UserResponse,
} from "../types/api.js";
import { UserUpsertError } from "../lib/users/errors.js";
import { USER_UPDATE_REQUEST_SCHEMA } from "../lib/users/schemas.js";
import { createStrategy } from "../lib/users/UserUpsertStrategy.js";
import { ParseError } from "../lib/errors/request-parsing.js";

@Route("v1/users")
@Tags("Users")
export class UserController extends Controller {
  /**
   * Add or update a user
   *
   * @example requestBody {
   *    "type": "eoa",
   *    "chain_id": 11155111,
   *    "display_name": "Dana's Profile",
   *    "avatar": "https://example.com/avatar.png",
   *    "signature": "0x1234567890abcdef"
   *  }
   *
   * @example requestBody {
   *    "type": "multisig",
   *    "chain_id": 11155111,
   *    "messageHash": "0x1234567890abcdef"
   *  }
   */
  @Post(`{address}`)
  @SuccessResponse(201, "User updated successfully", "application/json")
  @Response<BaseResponse>(422, "Unprocessable content", {
    success: false,
    message: "Errors while validating user",
  })
  public async addOrUpdateUser(
    @Path() address: string,
    @Body() requestBody: AddOrUpdateUserRequest,
  ): Promise<UserResponse> {
    try {
      const parsedBody = parseInput(requestBody);
      const strategy = createStrategy(address, parsedBody);
      return await strategy.execute();
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
        errors: error.errors,
      };
    }
    console.error(
      "Error adding or updating user",
      error instanceof Error ? error.message : error,
    );
    // Default error
    this.setStatus(500);
    return {
      success: false,
      message: "Error adding or updating user",
    };
  }
}

function parseInput(
  input: unknown,
): z.infer<typeof USER_UPDATE_REQUEST_SCHEMA> {
  const parsedBody = USER_UPDATE_REQUEST_SCHEMA.safeParse(input);
  if (!parsedBody.success) {
    throw new ParseError(parsedBody);
  }
  return parsedBody.data;
}
