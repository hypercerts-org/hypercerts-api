import {Field, InputType} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {Hypercert} from "../typeDefs/hypercertTypeDefs.js";
import {IdSearchOptions, NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import {type OrderOptions} from "./orderOptions.js";
import {HypercertSortOptions} from "./sortOptions.js";

@InputType()
export class BasicHypercertWhereInput implements WhereOptions<Hypercert> {
    @Field(_ => IdSearchOptions, {nullable: true})
    id?: IdSearchOptions
    @Field(_ => NumberSearchOptions, {nullable: true})
    block_number?: NumberSearchOptions;
    @Field(_ => NumberSearchOptions, {nullable: true})
    token_id?: NumberSearchOptions;
    @Field(_ => StringSearchOptions, {nullable: true})
    owner_address?: StringSearchOptions;
    @Field(_ => StringSearchOptions, {nullable: true})
    creator_address?: StringSearchOptions;
    @Field(_ => StringSearchOptions, {nullable: true})
    uri?: StringSearchOptions;
    @Field(_ => StringSearchOptions, {nullable: true})
    hypercert_id?: StringSearchOptions;
}

@InputType()
export class HypercertFetchInput implements OrderOptions<Hypercert> {
    @Field(_ => HypercertSortOptions, {nullable: true})
    by?: HypercertSortOptions
}
