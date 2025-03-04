import { parseClaimOrFractionId } from "@hypercerts-org/sdk";
import _ from "lodash";
import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { AttestationService } from "../../../services/database/entities/AttestationEntityService.js";
import { ContractService } from "../../../services/database/entities/ContractEntityService.js";
import { FractionService } from "../../../services/database/entities/FractionEntityService.js";
import { HypercertsService } from "../../../services/database/entities/HypercertsEntityService.js";
import {
  MarketplaceOrderSelect,
  MarketplaceOrdersService,
} from "../../../services/database/entities/MarketplaceOrdersEntityService.js";
import { MetadataService } from "../../../services/database/entities/MetadataEntityService.js";
import { SalesService } from "../../../services/database/entities/SalesEntityService.js";
import { Database } from "../../../types/supabaseData.js";
import { addPriceInUsdToOrder } from "../../../utils/addPriceInUSDToOrder.js";
import { getCheapestOrder } from "../../../utils/getCheapestOrder.js";
import { getMaxUnitsForSaleInOrders } from "../../../utils/getMaxUnitsForSaleInOrders.js";
import { GetHypercertsArgs } from "../args/hypercertsArgs.js";
import {
  GetHypercertsResponse,
  Hypercert,
} from "../typeDefs/hypercertTypeDefs.js";

@injectable()
@Resolver(() => Hypercert)
class HypercertResolver {
  constructor(
    @inject(HypercertsService)
    private hypercertsService: HypercertsService,
    @inject(MetadataService)
    private metadataService: MetadataService,
    @inject(ContractService)
    private contractService: ContractService,
    @inject(AttestationService)
    private attestationService: AttestationService,
    @inject(FractionService)
    private fractionService: FractionService,
    @inject(SalesService)
    private salesService: SalesService,
    @inject(MarketplaceOrdersService)
    private marketplaceOrdersService: MarketplaceOrdersService,
  ) {}

  @Query(() => GetHypercertsResponse)
  async hypercerts(@Args() args: GetHypercertsArgs) {
    return await this.hypercertsService.getHypercerts(args);
  }

  @FieldResolver({ nullable: true })
  async metadata(@Root() hypercert: Hypercert) {
    if (!hypercert.uri) {
      console.warn(
        `[HypercertResolver::metadata] No uri found for hypercert ${hypercert.id}`,
      );
      return null;
    }

    return await this.metadataService.getMetadataSingle({
      where: { uri: { eq: hypercert.uri } },
    });
  }

  @FieldResolver()
  async contract(@Root() hypercert: Hypercert) {
    if (!hypercert.contracts_id) {
      console.warn(
        `[HypercertResolver::contract] No contract id found for hypercert ${hypercert.id}`,
      );
      return null;
    }

    return await this.contractService.getContract({
      where: { id: { eq: hypercert.contracts_id } },
    });
  }

  @FieldResolver()
  async attestations(@Root() hypercert: Hypercert) {
    if (!hypercert.id) {
      return null;
    }

    return await this.attestationService.getAttestations({
      where: { hypercerts: { id: { eq: hypercert.id } } },
    });
  }

  @FieldResolver()
  async fractions(@Root() hypercert: Hypercert) {
    if (!hypercert.hypercert_id) {
      return null;
    }

    return await this.fractionService.getFractions({
      where: { hypercert_id: { eq: hypercert.hypercert_id } },
    });
  }

  @FieldResolver()
  async orders(@Root() hypercert: Hypercert) {
    if (!hypercert.id || !hypercert.hypercert_id) {
      return null;
    }

    const defaultValue = {
      data: [],
      count: 0,
      totalUnitsForSale: BigInt(0),
    };

    try {
      const [{ data: fractions }, orders] = await Promise.all([
        this.fractionService.getFractions({
          where: { hypercert_id: { eq: hypercert.hypercert_id } },
        }),
        this.marketplaceOrdersService.getOrders({
          where: {
            hypercert_id: { eq: hypercert.hypercert_id },
            invalidated: { eq: false },
          },
        }),
      ]);

      if (!fractions || !orders?.data) {
        console.warn(
          `[HypercertResolver::orders] Error fetching data for ${hypercert.hypercert_id}`,
        );
        return defaultValue;
      }

      const { data: ordersData, count: ordersCount } = orders;

      const ordersByFraction = _.groupBy(
        ordersData,
        (order) => (order.itemIds as unknown as string[])[0],
      );

      const { chainId, contractAddress } = parseClaimOrFractionId(
        hypercert.hypercert_id,
      );

      // const ordersWithPrices: (Database["public"]["Tables"]["marketplace_orders"]["Row"] & {
      //   priceInUSD: string;
      //   pricePerPercentInUSD: string;
      // })[] = [];

      // const ordersByFraction = _.groupBy(
      //   ordersData,
      //   (order) => (order.itemIds as unknown as string[])[0],
      // );

      // Process all orders with prices in parallel
      const ordersWithPrices = await Promise.all(
        ordersData.map(async (order) => {
          const orderWithPrice = await addPriceInUsdToOrder(
            order as unknown as Database["public"]["Tables"]["marketplace_orders"]["Row"],
            hypercert.units as bigint,
          );
          return {
            ...orderWithPrice,
            pricePerPercentInUSD:
              orderWithPrice.pricePerPercentInUSD.toString(),
          };
        }),
      );

      // For each fraction, find all orders and find the max units for sale for that fraction
      const totalUnitsForSale = (
        await Promise.all(
          Object.entries(ordersByFraction).map(async ([tokenId, orders]) => {
            const fractionId = `${chainId}-${contractAddress}-${tokenId}`;
            const fraction = fractions.find(
              (f) => (f.fraction_id as unknown as string) === fractionId,
            );

            if (!fraction) {
              console.error(
                `[HypercertResolver::orders] Fraction not found for ${fractionId}`,
              );
              return BigInt(0);
            }

            return getMaxUnitsForSaleInOrders(
              orders as MarketplaceOrderSelect[],
              BigInt(fraction.units as unknown as bigint),
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
      console.error(
        `[HypercertResolver::orders] Error fetching orders for ${hypercert.hypercert_id}: ${(e as Error).toString()}`,
      );
      return defaultValue;
    }
  }

  @FieldResolver()
  async sales(@Root() hypercert: Hypercert) {
    if (!hypercert.hypercert_id) {
      console.warn(
        `[HypercertResolver::sales] No hypercert id found for ${hypercert.id}`,
      );
      return null;
    }

    return await this.salesService.getSales({
      where: { hypercert_id: { eq: hypercert.hypercert_id } },
    });
  }
}

export { HypercertResolver };
