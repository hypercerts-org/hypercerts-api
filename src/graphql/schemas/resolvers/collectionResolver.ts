import { Args, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { inject, injectable } from "tsyringe";
import { Order } from "../typeDefs/orderTypeDefs.js";
import { SupabaseDataService } from "../../../services/SupabaseDataService.js";
import {Collection} from "../typeDefs/collectionTypeDefs.js";
import {GetCollectionArgs} from "../args/collectionArgs.js";

@ObjectType()
export default class GetCollectionsResponse {
  @Field(() => [Collection], { nullable: true })
  data?: Collection[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@injectable()
@Resolver((_) => Order)
class CollectionResolver {
  constructor(
    @inject(SupabaseDataService)
    private readonly supabaseService: SupabaseDataService,
  ) {}

  @Query((_) => GetCollectionsResponse)
  async collections(@Args() args: GetCollectionArgs) {
    try {
      const res = await this.supabaseService.getCollections(args)

      const { data, error, count } = res;

      if (error) {
        console.warn(
          `[CollectionResolver::collections] Error fetching collections: `,
          error,
        );
        return { data };
      }

      return { data, count: count ? count : data?.length };
    } catch (e) {
      throw new Error(
        `[CollectionResolver::collections] Error fetching collections: ${(e as Error).message}`,
      );
    }
  }

}

export { CollectionResolver };
