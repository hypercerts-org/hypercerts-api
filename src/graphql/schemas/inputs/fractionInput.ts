import {Field, InputType, Int} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import {FetchOptions} from "./fetchOptions.js";
import {ContractWhereInput} from "./contractInput.js";
import type {Fraction} from "../typeDefs/fractionTypeDefs.js";

@InputType()
export class FractionWhereInput implements WhereOptions<Fraction> {
    @Field(_ => StringSearchOptions, {nullable: true})
    claims_id?: StringSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    hypercert_id?: StringSearchOptions | null;
    @Field(_ => NumberSearchOptions, {nullable: true})
    creation_block_timestamp?: NumberSearchOptions | null;
    @Field(_ => NumberSearchOptions, {nullable: true})
    last_block_update_timestamp?: NumberSearchOptions | null;
    @Field(_ => NumberSearchOptions, {nullable: true})
    token_id?: NumberSearchOptions | null;
    @Field(_ => NumberSearchOptions, {nullable: true})
    units?: ContractWhereInput | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    owner_address?: StringSearchOptions | null;
}

@InputType()
export class FractionFetchInput implements FetchOptions {
    @Field(_ => Int, {nullable: true})
    offset = 0;
    @Field(_ => Int, {nullable: true})
    limit = 100;
}