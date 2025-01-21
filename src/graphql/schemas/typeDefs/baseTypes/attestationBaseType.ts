import { Field, ID, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./basicTypeDef.js";
import { EthBigInt } from "../../../scalars/ethBigInt.js";
import type { Json } from "../../../../types/supabaseCaching.js";
import { GraphQLJSON } from "graphql-scalars";

@ObjectType()
class AttestationBaseType extends BasicTypeDef {
  @Field(() => ID, {
    nullable: true,
    description: "Unique identifier for the attestation on EAS",
  })
  uid?: string;
  @Field({
    nullable: true,
    description:
      "Unique identifier of the EAS schema used to create the attestation",
  })
  schema_uid?: string;

  @Field(() => EthBigInt, {
    nullable: true,
    description: "Block number at which the attestation was created",
  })
  creation_block_number?: bigint | number | string;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Timestamp at which the attestation was created",
  })
  creation_block_timestamp?: bigint | number | string;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Block number at which the attestation was last updated",
  })
  last_update_block_number?: bigint | number | string;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Timestamp at which the attestation was last updated",
  })
  last_update_block_timestamp?: bigint | number | string;

  @Field({
    nullable: true,
    description: "Address of the creator of the attestation",
  })
  attester?: string;
  @Field({
    nullable: true,
    description: "Address of the recipient of the attestation",
  })
  recipient?: string;
  @Field({
    nullable: true,
    description: "Address of the resolver contract for the attestation",
  })
  resolver?: string;
  @Field(() => GraphQLJSON, {
    nullable: true,
    description: "Encoded data of the attestation",
  })
  data?: Json;
}

export { AttestationBaseType };
