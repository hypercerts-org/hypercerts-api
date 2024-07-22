import { Field, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";

@ObjectType({ description: "Pointer to a contract deployed on a chain" })
class Contract extends BasicTypeDef {
  @Field((_) => EthBigInt, {
    nullable: true,
    description: "The ID of the chain on which the contract is deployed",
  })
  chain_id?: bigint | number | string;
  @Field({ nullable: true, description: "The address of the contract" })
  contract_address?: string;
  @Field((_) => EthBigInt, {
    nullable: true,
    description: "The block number at which the contract was deployed",
  })
  start_block?: bigint | number | null;
}

export { Contract };
