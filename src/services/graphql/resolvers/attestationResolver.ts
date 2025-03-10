import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { getAddress, isAddress } from "viem";
import { z } from "zod";
import { GetAttestationsArgs } from "../../../graphql/schemas/args/attestationArgs.js";
import {
  Attestation,
  GetAttestationsResponse,
} from "../../../graphql/schemas/typeDefs/attestationTypeDefs.js";
import { AttestationService } from "../../database/entities/AttestationEntityService.js";
import { AttestationSchemaService } from "../../database/entities/AttestationSchemaEntityService.js";
import { HypercertsService } from "../../database/entities/HypercertsEntityService.js";
import { MetadataService } from "../../database/entities/MetadataEntityService.js";

/**
 * Schema for validating hypercert pointer data in attestations.
 * Ensures that the data contains valid chain_id, contract_address, and token_id fields.
 *
 * Validation rules:
 * - chain_id: Must be a valid bigint (string or number that can be converted to bigint)
 * - contract_address: Must be a valid Ethereum address
 * - token_id: Must be a valid bigint (string or number that can be converted to bigint)
 */
const HypercertPointer = z.object({
  chain_id: z
    .union([
      z.string().refine(
        (val) => {
          try {
            BigInt(val);
            return true;
          } catch {
            return false;
          }
        },
        { message: "chain_id must be a valid bigint" },
      ),
      z.number().int().transform(String),
    ])
    .transform((val) => BigInt(val)),
  contract_address: z
    .string()
    .refine(isAddress, { message: "Invalid contract address" }),
  token_id: z
    .union([
      z.string().refine(
        (val) => {
          try {
            BigInt(val);
            return true;
          } catch {
            return false;
          }
        },
        { message: "token_id must be a valid bigint" },
      ),
      z.number().int().transform(String),
    ])
    .transform((val) => BigInt(val)),
});

/**
 * GraphQL resolver for Attestation operations.
 * Handles queries for attestations and resolves related fields like hypercerts, schemas, and metadata.
 *
 * This resolver provides:
 * - Query for fetching attestations with optional filtering
 * - Field resolution for hypercert data associated with attestations
 * - Field resolution for EAS schema data
 * - Field resolution for metadata associated with the attested hypercert
 *
 * Error handling:
 * - Invalid attestation data returns null for related fields
 * - Database errors are propagated to the GraphQL layer
 * - Schema validation errors result in null hypercert IDs
 *
 * @injectable Marks the class as injectable for dependency injection with tsyringe
 * @resolver Marks the class as a GraphQL resolver for the Attestation type
 */
@injectable()
@Resolver(() => Attestation)
class AttestationResolver {
  /**
   * Creates a new instance of AttestationResolver.
   *
   * @param attestationService - Service for handling attestation operations
   * @param hypercertService - Service for handling hypercert operations
   * @param attestationSchemaService - Service for handling attestation schema operations
   * @param metadataService - Service for handling metadata operations
   */
  constructor(
    @inject(AttestationService)
    private attestationService: AttestationService,
    @inject(HypercertsService)
    private hypercertService: HypercertsService,
    @inject(AttestationSchemaService)
    private attestationSchemaService: AttestationSchemaService,
    @inject(MetadataService)
    private metadataService: MetadataService,
  ) {}

