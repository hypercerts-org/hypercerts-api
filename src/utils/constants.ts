import { assertExists } from "./assertExists.js";

export const supabaseCachingUrl = assertExists(
  process.env.SUPABASE_CACHING_DB_URL,
  "SUPABASE_CACHING_DB_URL",
);

export const supabaseCachingApiKey = assertExists(
  process.env.SUPABASE_CACHING_ANON_API_KEY,
  "SUPABASE_CACHING_ANON_API_KEY",
);

export const supabaseDataUrl = assertExists(
  process.env.SUPABASE_DATA_DB_URL,
  "SUPABASE_DATA_DB_URL",
);

export const supabaseDataServiceApiKey = assertExists(
  process.env.SUPABASE_DATA_SERVICE_API_KEY,
  "SUPABASE_DATA_SERVICE_API_KEY",
);

export const web3upKey = assertExists(process.env.KEY, "WEB3UP_KEY");
export const web3upProof = assertExists(process.env.PROOF, "WEB3UP_PROOF");

export const indexerEnvironment = assertExists(
  process.env.INDEXER_ENVIRONMENT,
  "INDEXER_ENVIRONMENT",
);

export const alchemyApiKey = assertExists(
  process.env.ALCHEMY_API_KEY,
  "Alchemy API key",
);

export const infuraApiKey = assertExists(
  process.env.INFURA_API_KEY,
  "Infura API key",
);

export const drpcApiPkey = assertExists(
  process.env.DRPC_API_KEY,
  "dRPC API KEY",
);

export const cachingDatabaseUrl = assertExists(
  process.env.CACHING_DATABASE_URL,
  "CACHING_DATABASE_URL",
);

export const dataDatabaseUrl = assertExists(
  process.env.DATA_DATABASE_URL,
  "DATA_DATABASE_URL",
);
