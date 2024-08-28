import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import { IdSearchOptions, NumberSearchOptions, StringSearchOptions } from "./searchOptions.js";
import type { Attestation } from "../typeDefs/attestationTypeDefs.js";
import { type OrderOptions } from "./orderOptions.js";
import { AttestationSortOptions } from "./sortOptions.js";

@InputType()
export class BasicAttestationWhereInput implements WhereOptions<Attestation> {
    @Field(() => IdSearchOptions, {nullable: true})
    id?: IdSearchOptions
    @Field(() => StringSearchOptions, {nullable: true})
    uid?: StringSearchOptions;
    @Field(() => StringSearchOptions, {nullable: true})
    supported_schemas_id?: StringSearchOptions;
    @Field(() => NumberSearchOptions, {nullable: true})
    creation_block_timestamp?: NumberSearchOptions;
    @Field(() => NumberSearchOptions, {nullable: true})
    creation_block_number?: NumberSearchOptions;
    @Field(() => NumberSearchOptions, {nullable: true})
    last_update_block_number?: NumberSearchOptions;
    @Field(() => NumberSearchOptions, {nullable: true})
    last_update_block_timestamp?: NumberSearchOptions;
    @Field(() => StringSearchOptions, {nullable: true})
    attester?: StringSearchOptions;
    @Field(() => StringSearchOptions, {nullable: true})
    recipient?: StringSearchOptions;
    @Field(() => StringSearchOptions, {nullable: true})
    resolver?: StringSearchOptions;
    @Field(() => StringSearchOptions, {nullable: true})
    schema?: StringSearchOptions;
    @Field(() => StringSearchOptions, {nullable: true})
    attestation?: StringSearchOptions;
    @Field(() => NumberSearchOptions, {nullable: true})
    chain_id?: NumberSearchOptions;
    @Field(() => StringSearchOptions, {nullable: true})
    contract_address?: StringSearchOptions;
    @Field(() => StringSearchOptions, {nullable: true})
    token_id?: StringSearchOptions;
}


@InputType()
export class AttestationFetchInput implements OrderOptions<Attestation> {
    @Field(() => AttestationSortOptions, {nullable: true})
    by?: AttestationSortOptions
}