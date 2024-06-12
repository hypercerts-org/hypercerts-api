import {ArgsType, Field, InputType} from "type-graphql";
import {BasicMetadataWhereInput, MetadataFetchInput} from "../inputs/metadataInput.js";
import {PaginationArgs} from "./paginationArgs.js";
import {BasicHypercertWhereInput} from "../inputs/hypercertsInput.js";

@InputType()
export class MetadataWhereInput extends BasicMetadataWhereInput {
    @Field(_ => BasicHypercertWhereInput, {nullable: true})
    hypercerts?: BasicHypercertWhereInput;
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