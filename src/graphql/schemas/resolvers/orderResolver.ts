import { Args, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { inject, injectable } from "tsyringe";
import { Order } from "../typeDefs/orderTypeDefs.js";
import { SupabaseDataService } from "../../../services/SupabaseDataService.js";
import { GetOrdersArgs } from "../args/orderArgs.js";
import { SupabaseCachingService } from "../../../services/SupabaseCachingService.js";

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
    @inject(SupabaseCachingService)
    private readonly supabaseCachingService: SupabaseCachingService,
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

  // @Field()
  // async fraction(@Root() order: Order) {
  //   if (!order || !order.itemIds || order.itemIds.length === 0) {
  //     return null;
  //   }
  //   const res = await this.supabaseCachingService.getFractions({
  //     where: {
  //       token_id: { eq: BigInt(order.itemIds[0]) },
  //     },
  //   });
  //
  //   if (!res) {
  //     console.warn(`[OrderResolver::fraction] Error fetching fraction: `, res);
  //     return null;
  //   }
  //
  //   const { data, error } = res;
  //
  //   if (error) {
  //     console.warn(
  //       `[OrderResolver::fraction] Error fetching fraction: `,
  //       error,
  //     );
  //   }
  //
  //   return data?.[0];
  // }
}

export { OrderResolver };
