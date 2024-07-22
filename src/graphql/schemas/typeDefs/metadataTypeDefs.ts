import { Field, ObjectType } from "type-graphql";
import type { Json } from "../../../types/supabaseData.js";
import { GraphQLJSON } from "graphql-scalars";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";

@ObjectType()
class Metadata extends BasicTypeDef {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  image?: string;
  @Field({ nullable: true })
  uri?: string;
  @Field({ nullable: true })
  allow_list_uri?: string;
  @Field(() => [String], { nullable: true })
  contributors?: string[];
  @Field({ nullable: true })
  external_url?: string;
  @Field(() => [String], { nullable: true })
  impact_scope?: string[];
  @Field(() => EthBigInt, { nullable: true })
  impact_timeframe_from?: bigint | number;
  @Field(() => EthBigInt, { nullable: true })
  impact_timeframe_to?: bigint | number;
  @Field(() => GraphQLJSON, { nullable: true })
  properties?: Json;
  @Field(() => [String], { nullable: true })
  rights?: string[];
  @Field(() => [String], { nullable: true })
  work_scope?: string[];
  @Field(() => EthBigInt, { nullable: true })
  work_timeframe_from?: bigint | number;
  @Field(() => EthBigInt, { nullable: true })
  work_timeframe_to?: bigint | number;
}

export { Metadata };
