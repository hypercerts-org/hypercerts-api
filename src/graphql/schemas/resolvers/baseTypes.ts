import { type ClassType, Field, Int, Resolver, ObjectType } from "type-graphql";
import { SupabaseDataService } from "../../../services/SupabaseDataService.js";
import { container } from "tsyringe";
import { SupabaseCachingService } from "../../../services/SupabaseCachingService.js";
import { GetMetadataArgs } from "../args/metadataArgs.js";
import { GetContractsArgs } from "../args/contractArgs.js";
import { GetFractionsArgs } from "../args/fractionArgs.js";
import { GetAllowlistRecordsArgs } from "../args/allowlistRecordArgs.js";
import { GetAttestationSchemasArgs } from "../args/attestationSchemaArgs.js";
import { GetAttestationsArgs } from "../args/attestationArgs.js";
import { GetHypercertsArgs } from "../args/hypercertsArgs.js";
import { GetSalesArgs } from "../args/salesArgs.js";

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
        if (single) {
          return this.supabaseCachingService
            .getMetadata(args)
            .executeTakeFirst();
        }

        return this.supabaseCachingService.getMetadata(args).execute();
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getMetadata] Error fetching metadata: ${error.message}`,
        );
      }
    }

    getContracts(args: GetContractsArgs, single: boolean = false) {
      console.debug(
        `[${entityFieldName}Resolver::getContract] Fetching contracts`,
      );

      try {
        if (single) {
          return this.supabaseCachingService
            .getContracts(args)
            .executeTakeFirst();
        }

        return this.supabaseCachingService.getContracts(args).execute();
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
        if (single) {
          return this.supabaseCachingService
            .getHypercerts(args)
            .executeTakeFirst();
        }

        return this.supabaseCachingService.getHypercerts(args).execute();
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
        if (single) {
          return this.supabaseCachingService
            .getFractions(args)
            .executeTakeFirst();
        }

        return this.supabaseCachingService.getFractions(args).execute();
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
        if (single) {
          return this.supabaseCachingService
            .getAllowlistRecords(args)
            .executeTakeFirst();
        }

        return this.supabaseCachingService.getAllowlistRecords(args).execute();
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
        if (single) {
          return this.supabaseCachingService
            .getAttestationSchemas(args)
            .executeTakeFirst();
        }

        return this.supabaseCachingService
          .getAttestationSchemas(args)
          .execute();
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
        if (single) {
          const res = await this.supabaseCachingService
            .getAttestations(args)
            .executeTakeFirst();
          return res ? this.parseAttestation(res) : null;
        }

        const res = await this.supabaseCachingService
          .getAttestations(args)
          .execute();
        return res ? res?.map(this.parseAttestation) : [];
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
        if (single) {
          return this.supabaseCachingService.getSales(args).executeTakeFirst();
        }

        return this.supabaseCachingService.getSales(args).execute();
      } catch (e) {
        const error = e as Error;
        throw new Error(
          `[${entityFieldName}Resolver::getSales] Error fetching sales: ${error.message}`,
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
  }

  return BaseResolver;
}
