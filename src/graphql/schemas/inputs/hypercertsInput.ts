import {Field, InputType} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {Hypercert} from "../typeDefs/hypercertTypeDefs.js";
import {NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import {ContractWhereInput} from "./contractInput.js";
import {AttestationWhereInput} from "./attestationInput.js";
import {FractionWhereInput} from "./fractionInput.js";
import {MetadataWhereInput} from "./metadataInput.js";
import {type OrderOptions} from "./orderOptions.js";
import {HypercertSortOptions} from "./sortOptions.js";
import {ContractSortKeys, HypercertSortKeys, MetadataSortKeys, SortOrder} from "../enums/sortEnums.js";

@InputType()
export class HypercertsWhereInput implements WhereOptions<Hypercert> {
    @Field(_ => StringSearchOptions, {nullable: true})
    hypercert_id?: StringSearchOptions
    @Field(_ => StringSearchOptions, {nullable: true})
    creation_block_timestamp?: NumberSearchOptions;
    @Field(_ => NumberSearchOptions, {nullable: true})
    token_id?: NumberSearchOptions;
    @Field(_ => ContractWhereInput, {nullable: true})
    contracts?: ContractWhereInput;
    @Field(_ => AttestationWhereInput, {nullable: true})
    attestations?: AttestationWhereInput;
    @Field(_ => FractionWhereInput, {nullable: true})
    fractions?: FractionWhereInput;
    @Field(_ => MetadataWhereInput, {nullable: true})
    metadata?: MetadataWhereInput;
}



@InputType()
export class HypercertFetchInput implements OrderOptions<Hypercert> {
    @Field(_ => HypercertSortOptions, {nullable: true})
    by?: {
        hypercert?: HypercertSortKeys,
        contracts?: ContractSortKeys,
        metadata?: MetadataSortKeys
    }
    @Field({nullable: true})
    order?: SortOrder
}
