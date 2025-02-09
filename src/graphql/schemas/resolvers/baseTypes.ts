import { container } from "tsyringe";
import { type ClassType, Field, Int, ObjectType, Resolver } from "type-graphql";
import { SupabaseCachingService } from "../../../services/SupabaseCachingService.js";
import { SupabaseDataService } from "../../../services/SupabaseDataService.js";
import { GetAllowlistRecordsArgs } from "../args/allowlistRecordArgs.js";
import { GetAttestationsArgs } from "../args/attestationArgs.js";
import { GetAttestationSchemasArgs } from "../args/attestationSchemaArgs.js";
import { GetBlueprintArgs } from "../args/blueprintArgs.js";
import { GetContractsArgs } from "../args/contractArgs.js";
import { GetFractionsArgs } from "../args/fractionArgs.js";
import { GetHypercertsArgs } from "../args/hypercertsArgs.js";
import { GetMetadataArgs } from "../args/metadataArgs.js";
import { GetOrdersArgs } from "../args/orderArgs.js";
import { GetSalesArgs } from "../args/salesArgs.js";
import { GetSignatureRequestArgs } from "../args/signatureRequestArgs.js";
import { GetUserArgs } from "../args/userArgs.js";
import { GetCollectionsArgs } from "../args/collectionArgs.js";

export function DataResponse<TItem extends object>(
  TItemClass: ClassType<TItem>,
) {
  @ObjectType()
  abstract class DataResponseClass {
    @Field(() => [TItemClass], { nullable: true })
    data?: TItem[];

    @Field(() => Int, { nullable: true })
    count?: number;
  }

  return DataResponseClass;
}

