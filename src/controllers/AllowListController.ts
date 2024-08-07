import { jsonToBlob } from "../utils/jsonToBlob.js";
import { Body, Controller, Post, Response, Route, SuccessResponse, Tags } from "tsoa";
import { StorageService } from "../services/StorageService.js";
import { parseAndValidateMerkleTree } from "../utils/parseAndValidateMerkleTreeDump.js";
import type {
  ApiResponse,
  StorageResponse,
  StoreAllowListRequest,
  ValidateAllowListRequest,
  ValidationResponse
} from "../types/api.js";

@Route("v1/allowlists")
@Tags("Allowlists")
export class AllowListController extends Controller {

  /**
   * Submits a new allowlist for validation and storage on IPFS. While we maintain a database of allowlists, the allowlist itself is stored on IPFS.
   * Try to keep a backup of the allowlist for recovery purposes.
   *
   * Provide the dump of the OpenZeppelin MerkleTree and the total units.
   */
  @Post()
  @SuccessResponse(201, "Data uploaded successfully", "application/json")
  @Response<ApiResponse>(422, "Unprocessable content", {
    success: false,
    message: "Errors while validating allow list",
    errors: { allowList: "Invalid allowList. Length is  0" }
  })
  public async storeAllowList(@Body() requestBody: StoreAllowListRequest): Promise<StorageResponse> {
    const storage = await StorageService.init();

    const result = parseAndValidateMerkleTree(requestBody);

    if (!result.valid || !result.data) {
      this.setStatus(422);
      return {
        success: false,
        message: "Errors while validating allow list",
        errors: result.errors
      };
    }

    const cid = await storage.uploadFile({ file: jsonToBlob(requestBody.allowList) });
    this.setStatus(201);

    return {
      success: true,
      data: cid
    };
  }

  /**
   * Submits a new allowlist for validation.
   *
   * Provide the dump of the OpenZeppelin MerkleTree and the total units.
   */
  @Post("/validate")
  @SuccessResponse(200, "Valid allowlist object", "application/json")
  @Response<ApiResponse>(422, "Unprocessable content", {
    success: false,
    message: "Metadata validation failed",
    errors: { allowList: "Invalid allowList. Length is  0" }
  })
  public async validateAllowList(@Body() requestBody: ValidateAllowListRequest): Promise<ValidationResponse> {
    const result = parseAndValidateMerkleTree(requestBody);

    if (!result.valid || !result.data) {
      this.setStatus(422);
      return {
        success: false,
        message: "Errors while validating allow list",
        errors: result.errors
      };
    }

    this.setStatus(201);
    return {
      success: true
    };
  }
}