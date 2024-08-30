import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  IdSearchOptions,
  NumberSearchOptions,
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
  @Field(() => NumberSearchOptions, { nullable: true })
  creation_block_timestamp?: NumberSearchOptions | null;
  @Field(() => NumberSearchOptions, { nullable: true })
  last_block_update_timestamp?: NumberSearchOptions | null;
  @Field(() => NumberSearchOptions, { nullable: true })
  work_timeframe_from?: NumberSearchOptions | null;
  @Field(() => NumberSearchOptions, { nullable: true })
  work_timeframe_to?: NumberSearchOptions | null;
  @Field(() => NumberSearchOptions, { nullable: true })
  impact_timeframe_from?: NumberSearchOptions | null;
  @Field(() => NumberSearchOptions, { nullable: true })
  impact_timeframe_to?: NumberSearchOptions | null;
}
