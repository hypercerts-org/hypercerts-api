import { Field, ObjectType } from "type-graphql";
import { GraphQLBigInt } from "graphql-scalars";
import { BasicTypeDef } from "./basicTypeDef.js";
import GetFractionsResponse from "../resolvers/fractionResolver.js";
import { Fraction } from "./fractionTypeDefs.js";

@ObjectType()
class Order extends BasicTypeDef {
  @Field()
  createdAt?: string;
  @Field()
  quoteType?: number;
  @Field()
  globalNonce?: string;
  @Field()
  orderNonce?: string;
  @Field()
  strategyId?: number;
  @Field()
  collectionType?: number;
  @Field()
  collection?: string;
  @Field()
  currency?: string;
  @Field()
  signer?: string;
  @Field()
  startTime?: number;
  @Field()
  endTime?: number;
  @Field()
  price?: string;
  @Field()
  signature?: string;
  @Field()
  additionalParameters?: string;
  @Field((_) => GraphQLBigInt)
  chainId?: bigint | number | string;
  @Field()
  subsetNonce?: number;
  @Field(() => [String])
  itemIds?: string[];
  @Field(() => [Number])
  amounts?: number[];
}

export { Order };