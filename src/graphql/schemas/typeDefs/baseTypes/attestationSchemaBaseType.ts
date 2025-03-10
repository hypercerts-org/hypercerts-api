import { Field, ID, ObjectType } from "type-graphql";
import { EthBigInt } from "../../../scalars/ethBigInt.js";
import { BasicTypeDef } from "./basicTypeDef.js";

/**
 * Base GraphQL object type for EAS (Ethereum Attestation Service) schemas.
 * Provides the core fields that define an attestation schema.
 *
 * This type provides:
 * - Basic identification fields (id from BasicTypeDef)
 * - Schema-specific fields (chain_id, uid, schema, resolver, revocable)
 *
 * Used as a base class for more specific schema types that may add additional fields.
 *
 * @extends {BasicTypeDef}
 */
@ObjectType({
  description: "Supported EAS attestation schemas and their related records",
})
class AttestationSchemaBaseType extends BasicTypeDef {
  /**
   * Chain ID where this schema is supported.
   * Can be represented as a bigint, number, or string.
   */
  @Field(() => EthBigInt, {
    description:
      "Chain ID of the chains where the attestation schema is supported",
  })
  chain_id?: bigint | number | string;

  /**
   * Unique identifier for the schema on EAS.
   * This is different from the database id field.
   */
  @Field(() => ID, {
    description: "Unique identifier for the attestation schema",
  })
  uid?: string;

  /**
   * Address of the resolver contract for this schema.
   * The resolver contract handles the validation and processing of attestations.
   */
  @Field({
    description: "Address of the resolver contract for the attestation schema",
  })
  resolver?: string;

  /**
   * Whether attestations using this schema can be revoked.
   * If true, attesters can revoke their attestations after creation.
   */
  @Field({
    description: "Whether the attestation schema is revocable",
  })
  revocable?: boolean;

  /**
   * String representation of the schema definition.
   * Defines the structure and types of data that can be attested.
   */
  @Field({
    description: "String representation of the attestation schema",
  })
  schema?: string;
}

export { AttestationSchemaBaseType };
