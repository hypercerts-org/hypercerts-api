import { assertExists } from "./assertExists";

export const supabaseApiKey = assertExists(
  process.env.SUPABASE_HC_METADATA_API_KEY,
  "SUPABASE_HC_METADATA_API_KEY"
);

export const web3upKey = assertExists(process.env.KEY, "WEB3UP_KEY");
export const web3upProof = assertExists(process.env.PROOF, "WEB3UP_PROOF");
