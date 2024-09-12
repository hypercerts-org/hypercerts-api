import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  IdSearchOptions,
  BigIntSearchOptions,
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
  @Field(() => BigIntSearchOptions, { nullable: true })
  creation_block_timestamp?: BigIntSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  creation_block_number?: BigIntSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  last_update_block_number?: BigIntSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  last_update_block_timestamp?: BigIntSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  token_id?: BigIntSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  units?: BigIntSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  owner_address?: StringSearchOptions;
}
