import { Args, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { inject, injectable } from "tsyringe";
import { SupabaseCachingService } from "../../../services/SupabaseCachingService.js";
import { Contract } from "../typeDefs/contractTypeDefs.js";
import { GetContractsArgs } from "../args/contractArgs.js";

@ObjectType()
export default class GetContractsResponse {
  @Field(() => [Contract], { nullable: true })
  data?: Contract[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@injectable()
@Resolver((_) => Contract)
class ContractResolver {
  constructor(
    @inject(SupabaseCachingService)
    private readonly supabaseService: SupabaseCachingService,
  ) {}

  @Query((_) => GetContractsResponse)
  async contracts(@Args() args: GetContractsArgs) {
    try {
      const res = await this.supabaseService.getContracts(args);

      const { data, error, count } = res;

      if (error) {
        console.warn(
          `[ContractResolver::contracts] Error fetching contracts: `,
          error,
        );
        return { data };
      }

      return { data, count: count ? count : data?.length };
    } catch (e) {
      throw new Error(
        `[ContractResolver::contracts] Error fetching contracts: ${(e as Error).message}`,
      );
    }
  }
}

export { ContractResolver };
