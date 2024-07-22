import { HypercertMetadata, HypercertClaimdata } from "@hypercerts-org/sdk";

// TODO custom zod schemas based on types https://zod.dev/?id=custom-schemas
// Check on required hypercert metadata fields
export const isHypercertMetadata = (
  data: unknown,
): data is HypercertMetadata => {
  return (
    typeof data === "object" &&
    data !== null &&
    "hypercert" in data &&
    typeof data.hypercert === "object" &&
    isHypercertClaimData(data.hypercert) &&
    "name" in data &&
    typeof data.name === "string" &&
    "description" in data &&
    typeof data.description === "string" &&
    "image" in data &&
    typeof data.image === "string"
  );
};

export const isHypercertClaimData = (
  data: unknown,
): data is HypercertClaimdata => {
  return (
    typeof data === "object" &&
    data !== null &&
    "impact_scope" in data &&
    "work_scope" in data &&
    "work_timeframe" in data &&
    "impact_timeframe" in data &&
    "contributors" in data &&
    "rights" in data &&
    typeof data.impact_scope === "object" &&
    typeof data.work_scope === "object" &&
    typeof data.work_timeframe === "object" &&
    typeof data.impact_timeframe === "object" &&
    typeof data.contributors === "object" &&
    typeof data.rights === "object"
  );
};
