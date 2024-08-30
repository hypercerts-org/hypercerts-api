import { ArgsType, Field, InputType } from "type-graphql";
import { BasicAllowlistRecordWhereInput } from "../inputs/allowlistRecordsInput.js";
import { withPagination } from "./baseArgs.js";
import type { OrderOptions } from "../inputs/orderOptions.js";
import { AllowlistRecord } from "../typeDefs/allowlistRecordTypeDefs.js";
import { AllowlistRecordSortOptions } from "../inputs/sortOptions.js";

@InputType()
class AllowlistRecordWhereInput extends BasicAllowlistRecordWhereInput {}

@InputType()
export class AllowlistRecordFetchInput
  implements OrderOptions<AllowlistRecord>
{
  @Field(() => AllowlistRecordSortOptions, { nullable: true })
  by?: AllowlistRecordSortOptions;
}

@ArgsType()
export class AllowlistRecordsArgs {
  @Field(() => AllowlistRecordWhereInput, { nullable: true })
  where?: AllowlistRecordWhereInput;
  @Field(() => AllowlistRecordFetchInput, { nullable: true })
  sort?: AllowlistRecordFetchInput;
}

@ArgsType()
export class GetAllowlistRecordsArgs extends withPagination(
  AllowlistRecordsArgs,
) {}
