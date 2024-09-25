import {
  supabaseCachingApiKey,
  supabaseCachingUrl,
  supabaseDataServiceApiKey,
  supabaseDataUrl,
} from "../utils/constants.js";
import {
  createClient,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";
import { type Database as CachingDatabaseTypes } from "../types/supabaseCaching.js";
import { type Database as DataDatabaseTypes } from "../types/supabaseData.js";
import { cache } from "./graphql.js";

// Create a single supabase client for interacting with your database
export const supabaseCaching = createClient<CachingDatabaseTypes>(
  supabaseCachingUrl,
  supabaseCachingApiKey,
);

export const supabaseData = createClient<DataDatabaseTypes>(
  supabaseDataUrl,
  supabaseDataServiceApiKey,
);

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleChangeClaims = (
  payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
) => {
  console.log(payload);
  switch (payload.eventType) {
    case "INSERT":
      cache.invalidate([{ typename: "Hypercert" }]);
      break;
    case "UPDATE":
      cache.invalidate([{ typename: "Hypercert", id: payload.new.id }]);
      break;
    default:
      break;
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleChangeFractions = (
  payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
) => {
  console.log(payload);
  switch (payload.eventType) {
    case "INSERT":
      cache.invalidate([{ typename: "Fraction" }]);
      break;
    case "UPDATE":
      cache.invalidate([{ typename: "Fraction", id: payload.new.id }]);
      break;
    default:
      break;
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleChangeMetadata = (
  payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
) => {
  console.log(payload);
  switch (payload.eventType) {
    case "INSERT":
      cache.invalidate([{ typename: "Metadata", id: payload.new.id }]);
      break;
    case "UPDATE":
      cache.invalidate([{ typename: "Metadata", id: payload.new.id }]);
      break;
    default:
      break;
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleChangeSales = (
  payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
) => {
  console.log(payload);
  switch (payload.eventType) {
    case "INSERT":
      cache.invalidate([{ typename: "Sale" }]);
      break;
    case "UPDATE":
      cache.invalidate([{ typename: "Sale", id: payload.new.id }]);
      break;
    default:
      break;
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleChangeAllowlistRecords = (
  payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
) => {
  console.log(payload);
  switch (payload.eventType) {
    case "INSERT":
      cache.invalidate([{ typename: "AllowlistRecord" }]);
      break;
    case "UPDATE":
      cache.invalidate([{ typename: "AllowlistRecord", id: payload.new.id }]);
      break;
    default:
      break;
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleChangeAttestations = (
  payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
) => {
  console.log(payload);
  switch (payload.eventType) {
    case "INSERT":
      cache.invalidate([{ typename: "Attestation" }]);
      break;
    case "UPDATE":
      cache.invalidate([{ typename: "Attestation", id: payload.new.id }]);
      break;
    default:
      break;
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleChangeUsers = (
  payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
) => {
  console.log(payload);
  switch (payload.eventType) {
    case "INSERT":
      cache.invalidate([{ typename: "User" }]);
      break;
    case "UPDATE":
      cache.invalidate([{ typename: "User", id: payload.new.address }]);
      break;
    default:
      break;
  }
};

supabaseCaching
  .channel("schema-db-changes")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "claims",
    },
    (payload) => handleChangeClaims(payload),
  )
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "fractions",
    },
    (payload) => handleChangeFractions(payload),
  )
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "metadata",
    },
    (payload) => handleChangeMetadata(payload),
  )
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "sales",
    },
    (payload) => handleChangeSales(payload),
  )
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "sales",
    },
    (payload) => handleChangeSales(payload),
  )
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "allow_list_data",
    },
    (payload) => handleChangeAllowlistRecords(payload),
  )
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "attestations",
    },
    (payload) => handleChangeAttestations(payload),
  )
  .subscribe();

supabaseData
  .channel("schema-db-changes")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "users",
    },
    (payload) => handleChangeUsers(payload),
  )
  .subscribe();
