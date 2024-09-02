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
  public readonly db: Kysely<CachingDatabase>;

  constructor() {
    this.db = kysely;
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
          );
      case "attestation_schema":
        return this.db.selectFrom("supported_schemas").selectAll();
      case "hypercerts":
      case "claims":
        return this.db
          .selectFrom("claims")
          .selectAll("claims") // Select all columns from the claims table
          .$if(args.where?.metadata, (qb) =>
            qb.innerJoin("metadata", "metadata.uri", "claims.uri"),
          )
          .$if(args.where?.attestations, (qb) =>
            qb.innerJoin("attestations", "attestations.claims_id", "claims.id"),
          )
          .$if(args.where?.fractions, (qb) =>
            qb.innerJoin("fractions_view", (join) =>
              join.on("fractions_view.claims_id", "=", "claims.id"),
            ),
          )
          .$if(args.where?.contract, (qb) =>
            qb.innerJoin("contracts", "contracts.id", "claims.contracts_id"),
          );
      case "contracts":
        return this.db.selectFrom("contracts").selectAll();
      case "fractions":
      case "fractions_view":
        return this.db.selectFrom("fractions_view").selectAll();
      // .$if(args.where?.hypercerts, (qb) =>
      //   qb.leftJoin(
      //     "claims",
      //     "claims.hypercert_id",
      //     "fractions_view.hypercert_id",
      //   ),
      // );
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
          .select((expressionBuilder) => {
            return expressionBuilder.fn.countAll().as("count");
          });
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
            qb.innerJoin("fractions", "fractions.claims_id", "claims.id"),
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

  // Generalized query builder and handler of filter, sort, and pagination

  handleGetData<
    DB extends CachingDatabase,
    T extends keyof DB & string,
    A extends object,
  >(
    tableName: T,
    args: BaseArgs<A> & {
      first?: number;
      offset?: number;
    },
  ) {
    let query = this.getDataQuery(tableName, args);

    console.log("Building data query");

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

          const dir: "asc" | "desc" =
            direction === SortOrder.ascending ? "asc" : "desc";

          query = query.orderBy(column, dir);
        }
      }
    }

    if (first) query = query.limit(first);
    if (offset) query = query.offset(offset);

    console.log("Built query", query);

    return query;
  }

  handleGetCount<
    DB extends CachingDatabase,
    T extends keyof DB & string,
    A extends object,
  >(
    tableName: T,
    args: BaseArgs<A> & {
      first?: number;
      offset?: number;
    },
  ) {
    let query = this.getCountQuery(tableName, args);

    console.log("Building count query");

    const { where } = args;
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

    console.log("Built query", query);

    return query;
  }

  getSalesForTokenIds(tokenIds: bigint[]) {
    return supabaseClient
      .from("sales")
      .select("*", { count: "exact", head: false })
      .overlaps("item_ids", tokenIds);
  }
}
