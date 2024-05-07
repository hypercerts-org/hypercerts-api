import {Field, InputType} from "type-graphql";
import {
    HypercertSortKeys,
    ContractSortKeys,
    MetadataSortKeys,
    AttestationSortKeys,
    AttestationSchemaSortKeys, FractionSortKeys
} from "../enums/sortEnums.js";


@InputType()
export class HypercertSortOptions {
    @Field(_ => HypercertSortKeys, {nullable: true})
    hypercert?: HypercertSortKeys;
    @Field(_ => ContractSortKeys, {nullable: true})
    contracts?: ContractSortKeys;
    @Field(_ => MetadataSortKeys, {nullable: true})
    metadata?: MetadataSortKeys;
}

@InputType()
export class ContractSortOptions {
    @Field(_ => ContractSortKeys, {nullable: true})
    contracts?: ContractSortKeys;
}

@InputType()
export class MetadataSortOptions {
    @Field(_ => MetadataSortKeys, {nullable: true})
    metadata?: MetadataSortKeys;
}

@InputType()
export class AttestationSortOptions {
    @Field(_ => AttestationSortKeys, {nullable: true})
    attestation?: AttestationSortKeys;
}

@InputType()
export class AttestationSchemaSortOptions {
    @Field(_ => AttestationSchemaSortKeys, {nullable: true})
    schema?: AttestationSchemaSortKeys;
}

@InputType()
export class FractionSortOptions {
    @Field(_ => FractionSortKeys, {nullable: true})
    fraction?: FractionSortKeys;
    @Field(_ => ContractSortKeys, {nullable: true})
    contracts?: ContractSortKeys;
}