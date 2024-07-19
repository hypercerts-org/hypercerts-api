import { Args, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { inject, injectable } from "tsyringe";
import { Order } from "../typeDefs/orderTypeDefs.js";
import { SupabaseDataService } from "../../../services/SupabaseDataService.js";
import { GetOrdersArgs } from "../args/orderArgs.js";
import { SupabaseCachingService } from "../../../services/SupabaseCachingService.js";
import { GraphQLBigInt } from "graphql-scalars";

@ObjectType()
export default class GetOrdersResponse {
  @Field(() => [Order], { nullable: true })
  data?: Order[];

  @Field(() => Int, { nullable: true })
  count?: number;

  @Field(() => GraphQLBigInt, { nullable: true })
  totalUnitsForSale?: bigint;

  @Field(() => GraphQLBigInt, { nullable: true })
  lowestAvailablePrice?: bigint;
}

@injectable()
@Resolver(() => Order)
class OrderResolver {
  constructor(
    @inject(SupabaseDataService)
    private readonly supabaseService: SupabaseDataService,
    @inject(SupabaseCachingService)
    private readonly supabaseCachingService: SupabaseCachingService,
  ) {}

  @Query(() => GetOrdersResponse)
  async orders(@Args() args: GetOrdersArgs) {
    try {
      const res = await this.supabaseService.getOrders(args);

      const { data, error, count } = res;

      if (error) {
        console.warn(
          `[ContractResolver::orders] Error fetching orders: `,
          error,
        );
        return { data };
      }

      return { data, count: count ? count : data?.length };
    } catch (e) {
      throw new Error(
        `[ContractResolver::orders] Error fetching orders: ${(e as Error).message}`,
      );
    }
  }
}

export { OrderResolver };
