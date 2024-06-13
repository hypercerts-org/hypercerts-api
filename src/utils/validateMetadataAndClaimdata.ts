import {validateClaimData, validateMetaData, HypercertMetadata} from "@hypercerts-org/sdk";
import {isHypercertMetadata} from "./isHypercertsMetadata.js";
import {ValidationResult} from "../types/api.js";


export const validateMetadataAndClaimdata = (data: HypercertMetadata): ValidationResult<HypercertMetadata> => {
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

    // Check if hypercert metadata is valid
    const {valid: metadataValid, errors: metadataErrors} =
        validateMetaData(data);

    return {
        data,
        valid: claimDataValid && metadataValid,
        errors: {
            ...claimDataErrors,
            ...metadataErrors,
        },
    };
}