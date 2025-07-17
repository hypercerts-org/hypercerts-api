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
import { singleton } from "tsyringe";

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
  // console.debug(payload);
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
  // console.debug(payload);
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
  // console.debug(payload);
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
  // console.debug(payload);
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
  // console.debug(payload);
  switch (payload.eventType) {
    case "INSERT":
      cache.invalidate([
        {
          typename: "AllowlistRecord",
        },
      ]);
      break;
    case "UPDATE":
      cache.invalidate([
        {
          typename: "AllowlistRecord",
          id: payload.new.id,
        },
      ]);
      break;
    default:
      break;
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleChangeAttestations = (
  payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
) => {
  // console.debug(payload);
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
  // console.debug(payload);
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

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleChangeBlueprints = (
  payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
) => {
  // console.debug(payload);
  switch (payload.eventType) {
    case "INSERT":
      cache.invalidate([{ typename: "Blueprint" }]);
      break;
    case "UPDATE":
      cache.invalidate([{ typename: "Blueprint", id: payload.new.id }]);
      break;
    case "DELETE":
      cache.invalidate([{ typename: "Blueprint" }]);
      break;
    default:
      break;
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleChangeHyperboards = (
  payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
) => {
  // console.debug(payload);
  switch (payload.eventType) {
    case "UPDATE":
    case "DELETE":
    case "INSERT":
      cache.invalidate([
        { typename: "Hyperboard" },
        { typename: "Collection" },
        { typename: "SectionResponseType" },
        { typename: "Section" },
        { typename: "SectionOwner" },
        { typename: "SectionEntry" },
        { typename: "SectionEntryOwner" },
        { typename: "User" },
        { typename: "Blueprint" },
      ]);
      break;
    default:
      break;
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleChangeOrders = (
  payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
) => {
  // console.debug(payload);

  switch (payload.eventType) {
    case "INSERT":
    case "UPDATE":
    case "DELETE":
      cache.invalidate([{ typename: "Order" }]);
      break;
    default:
      break;
  }
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const handleChangeSignatureRequests = (
  payload: RealtimePostgresChangesPayload<{ [key: string]: any }>,
) => {
  // console.debug(payload);

  switch (payload.eventType) {
    case "INSERT":
    case "UPDATE":
    case "DELETE":
      cache.invalidate([{ typename: "SignatureRequest" }]);
      break;
    default:
      break;
  }
};

@singleton()
export class SupabaseRealtimeManager {
  private isSubscribed: boolean = false;

  public subscribeToEvents(): void {
    if (this.isSubscribed) {
      console.log(
        "⚠️ [REALTIME] Already subscribed to Supabase realtime events",
      );
      return;
    }

    console.log(
      "✏️ [REALTIME] Initializing Supabase realtime event subscriptions",
    );

    try {
      this.subscribeToSupabaseRealtimeEvents();
      this.isSubscribed = true;
      console.log(
        "✅ [REALTIME] Successfully subscribed to Supabase realtime events",
      );
    } catch (error) {
      console.error(
        "⛔️ [REALTIME] Failed to subscribe to Supabase realtime events:",
        error,
      );
      throw error;
    }
  }

  private subscribeToSupabaseRealtimeEvents(): void {
    console.log("✏️ Subscribing to realtime events");

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
          table: "hypercert_allow_list_records",
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
      .subscribe((status, error) => {
        if (status === "SUBSCRIBED") {
          console.log(
            "✅ [CACHING] Subscribed to realtime events with status",
            status,
          );
          return;
        }

        if (error) {
          console.error(
            "⛔️ [CACHING] Error subscribing to realtime events ",
            error,
          );
          throw new Error("Error subscribing to realtime events caching");
        } else {
          console.log(
            "⚠️ [CACHING] Subscribed to realtime events with status",
            status,
          );
          throw new Error("Error subscribing to realtime events caching");
        }
      });

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
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "collections",
        },
        (payload) => handleChangeHyperboards(payload),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "hyperboards",
        },
        (payload) => handleChangeHyperboards(payload),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "hypercerts",
        },
        (payload) => handleChangeHyperboards(payload),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "hyperboard_hypercert_metadata",
        },
        (payload) => handleChangeHyperboards(payload),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "hyperboard_collections",
        },
        (payload) => handleChangeHyperboards(payload),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "hyperboard_blueprint_metadata",
        },
        (payload) => handleChangeHyperboards(payload),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "collection_blueprints",
        },
        (payload) => handleChangeHyperboards(payload),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blueprints",
        },
        (payload) => {
          handleChangeBlueprints(payload);
          handleChangeHyperboards(payload);
        },
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "users",
        },
        (payload) => handleChangeHyperboards(payload),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "collection_admins",
        },
        (payload) => handleChangeHyperboards(payload),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "hyperboard_admins",
        },
        (payload) => handleChangeHyperboards(payload),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "marketplace_orders",
        },
        (payload) => handleChangeOrders(payload),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "marketplace_order_nonces",
        },
        (payload) => handleChangeOrders(payload),
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "signature_requests",
        },
        (payload) => handleChangeSignatureRequests(payload),
      )
      .subscribe((status, error) => {
        if (status === "SUBSCRIBED") {
          console.log(
            "✅ [DATA] Subscribed to realtime events with status",
            status,
          );
          return;
        }

        if (error) {
          console.error(
            "⛔️ [DATA] Error subscribing to realtime events ",
            error,
          );
          throw new Error("Error subscribing to realtime events data");
        } else {
          console.log(
            "⚠️ [DATA] Subscribed to realtime events with status",
            status,
          );
          throw new Error("Error subscribing to realtime events data");
        }
      });
  }

  public isEventSubscriptionActive(): boolean {
    return this.isSubscribed;
  }
}
