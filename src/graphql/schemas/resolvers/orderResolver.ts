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
import { getAddress } from "viem";
import { addPriceInUsdToOrder } from "../../../utils/addPriceInUSDToOrder.js";
import _ from "lodash";
import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType()
export default class GetOrdersResponse extends DataResponse(Order) {}

const OrderBaseResolver = createBaseResolver("order");

@Resolver(() => Order)
class OrderResolver extends OrderBaseResolver {
  @Query(() => GetOrdersResponse)
  async orders(@Args() args: GetOrdersArgs, single: boolean = false) {
    try {
      const ordersRes = await this.getOrders(args, single);

      if (!ordersRes) {
        return {
          data: [],
          count: 0,
        };
      }

      const { data, count } = ordersRes;

      const allHypercertIds = _.uniq(data.map((order) => order.hypercert_id));
      // TODO: Update this once array filters are available
      const allHypercerts = await Promise.all(
        allHypercertIds.map(async (hypercertId) => {
          return await this.getHypercerts(
            {
              where: {
                hypercert_id: {
                  eq: hypercertId,
                },
              },
            },
            true,
          );
        }),
      ).then((res) =>
        _.keyBy(
          res.filter((hypercert) => !!hypercert),
          (hypercert) => hypercert?.hypercert_id?.toLowerCase(),
        ),
      );

      const ordersWithPrices = await Promise.all(
        data.map(async (order) => {
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
        count: count ? count : ordersWithPrices?.length,
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

    const metadata = await this.getMetadataWithoutImage(
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
