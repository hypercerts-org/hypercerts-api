import { ArgsType, Field, InputType } from "type-graphql";
import { BasicMetadataWhereInput } from "../inputs/metadataInput.js";
import { withPagination } from "./baseArgs.js";
import { BasicHypercertWhereArgs } from "../inputs/hypercertsInput.js";
import type { OrderOptions } from "../inputs/orderOptions.js";
import { Metadata } from "../typeDefs/metadataTypeDefs.js";
import { MetadataSortOptions } from "../inputs/sortOptions.js";

@InputType()
export class MetadataWhereInput extends BasicMetadataWhereInput {
  @Field(() => BasicHypercertWhereArgs, { nullable: true })
  hypercerts?: BasicHypercertWhereArgs;
}

@InputType()
export class MetadataFetchInput implements OrderOptions<Metadata> {
  @Field(() => MetadataSortOptions, { nullable: true })
  by?: MetadataSortOptions;
}

@ArgsType()
export class MetadataArgs {
  @Field(() => MetadataWhereInput, { nullable: true })
  where?: MetadataWhereInput;
  @Field(() => MetadataFetchInput, { nullable: true })
  sort?: MetadataFetchInput;
}

@ArgsType()
export class GetMetadataArgs extends withPagination(MetadataArgs) {}
