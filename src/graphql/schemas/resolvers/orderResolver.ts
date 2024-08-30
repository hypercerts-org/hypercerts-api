import {
  Args,
  FieldResolver,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Order } from "../typeDefs/orderTypeDefs.js";
import { GetOrdersArgs } from "../args/orderArgs.js";
import { getHypercertTokenId } from "../../../utils/tokenIds.js";
import { HypercertBaseType } from "../typeDefs/baseTypes/hypercertBaseType.js";
import { getAddress } from "viem";
import { HypercertExchangeClient } from "@hypercerts-org/marketplace-sdk";
import { ethers } from "ethers";
import { getRpcUrl } from "../../../utils/getRpcUrl.js";
import { addPriceInUsdToOrder } from "../../../utils/addPriceInUSDToOrder.js";
import _ from "lodash";
import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType()
export default class GetOrdersResponse extends DataResponse(Order) {}

const OrderBaseResolver = createBaseResolver("order");

@Resolver(() => Order)
class OrderResolver extends OrderBaseResolver {
  @Query(() => GetOrdersResponse)
  async orders(@Args() args: GetOrdersArgs) {
    try {
      console.log("args: ", args);
      const res = await this.supabaseDataService.getOrders(args);

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

      console.log("orders: ", orders);

      const allHypercertIds = _.uniq(orders.map((order) => order.hypercert_id));
      // TODO: Update this once array filters are available
      const allHypercerts = await Promise.all(
        allHypercertIds.map(async (hypercertId) => {
          const hypercertRes = await this.getHypercerts({
            where: {
              hypercert_id: {
                eq: hypercertId,
              },
            },
          });

          console.log("Found hypercert for order: ", hypercertRes);

          return hypercertRes?.[0] as HypercertBaseType;
        }),
      ).then((res) =>
        _.keyBy(
          res.filter((hypercert) => !!hypercert),
          (hypercert) => hypercert?.hypercert_id?.toLowerCase(),
        ),
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
            this.supabaseDataService.validateOrdersByTokenIds({
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
          const hypercert = allHypercerts[order.hypercert_id.toLowerCase()];
          if (!hypercert?.units) {
            console.warn(
              `[OrderResolver::orders] No hypercert found for hypercert_id: ${order.hypercert_id}`,
            );
            return order;
          }
          return addPriceInUsdToOrder(order, hypercert.units as bigint);
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
    const hypercert = await this.getHypercerts(
      {
        where: {
          hypercert_id: {
            eq: formattedHypercertId,
          },
        },
      },
      true,
    );

    console.log("Found hypercert for order: ", hypercert);
    //
    // if (!hypercert) {
    //   console.warn(
    //     `[OrderResolver::hypercert] No hypercert found for tokenId: ${tokenId}`
    //   );
    //   return null;
    // }
    //
    // const resultOrder = hypercert as HypercertBaseType;
    //
    // if (!resultOrder) {
    //   console.warn(
    //     `[OrderResolver::hypercert] No hypercert found for tokenId: ${tokenId}`
    //   );
    //   return null;
    // }
    //
    // const uri = hypercert?.uri;

    const metadata = await this.getMetadata(
      {
        where: {
          hypercerts: {
            hypercert_id: {
              eq: formattedHypercertId,
            },
          },
        },
      },
      true,
    );

    return {
      ...hypercert,
      metadata: metadata || null,
    };
  }
}

export { OrderResolver };
