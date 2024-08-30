import { CachingDatabase } from "../types/kyselySupabase.js";
import type { GetContractsArgs } from "../graphql/schemas/args/contractArgs.js";
import type { GetMetadataArgs } from "../graphql/schemas/args/metadataArgs.js";
import { GetHypercertsArgs } from "../graphql/schemas/args/hypercertsArgs.js";
import { GetAttestationSchemasArgs } from "../graphql/schemas/args/attestationSchemaArgs.js";
import { type GetAttestationsArgs } from "../graphql/schemas/args/attestationArgs.js";
import { GetFractionsArgs } from "../graphql/schemas/args/fractionArgs.js";
import { GetSalesArgs } from "../graphql/schemas/args/salesArgs.js";
import { kysely } from "../client/kysely.js";
import { supabaseCaching as supabaseClient } from "../client/supabase.js";
import { generateFilterValues } from "../graphql/schemas/utils/filters-kysely.js";
import { expressionBuilder, Kysely } from "kysely";
import { GetAllowlistRecordsArgs } from "../graphql/schemas/args/allowlistRecordArgs.js";
import { singleton } from "tsyringe";
import { BaseArgs } from "../graphql/schemas/args/baseArgs.js";
import { SortOrder } from "../graphql/schemas/enums/sortEnums.js";

@singleton()
export class SupabaseCachingService {
  private readonly supabaseCaching: Kysely<CachingDatabase>;

  constructor() {
    this.supabaseCaching = kysely;
  }

  // Getters

  getAllowlistRecords(args: GetAllowlistRecordsArgs) {
    return this.handleGetData(
      this.supabaseCaching,
      "claimable_fractions_with_proofs",
      args,
    );
  }

  getAttestations = (args: GetAttestationsArgs) => {
    return this.handleGetData(this.supabaseCaching, "attestations", args);
  };

  getAttestationSchemas(args: GetAttestationSchemasArgs) {
    return this.handleGetData(this.supabaseCaching, "supported_schemas", args);
  }

  getContracts(args: GetContractsArgs) {
    return this.handleGetData(this.supabaseCaching, "contracts", args);
  }

  getFractions(args: GetFractionsArgs) {
    return this.handleGetData(this.supabaseCaching, "fractions", args);
  }

  getMetadata(args: GetMetadataArgs) {
    return this.handleGetData(this.supabaseCaching, "metadata", args);
  }

  getHypercerts = (args: GetHypercertsArgs) => {
    return this.handleGetData(this.supabaseCaching, "claims", args);
  };

  getSales(args: GetSalesArgs) {
    return this.handleGetData(this.supabaseCaching, "sales", args);
  }

  // Build initial query per table

  getJoinedTable<
    DB extends CachingDatabase,
    T extends keyof DB & string,
    A extends object,
  >(kysely: Kysely<DB>, tableName: T, args: BaseArgs<A>) {
    switch (tableName) {
      case "allowlist_records":
        return kysely.selectFrom("claimable_fractions_with_proofs").selectAll();
      case "attestations":
        return kysely
          .selectFrom(tableName)
          .selectAll("attestations")
          .$if(args.where?.hypercerts, (qb) =>
            qb.innerJoin("claims", "claims.id", "attestations.claims_id"),
          )
          .$if(args.where?.metadata, (qb) =>
            qb.innerJoin("metadata", "metadata.uri", "claims.uri"),
          );
      case "attestation_schema":
        return kysely.selectFrom(tableName).selectAll();
      case "hypercerts":
      case "claims":
        return kysely
          .selectFrom(tableName)
          .selectAll()
          .$if(args.where?.metadata, (qb) =>
            qb.innerJoin("metadata", "metadata.uri", "claims.uri"),
          )
          .$if(args.where?.attestations, (qb) =>
            qb.innerJoin("attestations", "attestations.claims_id", "claims.id"),
          )
          .$if(args.where?.fractions, (qb) =>
            qb.innerJoin("fractions", "fractions.claims_id", "claims.id"),
          )
          .$if(args.where?.contract, (qb) =>
            qb.innerJoin("contracts", "contracts.id", "claims.contracts_id"),
          );
      case "contracts":
        return kysely.selectFrom(tableName).selectAll();
      case "fractions":
        return kysely
          .selectFrom(tableName)
          .selectAll("fractions")
          .$if(args.where?.hypercerts, (qb) =>
            qb.innerJoin("claims", "claims.id", "fractions.claims_id"),
          );
      case "metadata":
        return kysely
          .selectFrom(tableName)
          .selectAll("metadata")
          .$if(args.where?.hypercerts, (qb) =>
            qb.innerJoin("claims", "claims.id", "fractions.claims_id"),
          );
      case "sales":
        return kysely.selectFrom(tableName).selectAll();
      default:
        throw new Error(`Table ${tableName.toString()} not found`);
    }
  }

  // Generalized query builder and handler of filter, sort, and pagination

  handleGetData<
    DB extends CachingDatabase,
    T extends keyof DB & string,
    A extends object,
  >(
    kysely: Kysely<DB>,
    tableName: T,
    args: BaseArgs<A> & {
      first?: number;
      offset?: number;
    },
  ) {
    let query = this.getJoinedTable(kysely, tableName, args);

    const { where, first, offset, sort } = args;
    const eb = expressionBuilder(query);

    if (where) {
      query = query.where(
        eb.and(
          Object.entries(where).flatMap(([column, value]) => {
            if (!column || !value) return [];

            if (typeof value === "object" && !Array.isArray(value)) {
              return Object.entries(value).flatMap(([_column, _value]) => {
                if (!_column || !_value) return [];

                const res = generateFilterValues(column, _column, _value);
                if (res.length > 0) {
                  return eb(
                    `${tableName.toString()}.${res[0]}`,
                    res[1],
                    res[2],
                  );
                }

                const filters = [];
                for (const [operator, operand] of Object.entries(_value)) {
                  if (!operand) continue;

                  let _table = column;
                  if (column === "hypercerts") {
                    _table = "claims";
                  }
                  if (column === "contract") {
                    _table = "contracts";
                  }

                  const [_col, _symbol, _input] = generateFilterValues(
                    `${_table}.${_column}`,
                    operator,
                    operand,
                  );
                  filters.push(eb(_col, _symbol, _input));
                }

                return filters.flat();
              });
            }
            return column && value ? eb(column, "=", value) : [];
          }),
        ),
      );
    }

    if (sort) {
      if (sort?.by) {
        const { by } = sort;
        for (const [column, direction] of Object.entries(by)) {
          if (!column || !direction) continue;

          console.log("ORDER BY", column, direction);

          const dir: "asc" | "desc" =
            direction === SortOrder.ascending ? "asc" : "desc";

          query = query.orderBy(column, dir);
        }
      }
    }

    if (first) query = query.limit(first);
    if (offset) query = query.offset(offset);

    return query.selectAll(tableName);
  }

  getSalesForTokenIds(tokenIds: bigint[]) {
    return supabaseClient
      .from("sales")
      .select("*", { count: "exact", head: false })
      .overlaps("item_ids", tokenIds);
  }
}
