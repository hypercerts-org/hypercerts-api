import {assertExists} from "./assertExists.js";

export const supabaseUrl = assertExists(
    process.env.SUPABASE_DB_URL,
    "SUPABASE_DB_URL"
);

export const supabaseApiKey = assertExists(
    process.env.SUPABASE_ANON_API_KEY,
    "SUPABASE_ANON_API_KEY"
);

export const web3upKey = assertExists(process.env.KEY, "WEB3UP_KEY");
export const web3upProof = assertExists(process.env.PROOF, "WEB3UP_PROOF");