  /**
   * Queries attestations based on provided arguments.
   * Returns both the matching attestations and a total count.
   *
   * @param args - Query arguments for filtering attestations
   * @returns A promise that resolves to an object containing:
   *          - data: Array of attestations matching the query
   *          - count: Total number of matching attestations
   *
   * Filtering supports:
   * - Attestation fields (id, supported_schemas_id, etc.)
   * - Related EAS schema fields
   * - Related hypercert fields
   *
   * @example
   * Query with filtering:
   * ```graphql
   * query {
   *   attestations(
   *     where: {
   *       id: { eq: "123" },
   *       eas_schema: { id: { eq: "schema-id" } },
   *       hypercert: { id: { eq: "hypercert-id" } }
   *     }
   *   ) {
   *     data {
   *       id
   *       data
   *       supported_schemas_id
   *     }
   *     count
   *   }
   * }
   * ```
   */
  @Query(() => GetAttestationsResponse)
  async attestations(@Args() args: GetAttestationsArgs) {
    try {
      return await this.attestationService.getAttestations(args);
    } catch (e) {
      console.error(
        `[AttestationResolver::attestations] Error fetching attestations: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the hypercert field for an attestation.
   * This field resolver is called automatically when the hypercert field is requested in a query.
   * It extracts the hypercert ID from the attestation data and fetches the corresponding hypercert.
   *
   * @param attestation - The attestation for which to resolve the hypercert
   * @returns A promise that resolves to:
   *          - The associated hypercert data if found
   *          - undefined if:
   *            - attestation.data is null/undefined
   *            - hypercert ID cannot be extracted from data
   *            - no matching hypercert is found
   *
   * @example
   * Query with hypercert field:
   * ```graphql
   * query {
   *   attestations {
   *     data {
   *       id
   *       hypercert {
   *         id
   *         name
   *         # Additional hypercert fields...
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver()
  async hypercert(@Root() attestation: Attestation) {
    try {
      if (!attestation.data) return null;

      const attested_hypercert_id = this.getHypercertIdFromAttestationData(
        attestation.data,
      );

      if (!attested_hypercert_id) return null;

      return await this.hypercertService.getHypercert({
        where: {
          hypercert_id: { eq: attested_hypercert_id },
        },
      });
    } catch (e) {
      console.error(
        `[AttestationResolver::hypercert] Error fetching hypercert: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the EAS schema field for an attestation.
   * This field resolver is called automatically when the eas_schema field is requested in a query.
   *
   * @param attestation - The attestation for which to resolve the schema
   * @returns A promise that resolves to:
   *          - The associated schema data if found
   *          - undefined if no schema ID is present
   *
   * @example
   * Query with schema field:
   * ```graphql
   * query {
   *   attestations {
   *     data {
   *       id
   *       eas_schema {
   *         id
   *         name
   *         schema
   *         description
   *         # Additional schema fields...
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver()
  async eas_schema(@Root() attestation: Attestation) {
    try {
      if (!attestation.supported_schemas_id) return null;

      return await this.attestationSchemaService.getAttestationSchema({
        where: {
          id: { eq: attestation.supported_schemas_id },
        },
      });
    } catch (e) {
      console.error(
        `[AttestationResolver::eas_schema] Error fetching eas_schema: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the metadata field for an attestation.
   * This field resolver is called automatically when the metadata field is requested in a query.
   * It extracts the hypercert ID from the attestation data and fetches the corresponding metadata.
   *
   * @param attestation - The attestation for which to resolve the metadata
   * @returns A promise that resolves to:
   *          - The associated metadata if found
   *          - undefined if:
   *            - attestation.data is null/undefined
   *            - hypercert ID cannot be extracted from data
   *            - no matching metadata is found
   * @throws {Error} If the metadata service query fails
   *
   * @example
   * Query with metadata field:
   * ```graphql
   * query {
   *   attestations {
   *     data {
   *       id
   *       metadata {
   *         id
   *         name
   *         description
   *         # Additional metadata fields...
   *       }
   *     }
   *   }
   * }
   * ```
   */
  //TODO: Should this be part of the resolved hypercert data?
  @FieldResolver()
  async metadata(@Root() attestation: Attestation) {
    try {
      if (!attestation.data) return null;

      const attested_hypercert_id = this.getHypercertIdFromAttestationData(
        attestation.data,
      );

      if (!attested_hypercert_id) return null;

      return await this.hypercertService.getHypercertMetadata({
        hypercert_id: attested_hypercert_id,
      });
    } catch (e) {
      console.error(
        `[AttestationResolver::metadata] Error fetching metadata: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Extracts and formats the hypercert ID from attestation data.
   * The hypercert ID is constructed from chain_id, contract_address, and token_id.
   *
   * @param attestationData - The data field from an attestation
   * @returns A formatted hypercert ID string or undefined if:
   *          - data is null/undefined
   *          - data fails schema validation:
   *            - chain_id is not a valid bigint
   *            - contract_address is not a valid Ethereum address
   *            - token_id is not a valid bigint
   *
   * @example
   * Format: "{chain_id}-{contract_address}-{token_id}"
   * Result: "1-0x1234...5678-123"
   *
   * Invalid examples:
   * ```typescript
   * getHypercertIdFromAttestationData({ chain_id: "not_a_number" }) // returns undefined
   * getHypercertIdFromAttestationData({ chain_id: "1", contract_address: "invalid" }) // returns undefined
   * getHypercertIdFromAttestationData(null) // returns undefined
   * ```
   */
  getHypercertIdFromAttestationData(attestationData: unknown): string | null {
    try {
      if (!attestationData) return null;

      const parseResult = HypercertPointer.safeParse(attestationData);

      if (!parseResult.success) return null;

      const { chain_id, contract_address, token_id } = parseResult.data;
      return `${chain_id.toString()}-${getAddress(contract_address)}-${token_id.toString()}`;
    } catch (e) {
      console.error(
        `[AttestationResolver::getHypercertIdFromAttestationData] Error parsing hypercert ID: ${(e as Error).message}`,
      );
      return null;
    }
  }
}

export { AttestationResolver };
