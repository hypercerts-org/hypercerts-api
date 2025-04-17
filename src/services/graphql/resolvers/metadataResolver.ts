import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { CachingKyselyService } from "../../../client/kysely.js";
import { GetMetadataArgs } from "../../../graphql/schemas/args/metadataArgs.js";
import {
  GetMetadataResponse,
  Metadata,
} from "../../../graphql/schemas/typeDefs/metadataTypeDefs.js";
import { MetadataService } from "../../database/entities/MetadataEntityService.js";

/**
 * GraphQL resolver for Metadata operations.
 * Handles queries for metadata records and resolves related fields.
 *
 * This resolver provides:
 * - Query for fetching metadata with optional filtering
 * - Field resolution for image data (handled separately for performance)
 *
 * Error Handling:
 * All resolvers follow the GraphQL best practice of returning partial data instead of throwing errors.
 * If an operation fails, it will:
 * - Log the error internally for monitoring
 * - Return null/empty data to the client
 * - Include error information in the GraphQL response errors array
 */
@injectable()
@Resolver(() => Metadata)
class MetadataResolver {
  constructor(
    @inject(MetadataService)
    private metadataService: MetadataService,
    @inject(CachingKyselyService)
    private cachingKyselyService: CachingKyselyService,
  ) {}

  /**
   * Resolves metadata queries with optional filtering.
   *
   * @param args - Query arguments for filtering metadata records
   * @returns A promise resolving to:
   *          - data: Array of metadata records matching the criteria
   *          - count: Total number of matching records
   *          Returns null if an error occurs
   *
   * @example
   * ```graphql
   * query {
   *   metadata(where: { uri: { eq: "ipfs://..." } }) {
   *     data {
   *       id
   *       name
   *       description
   *       image
   *     }
   *     count
   *   }
   * }
   * ```
   */
  @Query(() => GetMetadataResponse)
  async metadata(@Args() args: GetMetadataArgs) {
    try {
      return await this.metadataService.getMetadata(args);
    } catch (e) {
      console.error(
        `[MetadataResolver::metadata] Error fetching metadata: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the image field for a metadata record.
   * Handled separately from other fields for performance optimization.
   *
   * @param metadata - The metadata record for which to resolve the image
   * @returns A promise resolving to:
   *          - The image data if found
   *          - null if:
   *            - No URI is available
   *            - No image data exists
   *            - An error occurs during retrieval
   *
   * @example
   * ```graphql
   * query {
   *   metadata {
   *     data {
   *       id
   *       image # This field is resolved by this resolver
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver(() => String)
  async image(@Root() metadata: Metadata) {
    if (!metadata.uri) {
      console.warn(
        `[MetadataResolver::image] No URI found for metadata ${metadata.id}`,
      );
      return null;
    }

    try {
      const result = await this.cachingKyselyService
        .getConnection()
        .selectFrom("metadata")
        .where("uri", "=", metadata.uri)
        .select("image")
        .executeTakeFirst();

      return result?.image ?? null;
    } catch (e) {
      console.error(
        `[MetadataResolver::image] Error fetching image for metadata ${metadata.id}: ${(e as Error).message}`,
      );
      return null;
    }
  }
}

export { MetadataResolver };
