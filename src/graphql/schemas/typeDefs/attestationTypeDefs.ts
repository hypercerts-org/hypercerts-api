import { Field, ID, ObjectType } from "type-graphql";
import { GraphQLJSON } from "graphql-scalars";
import type { Json } from "../../../types/supabaseCaching.js";
import { Hypercert } from "./hypercertTypeDefs.js";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";

@ObjectType({ description: "Attestation on the Ethereum Attestation Service" })
class Attestation extends BasicTypeDef {
  @Field(() => ID, {
    nullable: true,
    description: "ID referencing the supported EAS schema in the database",
  })
  supported_schemas_id?: string;
  @Field(() => ID, {
    nullable: true,
    description: "Unique identifier for the attestation on EAS",
  })
  uid?: string;

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
  @Field({
    nullable: true,
    description:
      "Unique identifier of the EAS schema used to create the attestation",
  })
  schema?: string;
  @Field(() => GraphQLJSON, {
    nullable: true,
    description: "Encoded data of the attestation",
  })
  data?: Json;

  @Field(() => [Hypercert], {
    nullable: true,
    description: "List of hypercerts related to the attestation",
  })
  hypercerts?: Hypercert[];
}

export { Attestation };
