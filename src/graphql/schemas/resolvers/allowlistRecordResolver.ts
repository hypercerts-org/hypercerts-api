import { Args, ObjectType, Query, Resolver } from "type-graphql";
import { AllowlistRecord } from "../typeDefs/allowlistRecordTypeDefs.js";
import { GetAllowlistRecordsArgs } from "../args/allowlistRecordArgs.js";
import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType()
class GetAllowlistRecordResponse extends DataResponse(AllowlistRecord) {}

const AllowlistRecordBaseResolver = createBaseResolver("allowlistRecord");

@Resolver(() => AllowlistRecord)
class AllowlistRecordResolver extends AllowlistRecordBaseResolver {
  @Query(() => GetAllowlistRecordResponse)
  async allowlistRecords(@Args() args: GetAllowlistRecordsArgs) {
    return await this.getAllowlistRecords(args);
  }
}

export { AllowlistRecordResolver };
