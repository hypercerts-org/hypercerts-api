import {Field, InputType} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import {Fraction} from "../typeDefs/fractionTypeDefs.js";
import type {OrderOptions} from "./orderOptions.js";
import {FractionSortOptions} from "./sortOptions.js";
import {ContractSortKeys, FractionSortKeys, SortOrder} from "../enums/sortEnums.js";
import {HypercertsWhereInput} from "./hypercertsInput.js";

@InputType()
export class FractionWhereInput implements WhereOptions<Fraction> {
    @Field(_ => HypercertsWhereInput, {nullable: true})
    hypercerts?: HypercertsWhereInput;
    @Field(_ => NumberSearchOptions, {nullable: true})
    creation_block_timestamp?: NumberSearchOptions;
    @Field(_ => NumberSearchOptions, {nullable: true})
    last_block_update_timestamp?: NumberSearchOptions;
    @Field(_ => NumberSearchOptions, {nullable: true})
    token_id?: NumberSearchOptions;
    @Field(_ => NumberSearchOptions, {nullable: true})
    units?: NumberSearchOptions;
    @Field(_ => StringSearchOptions, {nullable: true})
    owner_address?: StringSearchOptions;
}

@InputType()
export class FractionFetchInput implements OrderOptions<Fraction> {
    @Field(_ => FractionSortOptions, {nullable: true})
    by?: {
        fractions?: FractionSortKeys,
        contracts?: ContractSortKeys,
    }
    @Field({nullable: true})
    order?: SortOrder
}