import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  IdSearchOptions,
  BigIntSearchOptions,
  StringArraySearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";
import { Metadata } from "../typeDefs/metadataTypeDefs.js";

@InputType()
export class BasicMetadataWhereInput implements WhereOptions<Metadata> {
  @Field(() => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  name?: StringSearchOptions | null;
  @Field(() => StringSearchOptions, { nullable: true })
  description?: StringSearchOptions | null;
  @Field(() => StringSearchOptions, { nullable: true })
  uri?: StringSearchOptions | null;
  @Field(() => StringArraySearchOptions, { nullable: true })
  contributors?: StringArraySearchOptions | null;
  @Field(() => StringArraySearchOptions, { nullable: true })
  work_scope?: StringArraySearchOptions | null;
  @Field(() => StringArraySearchOptions, { nullable: true })
  impact_scope?: StringArraySearchOptions | null;
  @Field(() => StringArraySearchOptions, { nullable: true })
  rights?: StringArraySearchOptions | null;
  @Field(() => BigIntSearchOptions, { nullable: true })
  creation_block_timestamp?: BigIntSearchOptions | null;
  @Field(() => BigIntSearchOptions, { nullable: true })
  last_block_update_timestamp?: BigIntSearchOptions | null;
  @Field(() => BigIntSearchOptions, { nullable: true })
  work_timeframe_from?: BigIntSearchOptions | null;
  @Field(() => BigIntSearchOptions, { nullable: true })
  work_timeframe_to?: BigIntSearchOptions | null;
  @Field(() => BigIntSearchOptions, { nullable: true })
  impact_timeframe_from?: BigIntSearchOptions | null;
  @Field(() => BigIntSearchOptions, { nullable: true })
  impact_timeframe_to?: BigIntSearchOptions | null;
}
