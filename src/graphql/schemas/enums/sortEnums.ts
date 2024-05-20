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

//TODO add sort by count
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
    id = "id",
    contract_address = "contract_address",
    chain_id = "chain_id",
}

registerEnumType(ContractSortKeys, {
    name: "ContractSortKeys",
    description: "Keys to sort contracts by",
});

export enum MetadataSortKeys {
    id = "metadata",
    name = "name",
    description = "description",
    allowList = "allowList",
    uri = "uri",
}

registerEnumType(MetadataSortKeys, {
    name: "MetadataSortKeys",
    description: "Keys to sort metadata by",
});

export enum AttestationSortKeys {
    id = "id",
    uid = "uid",
    supported_schemas_id = "supported_schemas_id",
    block_timestamp = "block_timestamp",
    attester = "attester",
    recipient = "recipient",
    schema = "schema",
}

registerEnumType(AttestationSortKeys, {
    name: "AttestationSortKeys",
    description: "Keys to sort attestations by",
});

export enum AttestationSchemaSortKeys {
    schema_id = "id",
    resolver = "resolver",
}

registerEnumType(AttestationSchemaSortKeys, {
    name: "AttestationSchemaSortKeys",
    description: "Keys to sort attestation schemas by",
});

export enum FractionSortKeys {
    fraction_id = "id",
    units = "units",
    owner = "owner_address",
}

registerEnumType(FractionSortKeys, {
    name: "FractionSortKeys",
    description: "Keys to sort fractions by",
});