import { Field, ID, ObjectType } from "type-graphql";
import { GraphQLJSON } from "graphql-scalars";
import type { Json } from "../../../types/supabaseCaching.js";
import { Hypercert } from "./hypercertTypeDefs.js";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";

@ObjectType()
class Attestation extends BasicTypeDef {
  @Field(() => ID, { nullable: true })
  supported_schemas_id?: string;
  @Field(() => ID, { nullable: true })
  uid?: string;

  @Field(() => EthBigInt, { nullable: true })
  creation_block_number?: bigint | number | string;
  @Field(() => EthBigInt, { nullable: true })
  creation_block_timestamp?: bigint | number | string;
  @Field(() => EthBigInt, { nullable: true })
  last_update_block_number?: bigint | number | string;
  @Field(() => EthBigInt, { nullable: true })
  last_update_block_timestamp?: bigint | number | string;

  @Field({ nullable: true })
  attester?: string;
  @Field({ nullable: true })
  recipient?: string;
  @Field({ nullable: true })
  resolver?: string;
  @Field({ nullable: true })
  schema?: string;
  @Field(() => GraphQLJSON, { nullable: true })
  data?: Json;

  @Field(() => [Hypercert], { nullable: true })
  hypercerts?: Hypercert[];
}

export { Attestation };
