import {
  Body,
  Controller,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { parseAndValidateMerkleTree } from "../lib/allowlists/parseAndValidateMerkleTreeDump.js";
import { StorageService } from "../services/StorageService.js";
import type {
  BaseResponse,
  StorageResponse,
  StoreMetadataRequest,
  StoreMetadataWithAllowlistRequest,
  ValidateMetadataRequest,
  ValidationResponse,
} from "../types/api.js";
import { jsonToBlob } from "../utils/jsonToBlob.js";
import { validateMetadataAndClaimdata } from "../utils/validateMetadataAndClaimdata.js";
import { validateRemoteAllowList } from "../utils/validateRemoteAllowList.js";

@Route("v2/metadata")
@Tags("Metadata")
export class MetadataController extends Controller {
  /**
   * Submits a new hypercert metadata object for validation and storage on IPFS.
   * When an allowlist URI is provided the service will validate the allowlist data before storing the metadata.
   * Note that this might lead to a race condition when uploading metadata and the allowlist separately in rapid succession.
   * In that case we recommend using POST /metadata/with-allowlist instead.
   *
   * @param requestBody The metadata object to be stored.
   * @returns The CID of the stored metadata.
   */
  @Post()
  @SuccessResponse(201, "Data uploaded successfully")
  @Response<BaseResponse>(422, "Unprocessable content", {
    success: false,
    message: "Validation failed",
    errors: { metadata: "Invalid metadata." },
  })
  public async storeMetadata(@Body() requestBody: StoreMetadataRequest) {
    const storage = await StorageService.init();
    const { metadata } = requestBody;

    try {
      const metadataValidationResult = validateMetadataAndClaimdata(metadata);
      if (!metadataValidationResult.valid || !metadataValidationResult.data) {
        this.setStatus(422);
        return {
          success: false,
          valid: false,
          message: "Metadata validation failed",
          errors: metadataValidationResult.errors,
        };
      }

      // Validate allowlist separately if it exists
      if (metadata.allowList) {
        const allowListValidationResult = await validateRemoteAllowList(
          metadata.allowList,
        );
        if (!allowListValidationResult.valid) {
          this.setStatus(422);
          return {
            success: false,
            valid: false,
            message: "Allowlist validation failed",
            errors: allowListValidationResult.errors,
          };
        }
      }

      const cid = await storage.uploadFile({
        file: jsonToBlob(metadataValidationResult.data),
      });
      this.setStatus(201);

      return {
        success: true,
        data: cid,
      };
    } catch (e) {
      this.setStatus(422);
      return {
        success: false,
        message: "Error while storing metadata",
        errors: { metadata: (e as Error).message },
      };
    }
  }

  /**
   * Submits a new hypercert metadata object paired with allowlist data for validation and storage on IPFS.
   * The service will parse and validate the allow list data and the metadata.
   * After successful validation, the allow list data will be uploaded to IPFS and the URI of the allowlist will be attached to the hypercert metadata.
   * If an allow list URI is already present, the service will return an error.
   *
   * @param requestBody The metadata object and allowlist data to be stored.
   * @returns The CID of the stored metadata.
   */
  @Post("/with-allowlist")
  @SuccessResponse(201, "Data uploaded successfully")
  @Response<BaseResponse>(409, "Conflict", {
    success: false,
    message: "Allow list detected in metadata",
    errors: { metadata: "Allowlist URI already present in metadata." },
  })
  @Response<BaseResponse>(422, "Unprocessable content", {
    success: false,
    message: "Validation failed",
    errors: { metadata: "Invalid metadata." },
  })
  public async storeMetadataWithAllowlist(
    @Body() requestBody: StoreMetadataWithAllowlistRequest,
  ): Promise<StorageResponse> {
    const storage = await StorageService.init();
    const { metadata } = requestBody;
    const { allowList, totalUnits } = requestBody;

    try {
      const metadataValidationResult = validateMetadataAndClaimdata(metadata);

      if (!metadataValidationResult.valid) {
        this.setStatus(422);
        return {
          success: false,
          message: "Metadata validation failed",
          errors: metadataValidationResult.errors,
        };
      }

      if (metadataValidationResult.data.allowList) {
        this.setStatus(409);
        return {
          success: false,
          message: "Allow list detected in metadata",
          errors: { metadata: "Allowlist URI already present in metadata." },
        };
      }

      const allowlistValidationResult = parseAndValidateMerkleTree({
        allowList,
        totalUnits,
      });

      if (!allowlistValidationResult.valid) {
        this.setStatus(422);
        return {
          success: false,
          message: "Allowlist validation failed",
          errors: allowlistValidationResult.errors,
        };
      }

      const uploadResult = await storage.uploadFile({
        file: jsonToBlob(requestBody.allowList),
      });
      const cid = await storage.uploadFile({
        file: jsonToBlob({
          ...metadataValidationResult.data,
          allowList: `ipfs://${uploadResult.cid}`,
        }),
      });

      this.setStatus(201);
      return {
        success: true,
        data: cid,
      };
    } catch (e) {
      this.setStatus(422);
      return {
        success: false,
        message: "Error while storing metadata",
        errors: { metadata: (e as Error).message },
      };
    }
  }

  /**
   * Validates a hypercert metadata object. When an allowlist URI is provided the service will validate the allowlist data as well.
   *
   * @param requestBody - The metadata object to be validated.
   * @returns An object indicating whether the validation was successful or not.
   */
  @Post("/validate")
  @SuccessResponse(200, "Valid metadata", "application/json")
  @Response<BaseResponse>(422, "Unprocessable content", {
    success: false,
    message: "Validation failed",
    errors: { metadata: "Invalid metadata." },
  })
  public async validateMetadata(
    @Body() requestBody: ValidateMetadataRequest,
  ): Promise<ValidationResponse> {
    const { metadata } = requestBody;

    try {
      const metadataValidationResult = validateMetadataAndClaimdata(metadata);

      if (!metadataValidationResult.valid) {
        this.setStatus(422);
        return {
          success: true,
          valid: false,
          message: "Metadata validation failed",
          errors: metadataValidationResult.errors,
        };
      }

      if (metadata.allowList) {
        const allowListValidationResult = await validateRemoteAllowList(
          metadata.allowList,
        );

        if (!allowListValidationResult.valid) {
          this.setStatus(422);
          return {
            success: true,
            valid: false,
            message: "Allowlist validation failed",
            errors: allowListValidationResult.errors,
          };
        }
      }

      this.setStatus(200);
      return {
        success: true,
        valid: true,
        message: "Metadata is valid hypercert metadata",
      };
    } catch (e) {
      this.setStatus(422);
      return {
        success: false,
        valid: false,
        message: "Validation failed",
        errors: { metadata: (e as Error).message },
      };
    }
  }

  /**
   * Validates a hypercert metadata object paired with allowlist data.
   *
   * @param requestBody - The metadata object and allowlist data to be validated.
   * @returns An object indicating whether the validation was successful or not.
   */
  @Post("/with-allowlist/validate")
  @SuccessResponse(200, "Valid metadata", "application/json")
  @Response<BaseResponse>(422, "Unprocessable content", {
    success: false,
    message: "Validation failed",
    errors: { metadata: "Invalid metadata." },
  })
  public async validateMetadataWithAllowlist(
    @Body() requestBody: StoreMetadataWithAllowlistRequest,
  ): Promise<ValidationResponse> {
    const { metadata, allowList, totalUnits } = requestBody;

    try {
      const metadataValidationResult = validateMetadataAndClaimdata(metadata);

      if (!metadataValidationResult.valid) {
        this.setStatus(422);
        return {
          success: true,
          valid: false,
          message: "Metadata validation failed",
          errors: metadataValidationResult.errors,
        };
      }

      const allowlistValidationResult = parseAndValidateMerkleTree({
        allowList,
        totalUnits,
      });

      if (!allowlistValidationResult.valid) {
        this.setStatus(422);
        return {
          success: true,
          valid: false,
          message: "Allowlist validation failed",
          errors: allowlistValidationResult.errors,
        };
      }

      this.setStatus(200);
      return {
        success: true,
        valid: true,
        message: "Metadata is valid hypercert metadata",
      };
    } catch (e) {
      this.setStatus(422);
      return {
        success: false,
        valid: false,
        message: "Validation failed",
        errors: { metadata: (e as Error).message },
      };
    }
  }
}
