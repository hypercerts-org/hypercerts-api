import {jsonToBlob} from "../utils/jsonToBlob.js";
import {Body, Controller, Post, Response, Route, SuccessResponse, Tags} from "tsoa";
import {StorageService} from "../services/StorageService.js";
import {parseAndValidateMerkleTree} from "../utils/parseAndValidateMerkleTreeDump.js";
import {StoreResponse, ValidationResponse} from "../types/api.js";
import {StandardMerkleTree} from "@openzeppelin/merkle-tree";

/**
 *  Request body for creating a new allowlist.
 */
export interface CreateAllowListRequest {
    /**
     * The dump of the OpenZeppelin MerkleTree containing [address, uint256] entries. See https://github.com/OpenZeppelin/merkle-tree for more information.
     * @isString Should be string
     */
    allowList: string;
    /**
     * The total amount of units distributed via the allowlist. The total should amount to 1 eth in wei (1e18) units.
     * @isString The total units should be provided as a string to be compatible with BigInt.
     */
    totalUnits: string;
}

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
    @Response<StoreResponse>(422, "Unprocessable content", {
        success: false,
        message: "Errors while validating allow list",
        errors: {allowList: "Invalid allowList. Length is  0"}
    })
    public async storeAllowList(@Body() requestBody: CreateAllowListRequest) {
        const storage = await StorageService.init();

        const result = parseAndValidateMerkleTree(requestBody);

        if (!result.valid || !result.data) {
            this.setStatus(422)
            return {
                success: false,
                message: "Errors while validating allow list",
                errors: result.errors
            };
        }

        const cid = await storage.uploadFile({file: jsonToBlob(requestBody.allowList)});
        this.setStatus(201)

        return {
            success: true,
            data: cid,
        }
    }

    /**
     * Submits a new allowlist for validation.
     *
     * Provide the dump of the OpenZeppelin MerkleTree and the total units.
     */
    @Post("/validate")
    @SuccessResponse(200, "Valid allowlist object", "application/json")
    @Response<ValidationResponse>(422, "Unprocessable content", {
        valid: false,
        message: "Metadata validation failed",
        errors: {allowList: "Invalid allowList. Length is  0"}
    })
    public async validateAllowList(@Body() requestBody: CreateAllowListRequest) {
        const result = parseAndValidateMerkleTree(requestBody);

        if (!result.valid || !result.data) {
            this.setStatus(422)
            return {
                success: false,
                message: "Errors while validating allow list",
                errors: result.errors
            };
        }

        this.setStatus(201)
        return {
            valid: true,
            message: "Allowlist is a valid hypercerts allowlist object."
        }
    }
}