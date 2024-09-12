import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import { Contract } from "../typeDefs/contractTypeDefs.js";
import {
  IdSearchOptions,
  BigIntSearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";

@InputType()
export class BasicContractWhereInput implements WhereOptions<Contract> {
  @Field(() => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  contract_address?: StringSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  chain_id?: BigIntSearchOptions;
}
