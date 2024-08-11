import { Field, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";
import { HypercertBaseType } from "./baseTypes/hypercertBaseType.js";

@ObjectType()
class Order extends BasicTypeDef {
  @Field()
  hypercert_id?: string;
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
  @Field(() => EthBigInt)
  chainId?: bigint | number | string;
  @Field()
  subsetNonce?: number;
  @Field(() => [String])
  itemIds?: string[];
  @Field(() => [Number])
  amounts?: number[];
  @Field()
  invalidated?: boolean;
  @Field(() => [String], { nullable: true })
  validator_codes?: string[];

  @Field()
  pricePerPercentInUSD?: string;
  @Field()
  pricePerPercentInToken?: string;

  @Field(() => HypercertBaseType, {
    nullable: true,
    description: "The hypercert associated with this order",
  })
  hypercert?: HypercertBaseType;
}

export { Order };
