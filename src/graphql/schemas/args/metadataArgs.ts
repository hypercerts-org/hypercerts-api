import {ArgsType, Field} from "type-graphql";
import {MetadataFetchInput, MetadataWhereInput} from "../inputs/metadataInput.js";

@ArgsType()
export class GetMetadataArgs {
    @Field({nullable: true})
    where?: MetadataWhereInput;
    @Field({nullable: true})
    page?: MetadataFetchInput
}


@ArgsType()
export class GetMetadataByUriArgs {
    @Field()
    uri?: string;
}