import {AllowlistEntry, EvaluationData, HypercertClaimdata, HypercertMetadata} from "@hypercerts-org/sdk"
import {StandardMerkleTree} from "@openzeppelin/merkle-tree";

export type ResponseData<T> = {
    success: boolean;
    message: string;
    data?: T;
    errors?: Error[] | Record<string, string | string[]>;
};

export interface ValidationError {
    success: false;
    message: "Validation failed";
    errors: { [name: string]: unknown };
}

// TODO expose results from SDK and expend with MerkleTree
export type ValidationResult<T = void> = {
    data: StandardMerkleTree<T[]> | AllowlistEntry[] | EvaluationData | HypercertClaimdata | HypercertMetadata | unknown;
    valid: boolean;
    errors: Record<string, string | string[]>;
};

