import { Args, Field, Int, ObjectType, Query, Resolver } from "type-graphql";
import { Metadata } from "../typeDefs/metadataTypeDefs.js";
import { inject, injectable } from "tsyringe";
import { SupabaseCachingService } from "../../../services/SupabaseCachingService.js";
import { GetMetadataArgs } from "../args/metadataArgs.js";

@ObjectType()
export class GetMetadataResponse {
  @Field(() => [Metadata], { nullable: true })
  data?: Metadata[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@injectable()
@Resolver((_) => Metadata)
class MetadataResolver {
  constructor(
    @inject(SupabaseCachingService)
    private readonly supabaseService: SupabaseCachingService,
  ) {}

  @Query((_) => GetMetadataResponse)
  async metadata(@Args() args: GetMetadataArgs) {
    try {
      const res = await this.supabaseService.getMetadata(args);

      if (!res) {
        console.warn(
          `[MetadataResolver::metadata] Error fetching metadata: `,
          res,
        );
        return { data: [] };
      }

      const { data, error, count } = res;

      if (error) {
        console.warn(
          `[MetadataResolver::metadata] Error found while fetching metadata: `,
          error,
        );
      }

      console.log(data);

      return { data, count: count ? count : data?.length };
    } catch (e) {
      throw new Error(
        `[MetadataResolver::metadata] Unexpected error fetching metadata: ${(e as Error).message}`,
      );
    }
  }
}

export { MetadataResolver };
