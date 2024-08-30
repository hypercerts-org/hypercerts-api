import { ArgsType, Field } from "type-graphql";
import { BasicContractWhereInput, ContractFetchInput } from "../inputs/contractInput.js";
import { withPagination } from "./baseArgs.js";

@ArgsType()
export class ContractArgs {
  @Field({ nullable: true })
  where?: BasicContractWhereInput;
  @Field({ nullable: true })
  sort?: ContractFetchInput;
}

@ArgsType()
export class GetContractsArgs extends withPagination(ContractArgs) {
}