import {z} from "zod";
import {isAddress} from "viem";
import {isParsableToBigInt} from "./isParsableToBigInt.js";
import {validateAllowlist} from "@hypercerts-org/sdk";
import {parseMerkleTree} from "./parseMerkleTree.js";

const MerkleEntrySchema = z.tuple([
    z.string().refine(isAddress, {
        message: 'Address is not valid',
    }),
    z.string().refine(isParsableToBigInt, {
        message: 'Units value is not a valid BigInt',
    }),
]);

const MerkleTreeSchema = z.array(MerkleEntrySchema);

export const parseAndValidateMerkleTree = ({allowList, totalUnits}: {
    allowList: string;
    totalUnits: string | bigint
}) => {

    const _merkleTree = parseMerkleTree(allowList)

    if (!_merkleTree) {
        return {valid: false, errors: {allowListData: "Data could not be parsed to OpenZeppelin MerkleTree"}};
    }

    const merkleEntries = Array.from(_merkleTree.entries()).map((entry) => entry[1]);

    const result = MerkleTreeSchema.safeParse(merkleEntries);

    if (!result.success) {
        return {data: _merkleTree, valid: false, errors: result.error};
    }

    const allowListEntries = result.data
        .map((row) =>
            ({address: row[0], units: BigInt(row[1])})
        )
        .flatMap((entry) => (entry ? [entry] : []));


    return validateAllowlist(
        allowListEntries,
        BigInt(totalUnits)
    );

}

