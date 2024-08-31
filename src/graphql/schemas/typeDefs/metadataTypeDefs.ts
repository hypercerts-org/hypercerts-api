import { Field, ObjectType } from "type-graphql";
import type { Json } from "../../../types/supabaseData.js";
import { GraphQLJSON } from "graphql-scalars";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";

@ObjectType({
  description:
    "Metadata related to the hypercert describing work, impact, timeframes and other relevant information",
  simpleResolvers: true,
})
class Metadata extends BasicTypeDef {
  @Field({ nullable: true, description: "Name of the hypercert" })
  name?: string;
  @Field({ nullable: true, description: "Description of the hypercert" })
  description?: string;
  @Field({
    nullable: true,
    description: "Base64 encoded representation of the image of the hypercert",
  })
  image?: string;
  @Field({ nullable: true, description: "URI of the hypercert metadata" })
  uri?: string;
  @Field({
    nullable: true,
    description: "URI of the allow list for the hypercert",
  })
  allow_list_uri?: string;
  @Field(() => [String], {
    nullable: true,
    description: "Contributors to the work and impact of the hypercert",
  })
  contributors?: string[];
  @Field({
    nullable: true,
    description: "References additional information related to the hypercert",
  })
  external_url?: string;
  @Field(() => [String], {
    nullable: true,
    description: "Impact scope of the hypercert",
  })
  impact_scope?: string[];
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Timestamp of the start of the impact (in seconds)",
  })
  impact_timeframe_from?: bigint | number;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Timestamp of the end of the impact (in seconds)",
  })
  impact_timeframe_to?: bigint | number;
  @Field(() => GraphQLJSON, {
    nullable: true,
    description: "Properties of the hypercert",
  })
  properties?: Json;
  @Field(() => [String], {
    nullable: true,
    description: "Rights of the hypercert",
  })
  rights?: string[];
  @Field(() => [String], {
    nullable: true,
    description: "Work scope of the hypercert",
  })
  work_scope?: string[];
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Timestamp of the start of the work (in seconds)",
  })
  work_timeframe_from?: bigint | number;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "Timestamp of the end of the work (in seconds)",
  })
  work_timeframe_to?: bigint | number;
}

export { Metadata };
