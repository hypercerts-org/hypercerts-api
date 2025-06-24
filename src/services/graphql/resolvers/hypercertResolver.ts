import { parseClaimOrFractionId } from "@hypercerts-org/sdk";
import _ from "lodash";
import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { AttestationService } from "../../database/entities/AttestationEntityService.js";
import { ContractService } from "../../database/entities/ContractEntityService.js";
import { FractionService } from "../../database/entities/FractionEntityService.js";
import { HypercertsService } from "../../database/entities/HypercertsEntityService.js";
import {
  MarketplaceOrderSelect,
  MarketplaceOrdersService,
} from "../../database/entities/MarketplaceOrdersEntityService.js";
import { MetadataService } from "../../database/entities/MetadataEntityService.js";
import { SalesService } from "../../database/entities/SalesEntityService.js";
import { Database } from "../../../types/supabaseData.js";
import { addPriceInUsdToOrder } from "../../../utils/addPriceInUSDToOrder.js";
import { getCheapestOrder } from "../../../utils/getCheapestOrder.js";
import { getMaxUnitsForSaleInOrders } from "../../../utils/getMaxUnitsForSaleInOrders.js";
import { GetHypercertsArgs } from "../../../graphql/schemas/args/hypercertsArgs.js";
import {
  GetHypercertsResponse,
  Hypercert,
} from "../../../graphql/schemas/typeDefs/hypercertTypeDefs.js";

