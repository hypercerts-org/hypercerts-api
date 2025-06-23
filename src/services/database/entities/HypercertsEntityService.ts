import { Expression, Selectable, SqlBool } from "kysely";
import { inject, injectable } from "tsyringe";
import { CachingKyselyService, kyselyCaching } from "../../../client/kysely.js";
import { GetHypercertsArgs } from "../../../graphql/schemas/args/hypercertsArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

export type HypercertSelect = Selectable<CachingDatabase["claims"]>;

/**
 * Service for handling hypercert operations in the system.
 * Provides methods for retrieving hypercerts and their associated metadata.
 *
 * A hypercert represents a claim about work or impact, with:
 * - Unique identifier (hypercert_id)
 * - Associated metadata (work scope, timeframes, etc.)
 * - Contract information
 * - Fractions and ownership details
 *
 * This service uses an EntityService for database operations, providing:
 * - Consistent error handling
 * - Type safety through Kysely
 * - Caching support
 */
@injectable()
export class HypercertsService {
  private entityService: EntityService<
    CachingDatabase["claims_view"],
    GetHypercertsArgs
  >;

  constructor(
    @inject(CachingKyselyService)
    private cachingKyselyService: CachingKyselyService,
  ) {
    this.entityService = createEntityService<
      CachingDatabase,
      "claims_view",
      GetHypercertsArgs
    >("claims_view", "HypercertsEntityService", kyselyCaching);
  }

  /**
   * Retrieves multiple hypercerts based on provided arguments.
   *
   * @param args - Query arguments for filtering hypercerts
   * @returns A promise resolving to:
   *          - data: Array of hypercerts matching the criteria
   *          - count: Total number of matching records
   *
   * @example
   * ```typescript
   * const result = await hypercertsService.getHypercerts({
   *   where: {
   *     hypercert_id: { eq: "1-0x1234...5678-123" }
   *   }
   * });
   * ```
   */
  async getHypercerts(args: GetHypercertsArgs) {
    return this.entityService.getMany(args);
  }

  /**
   * Retrieves a single hypercert based on provided arguments.
   *
   * @param args - Query arguments for filtering hypercerts
   * @returns A promise resolving to:
   *          - The matching hypercert if found
   *          - null if no matching record exists
   *
   * @example
   * ```typescript
   * const hypercert = await hypercertsService.getHypercert({
   *   where: {
   *     hypercert_id: { eq: "1-0x1234...5678-123" }
   *   }
   * });
   * ```
   */
  async getHypercert(args: GetHypercertsArgs) {
    return this.entityService.getSingle(args);
  }

  /**
   * Retrieves metadata for a hypercert using either claims_id or hypercert_id.
   * Uses a left join to fetch metadata associated with the hypercert through the claims table.
   *
   * @param args - Object containing either claims_id or hypercert_id (or both)
   * @returns A promise resolving to:
   *          - The matching metadata record if found
   *          - null if:
   *            - No arguments provided
   *            - No matching record exists
   *
   * @example
   * ```typescript
   * // Using claims_id
   * const metadata1 = await hypercertsService.getHypercertMetadata({
   *   claims_id: "claim-123"
   * });
   *
   * // Using hypercert_id
   * const metadata2 = await hypercertsService.getHypercertMetadata({
   *   hypercert_id: "1-0x1234...5678-123"
   * });
   *
   * // Using both (will match if either condition is true)
   * const metadata3 = await hypercertsService.getHypercertMetadata({
   *   claims_id: "claim-123",
   *   hypercert_id: "1-0x1234...5678-123"
   * });
   * ```
   */
  async getHypercertMetadata(args: {
    claims_id?: string;
    hypercert_id?: string;
  }) {
    if (!args.claims_id && !args.hypercert_id) {
      console.warn(
        `[HypercertsService::getHypercertMetadata] No claims_id or hypercert_id provided`,
      );
      return null;
    }

    const query = this.cachingKyselyService
      .getConnection()
      .selectFrom("metadata")
      .leftJoin("claims", "metadata.uri", "claims.uri")
      .selectAll("metadata")
      .where((eb) => {
        const conditions: Expression<SqlBool>[] = [];

        if (args.claims_id) {
          conditions.push(eb("claims.id", "=", args.claims_id));
        }

        if (args.hypercert_id) {
          conditions.push(eb("claims.hypercert_id", "=", args.hypercert_id));
        }

        return eb.or(conditions);
      });

    return await query.executeTakeFirst();
  }

  /**
   * Retrieves metadata for multiple hypercerts using arrays of claims_ids or hypercert_ids.
   * Uses a left join to fetch metadata associated with the hypercerts through the claims table.
   *
   * @param args - Object containing arrays of claims_ids or hypercert_ids (or both)
   * @returns A promise resolving to:
   *          - Array of metadata records if found
   *          - Empty array if:
   *            - No matching records exist
   *          - null if:
   *            - No arguments provided
   *            - No claims_ids or hypercert_ids provided
   *
   * @example
   * ```typescript
   * // Using claims_ids
   * const metadata1 = await hypercertsService.getHypercertMetadataSets({
   *   claims_ids: ["claim-123", "claim-456"]
   * });
   *
   * // Using hypercert_ids
   * const metadata2 = await hypercertsService.getHypercertMetadataSets({
   *   hypercert_ids: ["1-0x1234...5678-123", "1-0x1234...5678-456"]
   * });
   * ```
   */
  async getHypercertMetadataSets(args: {
    claims_ids?: string[];
    hypercert_ids?: string[];
  }) {
    if (!args.claims_ids?.length && !args.hypercert_ids?.length) {
      console.warn(
        `[HypercertsService::getHypercertMetadataSets] No claims_ids or hypercert_ids provided`,
      );
      return null;
    }

    const query = this.cachingKyselyService
      .getConnection()
      .selectFrom("metadata")
      .leftJoin("claims", "metadata.uri", "claims.uri")
      .selectAll("metadata")
      .where((eb) => {
        const conditions: Expression<SqlBool>[] = [];

        if (args.claims_ids?.length) {
          conditions.push(eb("claims.id", "in", args.claims_ids));
        }

        if (args.hypercert_ids?.length) {
          conditions.push(eb("claims.hypercert_id", "in", args.hypercert_ids));
        }

        return eb.or(conditions);
      });

    return await query.execute();
  }
}