export function createBaseResolver<T extends ClassType>(
  entityFieldName: string,
) {
  @Resolver()
  class BaseResolver {
    readonly supabaseCachingService = container.resolve(SupabaseCachingService);
    readonly supabaseDataService = container.resolve(SupabaseDataService);

    getMetadata(args: GetMetadataArgs, single: boolean = false) {
      console.debug(
        `[${entityFieldName}Resolver::getMetadata] Fetching metadata`,
      );

      try {
        const queries = this.supabaseCachingService.getMetadata(args);
        if (single) {
          return queries.data.executeTakeFirst();
        }

        return this.supabaseCachingService.db
          .transaction()
          .execute(async (transaction) => {
            const dataRes = await transaction.executeQuery(queries.data);
            const countRes = await transaction.executeQuery(queries.count);
            return {
              data: dataRes.rows,
              count: countRes.rows[0].count,
            };
          });
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getMetadata] Error fetching metadata: ${error.message}`,
        );
      }
    }

    getBlueprints(args: GetBlueprintArgs, single: boolean = false) {
      console.debug(
        `[${entityFieldName}Resolver::getBlueprints] Fetching blueprints`,
      );

      try {
        const queries = this.supabaseDataService.getBlueprints(args);
        if (single) {
          return queries.data.executeTakeFirst();
        }

        return this.supabaseDataService.db
          .transaction()
          .execute(async (transaction) => {
            const dataRes = await transaction.executeQuery(queries.data);
            const countRes = await transaction.executeQuery(queries.count);
            return {
              data: dataRes.rows,
              count: countRes.rows[0].count,
            };
          });
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getBlueprints] Error fetching blueprints: ${error.message}`,
        );
      }
    }

    getContracts(args: GetContractsArgs, single: boolean = false) {
      console.debug(
        `[${entityFieldName}Resolver::getContract] Fetching contracts`,
      );

      try {
        const queries = this.supabaseCachingService.getContracts(args);
        if (single) {
          return queries.data.executeTakeFirst();
        }

        return this.supabaseCachingService.db
          .transaction()
          .execute(async (transaction) => {
            const dataRes = await transaction.executeQuery(queries.data);
            const countRes = await transaction.executeQuery(queries.count);
            return {
              data: dataRes.rows,
              count: countRes.rows[0].count,
            };
          });
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getContract] Error fetching contracts: ${error.message}`,
        );
      }
    }

    getHypercerts(args: GetHypercertsArgs, single: boolean = false) {
      console.debug(
        `[${entityFieldName}Resolver::getHypercerts] Fetching hypercerts`,
      );

      try {
        const queries = this.supabaseCachingService.getHypercerts(args);
        if (single) {
          return queries.data.executeTakeFirst();
        }

        return this.supabaseCachingService.db
          .transaction()
          .execute(async (transaction) => {
            const dataRes = await transaction.executeQuery(queries.data);

            const countRes = await transaction.executeQuery(queries.count);

            return {
              data: dataRes.rows,
              count: countRes.rows[0].count,
            };
          });
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getHypercerts] Error fetching hypercerts: ${error.message}`,
        );
      }
    }

    getFractions(args: GetFractionsArgs, single: boolean = false) {
      console.debug(
        `[${entityFieldName}Resolver::getFractions] Fetching fractions`,
      );

      try {
        const queries = this.supabaseCachingService.getFractions(args);
        if (single) {
          return queries.data.executeTakeFirst();
        }

        return this.supabaseCachingService.db
          .transaction()
          .execute(async (transaction) => {
            const dataRes = await transaction.executeQuery(queries.data);
            const countRes = await transaction.executeQuery(queries.count);

            return {
              data: dataRes.rows,
              count: countRes.rows[0].count,
            };
          });
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getFractions] Error fetching fractions: ${error.message}`,
        );
      }
    }

    getAllowlistRecords(
      args: GetAllowlistRecordsArgs,
      single: boolean = false,
    ) {
      console.debug(
        `[${entityFieldName}Resolver::getAllowlistRecords] Fetching allowlist records`,
      );

      try {
        const queries = this.supabaseCachingService.getAllowlistRecords(args);
        if (single) {
          return queries.data.executeTakeFirst();
        }

        return this.supabaseCachingService.db
          .transaction()
          .execute(async (transaction) => {
            const dataRes = await transaction.executeQuery(queries.data);
            const countRes = await transaction.executeQuery(queries.count);
            return {
              data: dataRes.rows,
              count: countRes.rows[0].count,
            };
          });
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getAllowlistRecords] Error fetching allowlist records: ${error.message}`,
        );
      }
    }

    getAttestationSchemas(
      args: GetAttestationSchemasArgs,
      single: boolean = false,
    ) {
      console.debug(
        `[${entityFieldName}Resolver::getAttestationSchemas] Fetching attestation schemas`,
      );

      try {
        const queries = this.supabaseCachingService.getAttestationSchemas(args);
        if (single) {
          return queries.data.executeTakeFirst();
        }

        return this.supabaseCachingService.db
          .transaction()
          .execute(async (transaction) => {
            const dataRes = await transaction.executeQuery(queries.data);
            const countRes = await transaction.executeQuery(queries.count);
            return {
              data: dataRes.rows,
              count: countRes.rows[0].count,
            };
          });
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getAttestationSchemas] Error fetching attestation schemas: ${error.message}`,
        );
      }
    }

    async getAttestations(args: GetAttestationsArgs, single: boolean = false) {
      console.debug(
        `[${entityFieldName}Resolver::getAttestations] Fetching attestations`,
      );

      try {
        const queries = this.supabaseCachingService.getAttestations(args);

        if (single) {
          const res = await queries.data.executeTakeFirst();
          return res ? this.parseAttestation(res) : null;
        }

        return this.supabaseCachingService.db
          .transaction()
          .execute(async (transaction) => {
            const dataRes = await transaction.executeQuery(queries.data);
            const countRes = await transaction.executeQuery(queries.count);
            return {
              data: dataRes ? dataRes.rows?.map(this.parseAttestation) : [],
              count: countRes.rows[0].count,
            };
          });
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getAttestations] Error fetching attestations: ${error.message}`,
        );
      }
    }

    getSales(args: GetSalesArgs, single: boolean = false) {
      console.debug(`[${entityFieldName}Resolver::getSales] Fetching sales`);

      try {
        const queries = this.supabaseCachingService.getSales(args);
        if (single) {
          return queries.data.executeTakeFirst();
        }

        return this.supabaseCachingService.db
          .transaction()
          .execute(async (transaction) => {
            const dataRes = await transaction.executeQuery(queries.data);
            const countRes = await transaction.executeQuery(queries.count);
            return {
              data: dataRes.rows,
              count: countRes.rows[0].count,
            };
          });
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getSales] Error fetching sales: ${error.message}`,
        );
      }
    }

    getUsers(args: GetUserArgs, single: boolean = false) {
      console.debug(`[${entityFieldName}Resolver::getUsers] Fetching users`);

      try {
        const queries = this.supabaseDataService.getUsers(args);
        if (single) {
          return queries.data.executeTakeFirst();
        }

        return this.supabaseDataService.db
          .transaction()
          .execute(async (transaction) => {
            const dataRes = await transaction.executeQuery(queries.data);
            const countRes = await transaction.executeQuery(queries.count);
            return {
              data: dataRes.rows,
              count: countRes.rows[0].count,
            };
          });
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getUsers] Error fetching users: ${error.message}`,
        );
      }
    }

    getOrders(args: GetOrdersArgs, single: boolean = false) {
      console.debug(`[${entityFieldName}Resolver::getOrders] Fetching orders`);

      try {
        const queries = this.supabaseDataService.getOrders(args);
        if (single) {
          return queries.data.executeTakeFirst();
        }

        return this.supabaseDataService.db
          .transaction()
          .execute(async (transaction) => {
            const dataRes = await transaction.executeQuery(queries.data);
            const countRes = await transaction.executeQuery(queries.count);
            return {
              data: dataRes.rows,
              count: countRes.rows[0].count,
            };
          });
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getOrders] Error fetching orders: ${error.message}`,
        );
      }
    }

    parseAttestation(item: { [K in keyof T]: T[K] }) {
      const decodedData = item?.data;
      // TODO cleaner handling of bigints in created attestations
      if (decodedData?.token_id) {
        decodedData.token_id = BigInt(decodedData.token_id).toString();
      }
      return {
        ...item,
        attestation: decodedData,
      };
    }

    getSignatureRequests(
      args: GetSignatureRequestArgs,
      single: boolean = false,
    ) {
      console.debug(
        `[${entityFieldName}Resolver::getSignatureRequests] Fetching signature requests`,
      );

      try {
        const queries = this.supabaseDataService.getSignatureRequests(args);
        if (single) {
          return queries.data.executeTakeFirst();
        }

        return this.supabaseDataService.db
          .transaction()
          .execute(async (transaction) => {
            const dataRes = await transaction.executeQuery(queries.data);
            const countRes = await transaction.executeQuery(queries.count);
            return {
              data: dataRes.rows,
              count: countRes.rows[0].count,
            };
          });
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getSignatureRequests] Error fetching signature requests: ${error.message}`,
        );
      }
    }

    getCollections(args: GetCollectionsArgs, single: boolean = false) {
      console.debug(
        `[${entityFieldName}Resolver::getCollections] Fetching collections`,
      );

      try {
        const queries = this.supabaseDataService.getCollections(args);
        if (single) {
          return queries.data.executeTakeFirst();
        }

        return this.supabaseDataService.db
          .transaction()
          .execute(async (transaction) => {
            const dataRes = await transaction.executeQuery(queries.data);
            const countRes = await transaction.executeQuery(queries.count);
            return {
              data: dataRes.rows,
              count: countRes.rows[0].count,
            };
          });
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getCollections] Error fetching collections: ${error.message}`,
        );
      }
    }
  }

  return BaseResolver;
}