/**
 * GraphQL resolver for Hypercert operations.
 * Handles queries for hypercerts and resolves related fields.
 *
 * This resolver provides:
 * - Query for fetching hypercerts with optional filtering
 * - Field resolution for:
 *   - metadata: Associated metadata from IPFS
 *   - contract: Contract details
 *   - attestations: Related attestations
 *   - fractions: Ownership fractions
 *   - sales: Sales history
 *
 * Error Handling:
 * All resolvers follow the GraphQL best practice of returning partial data instead of throwing errors.
 * If an operation fails, it will:
 * - Log the error internally for monitoring
 * - Return null/empty data to the client
 * - Include error information in the GraphQL response errors array
 */
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

  /**
   * Resolves hypercerts queries with optional filtering.
   *
   * @param args - Query arguments for filtering hypercerts
   * @returns A promise resolving to:
   *          - data: Array of hypercerts matching the criteria
   *          - count: Total number of matching records
   *          - null if an error occurs
   *
   * @example
   * ```graphql
   * query {
   *   hypercerts(where: { hypercert_id: { eq: "1-0x1234...5678-123" } }) {
   *     data {
   *       id
   *       hypercert_id
   *       metadata {
   *         name
   *         description
   *       }
   *     }
   *     count
   *   }
   * }
   * ```
   */
  @Query(() => GetHypercertsResponse)
  async hypercerts(@Args() args: GetHypercertsArgs) {
    try {
      return await this.hypercertsService.getHypercerts(args);
    } catch (e) {
      console.error(
        `[HypercertResolver::hypercerts] Error fetching hypercerts: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the metadata field for a hypercert.
   * This field resolver is called automatically when the metadata field is requested in a query.
   *
   * @param hypercert - The hypercert for which to resolve metadata
   * @returns A promise resolving to:
   *          - The associated metadata if found
   *          - null if:
   *            - No URI is available
   *            - No matching metadata is found
   *            - An error occurs during retrieval
   *
   * @example
   * ```graphql
   * query {
   *   hypercerts {
   *     data {
   *       id
   *       metadata {
   *         name
   *         description
   *         work_scope
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver({ nullable: true })
  async metadata(@Root() hypercert: Hypercert) {
    try {
      if (!hypercert.uri) {
        console.warn(
          `[HypercertResolver::metadata] No uri found for hypercert ${hypercert.id}`,
        );
        return null;
      }

      return await this.metadataService.getMetadataSingle({
        where: { uri: { eq: hypercert.uri } },
      });
    } catch (e) {
      console.error(
        `[HypercertResolver::metadata] Error fetching metadata: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the contract field for a hypercert.
   * This field resolver is called automatically when the contract field is requested in a query.
   *
   * @param hypercert - The hypercert for which to resolve contract details
   * @returns A promise resolving to:
   *          - The associated contract if found
   *          - null if:
   *            - No contracts_id is available
   *            - No matching contract is found
   *            - An error occurs during retrieval
   *
   * @example
   * ```graphql
   * query {
   *   hypercerts {
   *     data {
   *       id
   *       contract {
   *         chain_id
   *         contract_address
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver()
  async contract(@Root() hypercert: Hypercert) {
    try {
      if (!hypercert.contracts_id) {
        console.warn(
          `[HypercertResolver::contract] No contract id found for hypercert ${hypercert.id}`,
        );
        return null;
      }

      return await this.contractService.getContract({
        where: { id: { eq: hypercert.contracts_id } },
      });
    } catch (e) {
      console.error(
        `[HypercertResolver::contract] Error fetching contract: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the attestations field for a hypercert.
   * This field resolver is called automatically when the attestations field is requested in a query.
   *
   * @param hypercert - The hypercert for which to resolve attestations
   * @returns A promise resolving to:
   *          - Array of attestations if found
   *          - null if:
   *            - No hypercert id is available
   *            - An error occurs during retrieval
   *
   * @example
   * ```graphql
   * query {
   *   hypercerts {
   *     data {
   *       id
   *       attestations {
   *         data {
   *           id
   *           data
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver()
  async attestations(@Root() hypercert: Hypercert) {
    try {
      if (!hypercert.id) {
        console.warn(
          `[HypercertResolver::attestations] No id found for hypercert`,
        );
        return null;
      }

      return await this.attestationService.getAttestations({
        where: { hypercert: { id: { eq: hypercert.id } } },
      });
    } catch (e) {
      console.error(
        `[HypercertResolver::attestations] Error fetching attestations: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the fractions field for a hypercert.
   * This field resolver is called automatically when the fractions field is requested in a query.
   *
   * @param hypercert - The hypercert for which to resolve fractions
   * @returns A promise resolving to:
   *          - Array of fractions if found
   *          - null if:
   *            - No hypercert_id is available
   *            - An error occurs during retrieval
   *
   * @example
   * ```graphql
   * query {
   *   hypercerts {
   *     data {
   *       id
   *       fractions {
   *         data {
   *           id
   *           units
   *           owner_address
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver()
  async fractions(@Root() hypercert: Hypercert) {
    try {
      if (!hypercert.hypercert_id) {
        console.warn(
          `[HypercertResolver::fractions] No hypercert id found for ${hypercert.id}`,
        );
        return null;
      }

      return await this.fractionService.getFractions({
        where: { hypercert_id: { eq: hypercert.hypercert_id } },
      });
    } catch (e) {
      console.error(
        `[HypercertResolver::fractions] Error fetching fractions: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the orders field for a hypercert.
   * This field resolver is called automatically when the orders field is requested in a query.
   *
   * @param hypercert - The hypercert for which to resolve orders
   * @returns A promise resolving to:
   *          - The associated orders if found
   *          - null if:
   *            - No hypercert_id is available
   *            - An error occurs during retrieval
   *
   * @example
   * ```graphql
   * query {
   *   hypercerts {
   *     data {
   *       id
   *       orders {
   *         data {
   *           id
   *           price
   *           timestamp
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   */
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

  /**
   * Resolves the sales field for a hypercert.
   * This field resolver is called automatically when the sales field is requested in a query.
   *
   * @param hypercert - The hypercert for which to resolve sales history
   * @returns A promise resolving to:
   *          - Array of sales if found
   *          - null if:
   *            - No hypercert_id is available
   *            - An error occurs during retrieval
   *
   * @example
   * ```graphql
   * query {
   *   hypercerts {
   *     data {
   *       id
   *       sales {
   *         data {
   *           id
   *           price
   *           timestamp
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver()
  async sales(@Root() hypercert: Hypercert) {
    try {
      if (!hypercert.hypercert_id) {
        console.warn(
          `[HypercertResolver::sales] No hypercert id found for ${hypercert.id}`,
        );
        return null;
      }

      return await this.salesService.getSales({
        where: { hypercert_id: { eq: hypercert.hypercert_id } },
      });
    } catch (e) {
      console.error(
        `[HypercertResolver::sales] Error fetching sales: ${(e as Error).message}`,
      );
      return null;
    }
  }
}

export { HypercertResolver };
