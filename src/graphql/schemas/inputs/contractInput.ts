import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import { Contract } from "../typeDefs/contractTypeDefs.js";
import {
  IdSearchOptions,
  NumberSearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";
import type { OrderOptions } from "./orderOptions.js";
import { ContractSortOptions } from "./sortOptions.js";

@InputType()
export class BasicContractWhereInput implements WhereOptions<Contract> {
  @Field((_) => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions;
  @Field((_) => StringSearchOptions, { nullable: true })
  contract_address?: StringSearchOptions;
  @Field((_) => NumberSearchOptions, { nullable: true })
  chain_id?: NumberSearchOptions;
}

@InputType()
export class ContractFetchInput implements OrderOptions<Contract> {
  @Field((_) => ContractSortOptions, { nullable: true })
  by?: ContractSortOptions;
}
