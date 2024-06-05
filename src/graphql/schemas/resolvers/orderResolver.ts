import { Args, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { inject, injectable } from "tsyringe";
import { Order } from "../typeDefs/orderTypeDefs.js";
import { SupabaseDataService } from "../../../services/SupabaseDataService.js";
import { GetOrdersArgs } from "../args/orderArgs.js";

@ObjectType()
export default class GetOrdersResponse {
  @Field(() => [Order], { nullable: true })
  data?: Order[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@injectable()
@Resolver((_) => Order)
class OrderResolver {
  constructor(
    @inject(SupabaseDataService)
    private readonly supabaseService: SupabaseDataService,
  ) {}

  @Query((_) => GetOrdersResponse)
  async orders(@Args() args: GetOrdersArgs) {
    try {
      const res = await this.supabaseService.getOrders();

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
