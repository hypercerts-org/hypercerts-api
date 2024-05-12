import {Field, InputType} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {IdSearchOptions, NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import type {Attestation} from "../typeDefs/attestationTypeDefs.js";
import {type OrderOptions} from "./orderOptions.js";
import {AttestationSortOptions} from "./sortOptions.js";

@InputType()
export class AttestationWhereInput implements WhereOptions<Attestation> {
    @Field(_ => IdSearchOptions, {nullable: true})
    id?: IdSearchOptions
    @Field(_ => StringSearchOptions, {nullable: true})
    attestation_uid?: NumberSearchOptions;
    @Field(_ => StringSearchOptions, {nullable: true})
    supported_schemas_id?: StringSearchOptions;
    @Field(_ => NumberSearchOptions, {nullable: true})
    block_timestamp?: NumberSearchOptions;
    @Field(_ => StringSearchOptions, {nullable: true})
    attester_address?: StringSearchOptions;
    @Field(_ => StringSearchOptions, {nullable: true})
    recipient_address?: StringSearchOptions;
    @Field(_ => StringSearchOptions, {nullable: true})
    resolver?: StringSearchOptions;
    @Field(_ => StringSearchOptions, {nullable: true})
    schema?: StringSearchOptions;
    @Field(_ => StringSearchOptions, {nullable: true})
    attestation?: StringSearchOptions;
    @Field(_ => NumberSearchOptions, {nullable: true})
    chain_id?: NumberSearchOptions;
    @Field(_ => StringSearchOptions, {nullable: true})
    contract_address?: StringSearchOptions;
    @Field(_ => StringSearchOptions, {nullable: true})
    token_id?: StringSearchOptions;
}

@InputType()
export class AttestationFetchInput implements OrderOptions<Attestation> {
    @Field(_ => AttestationSortOptions, {nullable: true})
    by?: AttestationSortOptions
}