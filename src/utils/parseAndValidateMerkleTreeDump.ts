import {validateAllowlist} from "@hypercerts-org/sdk";
import {parseMerkleTree} from "./parseMerkleTree.js";
import {CreateAllowListRequest} from "../controllers/AllowListController.js";

export const parseAndValidateMerkleTree = (request: CreateAllowListRequest) => {

    const {allowList, totalUnits} = request;

    const _merkleTree = parseMerkleTree(allowList)

    if (!_merkleTree) {
        return {data: _merkleTree, valid: false, errors: {allowListData: "Data could not be parsed to OpenZeppelin MerkleTree"}};
    }

    const merkleEntries = Array.from(_merkleTree.entries()).map((entry) => entry[1]);

    const allowListEntries = merkleEntries
        .map((row) =>
            ({address: row[0], units: BigInt(row[1])})
        )
        .flatMap((entry) => (entry ? [entry] : []));


    return validateAllowlist(
        allowListEntries,
        BigInt(totalUnits)
    );

}

