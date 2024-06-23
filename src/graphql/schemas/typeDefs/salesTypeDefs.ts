import { Field, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./basicTypeDef.js";
import { GraphQLBigInt } from "graphql-scalars";

@ObjectType()
class Sale extends BasicTypeDef {
  @Field()
  buyer?: string;
  @Field()
  seller?: string;
  @Field(() => GraphQLBigInt, { nullable: true })
  strategy_id?: string;
  @Field()
  currency?: string;
  @Field()
  collection?: string;
  @Field(() => [String], {
    nullable: true,
    description: "Token ids of the sold fractions",
  })
  item_ids?: bigint[];
  @Field()
  hypercert_id?: string;
  @Field(() => [String], {
    nullable: true,
    description: "Number of units sold for each fraction",
  })
  amounts?: bigint[];
  @Field()
  transaction_hash?: string;

  @Field((_) => GraphQLBigInt, { nullable: true })
  creation_block_number?: bigint | number | string;
  @Field((_) => GraphQLBigInt, { nullable: true })
  creation_block_timestamp?: bigint | number | string;
}

export { Sale };
