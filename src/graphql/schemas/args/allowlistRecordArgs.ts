import { ArgsType } from "type-graphql";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";

const {
  WhereInput: AllowlistRecordWhereInput,
  SortOptions: AllowlistRecordSortOptions,
} = createEntityArgs("AllowlistRecord", {
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

@ArgsType()
export class GetAllowlistRecordsArgs extends BaseQueryArgs(
  AllowlistRecordWhereInput,
  AllowlistRecordSortOptions,
) {}

export { AllowlistRecordSortOptions, AllowlistRecordWhereInput };
