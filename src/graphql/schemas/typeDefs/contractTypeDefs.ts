import { Field, ObjectType } from "type-graphql";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";
import { DataResponse } from "../../../lib/graphql/DataResponse.js";

@ObjectType({ description: "Pointer to a contract deployed on a chain" })
export class Contract extends BasicTypeDef {
  @Field(() => EthBigInt, {
    nullable: true,
    description: "The ID of the chain on which the contract is deployed",
  })
  chain_id?: bigint | number | string;
  @Field({ nullable: true, description: "The address of the contract" })
  contract_address?: string;
  @Field(() => EthBigInt, {
    nullable: true,
    description: "The block number at which the contract was deployed",
  })
  start_block?: bigint | number | null;
}

@ObjectType()
export class GetContractsResponse extends DataResponse(Contract) {}
