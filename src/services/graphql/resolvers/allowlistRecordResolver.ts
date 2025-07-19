import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { AllowlistRecordService } from "../../database/entities/AllowListRecordEntityService.js";
import { HypercertsService } from "../../database/entities/HypercertsEntityService.js";
import { GetAllowlistRecordsArgs } from "../../../graphql/schemas/args/allowlistRecordArgs.js";
import {
  AllowlistRecord,
  GetAllowlistRecordResponse,
} from "../../../graphql/schemas/typeDefs/allowlistRecordTypeDefs.js";

/**
 * GraphQL resolver for AllowlistRecord operations.
 * Handles queries for allowlist records and resolves related fields.
 *
 * This resolver provides:
 * - Query for fetching allowlist records with optional filtering
 * - Field resolution for the hypercert field, which loads the associated hypercert data
 *
 * @injectable Marks the class as injectable for dependency injection with tsyringe
 * @resolver Marks the class as a GraphQL resolver for the AllowlistRecord type
 */
@injectable()
@Resolver(() => AllowlistRecord)
class AllowlistRecordResolver {
  /**
   * Creates a new instance of AllowlistRecordResolver.
   *
   * @param allowlistRecordService - Service for handling allowlist record operations
   * @param hypercertsService - Service for handling hypercert operations
   */
  constructor(
    @inject(AllowlistRecordService)
    private allowlistRecordService: AllowlistRecordService,
    @inject(HypercertsService)
    private hypercertsService: HypercertsService,
  ) {}

  /**
   * Queries allowlist records based on provided arguments.
   *
   * @param args - Query arguments for filtering allowlist records
   * @returns A promise that resolves to an object containing:
   *          - data: Array of allowlist records matching the query
   *          - count: Total number of records matching the query
   *
   * @example
   * Query:
   * ```graphql
   * query {
   *   allowlistRecords(where: { hypercert: { hypercert_id: { eq: "123" } } }) {
   *     data {
   *       id
   *       hypercert_id
   *     }
   *     count
   *   }
   * }
   * ```
   */
  @Query(() => GetAllowlistRecordResponse)
  async allowlistRecords(@Args() args: GetAllowlistRecordsArgs) {
    try {
      return await this.allowlistRecordService.getAllowlistRecords(args);
    } catch (e) {
      console.error(
        `[AllowlistRecordResolver::allowlistRecords] Error fetching allowlist records: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the hypercert field for an allowlist record.
   * This field resolver is called automatically when the hypercert field is requested in a query.
   *
   * @param allowlistRecord - The allowlist record for which to resolve the hypercert
   * @returns A promise that resolves to the associated hypercert data or null if not found
   *
   * @example
   * Query with hypercert field:
   * ```graphql
   * query {
   *   allowlistRecords {
   *     data {
   *       id
   *       hypercert {
   *         id
   *         name
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver()
  async hypercert(@Root() allowlistRecord: AllowlistRecord) {
    try {
      const [hypercert, metadata] = await Promise.all([
        this.hypercertsService.getHypercert({
          where: { hypercert_id: { eq: allowlistRecord.hypercert_id } },
        }),
        this.hypercertsService.getHypercertMetadata({
          hypercert_id: allowlistRecord.hypercert_id,
        }),
      ]);
      if (!hypercert) {
        return null;
      }
      return {
        ...hypercert,
        metadata: metadata || null,
      };
    } catch (e) {
      console.error(
        `[AllowlistRecordResolver::hypercert] Error fetching hypercert: ${(e as Error).message}`,
      );
      return null;
    }
  }
}

export { AllowlistRecordResolver };
