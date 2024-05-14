import {jsonToBlob} from "../utils/jsonToBlob.js";
import {Body, Controller, Post, Response, Route, SuccessResponse} from "tsoa";
import {StorageService} from "../services/StorageService.js";
import {ValidationError} from "../types/api.js";
import type {HypercertMetadata} from "@hypercerts-org/sdk";
import {validateMetadataAndClaimdata} from "../utils/validateMetadataAndClaimdata.js";
import {validateRemoteAllowList} from "../utils/validateRemoteAllowList.js";

@Route("v1/metadata")
export class MetadataController extends Controller {

    /**
     * Submits a new hypercert metadata object for validation and storage on IPFS. While we maintain a database of allowlists, the allowlist itself is stored on IPFS.
     *
     */
    @Post()
    @SuccessResponse(201, "Data uploaded successfully")
    @Response<ValidationError>(422, "Unprocessable content", {
        success: false,
        message: "Validation failed",
        errors: {metadata: "Invalid metadata."}
    })
    public async storeMetadata(@Body() requestBody: HypercertMetadata) {
        const storage = await StorageService.init();


        const metadataValidationResult = validateMetadataAndClaimdata(requestBody);

        if (!metadataValidationResult.valid) {
            const {errors} = metadataValidationResult;
            this.setStatus(422)
            // TODO fix typing of error return type
            return {
                success: false,
                message: "Errors while validating metadata",
                errors: errors?.issues ? errors.issues.toString() : errors
            };
        }

        const allowListValidationResult = await validateRemoteAllowList(metadataValidationResult.data as HypercertMetadata);

        if (!allowListValidationResult.valid) {
            const {errors} = allowListValidationResult;
            this.setStatus(422)
            // TODO fix typing of error return type
            return {
                success: false,
                message: "Errors while validating allow list",
                errors
            };
        }


        const cid = await storage.uploadFile({file: jsonToBlob(metadataValidationResult.data)});
        this.setStatus(201)

        return cid
    }
}