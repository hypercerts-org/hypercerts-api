import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { GetAttestationSchemasArgs } from "../../../graphql/schemas/args/attestationSchemaArgs.js";
import {
  AttestationSchema,
  GetAttestationsSchemaResponse,
} from "../../../graphql/schemas/typeDefs/attestationSchemaTypeDefs.js";
import { GetAttestationsResponse } from "../../../graphql/schemas/typeDefs/attestationTypeDefs.js";
import { AttestationService } from "../../../services/database/entities/AttestationEntityService.js";
import { AttestationSchemaService } from "../../../services/database/entities/AttestationSchemaEntityService.js";

/**
 * GraphQL resolver for AttestationSchema operations.
 * Handles queries for attestation schemas and resolves related fields.
 *
 * This resolver provides:
 * - Query for fetching attestation schemas with optional filtering
 * - Field resolution for attestations associated with a schema
 *
 * @injectable Marks the class as injectable for dependency injection with tsyringe
 * @resolver Marks the class as a GraphQL resolver for the AttestationSchema type
 */
@injectable()
@Resolver(() => AttestationSchema)
class AttestationSchemaResolver {
  /**
   * Creates a new instance of AttestationSchemaResolver.
   *
   * @param attestationSchemaService - Service for handling attestation schema operations
   * @param attestationService - Service for handling attestation operations
   */
  constructor(
    @inject(AttestationSchemaService)
    private attestationSchemaService: AttestationSchemaService,
    @inject(AttestationService)
    private attestationService: AttestationService,
  ) {}

  /**
   * Queries attestation schemas based on provided arguments.
   * Returns both the matching schemas and a total count.
   *
   * @param args - Query arguments for filtering schemas
   * @returns A promise that resolves to an object containing:
   *          - data: Array of attestation schemas matching the query
   *          - count: Total number of matching schemas
   *
   * @example
   * Query with filtering:
   * ```graphql
   * query {
   *   attestationSchemas(
   *     where: {
   *       id: { eq: "schema-id" },
   *       revocable: { eq: true }
   *     }
   *   ) {
   *     data {
   *       id
   *       chain_id
   *       schema
   *       resolver
   *       revocable
   *     }
   *     count
   *   }
   * }
   * ```
   */
  @Query(() => GetAttestationsSchemaResponse)
  async attestationSchemas(@Args() args: GetAttestationSchemasArgs) {
    try {
      return await this.attestationSchemaService.getAttestationSchemas(args);
    } catch (e) {
      console.error(
        `[AttestationSchemaResolver::attestationSchemas] Error fetching attestation schemas: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the attestations field for an attestation schema.
   * This field resolver is called automatically when the attestations field is requested in a query.
   *
   * @param schema - The schema for which to resolve attestations
   * @returns A promise that resolves to an object containing:
   *          - data: Array of attestations using this schema
   *          - count: Total number of attestations using this schema
   * @throws {Error} If the attestation service query fails
   *
   * @example
   * Query with attestations field:
   * ```graphql
   * query {
   *   attestationSchemas {
   *     data {
   *       id
   *       schema
   *       attestations {
   *         data {
   *           id
   *           data
   *           attester
   *           recipient
   *         }
   *         count
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver(() => GetAttestationsResponse, { nullable: true })
  async attestations(@Root() schema: Partial<AttestationSchema>) {
    try {
      return await this.attestationService.getAttestations({
        where: { supported_schemas_id: { eq: schema.id } },
      });
    } catch (e) {
      console.error(
        `[AttestationSchemaResolver::attestations] Error fetching attestations: ${(e as Error).message}`,
      );
      return null;
    }
  }
}

export { AttestationSchemaResolver };
