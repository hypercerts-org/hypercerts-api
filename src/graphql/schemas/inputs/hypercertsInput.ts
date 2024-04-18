import {Field, InputType, Int} from "type-graphql";
import {WhereOptions} from "./whereOptions.js";
import {Hypercert} from "../typeDefs/hypercertTypeDefs.js";
import {NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import {FetchParams} from "./fetchOptions";

@InputType()
export class HypercertsWhereInput implements WhereOptions<Hypercert> {
    @Field(_ => StringSearchOptions, {nullable: true})
    hypercert_id?: StringSearchOptions | null;
    @Field(_ => NumberSearchOptions, {nullable: true})
    creation_block_timestamp?: NumberSearchOptions | null;
    @Field(_ => NumberSearchOptions, {nullable: true})
    token_id?: NumberSearchOptions | null;
}

@InputType()
export class HypercertFetchInput implements FetchParams {
    @Field(_ => Int, {nullable: true})
    offset = 0;
    @Field(_ => Int, {nullable: true})
    limit = 100;
}