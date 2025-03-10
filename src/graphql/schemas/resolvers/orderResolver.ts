import _ from "lodash";
import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { getAddress } from "viem";
import { HypercertsService } from "../../../services/database/entities/HypercertsEntityService.js";
import { MarketplaceOrdersService } from "../../../services/database/entities/MarketplaceOrdersEntityService.js";
import { Database } from "../../../types/supabaseData.js";
import { addPriceInUsdToOrder } from "../../../utils/addPriceInUSDToOrder.js";
import { getHypercertTokenId } from "../../../utils/tokenIds.js";
import { GetOrdersArgs } from "../args/orderArgs.js";
import { GetOrdersResponse, Order } from "../typeDefs/orderTypeDefs.js";

@injectable()
@Resolver(() => Order)
class OrderResolver {
  constructor(
    @inject(MarketplaceOrdersService)
    private marketplaceOrdersService: MarketplaceOrdersService,
    @inject(HypercertsService)
    private hypercertService: HypercertsService,
  ) {}

  @Query(() => GetOrdersResponse)
  async orders(@Args() args: GetOrdersArgs) {
    try {
      const ordersRes = await this.marketplaceOrdersService.getOrders(args);

      if (!ordersRes || !ordersRes.data || !ordersRes.count) {
        return {
          data: [],
          count: 0,
        };
      }

      const { data, count } = ordersRes;

      // Get unique hypercert IDs and convert to lowercase once
      const allHypercertIds = _.uniq(
        data.map((order) =>
          (order.hypercert_id as unknown as string)?.toLowerCase(),
        ),
      );

      // Fetch hypercerts in parallel with any other async operations
      const { data: hypercertsData } =
        await this.hypercertService.getHypercerts({
          where: {
            hypercert_id: { in: allHypercertIds },
          },
        });

      // Create lookup map with lowercase keys
      const hypercerts = new Map(
        hypercertsData.map((h) => [
          (h.hypercert_id as unknown as string)?.toLowerCase(),
          h,
        ]),
      );

      // Process orders in parallel since addPriceInUsdToOrder is async
      const ordersWithPrices = await Promise.all(
        data.map(async (order) => {
          const hypercert = hypercerts.get(
            (order.hypercert_id as unknown as string)?.toLowerCase(),
          );
          if (!hypercert?.units) {
            console.warn(
              `[OrderResolver::orders] No hypercert unitsfound for hypercert_id: ${order.hypercert_id}`,
            );
            return order;
          }
          return addPriceInUsdToOrder(
            order as unknown as Database["public"]["Tables"]["marketplace_orders"]["Row"],
            hypercert.units as unknown as bigint,
          );
        }),
      );

      return {
        data: ordersWithPrices,
        count: count ?? ordersWithPrices.length,
      };
    } catch (e) {
      throw new Error(
        `[OrderResolver::orders] Error fetching orders: ${(e as Error).message}`,
      );
    }
  }

  @FieldResolver({ nullable: true })
  async hypercert(@Root() order: Order) {
    const tokenId = order.itemIds?.[0];
    const collectionId = order.collection;
    const chainId = order.chainId;

    if (!tokenId || !collectionId || !chainId) {
      console.warn(
        `[OrderResolver::hypercert] Missing tokenId or collectionId`,
      );
      return null;
    }

    const hypercertId = getHypercertTokenId(BigInt(tokenId));
    const formattedHypercertId = `${chainId}-${getAddress(collectionId)}-${hypercertId.toString()}`;

    const [hypercert, metadata] = await Promise.all([
      this.hypercertService.getHypercert({
        where: {
          hypercert_id: { eq: formattedHypercertId },
        },
      }),
      this.hypercertService.getHypercertMetadata({
        hypercert_id: formattedHypercertId,
      }),
    ]);

    return {
      ...hypercert,
      metadata: metadata || null,
    };
  }
}

export { OrderResolver };
