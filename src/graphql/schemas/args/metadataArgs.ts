import {ArgsType, Field} from "type-graphql";
import {MetadataFetchInput, MetadataWhereInput} from "../inputs/metadataInput.js";
import {PaginationArgs} from "./paginationArgs.js";

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