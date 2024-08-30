import { ArgsType, Field, InputType } from "type-graphql";
import { BasicMetadataWhereInput, MetadataFetchInput } from "../inputs/metadataInput.js";
import { BasicHypercertWhereInput } from "../inputs/hypercertsInput.js";
import { withPagination } from "./baseArgs.js";

@InputType()
export class MetadataWhereInput extends BasicMetadataWhereInput {
  @Field(() => BasicHypercertWhereInput, { nullable: true })
  hypercerts?: BasicHypercertWhereInput;
}

@ArgsType()
export class MetadataArgs {
  @Field({ nullable: true })
  where?: MetadataWhereInput;
  @Field({ nullable: true })
  sort?: MetadataFetchInput;
}

@ArgsType()
export class GetMetadataArgs extends withPagination(MetadataArgs) {
}
