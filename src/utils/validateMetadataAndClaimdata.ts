import {validateClaimData, validateMetaData} from "@hypercerts-org/sdk";
import {isHypercertMetadata} from "./isHypercertsMetadata.js";
import {ValidationResult} from "../types/api.js";


export const validateMetadataAndClaimdata = (data: unknown): ValidationResult => {
    // Check if object is hypercert metadata object
    if (!isHypercertMetadata(data)) {
        return {
            data,
            valid: false,
            errors: {metadata: "Provided metadata is not a valid hypercert metadata object"},
        };
    }

    // Check if hypercert claim data is valid
    const {valid: claimDataValid, errors: claimDataErrors} =
        validateClaimData(data.hypercert);

    if (!claimDataValid) {
        return {
            data,
            valid: false,
            errors: claimDataErrors,
        };
    }

    // Check if metadata is valid
    return validateMetaData(data)
}