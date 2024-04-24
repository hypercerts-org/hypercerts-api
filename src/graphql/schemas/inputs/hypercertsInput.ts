import {Field, InputType, Int} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {Hypercert} from "../typeDefs/hypercertTypeDefs.js";
import {NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import {FetchOptions} from "./fetchOptions.js";
import {ContractWhereInput} from "./contractInput.js";
import {AttestationWhereInput} from "./attestationInput.js";
import {FractionWhereInput} from "./fractionInput.js";

@InputType()
export class HypercertsWhereInput implements WhereOptions<Hypercert> {
    @Field(_ => StringSearchOptions, {nullable: true})
    hypercert_id?: StringSearchOptions | null;
    @Field(_ => NumberSearchOptions, {nullable: true})
    creation_block_timestamp?: NumberSearchOptions | null;
    @Field(_ => NumberSearchOptions, {nullable: true})
    token_id?: NumberSearchOptions | null;
    @Field(_ => ContractWhereInput, {nullable: true})
    contract?: ContractWhereInput | null;
    @Field(_ => AttestationWhereInput, {nullable: true})
    attestations?: AttestationWhereInput | null;
    @Field(_ => FractionWhereInput, {nullable: true})
    fractions?: FractionWhereInput | null
}

@InputType()
export class HypercertFetchInput implements FetchOptions {
    @Field(_ => Int, {nullable: true})
    offset = 0;
    @Field(_ => Int, {nullable: true})
    limit = 100;
}