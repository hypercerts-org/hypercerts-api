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
import { getEvmClient } from "../utils/getRpcUrl.js";
import { SupabaseDataService } from "../services/SupabaseDataService.js";

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
    const inputSchema = z.object({
      display_name: z.string().optional(),
      avatar: z.string().optional(),
      signature: z.string(),
      message: z.string(),
    });
    const parsedBody = inputSchema.safeParse(requestBody);
    if (!parsedBody.success) {
      this.setStatus(400);
      return {
        success: false,
        message: "Invalid input",
        data: null,
        errors: JSON.parse(parsedBody.error.toString()),
      };
    }

    const { signature, message } = parsedBody.data;
    const client = getEvmClient(10);
    const correctSignature = await client.verifyMessage({
      message,
      signature: signature as `0x${string}`,
      address: address as `0x${string}`,
    });

    if (!correctSignature) {
      this.setStatus(401);
      return {
        success: false,
        message: "Invalid signature",
        data: null,
      };
    }

    // Add or update user
    const dataService = new SupabaseDataService();
    try {
      const users = await dataService.upsertUsers([
        {
          address,
          display_name: parsedBody.data.display_name,
          avatar: parsedBody.data.avatar,
        },
      ]);

      if (!users.length) {
        this.setStatus(500);
        return {
          success: false,
          message: "Error adding or updating user",
          data: null,
        };
      }

      this.setStatus(201);
      return {
        success: true,
        message: "User added or updated successfully",
        data: { address: users[0].address },
      };
    } catch (error) {
      console.error(error);
      this.setStatus(500);
      return {
        success: false,
        message: "Error adding or updating user",
        data: null,
      };
    }
  }
}
