import {Field, InputType} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {
    BooleanSearchOptions,
    IdSearchOptions,
    NumberSearchOptions,
    StringArraySearchOptions,
    StringSearchOptions
} from "./searchOptions.js";
import type {OrderOptions} from "./orderOptions.js";
import {AllowlistRecordSortOptions} from "./sortOptions.js";
import {AllowlistRecord} from "../typeDefs/allowlistRecordTypeDefs.js";

@InputType()
export class BasicAllowlistRecordWhereInput implements WhereOptions<AllowlistRecord> {
    @Field(() => StringSearchOptions, {nullable: true})
    hypercert_id?: StringSearchOptions;
    @Field(() => NumberSearchOptions, {nullable: true})
    token_id?: NumberSearchOptions;
    @Field(() => StringSearchOptions, {nullable: true})
    leaf?: StringSearchOptions;
    @Field(() => NumberSearchOptions, {nullable: true})
    entry?: NumberSearchOptions;
    @Field(() => StringSearchOptions, {nullable: true})
    user_address?: StringSearchOptions;
    @Field(() => BooleanSearchOptions, {nullable: true})
    claimed?: BooleanSearchOptions;
    @Field(() => StringArraySearchOptions, {nullable: true})
    proof?: StringArraySearchOptions;
    @Field(() => NumberSearchOptions, {nullable: true})
    units?: NumberSearchOptions;
    @Field(() => NumberSearchOptions, {nullable: true})
    total_units?: NumberSearchOptions;
}

@InputType()
export class AllowlistRecordFetchInput implements OrderOptions<AllowlistRecord> {
    @Field((_) => AllowlistRecordSortOptions, {nullable: true})
    by?: AllowlistRecordSortOptions;
}
