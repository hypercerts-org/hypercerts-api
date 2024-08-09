import {
  Args,
  Field,
  FieldResolver,
  Int,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { inject, injectable } from "tsyringe";
import { Order } from "../typeDefs/orderTypeDefs.js";
import { SupabaseDataService } from "../../../services/SupabaseDataService.js";
import { GetOrdersArgs } from "../args/orderArgs.js";
import { SupabaseCachingService } from "../../../services/SupabaseCachingService.js";
import { getHypercertTokenId } from "../../../utils/tokenIds.js";
import { HypercertBaseType } from "../typeDefs/baseTypes/hypercertBaseType.js";
import { getAddress } from "viem";
import { HypercertExchangeClient } from "@hypercerts-org/marketplace-sdk";
import { ethers } from "ethers";
import { getRpcUrl } from "../../../utils/getRpcUrl.js";
import { addPriceInUsdToOrder } from "../../../utils/addPriceInUSDToOrder.js";

@ObjectType()
export default class GetOrdersResponse {
  @Field(() => [Order], { nullable: true })
  data?: Order[];

  @Field(() => Int, { nullable: true })
  count?: number;
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

      const { data: orders, error, count } = res;

      if (error) {
        console.warn(`[OrderResolver::orders] Error fetching orders: `, error);
        return { orders };
      }

      const groupedOrders = orders.reduce(
        (acc, order) => {
          if (!acc[order.chainId]) {
            acc[order.chainId] = [];
          }
          acc[order.chainId].push(order);
          return acc;
        },
        {} as Record<string, (typeof orders)[number][]>,
      );

      const ordersAfterCheckingValidity = await Promise.all(
        Object.entries(groupedOrders).map(async ([chainId, ordersForChain]) => {
          const chainIdParsed = parseInt(chainId);
          const hypercertExchangeClient = new HypercertExchangeClient(
            chainIdParsed,
            // @ts-expect-error - TODO: fix these types
            new ethers.JsonRpcProvider(getRpcUrl(chainIdParsed)),
          );

          const validityResults =
            await hypercertExchangeClient.checkOrdersValidity(
              ordersForChain.filter((order) => !order.invalidated),
            );
          const tokenIdsWithInvalidOrder = validityResults
            .filter((result) => !result.valid)
            .map((result) => BigInt(result.order.itemIds[0]));
          if (tokenIdsWithInvalidOrder.length) {
            console.log(
              "[OrderResolver::orders]:: Found invalid orders",
              tokenIdsWithInvalidOrder,
            );
            // Fire off the validation but don't wait for it to finish
            this.supabaseService.validateOrdersByTokenIds({
              tokenIds: tokenIdsWithInvalidOrder.map((id) => id.toString()),
              chainId: chainIdParsed,
            });
          }
          return ordersForChain.map((order) => {
            if (tokenIdsWithInvalidOrder.includes(BigInt(order.itemIds[0]))) {
              return { ...order, invalidated: true };
            }
            return order;
          });
        }),
      ).then((res) => res.flat());

      const ordersWithPrices = await Promise.all(
        orders.map(async (order) => {
          return addPriceInUsdToOrder(order);
        }),
      );

      return {
        data: ordersWithPrices,
        count: count ? count : ordersAfterCheckingValidity?.length,
      };
    } catch (e) {
      throw new Error(
        `[ContractResolver::orders] Error fetching orders: ${(e as Error).message}`,
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
    const hypercert = await this.supabaseCachingService.getHypercerts({
      where: {
        hypercert_id: {
          eq: formattedHypercertId,
        },
      },
    });

    if (!hypercert) {
      console.warn(
        `[OrderResolver::hypercert] No hypercert found for tokenId: ${tokenId}`,
      );
      return null;
    }

    const { data: hypercertData, error } = hypercert;
    if (error) {
      console.warn(
        `[OrderResolver::hypercert] Error fetching hypercert: `,
        error,
      );
      return null;
    }

    const resultOrder = hypercertData?.[0] as HypercertBaseType;

    if (!resultOrder) {
      console.warn(
        `[OrderResolver::hypercert] No hypercert found for tokenId: ${tokenId}`,
      );
      return null;
    }

    const uri = (hypercertData?.[0] as HypercertBaseType)?.uri;

    const metadata = await this.supabaseCachingService.getMetadata({
      where: {
        uri: {
          eq: uri,
        },
      },
    });

    if (!metadata) {
      console.warn(
        `[OrderResolver::hypercert] No metadata found for tokenId: ${tokenId}`,
      );
      return null;
    }

    const { data: metadataData, error: metadataError } = metadata;

    if (metadataError) {
      console.warn(
        `[OrderResolver::hypercert] Error fetching metadata: `,
        metadataError,
      );
      return null;
    }

    if (!metadataData) {
      console.warn(
        `[OrderResolver::hypercert] No metadata found for tokenId: ${tokenId}`,
      );
      return null;
    }

    return {
      ...resultOrder,
      metadata: metadataData?.[0] || null,
    };
  }
}

export { OrderResolver };
