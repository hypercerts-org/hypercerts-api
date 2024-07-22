import { Field, ObjectType } from "type-graphql";
import type { Json } from "../../../types/supabaseData.js";
import { GraphQLJSON } from "graphql-scalars";
import { BasicTypeDef } from "./basicTypeDef.js";
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
  @Field((_) => [String], { nullable: true })
  contributors?: string[];
  @Field({ nullable: true })
  external_url?: string;
  @Field((_) => [String], { nullable: true })
  impact_scope?: string[];
  @Field((_) => EthBigInt, { nullable: true })
  impact_timeframe_from?: bigint | number;
  @Field((_) => EthBigInt, { nullable: true })
  impact_timeframe_to?: bigint | number;
  @Field((_) => GraphQLJSON, { nullable: true })
  properties?: Json;
  @Field((_) => [String], { nullable: true })
  rights?: string[];
  @Field((_) => [String], { nullable: true })
  work_scope?: string[];
  @Field((_) => EthBigInt, { nullable: true })
  work_timeframe_from?: bigint | number;
  @Field((_) => EthBigInt, { nullable: true })
  work_timeframe_to?: bigint | number;
}

export { Metadata };
