import { Field, ID, ObjectType } from "type-graphql";
import { GraphQLJSON } from "graphql-scalars";
import type { Json } from "../../../types/supabaseCaching.js";
import { Hypercert } from "./hypercertTypeDefs.js";
import { BasicTypeDef } from "./basicTypeDef.js";
import {EthBigInt} from "../../scalars/ethBigInt.js";

@ObjectType()
class Attestation extends BasicTypeDef {
  @Field((_) => ID, { nullable: true })
  supported_schemas_id?: string;
  @Field((_) => ID, { nullable: true })
  uid?: string;

  @Field((_) => EthBigInt, { nullable: true })
  creation_block_number?: bigint | number | string;
  @Field((_) => EthBigInt, { nullable: true })
  creation_block_timestamp?: bigint | number | string;
  @Field((_) => EthBigInt, { nullable: true })
  last_update_block_number?: bigint | number | string;
  @Field((_) => EthBigInt, { nullable: true })
  last_update_block_timestamp?: bigint | number | string;

  @Field({ nullable: true })
  attester?: string;
  @Field({ nullable: true })
  recipient?: string;
  @Field({ nullable: true })
  resolver?: string;
  @Field({ nullable: true })
  schema?: string;
  @Field((_) => GraphQLJSON, { nullable: true })
  data?: Json;

  @Field((_) => [Hypercert], { nullable: true })
  hypercerts?: Hypercert[];
}

export { Attestation };
