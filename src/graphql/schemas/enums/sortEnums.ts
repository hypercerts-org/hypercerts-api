import {registerEnumType} from "type-graphql";

export enum SortOrder {
    ascending = "ascending",
    descending = "descending",
}

registerEnumType(SortOrder, {
    name: "SortOrder",
    description: "The direction to sort the query results",
    valuesConfig: {
        ascending: {
            description: "Ascending order"
        },
        descending: {
            description: "Descending order"
        },
    },
});

export enum HypercertSortKeys {
    hypercert_id = "hypercert_id",
    creation_block_timestamp = "creation_block_timestamp",
    token_id = "token_id",
}

registerEnumType(HypercertSortKeys, {
    name: "HypercertSortKeys",
    description: "Keys to sort hypercerts by",
});

export enum ContractSortKeys {
    contract_id = "contract_id",
    contract_address = "contract_address",
    chain_id = "chain_id",
}

registerEnumType(ContractSortKeys, {
    name: "ContractSortKeys",
    description: "Keys to sort contracts by",
});

export enum MetadataSortKeys {
    metadata_id = "metadata_id",
    name = "name",
    description = "description",
    allowList = "allowList",
}

registerEnumType(MetadataSortKeys, {
    name: "MetadataSortKeys",
    description: "Keys to sort metadata by",
});

export enum AttestationSortKeys {
    attestation_id = "attestation_id",
    attestation_uid = "attestation_uid",
    supported_schemas_id = "supported_schemas_id",
    block_timestamp = "block_timestamp",
    attester_address = "attester_address",
    recipient_address = "recipient_address",
    schema = "schema",
}

registerEnumType(AttestationSortKeys, {
    name: "AttestationSortKeys",
    description: "Keys to sort attestations by",
});

export enum AttestationSchemaSortKeys {
    schema_id = "schema_id",
    resolver = "resolver",
}

registerEnumType(AttestationSchemaSortKeys, {
    name: "AttestationSchemaSortKeys",
    description: "Keys to sort attestation schemas by",
});

export enum FractionSortKeys {
    fraction_id = "fraction_id",
    units = "units",
    owner = "owner",
}

registerEnumType(FractionSortKeys, {
    name: "FractionSortKeys",
    description: "Keys to sort fractions by",
});