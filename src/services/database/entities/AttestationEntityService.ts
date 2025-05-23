import { Selectable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import { GetAttestationsArgs } from "../../../graphql/schemas/args/attestationArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import { Json } from "../../../types/supabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

export type AttestationSelect = Selectable<CachingDatabase["attestations"]>;

/**
 * Service for managing attestation entities in the database.
 * Handles CRUD operations for attestations, including data parsing and validation.
 *
 * This service:
 * - Provides methods for retrieving single or multiple attestations
 * - Handles parsing of attestation data, particularly bigint conversions
 * - Uses an EntityService for database operations
 * - Supports filtering by attestation fields and related entities
 *
 * @injectable Marks the class as injectable for dependency injection
 */
@injectable()
export class AttestationService {
  private entityService: EntityService<
    CachingDatabase["attestations"],
    GetAttestationsArgs
  >;

  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      "attestations",
      GetAttestationsArgs
    >("attestations", "AttestationEntityService", kyselyCaching);
  }

  /**
   * Retrieves multiple attestations based on provided arguments.
   * Handles filtering and parsing of attestation data.
   *
   * @param args - Query arguments for filtering attestations
   * @returns Promise resolving to:
   *          - data: Array of attestations with parsed data
   *          - count: Total number of matching attestations
   * @throws {Error} If the database query fails
   *
   * @example
   * ```typescript
   * // Get attestations by ID
   * const result = await attestationService.getAttestations({
   *   where: { id: { eq: "123" } }
   * });
   *
   * // Get attestations by related schema
   * const result = await attestationService.getAttestations({
   *   where: { eas_schema: { id: { eq: "schema-id" } } }
   * });
   * ```
   */
  async getAttestations(args: GetAttestationsArgs) {
    const respone = await this.entityService.getMany(args);
    return {
      ...respone,
      data: respone.data.map(({ data, ...rest }) => ({
        ...rest,
        data: this.parseAttestation(data),
      })),
    };
  }

  /**
   * Retrieves a single attestation based on provided arguments.
   *
   * @param args - Query arguments for filtering attestations
   * @returns Promise resolving to:
   *          - The found attestation if it exists
   *          - undefined if no attestation matches the query
   * @throws {Error} If the database query fails
   *
   * @example
   * ```typescript
   * const attestation = await attestationService.getAttestation({
   *   where: { id: { eq: "123" } }
   * });
   * ```
   */
  async getAttestation(args: GetAttestationsArgs) {
    return await this.entityService.getSingle(args);
  }

  /**
   * Parses attestation data, converting bigint values to strings.
   * This is necessary because GraphQL cannot handle bigint values directly.
   *
   * @param data - Raw attestation data from the database
   * @returns Parsed data with bigint values converted to strings
   *
   * @example
   * ```typescript
   * const parsed = attestationService.parseAttestation({
   *   token_id: 123456789n,
   *   other_field: "value"
   * });
   * // parsed = { token_id: "123456789", other_field: "value" }
   * ```
   */
  parseAttestation(data: Json) {
    // TODO cleaner handling of bigints in created attestations
    if (
      typeof data === "object" &&
      data !== null &&
      "token_id" in data &&
      data.token_id
    ) {
      const tokenId = Number(data.token_id);
      return { ...data, token_id: BigInt(tokenId).toString() };
    }
    return data;
  }
}
