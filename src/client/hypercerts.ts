import { HypercertClient } from "@hypercerts-org/sdk";
import { indexerEnvironment } from "../utils/constants.js";

export const hypercertClient = new HypercertClient({
  environment: indexerEnvironment as "production" | "test",
});
