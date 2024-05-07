import {Field, InputType} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import type {Attestation} from "../typeDefs/attestationTypeDefs.js";
import {type OrderOptions} from "./orderOptions.js";
import {AttestationSortOptions} from "./sortOptions.js";
import {AttestationSortKeys, SortOrder} from "../enums/sortEnums.js";

@InputType()
export class AttestationWhereInput implements WhereOptions<Attestation> {
    @Field(_ => StringSearchOptions, {nullable: true})
    id?: StringSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    attestation_uid?: NumberSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    supported_schemas_id?: StringSearchOptions | null;
    @Field(_ => NumberSearchOptions, {nullable: true})
    block_timestamp?: NumberSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    attester_address?: StringSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    recipient_address?: StringSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    resolver?: StringSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    schema?: StringSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    attestation?: StringSearchOptions | null;
    @Field(_ => NumberSearchOptions, {nullable: true})
    chain_id?: NumberSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    contract_address?: StringSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    token_id?: StringSearchOptions | null;
}

@InputType()
export class AttestationFetchInput implements OrderOptions<Attestation> {
    @Field(_ => AttestationSortOptions, {nullable: true})
    by?: { attestation?: AttestationSortKeys }
    @Field({nullable: true})
    order?: SortOrder
}