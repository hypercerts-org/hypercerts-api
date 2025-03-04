import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import {
  Fraction,
  GetFractionsResponse,
} from "../typeDefs/fractionTypeDefs.js";
import { GetFractionsArgs } from "../args/fractionArgs.js";
import { parseClaimOrFractionId } from "@hypercerts-org/sdk";
import { inject, injectable } from "tsyringe";
import { FractionService } from "../../../services/database/entities/FractionEntityService.js";
import { MetadataService } from "../../../services/database/entities/MetadataEntityService.js";
import { SalesService } from "../../../services/database/entities/SalesEntityService.js";
import { MarketplaceOrdersService } from "../../../services/database/entities/MarketplaceOrdersEntityService.js";

@injectable()
@Resolver(() => Fraction)
class FractionResolver {
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

  @Query(() => GetFractionsResponse)
  async fractions(@Args() args: GetFractionsArgs) {
    return await this.fractionsService.getFractions(args);
  }

  @FieldResolver()
  async metadata(@Root() fraction: Fraction) {
    if (!fraction.claims_id) {
      return;
    }

    return await this.metadataService.getMetadataSingle({
      where: { hypercerts: { id: { eq: fraction.claims_id } } },
    });
  }

  @FieldResolver()
  async orders(@Root() fraction: Fraction) {
    if (!fraction.fraction_id) {
      return null;
    }

    const { id } = parseClaimOrFractionId(fraction.fraction_id);

    if (!id) {
      console.warn(
        `[FractionResolver::orders] Error parsing hypercert_id for fraction ${fraction.id}`,
      );
      return null;
    }

    try {
      return this.marketplaceOrdersService.getOrders({
        where: {
          itemIds: {
            arrayContains: [id.toString()],
          },
        },
      });
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `[FractionResolver::orders] Error fetching orders for fraction ${fraction.id}: ${error.message}`,
      );
    }
  }

  @FieldResolver()
  async sales(@Root() fraction: Fraction) {
    if (!fraction.fraction_id) {
      return null;
    }

    const { id } = parseClaimOrFractionId(fraction.fraction_id);

    if (!id) {
      console.warn(
        `[FractionResolver::sales] Error parsing hypercert_id for fraction ${fraction.id}`,
      );
      return null;
    }

    try {
      return this.salesService.getSales({
        where: {
          token_id: {
            arrayContains: [id.toString()],
          },
        },
      });
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `[FractionResolver::sales] Error fetching sales for fraction ${fraction.id}: ${error.message}`,
      );
    }
  }
}

export { FractionResolver };
