import {
  HypercertMetadata,
  validateClaimData,
  validateMetaData,
} from "@hypercerts-org/sdk";
import { ValidationResult } from "../types/api.js";
import { isHypercertMetadata } from "./isHypercertsMetadata.js";

// TODO: replace with validations from SDK
export const validateMetadataAndClaimdata = (
  data: HypercertMetadata,
): ValidationResult<HypercertMetadata> => {
  // Check if object is hypercert metadata object
  if (!isHypercertMetadata(data)) {
    return {
      data,
      valid: false,
      errors: {
        metadata: "Provided metadata is not a valid hypercert metadata object",
      },
    };
  }

  // Check if hypercert claim data is valid
  const { valid: claimDataValid, errors: claimDataErrors } = validateClaimData(
    data.hypercert,
  );

  // Check if hypercert metadata is valid
  const { valid: metadataValid, errors: metadataErrors } =
    validateMetaData(data);

  return {
    data,
    valid: claimDataValid && metadataValid,
    errors: {
      ...claimDataErrors,
      ...metadataErrors,
    },
  };
};
