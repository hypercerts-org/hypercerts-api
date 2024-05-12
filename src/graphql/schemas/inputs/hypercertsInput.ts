import {Field, InputType} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {Hypercert} from "../typeDefs/hypercertTypeDefs.js";
import {IdSearchOptions, NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import {ContractWhereInput} from "./contractInput.js";
import {AttestationWhereInput} from "./attestationInput.js";
import {MetadataWhereInput} from "./metadataInput.js";
import {type OrderOptions} from "./orderOptions.js";
import {HypercertSortOptions} from "./sortOptions.js";
import {Fraction} from "../typeDefs/fractionTypeDefs.js";


//TODO - DRY with og FractionWhereInput, usage of HypercertsInput resulted in recursive initialization
@InputType()
export class HypercertFractionWhereInput implements WhereOptions<Fraction> {
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
export class HypercertsWhereInput implements WhereOptions<Hypercert> {
    @Field(_ => IdSearchOptions, {nullable: true})
    id?: IdSearchOptions
    @Field(_ => StringSearchOptions, {nullable: true})
    creation_block_timestamp?: NumberSearchOptions;
    @Field(_ => NumberSearchOptions, {nullable: true})
    token_id?: NumberSearchOptions;
    @Field(_ => ContractWhereInput, {nullable: true})
    contracts?: ContractWhereInput;
    @Field(_ => MetadataWhereInput, {nullable: true})
    metadata?: MetadataWhereInput;
    @Field(_ => AttestationWhereInput, {nullable: true})
    attestations?: AttestationWhereInput;
    @Field(_ => HypercertFractionWhereInput, {nullable: true})
    fractions?: HypercertFractionWhereInput
}

@InputType()
export class HypercertFetchInput implements OrderOptions<Hypercert> {
    @Field(_ => HypercertSortOptions, {nullable: true})
    by?: HypercertSortOptions
}
