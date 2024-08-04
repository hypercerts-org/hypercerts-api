import { Args, Field, FieldResolver, Int, ObjectType, Query, Resolver, Root } from "type-graphql";
import { inject, injectable } from "tsyringe";
import { Sale } from "../typeDefs/salesTypeDefs.js";
import { SupabaseCachingService } from "../../../services/SupabaseCachingService.js";
import { GetSalesArgs } from "../args/salesArgs.js";
import { HypercertBaseType } from "../typeDefs/baseTypes/hypercertBaseType.js";

@ObjectType()
export default class GetSalesResponse {
  @Field(() => [Sale], { nullable: true })
  data?: Sale[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@injectable()
@Resolver(() => Sale)
class SalesResolver {
  constructor(
    @inject(SupabaseCachingService)
    private readonly supabaseCachingService: SupabaseCachingService
  ) {
  }

  @Query(() => GetSalesResponse)
  async sales(@Args() args: GetSalesArgs) {
    try {
      const res = await this.supabaseCachingService.getSales(args);

      const { data, error, count } = res;

      if (error) {
        console.warn(`[SalesResolver::sales] Error fetching sales: `, error);
        return { data };
      }

      return { data, count: count ? count : data?.length };
    } catch (e) {
      throw new Error(
        `[SalesResolver::sales] Error fetching sales: ${(e as Error).message}`
      );
    }
  }

  @FieldResolver({ nullable: true })
  async hypercert(@Root() sale: Sale) {
    if (!sale.hypercert_id) {
      console.warn(
        `[SalesResolver::hypercert_id] Missing hypercert_id`
      );
      return null;
    }

    const hypercertId = sale.hypercert_id;
    const hypercert = await this.supabaseCachingService.getHypercerts({
      where: {
        hypercert_id: {
          eq: hypercertId
        }
      }
    });

    if (!hypercert) {
      console.warn(
        `[SalesResolver::hypercert] No hypercert found for hypercertId: ${hypercertId}`
      );
      return null;
    }

    const { data: hypercertData, error } = hypercert;
    if (error) {
      console.warn(
        `[SalesResolver::hypercert] Error fetching hypercert: `,
        error
      );
      return null;
    }

    const resultSale = hypercertData?.[0] as HypercertBaseType;

    if (!resultSale) {
      console.warn(
        `[SalesResolver::hypercert] No hypercert found for hypercertId: ${hypercertId}`
      );
      return null;
    }

    const uri = (hypercertData?.[0] as HypercertBaseType)?.uri;

    const metadata = await this.supabaseCachingService.getMetadata({
      where: {
        uri: {
          eq: uri
        }
      }
    });

    if (!metadata) {
      console.warn(
        `[SalesResolver::hypercert] No metadata found for uri: ${uri}`
      );
      return null;
    }

    const { data: metadataData, error: metadataError } = metadata;

    if (metadataError) {
      console.warn(
        `[SalesResolver::hypercert] Error fetching metadata: `,
        metadataError
      );
      return null;
    }

    if (!metadataData) {
      console.warn(
        `[SalesResolver::hypercert] No metadata found for uri: ${uri}`
      );
      return null;
    }

    return {
      ...resultSale,
      metadata: metadataData?.[0] || null
    };
  }
}

export { SalesResolver };
