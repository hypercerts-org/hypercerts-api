import { Args, ObjectType, Query, Resolver } from "type-graphql";
import { Metadata } from "../typeDefs/metadataTypeDefs.js";
import { GetMetadataArgs } from "../args/metadataArgs.js";
import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType()
export class GetMetadataResponse extends DataResponse(Metadata) {
}

const MetadataBaseResolver = createBaseResolver("metadata", Metadata, "caching");

@Resolver(() => Metadata)
class MetadataResolver extends MetadataBaseResolver {

  @Query(() => GetMetadataResponse)
  async metadata(
    @Args() args: GetMetadataArgs
  ) {
    const res = await this.getMetadata(args);

    return { data: res, count: res?.length };
  }

}

export { MetadataResolver };