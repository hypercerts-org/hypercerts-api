import { ArgsType } from "type-graphql";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";
const { WhereInput: ContractWhereInput, SortOptions: ContractSortOptions } =
  createEntityArgs("Contract", {
    ...WhereFieldDefinitions.Contract.fields,
  });

@ArgsType()
export class GetContractsArgs extends BaseQueryArgs(
  ContractWhereInput,
  ContractSortOptions,
) {}

export { ContractSortOptions, ContractWhereInput };
