import { AllowlistRecord } from "../typeDefs/allowlistRecordTypeDefs.js";
import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";

// @InputType()
// class AllowlistRecordWhereInput extends BasicAllowlistRecordWhereInput {}

// @InputType()
// export class AllowlistRecordFetchInput
//   implements OrderOptions<AllowlistRecord>
// {
//   @Field(() => AllowlistRecordSortOptions, { nullable: true })
//   by?: AllowlistRecordSortOptions;
// }

// @ArgsType()
// export class AllowlistRecordsArgs {
//   @Field(() => AllowlistRecordWhereInput, { nullable: true })
//   where?: AllowlistRecordWhereInput;
//   @Field(() => AllowlistRecordFetchInput, { nullable: true })
//   sort?: AllowlistRecordFetchInput;
// }

// @ArgsType()
// export class GetAllowlistRecordsArgs extends withPagination(
//   AllowlistRecordsArgs,
// ) {}

const {
  WhereArgs: AllowlistRecordWhereArgs,
  EntitySortOptions: AllowlistRecordSortOptions,
  SortArgs: AllowlistRecordSortArgs,
} = createEntityArgs<AllowlistRecord>("AllowlistRecord", {
  hypercert_id: "string",
  token_id: "string",
  leaf: "string",
  entry: "number",
  user_address: "string",
  claimed: "boolean",
  proof: "stringArray",
  units: "bigint",
  total_units: "bigint",
  root: "string",
});

export const GetAllowlistRecordsArgs = BaseQueryArgs(
  AllowlistRecordWhereArgs,
  AllowlistRecordSortArgs,
);
export type GetAllowlistRecordsArgs = InstanceType<
  typeof GetAllowlistRecordsArgs
>;

export {
  AllowlistRecordSortArgs,
  AllowlistRecordSortOptions,
  AllowlistRecordWhereArgs,
};
