import {
  Args,
  Field,
  FieldResolver,
  Int,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { inject, injectable } from "tsyringe";
import { SupabaseCachingService } from "../../../services/SupabaseCachingService.js";
import { Fraction } from "../typeDefs/fractionTypeDefs.js";
import { GetFractionArgs } from "../args/fractionArgs.js";
import { SupabaseDataService } from "../../../services/SupabaseDataService.js";

@ObjectType()
export default class GetFractionsResponse {
  @Field(() => [Fraction], { nullable: true })
  data?: Fraction[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@injectable()
@Resolver((_) => Fraction)
class FractionResolver {
  constructor(
    @inject(SupabaseCachingService)
    private readonly supabaseCachingService: SupabaseCachingService,
    @inject(SupabaseDataService)
    private readonly supabaseDataService: SupabaseDataService,
  ) {}

  @Query((_) => GetFractionsResponse)
  async fractions(@Args() args: GetFractionArgs) {
    try {
      const res = await this.supabaseDataService.getOrders(args);

      const { data, error, count } = res;

      if (error) {
        console.warn(
          `[FractionResolver::fractions] Error fetching fractions: `,
          error,
        );
      }

      return { data, count };
    } catch (e) {
      throw new Error(
        `[FractionResolver::fractions] Error fetching fractions: ${(e as Error).message}`,
      );
    }
  }

  @FieldResolver()
  async orders(@Root() fraction: Partial<Fraction>) {
    if (!fraction.id) {
      return null;
    }

    try {
      const res = await this.supabaseDataService.getOrdersForFraction(
        fraction.id,
      );

      if (!res) {
        console.warn(
          `[FractionResolver::orders] Error fetching orders for fraction ${fraction.id}: `,
          res,
        );
        return { data: [] };
      }

      const { data, error } = res;

      if (error) {
        console.warn(
          `[FractionResolver::orders] Error fetching orders for fraction ${fraction.id}: `,
          error,
        );
        return { data: [] };
      }

      // TODO: Get proper count instead of length
      return { data: data || [], count: data?.length };
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `[FractionResolver::orders] Error fetching orders for fraction ${fraction.id}: ${error.message}`,
      );
    }
  }
}

export { FractionResolver };
