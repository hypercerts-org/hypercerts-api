import { inject, injectable } from "tsyringe";
import { Args, Query, Resolver } from "type-graphql";
import { AllowlistRecordService } from "../../../services/database/entities/AllowListRecordEntityService.js";
import { GetAllowlistRecordsArgs } from "../args/allowlistRecordArgs.js";
import {
  AllowlistRecord,
  GetAllowlistRecordResponse,
} from "../typeDefs/allowlistRecordTypeDefs.js";

@injectable()
@Resolver(() => AllowlistRecord)
class AllowlistRecordResolver {
  constructor(
    @inject(AllowlistRecordService)
    private allowlistRecordService: AllowlistRecordService,
  ) {}

  @Query(() => GetAllowlistRecordResponse)
  async allowlistRecords(@Args() args: GetAllowlistRecordsArgs) {
    return await this.allowlistRecordService.getAllowlistRecords(args);
  }
}

export { AllowlistRecordResolver };
