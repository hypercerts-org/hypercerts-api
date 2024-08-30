import {Field, InputType} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {Hypercert} from "../typeDefs/hypercertTypeDefs.js";
import {IdSearchOptions, NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import {type OrderOptions} from "./orderOptions.js";
import {HypercertSortOptions} from "./sortOptions.js";

@InputType()
export class BasicHypercertWhereInput implements WhereOptions<Hypercert> {
    @Field(() => IdSearchOptions, {nullable: true})
    id?: IdSearchOptions
    @Field(() => NumberSearchOptions, {nullable: true})
    creation_block_timestamp?: NumberSearchOptions;
    @Field(() => NumberSearchOptions, {nullable: true})
    creation_block_number?: NumberSearchOptions;
    @Field(() => NumberSearchOptions, {nullable: true})
    last_update_block_number?: NumberSearchOptions;
    @Field(() => NumberSearchOptions, {nullable: true})
    last_update_block_timestamp?: NumberSearchOptions;
    @Field(() => NumberSearchOptions, {nullable: true})
    token_id?: NumberSearchOptions;
    @Field(() => StringSearchOptions, {nullable: true})
    creator_address?: StringSearchOptions;
    @Field(() => StringSearchOptions, {nullable: true})
    uri?: StringSearchOptions;
    @Field(() => StringSearchOptions, {nullable: true})
    hypercert_id?: StringSearchOptions;
}

@InputType()
export class HypercertFetchInput implements OrderOptions<Hypercert> {
    @Field(() => HypercertSortOptions, {nullable: true})
    by?: HypercertSortOptions
}
