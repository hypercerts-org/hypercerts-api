import {Field, InputType, Int} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {StringArraySearchOptions, StringSearchOptions} from "./searchOptions.js";
import {Metadata} from "../typeDefs/metadataTypeDefs.js";
import {FetchParams} from "./fetchOptions.js";

@InputType()
export class MetadataWhereInput implements WhereOptions<Metadata> {
    @Field(_ => StringSearchOptions, {nullable: true})
    name?: StringSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    description?: StringSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    uri?: StringSearchOptions | null;
    @Field(_ => StringArraySearchOptions, {nullable: true})
    contributors?: StringArraySearchOptions | null;
    @Field(_ => StringArraySearchOptions, {nullable: true})
    work_scope?: StringArraySearchOptions | null;
    @Field(_ => StringArraySearchOptions, {nullable: true})
    impact_scope?: StringArraySearchOptions | null;
}

@InputType()
export class MetadataFetchInput implements FetchParams {
    @Field(_ => Int, {nullable: true})
    offset = 0;
    @Field(_ => Int, {nullable: true})
    limit = 100;
}