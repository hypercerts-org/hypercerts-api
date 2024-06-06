import {ArgsType, Field, InputType} from "type-graphql";
import {BasicMetadataWhereInput, MetadataFetchInput} from "../inputs/metadataInput.js";
import {PaginationArgs} from "./paginationArgs.js";
import {BasicHypercertWhereInput} from "../inputs/hypercertsInput.js";

@InputType()
export class MetadataWhereInput extends BasicHypercertWhereInput {
    @Field(_ => BasicMetadataWhereInput, {nullable: true})
    metadata?: BasicMetadataWhereInput;
}

@ArgsType()
export class GetMetadataArgs extends PaginationArgs {
    @Field({nullable: true})
    where?: MetadataWhereInput;
    @Field({nullable: true})
    sort?: MetadataFetchInput
}


@ArgsType()
export class GetMetadataByUriArgs {
    @Field()
    uri?: string;
}