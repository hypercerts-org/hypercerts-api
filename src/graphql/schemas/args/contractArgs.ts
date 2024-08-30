import { ArgsType, InputType, Field } from "type-graphql";
import { BasicContractWhereInput } from "../inputs/contractInput.js";
import { withPagination } from "./baseArgs.js";
import { ContractSortOptions } from "../inputs/sortOptions.js";
import { OrderOptions } from "../inputs/orderOptions.js";
import { Contract } from "../typeDefs/contractTypeDefs.js";

@InputType()
export class ContractWhereInput extends BasicContractWhereInput {}

@InputType()
export class ContractFetchInput implements OrderOptions<Contract> {
  @Field(() => ContractSortOptions, { nullable: true })
  by?: ContractSortOptions;
}

@ArgsType()
export class ContractArgs {
  @Field(() => ContractWhereInput, { nullable: true })
  where?: ContractWhereInput;
  @Field(() => ContractFetchInput, { nullable: true })
  sort?: ContractFetchInput;
}

@ArgsType()
export class GetContractsArgs extends withPagination(ContractArgs) {}
