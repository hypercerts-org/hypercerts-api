import {
  Args,
  FieldResolver,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Hypercert } from "../typeDefs/hypercertTypeDefs.js";
import { GetHypercertsArgs } from "../args/hypercertsArgs.js";
import { parseClaimOrFractionId } from "@hypercerts-org/sdk";
import _ from "lodash";
import { getCheapestOrder } from "../../../utils/getCheapestOrder.js";
import { getMaxUnitsForSaleInOrders } from "../../../utils/getMaxUnitsForSaleInOrders.js";
import { addPriceInUsdToOrder } from "../../../utils/addPriceInUSDToOrder.js";
import { Database } from "../../../types/supabaseData.js";
import { createBaseResolver, DataResponse } from "./baseTypes.js";
import "reflect-metadata";

@ObjectType()
export default class GetHypercertsResponse extends DataResponse(Hypercert) {}

const HypercertBaseResolver = createBaseResolver("hypercert");

@Resolver(() => Hypercert)
class HypercertResolver extends HypercertBaseResolver {
  @Query(() => GetHypercertsResponse)
  async hypercerts(@Args() args: GetHypercertsArgs) {
    return await this.getHypercerts(args);
  }

  @FieldResolver({ nullable: true })
  async metadata(@Root() hypercert: Hypercert) {
    if (!hypercert.uri) {
      return;
    }

    return await this.getMetadata(
      { where: { uri: { eq: hypercert.uri } } },
      true,
    );
  }

  @FieldResolver()
  async contract(@Root() hypercert: Hypercert) {
    if (!hypercert.contracts_id) {
      return;
    }

    return await this.getContracts(
      { where: { id: { eq: hypercert.contracts_id } } },
      true,
    );
  }

  @FieldResolver()
  async attestations(@Root() hypercert: Hypercert) {
    if (!hypercert.id) {
      return;
    }

    return await this.getAttestations({
      where: { hypercerts: { id: { eq: hypercert.id } } },
    });
  }

  @FieldResolver()
  async fractions(@Root() hypercert: Hypercert) {
    if (!hypercert.id) {
      return;
    }

    return await this.getFractions(
      { where: { hypercerts: { id: { eq: hypercert.id } } } },
      false,
    );
  }

  @FieldResolver()
  async orders(@Root() hypercert: Hypercert) {
    if (!hypercert.id || !hypercert.hypercert_id) {
      return;
    }

    const defaultValue = {
      data: [],
      count: 0,
      totalUnitsForSale: BigInt(0),
    };

    try {
      const { data: fractionsRes } = await this.getFractions({
        where: { hypercerts: { id: { eq: hypercert.id } } },
      });

      if (!fractionsRes) {
        console.warn(
          `[HypercertResolver::orders] Error fetching fractions for ${hypercert.hypercert_id}`,
          fractionsRes,
        );
        return defaultValue;
      }

      console.log(
        `[HypercertResolver::orders] Fetching orders for ${hypercert.hypercert_id}`,
      );

      const ordersRes = await this.supabaseDataService.getOrders({
        where: { hypercert_id: { eq: hypercert.hypercert_id } },
      });

      if (!ordersRes) {
        console.warn(
          `[HypercertResolver::orders] Error fetching orders for ${hypercert.hypercert_id}`,
          ordersRes,
        );
        return defaultValue;
      }

      const {
        data: ordersData,
        error: ordersError,
        count: ordersCount,
      } = ordersRes;

      if (ordersError) {
        console.error(
          `[HypercertResolver::orders] Error fetching orders for ${hypercert.hypercert_id}: `,
          ordersError,
        );
        return defaultValue;
      }

      const validOrders = ordersData.filter((order) => !order.invalidated);

      const ordersByFraction = _.groupBy(validOrders, (order) =>
        order.itemIds[0].toString(),
      );

      const { chainId, contractAddress } = parseClaimOrFractionId(
        hypercert.hypercert_id,
      );

      const ordersWithPrices: (Database["public"]["Tables"]["marketplace_orders"]["Row"] & {
        priceInUSD: string;
        pricePerPercentInUSD: string;
      })[] = [];
      // For each fraction, find all orders and find the max units for sale for that fraction
      const totalUnitsForSale = (
        await Promise.all(
          Object.keys(ordersByFraction).map(async (tokenId) => {
            const fractionId = `${chainId}-${contractAddress}-${tokenId}`;
            const fraction = fractionsRes.find(
              (fraction) => fraction.fraction_id === fractionId,
            );

            if (!fraction) {
              console.error(
                `[HypercertResolver::orders] Fraction not found for ${fractionId}`,
              );
              return BigInt(0);
            }

            const ordersPerFraction = ordersByFraction[tokenId];
            const ordersWithPricesForChain = await Promise.all(
              ordersPerFraction.map(async (order) => {
                return addPriceInUsdToOrder(order, hypercert.units as bigint);
              }),
            );
            ordersWithPrices.push(...ordersWithPricesForChain);
            return getMaxUnitsForSaleInOrders(
              ordersPerFraction,
              BigInt(fraction.units),
            );
          }),
        )
      ).reduce((acc, val) => acc + val, BigInt(0));

      const cheapestOrder = getCheapestOrder(ordersWithPrices);

      return {
        totalUnitsForSale,
        cheapestOrder,
        data: ordersWithPrices || [],
        count: ordersCount || 0,
      };
    } catch (e) {
      throw new Error(
        `[HypercertResolver::orders] Error fetching orders for ${hypercert.hypercert_id}: ${(e as Error).toString()}`,
      );
    }
  }

  @FieldResolver()
  async sales(@Root() hypercert: Hypercert) {
    if (!hypercert.hypercert_id) {
      return null;
    }

    return await this.getSales({
      where: { hypercert_id: { eq: hypercert.hypercert_id } },
    });
  }
}

export { HypercertResolver };
