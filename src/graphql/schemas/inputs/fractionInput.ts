import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  IdSearchOptions,
  NumberSearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";
import { Fraction } from "../typeDefs/fractionTypeDefs.js";

@InputType()
export class BasicFractionWhereInput implements WhereOptions<Fraction> {
  @Field(() => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  hypercert_id?: StringSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  fraction_id?: StringSearchOptions;
  @Field(() => NumberSearchOptions, { nullable: true })
  creation_block_timestamp?: NumberSearchOptions;
  @Field(() => NumberSearchOptions, { nullable: true })
  creation_block_number?: NumberSearchOptions;
  @Field(() => NumberSearchOptions, { nullable: true })
  last_update_block_number?: NumberSearchOptions;
  @Field(() => NumberSearchOptions, { nullable: true })
  last_update_block_timestamp?: NumberSearchOptions;
  @Field(() => NumberSearchOptions, { nullable: true })
  token_id?: NumberSearchOptions;
  @Field(() => NumberSearchOptions, { nullable: true })
  units?: NumberSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  owner_address?: StringSearchOptions;
}
