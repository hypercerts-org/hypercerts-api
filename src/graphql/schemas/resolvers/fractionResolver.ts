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
import { parseClaimOrFractionId } from "@hypercerts-org/sdk";

@ObjectType()
export default class GetFractionsResponse {
  @Field(() => [Fraction], { nullable: true })
  data?: Fraction[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@injectable()
@Resolver(() => Fraction)
class FractionResolver {
  constructor(
    @inject(SupabaseCachingService)
    private readonly supabaseCachingService: SupabaseCachingService,
    @inject(SupabaseDataService)
    private readonly supabaseDataService: SupabaseDataService,
  ) {}

  @Query(() => GetFractionsResponse)
  async fractions(@Args() args: GetFractionArgs) {
    try {
      const res = await this.supabaseCachingService.getFractions(args);

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
      const res = await this.supabaseDataService.getOrdersForFraction(
        id.toString(),
      );

      if (!res) {
        console.warn(
          `[FractionResolver::orders] Error fetching orders for fraction ${fraction.id}: `,
          res,
        );
        return { data: [] };
      }

      const { data, error, count } = res;

      if (error) {
        console.warn(
          `[FractionResolver::orders] Error fetching orders for fraction ${fraction.id}: `,
          error,
        );
        return { data: [] };
      }

      return { data: data || [], count: count || 0 };
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `[FractionResolver::orders] Error fetching orders for fraction ${fraction.id}: ${error.message}`,
      );
    }
  }

  @FieldResolver()
  async metadata(@Root() fraction: Partial<Fraction>) {
    if (!fraction.claims_id) {
      console.log(
        `[FractionResolver::metadata] No claims_id for fraction ${fraction.id}`,
      );
      return null;
    }

    try {
      console.log(
        `[FractionResolver::metadata] Fetching metadata for fraction ${fraction.id} on claims ${fraction.claims_id}`,
      );
      const res = await this.supabaseCachingService
        .getMetadata({
          where: { hypercerts: { id: { eq: fraction.claims_id } } },
        })
        .maybeSingle();

      if (!res) {
        console.warn(
          `[FractionResolver::metadata] Error fetching metadata for fraction ${fraction.id}: `,
          res,
        );
        return;
      }

      const { data, error } = res;

      if (error) {
        console.warn(
          `[FractionResolver::metadata] Error found fetching metadata for fraction ${fraction.id}: `,
          error,
        );
        return;
      }

      console.log(data);

      return data;
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `[FractionResolver::metadata] Unexpected error fetching metadata for fraction ${fraction.id}: ${error.message}`,
      );
    }
  }

  @FieldResolver()
  async sales(@Root() fraction: Partial<Fraction>) {
    if (!fraction.fraction_id) {
      return null;
    }

    const { id } = parseClaimOrFractionId(fraction.fraction_id);

    console.log("FRACTION ID", id);

    if (!id) {
      console.warn(
        `[FractionResolver::sales] Error parsing hypercert_id for fraction ${fraction.id}`,
      );
      return null;
    }

    try {
      const res = await this.supabaseCachingService.getSalesForTokenIds([id]);

      if (!res) {
        console.warn(
          `[FractionResolver::sales] Error fetching sales for fraction ${fraction.id}: `,
          res,
        );
        return { data: [] };
      }

      const { data, error, count } = res;

      if (error) {
        console.warn(
          `[FractionResolver::sales] Error fetching sales for fraction ${fraction.id}: `,
          error,
        );
        return { data: [] };
      }

      return { data: data || [], count: count || 0 };
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `[FractionResolver::sales] Error fetching sales for fraction ${fraction.id}: ${error.message}`,
      );
    }
  }
}

export { FractionResolver };
