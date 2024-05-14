import {jsonToBlob} from "../utils/jsonToBlob.js";
import {z} from "zod";
import {Body, Controller, Post, Response, Route, SuccessResponse} from "tsoa";
import {isParsableToBigInt} from "../utils/isParsableToBigInt.js";
import {StorageService} from "../services/StorageService.js";
import {parseAndValidateMerkleTree} from "../utils/parseAndValidateMerkleTreeDump.js";
import {ValidationError} from "../types/api.js";
import {tryParseMerkleTree} from "../utils/isParsableToMerkleTree.js";
import {StandardMerkleTree} from "@openzeppelin/merkle-tree";

/**
 *  Request body for creating a new allowlist.
 */
interface CreateAllowListRequest {
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


const AllowListPostRequest = z.object({
    allowList: z.string({description: 'The dump of the OpenZeppelin MerkleTree'}).refine(tryParseMerkleTree, {message: "Invalid allowList. Could not parse to OpenZeppelin MerkleTree"}),
    totalUnits: z.string({description: 'The total units of the allowlist'}).refine(isParsableToBigInt, {message: "Total units should be a valid BigInt"}),
})


@Route("v1/allowlists")
export class AllowListController extends Controller {

    /**
     * Submits a new allowlist for validation and storage on IPFS. While we maintain a database of allowlists, the allowlist itself is stored on IPFS.
     * Try to keep a backup of the allowlist for recovery purposes.
     *
     * Provide the dump of the OpenZeppelin MerkleTree and the total units.
     */
    @Post()
    @SuccessResponse(201, "Data uploaded successfully")
    @Response<ValidationError>(422, "Unprocessable content", {
        success: false,
        message: "Validation failed",
        errors: {allowList: "Invalid allowList. Length is  0"}
    })
    public async storeAllowList(@Body() requestBody: CreateAllowListRequest) {
        const storage = await StorageService.init();

        const reqData = AllowListPostRequest.safeParse(requestBody);

        if (!reqData.success) {
            this.setStatus(422)
            return {success: false, message: "Input validation failed", errors: reqData.error.issues};
        }

        const {data, valid, errors} = parseAndValidateMerkleTree(reqData.data);

        if (!valid || !data) {
            this.setStatus(422)
            // TODO fix typing of error return type
            return {
                success: false,
                message: "Errors while validating allow list",
                // @ts-expect-error Types should be better declared because issues are not always known
                errors: errors?.issues ? errors.issues.toString() : errors
            };
        }

        const _merkleTree = data as StandardMerkleTree<[string, bigint]>;

        const cid = await storage.uploadFile({file: jsonToBlob(JSON.stringify(_merkleTree.dump()))});
        this.setStatus(201)

        return cid
    }
}