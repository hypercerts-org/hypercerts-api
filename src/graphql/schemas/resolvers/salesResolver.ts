import { Args, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { inject, injectable } from "tsyringe";
import { Sale } from "../typeDefs/salesTypeDefs.js";
import { SupabaseCachingService } from "../../../services/SupabaseCachingService.js";
import { GetSalesArgs } from "../args/salesArgs.js";

@ObjectType()
export default class GetSalesResponse {
  @Field(() => [Sale], { nullable: true })
  data?: Sale[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@injectable()
@Resolver(() => Sale)
class SalesResolver {
  constructor(
    @inject(SupabaseCachingService)
    private readonly supabaseService: SupabaseCachingService,
  ) {}

  @Query(() => GetSalesResponse)
  async sales(@Args() args: GetSalesArgs) {
    try {
      const res = await this.supabaseService.getSales(args);

      const { data, error, count } = res;

      console.log(data);

      if (error) {
        console.warn(`[SalesResolver::sales] Error fetching sales: `, error);
        return { data };
      }

      return { data, count: count ? count : data?.length };
    } catch (e) {
      throw new Error(
        `[SalesResolver::sales] Error fetching sales: ${(e as Error).message}`,
      );
    }
  }
}

export { SalesResolver };
