import { InputType, Field } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import { Hypercert } from "../typeDefs/hypercertTypeDefs.js";
import {
  IdSearchOptions,
  BigIntSearchOptions,
  StringSearchOptions,
  NumberSearchOptions,
} from "./searchOptions.js";

@InputType()
export class BasicHypercertWhereArgs implements WhereOptions<Hypercert> {
  @Field(() => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions;
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
  @Field(() => StringSearchOptions, { nullable: true })
  creator_address?: StringSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  uri?: StringSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  hypercert_id?: StringSearchOptions;
  @Field(() => NumberSearchOptions, {
    nullable: true,
    description: "Count of attestations referencing this hypercert",
  })
  attestations_count?: NumberSearchOptions;
  @Field(() => NumberSearchOptions, { nullable: true })
  sales_count?: NumberSearchOptions;
}
