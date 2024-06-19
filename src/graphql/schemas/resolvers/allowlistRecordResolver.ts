import {Args, Field, Int, ObjectType, Query, Resolver} from "type-graphql";
import {inject, injectable} from "tsyringe";
import {SupabaseCachingService} from "../../../services/SupabaseCachingService.js";
import {AllowlistRecord} from "../typeDefs/allowlistRecordTypeDefs.js";
import {GetAllowlistRecordsArgs} from "../args/allowlistRecordArgs.js";

@ObjectType()
export default class GetAllowlistRecordResponse {
    @Field(() => [AllowlistRecord], {nullable: true})
    data?: AllowlistRecord[];

    @Field(() => Int, {nullable: true})
    count?: number;
}

@injectable()
@Resolver((_) => AllowlistRecord)
class AllowlistRecordResolver {
    constructor(
        @inject(SupabaseCachingService)
        private readonly supabaseCachingService: SupabaseCachingService,
    ) {
    }

    @Query((_) => GetAllowlistRecordResponse)
    async allowlistRecords(@Args() args: GetAllowlistRecordsArgs) {
        try {
            const res = await this.supabaseCachingService.getAllowlistRecords(args);

            const {data, error, count} = res;

            if (error) {
                console.warn(
                    `[AllowlistRecordResolver::allowlistRecords] Error fetching orders: `,
                    error,
                );
                return {data};
            }

            return {data, count: count ? count : data?.length};
        } catch (e) {
            throw new Error(
                `[AllowlistRecordResolver::allowlistRecords] Error fetching orders: ${(e as Error).message}`,
            );
        }
    }

}

export {AllowlistRecordResolver};
