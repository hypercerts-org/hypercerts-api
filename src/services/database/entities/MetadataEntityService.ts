import { Selectable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import { GetMetadataArgs } from "../../../graphql/schemas/args/metadataArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

export type MetadataSelect = Selectable<CachingDatabase["metadata"]>;

/**
 * Service for handling metadata operations in the system.
 * Provides methods for retrieving metadata records with support for filtering and relationships.
 *
 * Metadata represents descriptive information about hypercerts, including:
 * - Basic information (name, description)
 * - Work and impact timeframes
 * - Contributors and rights
 * - External references (URLs, URIs)
 * - Custom properties
 *
 * This service uses an EntityService for database operations, providing:
 * - Consistent error handling
 * - Type safety through Kysely
 * - Caching support
 */
@injectable()
export class MetadataService {
  private entityService: EntityService<
    CachingDatabase["metadata"],
    GetMetadataArgs
  >;

  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      "metadata",
      GetMetadataArgs
    >("metadata", "MetadataEntityService", kyselyCaching);
  }

  /**
   * Retrieves multiple metadata records based on provided arguments.
   *
   * @param args - Query arguments for filtering metadata records
   * @returns A promise resolving to:
   *          - data: Array of metadata records matching the criteria
   *          - count: Total number of matching records
   *
   * @example
   * ```typescript
   * const result = await metadataService.getMetadata({
   *   where: {
   *     hypercerts: {
   *       id: { eq: "some-hypercert-id" }
   *     }
   *   }
   * });
   * ```
   */
  async getMetadata(args: GetMetadataArgs) {
    return this.entityService.getMany(args);
  }

  /**
   * Retrieves a single metadata record based on provided arguments.
   * Useful when you expect exactly one matching record.
   *
   * @param args - Query arguments for filtering metadata records
   * @returns A promise resolving to:
   *          - The matching metadata record if found
   *          - undefined if no matching record exists
   *
   * @example
   * ```typescript
   * const metadata = await metadataService.getMetadataSingle({
   *   where: {
   *     uri: { eq: "ipfs://..." }
   *   }
   * });
   * ```
   */
  async getMetadataSingle(args: GetMetadataArgs) {
    return this.entityService.getSingle(args);
  }
}
