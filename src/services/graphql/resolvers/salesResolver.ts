import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { HypercertsService } from "../../database/entities/HypercertsEntityService.js";
import { SalesService } from "../../database/entities/SalesEntityService.js";
import { GetSalesArgs } from "../../../graphql/schemas/args/salesArgs.js";
import {
  Sale,
  GetSalesResponse,
} from "../../../graphql/schemas/typeDefs/salesTypeDefs.js";

/**
 * Resolver for handling sales-related GraphQL queries and field resolvers.
 * This resolver provides functionality to:
 * 1. Query sales with filtering and pagination
 * 2. Resolve the associated hypercert for a sale
 */
@injectable()
@Resolver(() => Sale)
class SalesResolver {
  constructor(
    @inject(SalesService)
    private salesService: SalesService,
    @inject(HypercertsService)
    private hypercertsService: HypercertsService,
  ) {}

  /**
   * Query resolver for fetching sales with optional filtering and pagination.
   *
   * @param args - Query arguments including where conditions, sorting, and pagination
   * @returns A promise resolving to:
   *          - Object containing sales data and count if successful
   *          - null if an error occurs during retrieval
   *
   * @example
   * ```graphql
   * query {
   *   sales(
   *     where: { hypercert_id: { eq: "123" } }
   *     first: 10
   *     offset: 0
   *   ) {
   *     data {
   *       id
   *       buyer
   *       seller
   *       hypercert {
   *         id
   *       }
   *     }
   *     count
   *   }
   * }
   * ```
   */
  @Query(() => GetSalesResponse)
  async sales(@Args() args: GetSalesArgs) {
    try {
      return await this.salesService.getSales(args);
    } catch (e) {
      console.error(
        `[SalesResolver::sales] Error fetching sales: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Field resolver for the hypercert associated with a sale.
   * This resolver is called automatically when the hypercert field is requested in a query.
   *
   * @param sale - The sale for which to resolve the associated hypercert
   * @returns A promise resolving to:
   *          - The associated hypercert if found
   *          - null if:
   *            - No hypercert_id is available
   *            - The hypercert is not found
   *            - An error occurs during retrieval
   *
   * @example
   * ```graphql
   * query {
   *   sales {
   *     data {
   *       id
   *       hypercert {
   *         id
   *         hypercert_id
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver({ nullable: true })
  async hypercert(@Root() sale: Sale) {
    if (!sale.hypercert_id) {
      console.warn(`[SalesResolver::hypercert_id] Missing hypercert_id`);
      return null;
    }

    try {
      const [hypercert, metadata] = await Promise.all([
        this.hypercertsService.getHypercert({
          where: {
            hypercert_id: { eq: sale.hypercert_id },
          },
        }),
        this.hypercertsService.getHypercertMetadata({
          hypercert_id: sale.hypercert_id,
        }),
      ]);

      if (!hypercert) {
        return null;
      }

      return {
        ...hypercert,
        metadata: metadata || null,
      };
    } catch (e) {
      console.error(
        `[SalesResolver::hypercert] Error fetching hypercert: ${(e as Error).message}`,
      );
      return null;
    }
  }
}

export { SalesResolver };
