import { Field, ObjectType } from "type-graphql";
import { DataResponse } from "../../../lib/graphql/DataResponse.js";
import { GetAttestationsResponse } from "./attestationTypeDefs.js";
import { AttestationSchemaBaseType } from "./baseTypes/attestationSchemaBaseType.js";

/**
 * GraphQL object type representing an EAS (Ethereum Attestation Service) schema.
 * Extends the base type with additional fields for related attestations.
 *
 * This type provides:
 * - All fields from AttestationSchemaBaseType (id, chain_id, schema, resolver, revocable, uid)
 * - Additional field for accessing related attestations
 *
 * @extends {AttestationSchemaBaseType}
 */
@ObjectType({
  description: "Supported EAS attestation schemas and their related records",
})
export class AttestationSchema extends AttestationSchemaBaseType {
  /**
   * Collection of attestations that use this schema.
   * Includes both the attestation records and a total count.
   */
  @Field(() => GetAttestationsResponse, {
    description: "List of attestations related to the attestation schema",
  })
  attestations?: GetAttestationsResponse | null;
}

/**
 * GraphQL response type for attestation schema queries.
 * Wraps an array of AttestationSchema objects with pagination information.
 *
 * This type provides:
 * - data: Array of attestation schemas
 * - count: Total number of schemas matching the query
 */
@ObjectType()
export class GetAttestationsSchemaResponse extends DataResponse(
  AttestationSchema,
) {}
