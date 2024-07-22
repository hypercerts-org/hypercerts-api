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
import { Order } from "../typeDefs/orderTypeDefs.js";
import { SupabaseDataService } from "../../../services/SupabaseDataService.js";
import { GetOrdersArgs } from "../args/orderArgs.js";
import { SupabaseCachingService } from "../../../services/SupabaseCachingService.js";
import { GraphQLBigInt } from "graphql-scalars";
import { getHypercertTokenId } from "../../../utils/tokenIds.js";
import { HypercertBaseType } from "../typeDefs/baseTypes/hypercertBaseType.js";

@ObjectType()
export default class GetOrdersResponse {
  @Field(() => [Order], { nullable: true })
  data?: Order[];

  @Field(() => Int, { nullable: true })
  count?: number;

  @Field(() => GraphQLBigInt, { nullable: true })
  totalUnitsForSale?: bigint;

  @Field(() => GraphQLBigInt, { nullable: true })
  lowestAvailablePrice?: bigint;
}

@injectable()
@Resolver(() => Order)
class OrderResolver {
  constructor(
    @inject(SupabaseDataService)
    private readonly supabaseService: SupabaseDataService,
    @inject(SupabaseCachingService)
    private readonly supabaseCachingService: SupabaseCachingService,
  ) {}

  @Query(() => GetOrdersResponse)
  async orders(@Args() args: GetOrdersArgs) {
    try {
      const res = await this.supabaseService.getOrders(args);

      const { data, error, count } = res;

      if (error) {
        console.warn(
          `[ContractResolver::orders] Error fetching orders: `,
          error,
        );
        return { data };
      }

      return { data, count: count ? count : data?.length };
    } catch (e) {
      throw new Error(
        `[ContractResolver::orders] Error fetching orders: ${(e as Error).message}`,
      );
    }
  }

  @FieldResolver({ nullable: true })
  async hypercert(@Root() order: Order) {
    const tokenId = order.itemIds?.[0];
    const collectionId = order.collection;
    const chainId = order.chainId;

    if (!tokenId || !collectionId || !chainId) {
      console.warn(
        `[OrderResolver::hypercert] Missing tokenId or collectionId`,
      );
      return null;
    }

    const hypercertId = getHypercertTokenId(BigInt(tokenId));
    const formattedHypercertId = `${chainId}-${collectionId}-${hypercertId.toString()}`;
    const hypercert = await this.supabaseCachingService.getHypercerts({
      where: {
        hypercert_id: {
          eq: formattedHypercertId,
        },
      },
    });

    if (!hypercert) {
      console.warn(
        `[OrderResolver::hypercert] No hypercert found for tokenId: ${tokenId}`,
      );
      return null;
    }

    const { data, error } = hypercert;
    if (error) {
      console.warn(
        `[OrderResolver::hypercert] Error fetching hypercert: `,
        error,
      );
      return null;
    }

    const metadata = await this.supabaseCachingService.getMetadata({
      where: {
        uri: {
          eq: (data?.[0] as HypercertBaseType)?.uri,
        },
      },
    });

    if (!metadata) {
      console.warn(
        `[OrderResolver::hypercert] No metadata found for tokenId: ${tokenId}`,
      );
      return null;
    }

    const { data: metadataData, error: metadataError } = metadata;

    if (metadataError) {
      console.warn(
        `[OrderResolver::hypercert] Error fetching metadata: `,
        metadataError,
      );
      return null;
    }

    if (!metadataData) {
      console.warn(
        `[OrderResolver::hypercert] No metadata found for tokenId: ${tokenId}`,
      );
      return null;
    }

    const resultOrder = data?.[0] as HypercertBaseType;

    return {
      ...resultOrder,
      metadata: metadataData?.[0] || null,
    };
  }
}

export { OrderResolver };
