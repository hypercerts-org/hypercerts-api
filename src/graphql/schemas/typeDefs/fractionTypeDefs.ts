import { Field, ID, ObjectType } from "type-graphql";
import { GraphQLBigInt } from "graphql-scalars";
import { EthBigInt } from "../../scalars/ethBigInt.js";
import { BasicTypeDef } from "./basicTypeDef.js";
import GetOrdersResponse from "../resolvers/orderResolver.js";
import {Metadata} from "./metadataTypeDefs.js";

@ObjectType()
class Fraction extends BasicTypeDef {
  @Field({ nullable: true })
  owner_address?: string;
  @Field((_) => EthBigInt, { nullable: true })
  units?: bigint | number;
  @Field((_) => GraphQLBigInt, { nullable: true })
  creation_block_timestamp?: bigint | number;
  @Field((_) => GraphQLBigInt, { nullable: true })
  last_block_update_timestamp?: bigint | number;
  @Field((_) => ID, { nullable: true })
  hypercert_id?: string;
  @Field((_) => String, { nullable: true })
  claims_id?: string;

  // Resolved fields
  @Field(() => GetOrdersResponse, { nullable: true })
  orders?: GetOrdersResponse;
  @Field(() => Metadata, { nullable: true })
  metadata?: Metadata;
}

export { Fraction };
