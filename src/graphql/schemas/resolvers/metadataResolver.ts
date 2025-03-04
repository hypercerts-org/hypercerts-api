import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { MetadataService } from "../../../services/database/entities/MetadataEntityService.js";
import { GetMetadataArgs } from "../args/metadataArgs.js";
import { GetMetadataResponse, Metadata } from "../typeDefs/metadataTypeDefs.js";
import { CachingKyselyService } from "../../../client/kysely.js";

@injectable()
@Resolver(() => Metadata)
class MetadataResolver {
  constructor(
    @inject(MetadataService)
    private metadataService: MetadataService,
    @inject(CachingKyselyService)
    private cachingKyselyService: CachingKyselyService,
  ) {}

  @Query(() => GetMetadataResponse)
  async metadata(@Args() args: GetMetadataArgs) {
    return await this.metadataService.getMetadata(args);
  }

  @FieldResolver(() => String)
  async image(@Root() metadata: Metadata) {
    if (!metadata.uri) {
      return null;
    }

    return await this.cachingKyselyService
      .getConnection()
      .selectFrom("metadata")
      .where("uri", "=", metadata.uri)
      .select("image")
      .executeTakeFirst();
  }
}

export { MetadataResolver };
