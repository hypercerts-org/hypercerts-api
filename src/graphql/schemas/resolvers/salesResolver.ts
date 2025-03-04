import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { HypercertsService } from "../../../services/database/entities/HypercertsEntityService.js";
import { SalesService } from "../../../services/database/entities/SalesEntityService.js";
import { GetSalesArgs } from "../args/salesArgs.js";
import { Sale, GetSalesResponse } from "../typeDefs/salesTypeDefs.js";
@injectable()
@Resolver(() => Sale)
class SalesResolver {
  constructor(
    @inject(SalesService)
    private salesService: SalesService,
    @inject(HypercertsService)
    private hypercertsService: HypercertsService,
  ) {}

  @Query(() => GetSalesResponse)
  async sales(@Args() args: GetSalesArgs) {
    return await this.salesService.getSales(args);
  }

  @FieldResolver({ nullable: true })
  async hypercert(@Root() sale: Sale) {
    if (!sale.hypercert_id) {
      console.warn(`[SalesResolver::hypercert_id] Missing hypercert_id`);
      return null;
    }

    return await this.hypercertsService.getHypercert({
      where: {
        hypercert_id: {
          eq: sale.hypercert_id,
        },
      },
    });
  }
}

export { SalesResolver };
