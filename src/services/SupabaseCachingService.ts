import { CachingDatabase } from "../types/kyselySupabaseCaching.js";
import type { GetContractsArgs } from "../graphql/schemas/args/contractArgs.js";
import type { GetMetadataArgs } from "../graphql/schemas/args/metadataArgs.js";
import { GetHypercertsArgs } from "../graphql/schemas/args/hypercertsArgs.js";
import { GetAttestationSchemasArgs } from "../graphql/schemas/args/attestationSchemaArgs.js";
import { type GetAttestationsArgs } from "../graphql/schemas/args/attestationArgs.js";
import { GetFractionsArgs } from "../graphql/schemas/args/fractionArgs.js";
import { GetSalesArgs } from "../graphql/schemas/args/salesArgs.js";
import { kyselyCaching } from "../client/kysely.js";
import { supabaseCaching as supabaseClient } from "../client/supabase.js";
import { GetAllowlistRecordsArgs } from "../graphql/schemas/args/allowlistRecordArgs.js";
import { singleton } from "tsyringe";
import { BaseArgs } from "../graphql/schemas/args/baseArgs.js";
import { BaseSupabaseService } from "./BaseSupabaseService.js";

@singleton()
export class SupabaseCachingService extends BaseSupabaseService<CachingDatabase> {
  constructor() {
    super(kyselyCaching);
  }

  // Getters

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

  getMetadata(args: GetMetadataArgs) {
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

  // Build initial query per table

  getDataQuery<
    DB extends CachingDatabase,
    T extends keyof DB & string,
    A extends object,
  >(tableName: T, args: BaseArgs<A>) {
    switch (tableName) {
      case "allowlist_records":
      case "claimable_fractions_with_proofs":
        return this.db
          .selectFrom("claimable_fractions_with_proofs")
          .selectAll();
      case "attestations":
        return this.db
          .selectFrom("attestations")
          .selectAll("attestations")
          .$if(args.where?.hypercerts, (qb) =>
            qb.innerJoin("claims", "claims.id", "attestations.claims_id"),
          )
          .$if(args.where?.metadata, (qb) =>
            qb.innerJoin("metadata", "metadata.uri", "claims.uri"),
          )
          .$if(args.where?.supported_schemas, (qb) =>
            qb.innerJoin(
              "supported_schemas",
              "supported_schemas.id",
              "attestations.supported_schemas_id",
            ),
          );
      case "supported_schemas":
      case "attestation_schema":
        return this.db.selectFrom("supported_schemas").selectAll();
      case "hypercerts":
      case "claims":
        return this.db
          .selectFrom("claims")
          .$if(args.where?.metadata, (qb) =>
            qb.innerJoin("metadata", "metadata.uri", "claims.uri"),
          )
          .$if(args.where?.attestations, (qb) =>
            qb.innerJoin("attestations", "attestations.claims_id", "claims.id"),
          )
          .$if(args.where?.fractions, (qb) =>
            qb.innerJoin(
              "fractions_view",
              "fractions_view.claims_id",
              "claims.id",
            ),
          )
          .$if(args.where?.contract, (qb) =>
            qb.innerJoin("contracts", "contracts.id", "claims.contracts_id"),
          )
          .selectAll(); // Select all columns from the claims table
      case "contracts":
        return this.db.selectFrom("contracts").selectAll();
      case "fractions":
      case "fractions_view":
        return this.db.selectFrom("fractions_view").selectAll();
      case "metadata":
        return this.db
          .selectFrom("metadata")
          .selectAll("metadata")
          .$if(args.where?.hypercerts, (qb) =>
            qb.innerJoin("claims", "claims.uri", "metadata.uri"),
          );
      case "sales":
        return this.db.selectFrom("sales").selectAll();
      default:
        throw new Error(`Table ${tableName.toString()} not found`);
    }
  }

  getCountQuery<
    DB extends CachingDatabase,
    T extends keyof DB & string,
    A extends object,
  >(tableName: T, args: BaseArgs<A>) {
    switch (tableName) {
      case "allowlist_records":
      case "claimable_fractions_with_proofs":
        return this.db
          .selectFrom("claimable_fractions_with_proofs")
          .select((expressionBuilder) => {
            return expressionBuilder.fn.countAll().as("count");
          });
      case "attestations":
        return this.db
          .selectFrom("attestations")
          .$if(args.where?.hypercerts, (qb) =>
            qb.innerJoin("claims", "claims.id", "attestations.claims_id"),
          )
          .$if(args.where?.metadata, (qb) =>
            qb.innerJoin("metadata", "metadata.uri", "claims.uri"),
          )
          .$if(args.where?.supported_schemas, (qb) =>
            qb.innerJoin(
              "supported_schemas",
              "supported_schemas.id",
              "attestations.supported_schemas_id",
            ),
          )
          .select((expressionBuilder) => {
            return expressionBuilder.fn.countAll().as("count");
          });
      case "supported_schemas":
      case "attestation_schema":
        return this.db
          .selectFrom("supported_schemas")
          .select((expressionBuilder) => {
            return expressionBuilder.fn.countAll().as("count");
          });
      case "claims":
      case "hypercerts":
        return this.db
          .selectFrom("claims")
          .$if(args.where?.metadata, (qb) =>
            qb.innerJoin("metadata", "metadata.uri", "claims.uri"),
          )
          .$if(args.where?.attestations, (qb) =>
            qb.innerJoin("attestations", "attestations.claims_id", "claims.id"),
          )
          .$if(args.where?.fractions, (qb) =>
            qb.innerJoin(
              "fractions_view",
              "fractions_view.claims_id",
              "claims.id",
            ),
          )
          .$if(args.where?.contract, (qb) =>
            qb.innerJoin("contracts", "contracts.id", "claims.contracts_id"),
          )
          .select((expressionBuilder) => {
            return expressionBuilder.fn.countAll().as("count");
          });
      case "contracts":
        return this.db.selectFrom("contracts").select((expressionBuilder) => {
          return expressionBuilder.fn.countAll().as("count");
        });
      case "fractions":
      case "fractions_view":
        return this.db
          .selectFrom("fractions_view")
          .select((expressionBuilder) => {
            return expressionBuilder.fn.countAll().as("count");
          });
      case "metadata":
        return this.db
          .selectFrom("metadata")
          .$if(args.where?.hypercerts, (qb) =>
            qb.innerJoin("claims", "claims.uri", "metadata.uri"),
          )
          .select((expressionBuilder) => {
            return expressionBuilder.fn.countAll().as("count");
          });
      case "sales":
        return this.db.selectFrom("sales").select((expressionBuilder) => {
          return expressionBuilder.fn.countAll().as("count");
        });
      default:
        throw new Error(`Table ${tableName.toString()} not found`);
    }
  }

  getSalesForTokenIds(tokenIds: bigint[]) {
    return supabaseClient
      .from("sales")
      .select("*", { count: "exact", head: false })
      .overlaps("item_ids", tokenIds);
  }
}
