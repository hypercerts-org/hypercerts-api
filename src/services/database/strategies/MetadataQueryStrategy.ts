import { Kysely } from "kysely";
import { GetMetadataArgs } from "../../../graphql/schemas/args/metadataArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { MetadataSelect } from "../entities/MetadataEntityService.js";
import { QueryStrategy } from "./QueryStrategy.js";

const supportedColumns = [
  "metadata.id",
  "metadata.name",
  "metadata.description",
  "metadata.external_url",
  "metadata.work_scope",
  "metadata.work_timeframe_from",
  "metadata.work_timeframe_to",
  "metadata.impact_scope",
  "metadata.impact_timeframe_from",
  "metadata.impact_timeframe_to",
  "metadata.contributors",
  "metadata.rights",
  "metadata.uri",
  "metadata.properties",
  "metadata.allow_list_uri",
  "metadata.parsed",
] as const;

type MetadataSelection = Omit<MetadataSelect, "image">;

/**
 * Strategy for building database queries for metadata records.
 * Implements query logic for metadata retrieval and counting.
 *
 * This strategy handles:
 * - Basic metadata queries without filtering
 * - Selective column fetching (excludes large fields like 'image' by default)
 *
 * The strategy is designed to work with the metadata table schema:
 * - id: Unique identifier
 * - name: Hypercert name
 * - description: Detailed description
 * - work_scope, impact_scope: Scope definitions
 * - timeframe fields: Work and impact time ranges
 * - uri: IPFS or other content identifier
 * - properties: Additional custom properties
 *
 * Note: This strategy provides direct table access only. Any relationship
 * filtering (e.g., hypercert relationships) should be handled at the service level.
 */
export class MetadataQueryStrategy extends QueryStrategy<
  CachingDatabase,
  "metadata",
  GetMetadataArgs,
  MetadataSelection
> {
  protected readonly tableName = "metadata" as const;

  /**
   * Builds a query to retrieve metadata records.
   * Returns all records with supported columns.
   *
   * @param db - Kysely database instance
   * @returns A query builder for retrieving metadata data
   *
   * @example
   * ```typescript
   * buildDataQuery(db);
   * // SELECT supported_columns FROM metadata
   * ```
   */
  buildDataQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).select(supportedColumns);
  }

  /**
   * Builds a query to count metadata records.
   * Returns total count of all records.
   *
   * @param db - Kysely database instance
   * @returns A query builder for counting metadata records
   *
   * @example
   * ```typescript
   * buildCountQuery(db);
   * // SELECT COUNT(*) as count FROM metadata
   * ```
   */
  buildCountQuery(db: Kysely<CachingDatabase>) {
    return db.selectFrom(this.tableName).select((eb) => {
      return eb.fn.countAll().as("count");
    });
  }
}
