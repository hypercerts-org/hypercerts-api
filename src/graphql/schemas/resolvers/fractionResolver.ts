import {
  Args,
  FieldResolver,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Fraction } from "../typeDefs/fractionTypeDefs.js";
import { GetFractionsArgs } from "../args/fractionArgs.js";
import { parseClaimOrFractionId } from "@hypercerts-org/sdk";
import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType({ description: "Fraction of an hypercert" })
export default class GetFractionsResponse extends DataResponse(Fraction) {}

const FractionBaseResolver = createBaseResolver("fraction");

@Resolver(() => Fraction)
class FractionResolver extends FractionBaseResolver {
  @Query(() => GetFractionsResponse)
  async fractions(@Args() args: GetFractionsArgs) {
    return await this.getFractions(args);
  }

  @FieldResolver()
  async metadata(@Root() fraction: Fraction) {
    if (!fraction.claims_id) {
      return;
    }

    return await this.getMetadata(
      {
        where: { hypercerts: { id: { eq: fraction.claims_id } } },
      },
      true,
    );
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
