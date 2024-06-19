import { ArgsType, Field } from "type-graphql";
import { PaginationArgs } from "./paginationArgs.js";
import {AllowlistRecordFetchInput, BasicAllowlistRecordWhereInput} from "../inputs/allowlistRecordsInput.js";

@ArgsType()
export class GetAllowlistRecordsArgs extends PaginationArgs {
  @Field({ nullable: true })
  where?: BasicAllowlistRecordWhereInput;
  @Field({ nullable: true })
  sort?: AllowlistRecordFetchInput;
}
