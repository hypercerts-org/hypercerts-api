import { Selectable } from "kysely";
import { injectable } from "tsyringe";
import { kyselyCaching } from "../../../client/kysely.js";
import { GetAttestationSchemasArgs } from "../../../graphql/schemas/args/attestationSchemaArgs.js";
import { CachingDatabase } from "../../../types/kyselySupabaseCaching.js";
import {
  createEntityService,
  type EntityService,
} from "./EntityServiceFactory.js";

/** Type representing a selected attestation schema record from the database */
export type AttestationSchemaSelect = Selectable<
  CachingDatabase["supported_schemas"]
>;

/**
 * Service class for managing attestation schema entities in the database.
 * Handles CRUD operations for EAS (Ethereum Attestation Service) schemas.
 *
 * This service provides methods to:
 * - Retrieve multiple attestation schemas with filtering and pagination
 * - Retrieve a single attestation schema by its criteria
 *
 * @injectable Marks the class as injectable for dependency injection with tsyringe
 */
@injectable()
export class AttestationSchemaService {
  private entityService: EntityService<
    CachingDatabase["supported_schemas"],
    GetAttestationSchemasArgs
  >;

  /**
   * Creates a new instance of AttestationSchemaService.
   * Initializes the underlying entity service for database operations.
   */
  constructor() {
    this.entityService = createEntityService<
      CachingDatabase,
      "supported_schemas",
      GetAttestationSchemasArgs
    >("supported_schemas", "AttestationSchemaEntityService", kyselyCaching);
  }

  /**
   * Retrieves multiple attestation schemas based on provided arguments.
   *
   * @param args - Query arguments for filtering and pagination
   * @returns A promise that resolves to an object containing:
   *          - data: Array of attestation schemas matching the query
   *          - count: Total number of matching schemas
   * @throws {Error} If the database query fails
   *
   * @example
   * ```typescript
   * const result = await service.getAttestationSchemas({
   *   where: { id: { eq: "schema-id" } }
   * });
   * console.log(result.data); // Array of matching schemas
   * console.log(result.count); // Total count
   * ```
   */
  async getAttestationSchemas(args: GetAttestationSchemasArgs) {
    return this.entityService.getMany(args);
  }

  /**
   * Retrieves a single attestation schema based on provided arguments.
   *
   * @param args - Query arguments for filtering
   * @returns A promise that resolves to:
   *          - The matching attestation schema if found
   *          - undefined if no schema matches the criteria
   * @throws {Error} If the database query fails
   *
   * @example
   * ```typescript
   * const schema = await service.getAttestationSchema({
   *   where: { id: { eq: "schema-id" } }
   * });
   * if (schema) {
   *   console.log("Found schema:", schema);
   * }
   * ```
   */
  async getAttestationSchema(args: GetAttestationSchemasArgs) {
    return this.entityService.getSingle(args);
  }
}
