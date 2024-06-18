import {jsonToBlob} from "../utils/jsonToBlob.js";
import {Body, Controller, Post, Response, Route, SuccessResponse, Tags} from "tsoa";
import {StorageService} from "../services/StorageService.js";
import {StoreResponse, ValidationResponse} from "../types/api.js";
import type {HypercertMetadata} from "@hypercerts-org/sdk";
import {validateMetadataAndClaimdata} from "../utils/validateMetadataAndClaimdata.js";
import {validateRemoteAllowList} from "../utils/validateRemoteAllowList.js";

@Route("v1/metadata")
@Tags("Metadata")
export class MetadataController extends Controller {

    /**
     * Submits a new hypercert metadata object for validation and storage on IPFS. While we maintain a database of allowlists, the allowlist itself is stored on IPFS.
     *
     */
    @Post()
    @SuccessResponse(201, "Data uploaded successfully")
    @Response<StoreResponse>(422, "Unprocessable content", {
        success: false,
        message: "Validation failed",
        errors: {metadata: "Invalid metadata."}
    })
    public async storeMetadata(@Body() requestBody: HypercertMetadata) {
        const storage = await StorageService.init();

        try {
            const metadataValidationResult = validateMetadataAndClaimdata(requestBody);

            const allowListValidationResult = await validateRemoteAllowList(requestBody);

            if (!allowListValidationResult.valid || !metadataValidationResult.valid) {
                this.setStatus(422)
                return {
                    success: false,
                    valid: false,
                    message: "Errors while validating allow list",
                    errors: {
                        ...metadataValidationResult.errors,
                        ...allowListValidationResult.errors
                    }
                };
            }

            const cid = await storage.uploadFile({file: jsonToBlob(metadataValidationResult.data)});
            this.setStatus(201)

            return {
                success: true,
                data: cid,
            }
        } catch (e) {
            this.setStatus(422)
            return {
                success: false,
                message: "Error while storing metadata",
                errors: {metadata: (e as Error).message}
            };
        }

    }

    /**
     * Submits a new hypercert metadata object for validation.
     *
     */
    @Post("/validate")
    @SuccessResponse(200, "Valid metadata", "application/json")
    @Response<ValidationResponse>(422, "Unprocessable content", {
        valid: false,
        message: "Validation failed",
        errors: {metadata: "Invalid metadata."}
    })
    public async validateMetadata(@Body() requestBody: HypercertMetadata) {

        try {

            const metadataValidationResult = validateMetadataAndClaimdata(requestBody);

            const allowListValidationResult = await validateRemoteAllowList(requestBody);

            if (!allowListValidationResult.valid || !metadataValidationResult.valid) {
                this.setStatus(422)
                return {
                    success: true,
                    valid: false,
                    message: "Errors while validating metadata and/or allow list",
                    errors: {
                        ...metadataValidationResult.errors,
                        ...allowListValidationResult.errors
                    }
                };
            }

            this.setStatus(200)
            return {
                success: true,
                valid: true,
                message: "Metadata is valid hypercert metadata",
            }

        } catch (e) {
            this.setStatus(422)
            return {
                success: false,
                message: "Error while validating metadata",
                errors: {metadata: (e as Error).message}
            };
        }
    }
}