import {Field, InputType} from "type-graphql";
import {SortOrder} from "../enums/sortEnums.js";
import type {Hypercert} from "../typeDefs/hypercertTypeDefs.js";
import type {Contract} from "../typeDefs/contractTypeDefs.js";
import type {Metadata} from "../typeDefs/metadataTypeDefs.js";
import type {Attestation} from "../typeDefs/attestationTypeDefs.js";
import type {AttestationSchema} from "../typeDefs/attestationSchemaTypeDefs.js";
import type {Fraction} from "../typeDefs/fractionTypeDefs.js";

export type SortOptions<T extends object> = {
    [P in keyof T]: SortOrder | null;
};

@InputType()
export class HypercertSortOptions implements SortOptions<Hypercert> {
    @Field(_ => SortOrder, {nullable: true})
    hypercert_id?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    creation_block_timestamp?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    token_id?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    units?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    owner_address?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    last_block_update_timestamp?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    uri?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    claim_attestation_count?: SortOrder;
}

@InputType()
export class ContractSortOptions implements SortOptions<Contract> {
    @Field(_ => SortOrder, {nullable: true})
    contract_id?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    contract_address?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    chain_id?: SortOrder;
}

@InputType()
export class MetadataSortOptions implements SortOptions<Metadata> {
    @Field(_ => SortOrder, {nullable: true})
    description?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    external_url?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    metadata_id?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    name?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    uri?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    allow_list_uri?: SortOrder;
}

@InputType()
export class AttestationSortOptions implements SortOptions<Attestation> {
    @Field(_ => SortOrder, {nullable: true})
    attestation_uid?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    block_timestamp?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    attester_address?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    recipient_address?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    schema?: SortOrder;
}

@InputType()
export class AttestationSchemaSortOptions implements SortOptions<AttestationSchema> {
    @Field(_ => SortOrder, {nullable: true})
    eas_schema_id?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    chain_id?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    resolver?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    revocable?: SortOrder;
}

@InputType()
export class FractionSortOptions implements SortOptions<Fraction> {
    @Field(_ => SortOrder, {nullable: true})
    creation_block_timestamp?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    last_block_update_timestamp?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    token_id?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    units?: SortOrder;
    @Field(_ => SortOrder, {nullable: true})
    owner_address?: SortOrder;
}