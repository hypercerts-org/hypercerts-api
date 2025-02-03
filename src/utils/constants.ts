import { getRequiredEnvVar } from "./envVars.js";
export enum Environment {
  TEST = "test",
  PRODUCTION = "production",
}

export const supabaseCachingUrl = getRequiredEnvVar("SUPABASE_CACHING_DB_URL");
export const supabaseCachingApiKey = getRequiredEnvVar(
  "SUPABASE_CACHING_ANON_API_KEY",
);
export const supabaseDataUrl = getRequiredEnvVar("SUPABASE_DATA_DB_URL");
export const supabaseDataServiceApiKey = getRequiredEnvVar(
  "SUPABASE_DATA_SERVICE_API_KEY",
);
export const web3upKey = getRequiredEnvVar("KEY", "WEB3UP Key");
export const web3upProof = getRequiredEnvVar("PROOF", "WEB3UP Proof");
export const indexerEnvironment = getRequiredEnvVar("INDEXER_ENVIRONMENT");
export const alchemyApiKey = getRequiredEnvVar("ALCHEMY_API_KEY");
export const infuraApiKey = getRequiredEnvVar("INFURA_API_KEY");
export const drpcApiPkey = getRequiredEnvVar("DRPC_API_KEY");
export const cachingDatabaseUrl = getRequiredEnvVar("CACHING_DATABASE_URL");
export const dataDatabaseUrl = getRequiredEnvVar("DATA_DATABASE_URL");
export const filecoinApiKey = getRequiredEnvVar("FILECOIN_API_KEY");
