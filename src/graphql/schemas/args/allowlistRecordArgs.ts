import { ArgsType, Field } from "type-graphql";
import { AllowlistRecordFetchInput, BasicAllowlistRecordWhereInput } from "../inputs/allowlistRecordsInput.js";
import { withPagination } from "./baseArgs.js";

@ArgsType()
export class AllowlistRecordsArgs {
  @Field({ nullable: true })
  where?: BasicAllowlistRecordWhereInput;
  @Field({ nullable: true })
  sort?: AllowlistRecordFetchInput;
}

@ArgsType()
export class GetAllowlistRecordsArgs extends withPagination(AllowlistRecordsArgs) {
}
