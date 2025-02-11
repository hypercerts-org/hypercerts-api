import {
  Args,
  FieldResolver,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { inject, singleton } from "tsyringe";
import { Metadata } from "../typeDefs/metadataTypeDefs.js";
import { GetMetadataArgs } from "../args/metadataArgs.js";
import { createBaseResolver, DataResponse } from "./baseTypes.js";
import { MetadataImageService } from "../../../services/MetadataImageService.js";

@ObjectType()
export class GetMetadataResponse extends DataResponse(Metadata) {}

const MetadataBaseResolver = createBaseResolver("metadata");

@singleton()
@Resolver(() => Metadata)
class MetadataResolver extends MetadataBaseResolver {
  constructor(
    @inject(MetadataImageService) private imageService: MetadataImageService,
  ) {
    super();
  }

  @Query(() => GetMetadataResponse)
  async metadata(@Args() args: GetMetadataArgs) {
    return await this.getMetadataWithoutImage(args);
  }

  @FieldResolver(() => String, {
    nullable: true,
    description: "Base64 encoded representation of the image of the hypercert",
  })
  async image(@Root() metadata: Metadata) {
    if (!metadata.uri) return null;
    return await this.imageService.getImageByUri(metadata.uri);
  }
}

export { MetadataResolver };
