import { supabaseCaching } from "../client/supabase.js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database as CachingDatabase } from "../types/supabaseCaching.js";
import { applyFilters } from "../graphql/schemas/utils/filters.js";
import type { GetContractsArgs } from "../graphql/schemas/args/contractArgs.js";
import type { GetMetadataArgs } from "../graphql/schemas/args/metadataArgs.js";
import { GetHypercertArgs } from "../graphql/schemas/args/hypercertsArgs.js";
import { GetAttestationSchemaArgs } from "../graphql/schemas/args/attestationSchemaArgs.js";
import { type GetAttestationArgs } from "../graphql/schemas/args/attestationArgs.js";
import { GetFractionArgs } from "../graphql/schemas/args/fractionArgs.js";
import { applySorting } from "../graphql/schemas/utils/sorting.js";
import { applyPagination } from "../graphql/schemas/utils/pagination.js";
import { CountKeys } from "../graphql/schemas/enums/countEnums.js";
import { GetSalesArgs } from "../graphql/schemas/args/salesArgs.js";
import { GetAllowlistRecordsArgs } from "../graphql/schemas/args/allowlistRecordArgs.js";

export class SupabaseCachingService {
  private supabaseCaching: SupabaseClient<CachingDatabase>;

  constructor() {
    this.supabaseCaching = supabaseCaching;
  }

  // Contracts

  getContracts(args: GetContractsArgs) {
    let query = this.supabaseCaching.from("contracts").select("*");

    const { where, sort, offset, first } = args;

    query = applyFilters({ query, where });
    query = applySorting({ query, sort });
    query = applyPagination({ query, pagination: { first, offset } });

    return query;
  }

  // Claims

  getHypercerts(args: GetHypercertArgs) {
    const fromString = `* ${args.where?.contract ? ", contracts!inner (*)" : ""} ${args.where?.metadata ? ", metadata!inner (*)" : ""} ${args.where?.attestations ? ", attestations!inner (*)" : ""} ${args.where?.fractions ? ", fractions!inner (*)" : ""}`;

    // TOOD build method to get count
    let query = this.supabaseCaching.from("claims").select(fromString, {
      count: args?.count ? "exact" : undefined,
      head: args?.count && args.count === CountKeys.HEAD,
    });

    const { where, first, offset, sort } = args;

    query = applyFilters({ query, where });
    query = applySorting({ query, sort });
    query = applyPagination({ query, pagination: { first, offset } });

    return query;
  }

  // Fractions

  getFractions(args: GetFractionArgs) {
    const fromString = `* ${args.where?.hypercerts ? ", claims!inner (*)" : ""}`;

    let query = this.supabaseCaching.from("fractions_view").select(fromString, {
      count: args?.count ? "exact" : undefined,
      head: args?.count && args.count === CountKeys.HEAD,
    });

    const { where, first, offset, sort } = args;

    query = applyFilters({ query, where });
    query = applySorting({ query, sort });
    query = applyPagination({ query, pagination: { first, offset } });

    return query;
  }

  // Metadata

  getMetadata(args: GetMetadataArgs) {
    const fromString = `* ${args.where?.hypercerts ? ", claims!inner(*)" : ""}`;

    let query = this.supabaseCaching.from("metadata").select(fromString, {
      count: args?.count ? "exact" : undefined,
      head: args?.count && args.count === CountKeys.HEAD,
    });
    const { where, sort, offset, first } = args;

    query = applyFilters({ query, where });
    query = applySorting({ query, sort });
    query = applyPagination({ query, pagination: { first, offset } });

    return query;
  }

  // Allow lists

  getAllowlistRecords(args: GetAllowlistRecordsArgs) {
    let query = this.supabaseCaching
      .from("claimable_fractions_with_proofs")
      .select("*");

    const { where, sort, offset, first } = args;

    query = applyFilters({ query, where });
    query = applySorting({ query, sort });
    query = applyPagination({ query, pagination: { first, offset } });

    return query;
  }

  // Attestations

  getAttestationSchemas(args: GetAttestationSchemaArgs) {
    let query = this.supabaseCaching.from("supported_schemas").select("*");

    const { where, sort, offset, first } = args;

    query = applyFilters({ query, where });
    query = applySorting({ query, sort });
    query = applyPagination({ query, pagination: { first, offset } });

    return query;
  }

  getAttestations(args: GetAttestationArgs) {
    const fromString = `* ${args.where?.hypercerts ? ", claims!inner (*)" : ""} ${args.where?.metadata ? ", metadata!inner (*)" : ""}`;

    let query = this.supabaseCaching.from("attestations").select(fromString);

    const { where, sort, offset, first } = args;

    query = applyFilters({ query, where });
    query = applySorting({ query, sort });
    query = applyPagination({ query, pagination: { first, offset } });

    return query;
  }

  getSales(args: GetSalesArgs) {
    let query = this.supabaseCaching.from("sales").select("*, item_ids");

    const { where, sort, offset, first } = args;

    query = applyFilters({ query, where });
    query = applySorting({ query, sort });
    query = applyPagination({ query, pagination: { first, offset } });

    return query;
  }

  getSalesForTokenIds(tokenIds: bigint[]) {
    return this.supabaseCaching
      .from("sales")
      .select("*", { count: "exact", head: false })
      .overlaps("item_ids", tokenIds);
  }
}
