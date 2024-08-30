import { Args, ObjectType, Query, Resolver } from "type-graphql";
import { Metadata } from "../typeDefs/metadataTypeDefs.js";
import { GetMetadataArgs } from "../args/metadataArgs.js";
import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType()
export class GetMetadataResponse extends DataResponse(Metadata) {}

const MetadataBaseResolver = createBaseResolver("metadata");

@Resolver(() => Metadata)
class MetadataResolver extends MetadataBaseResolver {
  @Query(() => GetMetadataResponse)
  async metadata(@Args() args: GetMetadataArgs) {
    const res = await this.getMetadata(args);

    const data = Array.isArray(res) ? res : [];

    return { data, count: data.length };
  }
}

export { MetadataResolver };
