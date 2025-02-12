import { singleton } from "tsyringe";
import { kyselyCaching } from "../client/kysely.js";
import { supabaseCaching as supabaseClient } from "../client/supabase.js";
import { GetAllowlistRecordsArgs } from "../graphql/schemas/args/allowlistRecordArgs.js";
import { type GetAttestationsArgs } from "../graphql/schemas/args/attestationArgs.js";
import { GetAttestationSchemasArgs } from "../graphql/schemas/args/attestationSchemaArgs.js";
import type { GetContractsArgs } from "../graphql/schemas/args/contractArgs.js";
import { GetFractionsArgs } from "../graphql/schemas/args/fractionArgs.js";
import { GetHypercertsArgs } from "../graphql/schemas/args/hypercertsArgs.js";
import type { GetMetadataArgs } from "../graphql/schemas/args/metadataArgs.js";
import { GetSalesArgs } from "../graphql/schemas/args/salesArgs.js";
import { CachingDatabase } from "../types/kyselySupabaseCaching.js";
import { BaseSupabaseService } from "./BaseSupabaseService.js";

@singleton()
export class SupabaseCachingService extends BaseSupabaseService<CachingDatabase> {
  constructor() {
    super(kyselyCaching);
  }

  getAllowlistRecords(args: GetAllowlistRecordsArgs) {
    return {
      data: this.handleGetData("claimable_fractions_with_proofs", args),
      count: this.handleGetCount("claimable_fractions_with_proofs", args),
    };
  }

  getAttestations = (args: GetAttestationsArgs) => {
    return {
      data: this.handleGetData("attestations", args),
      count: this.handleGetCount("attestations", args),
    };
  };

  getAttestationSchemas(args: GetAttestationSchemasArgs) {
    return {
      data: this.handleGetData("supported_schemas", args),
      count: this.handleGetCount("supported_schemas", args),
    };
  }

  getContracts(args: GetContractsArgs) {
    return {
      data: this.handleGetData("contracts", args),
      count: this.handleGetCount("contracts", args),
    };
  }

  getFractions(args: GetFractionsArgs) {
    return {
      data: this.handleGetData("fractions_view", args),
      count: this.handleGetCount("fractions_view", args),
    };
  }

  getMetadataWithoutImage(args: GetMetadataArgs) {
    return {
      data: this.handleGetData("metadata", args),
      count: this.handleGetCount("metadata", args),
    };
  }

  getHypercerts = (args: GetHypercertsArgs) => {
    return {
      data: this.handleGetData("claims", args),
      count: this.handleGetCount("claims", args),
    };
  };

  getSales(args: GetSalesArgs) {
    return {
      data: this.handleGetData("sales", args),
      count: this.handleGetCount("sales", args),
    };
  }

  getSalesForTokenIds(tokenIds: bigint[]) {
    return supabaseClient
      .from("sales")
      .select("*", { count: "exact", head: false })
      .overlaps("item_ids", tokenIds);
  }
}
