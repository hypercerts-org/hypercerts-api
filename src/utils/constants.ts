import {assertExists} from "./assertExists.js";

export const supabaseCachingUrl = assertExists(
    process.env.SUPABASE_CACHING_DB_URL,
    "SUPABASE_CACHING_DB_URL"
);

export const supabaseCachingApiKey = assertExists(
    process.env.SUPABASE_ANON_API_KEY,
    "SUPABASE_CACHING_ANON_API_KEY"
);

export const supabaseDataUrl = assertExists(
    process.env.SUPABASE_DATA_DB_URL,
    "SUPABASE_DATA_DB_URL"
);

export const supabaseDataApiKey = assertExists(
  process.env.SUPABASE_DATA_DB_URL,
  "SUPABASE_DATA_DB_URL"
);


export const web3upKey = assertExists(process.env.KEY, "WEB3UP_KEY");
export const web3upProof = assertExists(process.env.PROOF, "WEB3UP_PROOF");
