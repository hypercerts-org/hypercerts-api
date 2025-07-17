import _ from "lodash";
import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { getAddress } from "viem";
import { GetOrdersArgs } from "../../../graphql/schemas/args/orderArgs.js";
import {
  GetOrdersResponse,
  Order,
} from "../../../graphql/schemas/typeDefs/orderTypeDefs.js";
import { addPriceInUsdToOrder } from "../../../utils/addPriceInUSDToOrder.js";
import { getHypercertTokenId } from "../../../utils/tokenIds.js";
import { HypercertsService } from "../../database/entities/HypercertsEntityService.js";
import { MarketplaceOrdersService } from "../../database/entities/MarketplaceOrdersEntityService.js";

/**
 * GraphQL resolver for marketplace orders.
 * Handles queries for orders and resolves related fields.
 *
 * This resolver provides:
 * - Query for fetching orders with optional filtering
 * - Price calculation in USD for each order
 * - Field resolution for:
 *   - hypercert: Associated hypercert details and metadata
 *
 * Error Handling:
 * - Query operations throw errors to be handled by the GraphQL error handler
 * - Field resolvers return null on errors to allow partial data resolution
 * - All errors are logged for monitoring
 *
 * @injectable Marks the class as injectable for dependency injection with tsyringe
 * @resolver Marks the class as a GraphQL resolver for the Order type
 */
@injectable()
@Resolver(() => Order)
class OrderResolver {
  constructor(
    @inject(MarketplaceOrdersService)
    private readonly marketplaceOrdersService: MarketplaceOrdersService,
    @inject(HypercertsService)
    private readonly hypercertService: HypercertsService,
  ) {}

  /**
   * Queries marketplace orders based on provided arguments.
   * Fetches associated hypercerts and calculates USD prices.
   *
   * @param args - Query arguments for filtering orders
   * @returns A promise resolving to:
   *          - data: Array of orders with USD prices
   *          - count: Total number of matching records
   * @throws Error if the operation fails
   *
   * @example
   * ```graphql
   * query {
   *   orders(
   *     where: {
   *       seller: { eq: "0x..." }
   *       status: { eq: "active" }
   *     }
   *   ) {
   *     data {
   *       id
   *       price
   *       priceInUsd
   *       seller
   *       status
   *       hypercert {
   *         id
   *         metadata {
   *           name
   *           description
   *         }
   *       }
   *     }
   *     count
   *   }
   * }
   * ```
   */
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
        data.map((order) => order.hypercert_id as unknown as string),
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
              `[OrderResolver::orders] No hypercert units found for hypercert_id: ${order.hypercert_id}`,
            );
            return order;
          }
          return addPriceInUsdToOrder(
            order,
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

  /**
   * Resolves the hypercert field for an order.
   * This field resolver is called automatically when the hypercert field is requested in a query.
   *
   * @param order - The order for which to resolve the hypercert
   * @returns A promise resolving to:
   *          - The hypercert with its metadata if found
   *          - null if:
   *            - Required fields are missing
   *            - An error occurs during retrieval
   *
   * @example
   * ```graphql
   * query {
   *   orders {
   *     data {
   *       id
   *       hypercert {
   *         id
   *         uri
   *         metadata {
   *           name
   *           description
   *           image
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver({ nullable: true })
  async hypercert(@Root() order: Order) {
    try {
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
    } catch (e) {
      console.error(
        `[OrderResolver::hypercert] Error resolving hypercert: ${(e as Error).message}`,
      );
      return null;
    }
  }
}

export { OrderResolver };
