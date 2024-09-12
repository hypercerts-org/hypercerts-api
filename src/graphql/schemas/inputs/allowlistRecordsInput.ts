import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  BooleanSearchOptions,
  BigIntSearchOptions,
  StringArraySearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";
import { AllowlistRecord } from "../typeDefs/allowlistRecordTypeDefs.js";

@InputType()
export class BasicAllowlistRecordWhereInput
  implements WhereOptions<AllowlistRecord>
{
  @Field(() => StringSearchOptions, { nullable: true })
  hypercert_id?: StringSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  token_id?: BigIntSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  leaf?: StringSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  entry?: BigIntSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  user_address?: StringSearchOptions;
  @Field(() => BooleanSearchOptions, { nullable: true })
  claimed?: BooleanSearchOptions;
  @Field(() => StringArraySearchOptions, { nullable: true })
  proof?: StringArraySearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  units?: BigIntSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  total_units?: BigIntSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  root?: StringSearchOptions;
}
