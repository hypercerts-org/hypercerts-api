import { Field, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";

@ObjectType()
class Sale extends BasicTypeDef {
  @Field({ description: "The address of the buyer" })
  buyer?: string;
  @Field({ description: "The address of the seller" })
  seller?: string;
  @Field(() => EthBigInt, {
    nullable: true,
    description:
      "The ID of the strategy registered with the exchange contracts",
  })
  strategy_id?: bigint[] | number[] | string[];
  @Field({ description: "The address of the token accepted for this order" })
  currency?: string;
  @Field({
    description: "The address of the contract minting the tradable fractions",
  })
  collection?: string;
  @Field(() => [EthBigInt], {
    nullable: true,
    description: "Token ids of the sold fractions",
  })
  item_ids?: bigint[] | number[] | string[];
  @Field({
    description: "The ID of the hypercert token referenced in the order",
    nullable: true,
  })
  hypercert_id?: string;
  @Field(() => [EthBigInt], {
    nullable: true,
    description: "Number of units sold for each fraction",
  })
  amounts?: bigint[] | number[] | string[];
  @Field({ description: "The transactions hash of the sale" })
  transaction_hash?: string;

  @Field((_) => EthBigInt, {
    nullable: true,
    description: "The block number of the transaction creating the sale",
  })
  creation_block_number?: bigint | number | string;
  @Field((_) => EthBigInt, {
    nullable: true,
    description: "The timestamp of the block creating the sale",
  })
  creation_block_timestamp?: bigint | number | string;
}

export { Sale };
