import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import {
  Fraction,
  GetFractionsResponse,
} from "../../../graphql/schemas/typeDefs/fractionTypeDefs.js";
import { GetFractionsArgs } from "../../../graphql/schemas/args/fractionArgs.js";
import { parseClaimOrFractionId } from "@hypercerts-org/sdk";
import { inject, injectable } from "tsyringe";
import { FractionService } from "../../database/entities/FractionEntityService.js";
import { MetadataService } from "../../database/entities/MetadataEntityService.js";
import { SalesService } from "../../database/entities/SalesEntityService.js";
import { MarketplaceOrdersService } from "../../database/entities/MarketplaceOrdersEntityService.js";

/**
 * GraphQL resolver for Fraction operations.
 * Handles queries for fractions and resolves related fields like metadata, orders, and sales.
 *
 * This resolver provides:
 * - Query for fetching fractions with optional filtering
 * - Field resolution for metadata associated with the fraction's claim
 * - Field resolution for marketplace orders related to the fraction
 * - Field resolution for sales history of the fraction
 *
 * Each fraction represents a portion of a hypercert, with its own unique identifiers
 * and relationships to other entities in the system.
 *
 * Error Handling:
 * All resolvers follow the GraphQL best practice of returning partial data instead of throwing errors.
 * If an operation fails, it will:
 * - Log the error internally for monitoring
 * - Return null/empty data to the client
 * - Include error information in the GraphQL response errors array
 *
 * @injectable Marks the class as injectable for dependency injection with tsyringe
 * @resolver Marks the class as a GraphQL resolver for the Fraction type
 */
@injectable()
@Resolver(() => Fraction)
class FractionResolver {
  /**
   * Creates a new instance of FractionResolver.
   *
   * @param fractionsService - Service for handling fraction operations
   * @param metadataService - Service for handling metadata operations
   * @param salesService - Service for handling sales operations
   * @param marketplaceOrdersService - Service for handling marketplace orders operations
   */
  constructor(
    @inject(FractionService)
    private fractionsService: FractionService,
    @inject(MetadataService)
    private metadataService: MetadataService,
    @inject(SalesService)
    private salesService: SalesService,
    @inject(MarketplaceOrdersService)
    private marketplaceOrdersService: MarketplaceOrdersService,
  ) {}

  /**
   * Queries fractions based on provided arguments.
   * Returns both the matching fractions and a total count.
   *
   * @param args - Query arguments for filtering fractions
   * @returns A promise that resolves to an object containing:
   *          - data: Array of fractions matching the query
   *          - count: Total number of matching fractions
   * @throws {Error} If the database query fails
   *
   * @example
   * Query with filtering:
   * ```graphql
   * query {
   *   fractions(
   *     where: {
   *       hypercert_id: { eq: "1-0x1234...5678-1" },
   *       owner_address: { eq: "0xabcd...efgh" }
   *     }
   *   ) {
   *     data {
   *       id
   *       units
   *       owner_address
   *     }
   *     count
   *   }
   * }
   * ```
   */
  @Query(() => GetFractionsResponse)
  async fractions(@Args() args: GetFractionsArgs) {
    try {
      return await this.fractionsService.getFractions(args);
    } catch (e) {
      console.error(
        `[FractionResolver::fractions] Error fetching fractions: ${(e as Error).message}`,
      );
      // Return empty result instead of throwing
      return {
        data: [],
        count: 0,
      };
    }
  }

  /**
   * Resolves the metadata field for a fraction.
   * Retrieves metadata associated with the fraction's claim.
   *
   * @param fraction - The fraction for which to resolve metadata
   * @returns A promise that resolves to the metadata object or undefined if:
   *          - The fraction has no claims_id
   *          - No metadata is found for the claim
   * @throws {Error} If the metadata service query fails
   *
   * @example
   * Query with metadata field:
   * ```graphql
   * query {
   *   fractions {
   *     data {
   *       id
   *       metadata {
   *         name
   *         description
   *         image
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver()
  async metadata(@Root() fraction: Fraction) {
    if (!fraction.claims_id) {
      return null;
    }

    try {
      return await this.metadataService.getMetadataSingle({
        where: { hypercerts: { id: { eq: fraction.claims_id } } },
      });
    } catch (e) {
      console.error(
        `[FractionResolver::metadata] Error fetching metadata for fraction ${fraction.id}: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the orders field for a fraction.
   * Retrieves marketplace orders associated with the fraction.
   *
   * @param fraction - The fraction for which to resolve orders
   * @returns A promise that resolves to an object containing:
   *          - data: Array of orders related to the fraction
   *          - count: Total number of related orders
   *          Returns undefined if:
   *          - The fraction has no fraction_id
   *          - The fraction_id cannot be parsed
   * @throws {Error} If the marketplace orders service query fails
   *
   * @example
   * Query with orders field:
   * ```graphql
   * query {
   *   fractions {
   *     data {
   *       id
   *       orders {
   *         data {
   *           id
   *           price
   *           status
   *         }
   *         count
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver()
  async orders(@Root() fraction: Fraction) {
    if (!fraction.fraction_id) {
      return null;
    }

    const { id } = parseClaimOrFractionId(fraction.fraction_id);

    if (!id) {
      console.warn(
        `[FractionResolver::orders] Error parsing fraction_id for fraction ${fraction.id}`,
      );
      return null;
    }

    try {
      return await this.marketplaceOrdersService.getOrders({
        where: {
          itemIds: {
            arrayContains: [id.toString()],
          },
        },
      });
    } catch (e) {
      console.error(
        `[FractionResolver::orders] Error fetching orders for fraction ${fraction.id}: ${(e as Error).message}`,
      );
      // Return empty result instead of throwing
      return {
        data: [],
        count: 0,
      };
    }
  }

  /**
   * Resolves the sales field for a fraction.
   * Retrieves sales history associated with the fraction.
   *
   * @param fraction - The fraction for which to resolve sales
   * @returns A promise that resolves to an object containing:
   *          - data: Array of sales related to the fraction
   *          - count: Total number of related sales
   *          Returns undefined if:
   *          - The fraction has no fraction_id
   *          - The fraction_id cannot be parsed
   * @throws {Error} If the sales service query fails
   *
   * @example
   * Query with sales field:
   * ```graphql
   * query {
   *   fractions {
   *     data {
   *       id
   *       sales {
   *         data {
   *           id
   *           price
   *           timestamp
   *         }
   *         count
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver()
  async sales(@Root() fraction: Fraction) {
    if (!fraction.fraction_id) {
      return null;
    }

    const { id } = parseClaimOrFractionId(fraction.fraction_id);

    if (!id) {
      console.warn(
        `[FractionResolver::sales] Error parsing fraction_id for fraction ${fraction.id}`,
      );
      return null;
    }

    try {
      return await this.salesService.getSales({
        where: {
          item_ids: {
            arrayContains: [id.toString()],
          },
        },
      });
    } catch (e) {
      console.error(
        `[FractionResolver::sales] Error fetching sales for fraction ${fraction.id}: ${(e as Error).message}`,
      );
      // Return empty result instead of throwing
      return {
        data: [],
        count: 0,
      };
    }
  }
}

export { FractionResolver };
