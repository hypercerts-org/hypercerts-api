import { InputType, Field } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import { Hypercert } from "../typeDefs/hypercertTypeDefs.js";
import {
  IdSearchOptions,
  NumberSearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";

@InputType()
export class BasicHypercertWhereArgs implements WhereOptions<Hypercert> {
  @Field(() => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions;
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
  @Field(() => StringSearchOptions, { nullable: true })
  creator_address?: StringSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  uri?: StringSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  hypercert_id?: StringSearchOptions;
}
