import { Field, ID, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";

@ObjectType()
class HypercertBaseType extends BasicTypeDef {
  @Field(() => ID, {
    nullable: true,
    description: "The UUID of the contract as stored in the database",
  })
  contracts_id?: string;
  @Field(() => ID, {
    nullable: true,
    description:
      "Concatenation of [chainID]-[contractAddress]-[tokenID] to discern hypercerts across chains",
  })
  hypercert_id?: string;
  @Field({
    nullable: true,
    description: "The address of the creator of the hypercert",
  })
  creator_address?: string;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "The token ID of the hypercert",
  })
  token_id?: bigint | number;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "The total units held by the hypercert",
  })
  units?: bigint | number;
  @Field({
    nullable: true,
    description: "References the metadata for this claim",
  })
  uri?: string;

  @Field(() => EthBigInt, { nullable: true })
  creation_block_number?: bigint | number | string;
  @Field(() => EthBigInt, { nullable: true })
  creation_block_timestamp?: bigint | number | string;
  @Field(() => EthBigInt, { nullable: true })
  last_update_block_number?: bigint | number | string;
  @Field(() => EthBigInt, { nullable: true })
  last_update_block_timestamp?: bigint | number | string;
}

export { HypercertBaseType };
