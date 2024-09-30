/* eslint-disable */
/* prettier-ignore */

/** An IntrospectionQuery representation of your schema.
 *
 * @remarks
 * This is an introspection of your schema saved as a file by GraphQLSP.
 * It will automatically be used by `gql.tada` to infer the types of your GraphQL documents.
 * If you need to reuse this data or update your `scalars`, update `tadaOutputLocation` to
 * instead save to a .ts instead of a .d.ts file.
 */
export type introspection = {
  "__schema": {
    "queryType": {
      "name": "Query"
    },
    "mutationType": null,
    "subscriptionType": null,
    "types": [
      {
        "kind": "OBJECT",
        "name": "AllowlistRecord",
        "fields": [
          {
            "name": "claimed",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "entry",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "leaf",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "proof",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "root",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "token_id",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "total_units",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "units",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "user_address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Boolean"
      },
      {
        "kind": "SCALAR",
        "name": "Float"
      },
      {
        "kind": "SCALAR",
        "name": "String"
      },
      {
        "kind": "SCALAR",
        "name": "ID"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AllowlistRecordFetchInput",
        "inputFields": [
          {
            "name": "by",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AllowlistRecordSortOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AllowlistRecordSortOptions",
        "inputFields": [
          {
            "name": "claimed",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "entry",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "leaf",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "proof",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "root",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "total_units",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "units",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "user_address",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AllowlistRecordWhereInput",
        "inputFields": [
          {
            "name": "claimed",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "entry",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "leaf",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "proof",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringArraySearchOptions",
              "ofType": null
            }
          },
          {
            "name": "root",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "total_units",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "units",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "user_address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Attestation",
        "fields": [
          {
            "name": "attester",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creation_block_number",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "SCALAR",
              "name": "JSON",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hypercert",
            "type": {
              "kind": "OBJECT",
              "name": "HypercertBaseType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "last_update_block_number",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "last_update_block_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "recipient",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "schema",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "supported_schemas_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "uid",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationFetchInput",
        "inputFields": [
          {
            "name": "by",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationSortOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AttestationSchema",
        "fields": [
          {
            "name": "chain_id",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "records",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Attestation",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "resolver",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "revocable",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "schema",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "uid",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationSortOptions",
        "inputFields": [
          {
            "name": "attestation_uid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "attester_address",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "creation_block_number",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_number",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_timestamp",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "recipient_address",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationWhereInput",
        "inputFields": [
          {
            "name": "attestation",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "chain_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "hypercerts",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BasicHypercertWhereArgs",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IdSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "metadata",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BasicMetadataWhereInput",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "supported_schemas_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "uid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BasicAttestationWhereInput",
        "inputFields": [
          {
            "name": "attestation",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "chain_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IdSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "supported_schemas_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "uid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BasicContractWhereInput",
        "inputFields": [
          {
            "name": "chain_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IdSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BasicFractionWhereInput",
        "inputFields": [
          {
            "name": "creation_block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "fraction_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IdSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "owner_address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "units",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BasicHypercertWhereArgs",
        "inputFields": [
          {
            "name": "attestations_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creator_address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IdSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "sales_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "uri",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BasicMetadataWhereInput",
        "inputFields": [
          {
            "name": "contributors",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringArraySearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IdSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "impact_scope",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringArraySearchOptions",
              "ofType": null
            }
          },
          {
            "name": "impact_timeframe_from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "impact_timeframe_to",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_block_update_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "rights",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringArraySearchOptions",
              "ofType": null
            }
          },
          {
            "name": "uri",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "work_scope",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringArraySearchOptions",
              "ofType": null
            }
          },
          {
            "name": "work_timeframe_from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "work_timeframe_to",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "BigInt"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BigIntSearchOptions",
        "inputFields": [
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BooleanSearchOptions",
        "inputFields": [
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Collection",
        "fields": [
          {
            "name": "admins",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "User",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "chain_ids",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "EthBigInt",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "created_at",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "hidden",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Contract",
        "fields": [
          {
            "name": "chain_id",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "start_block",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ContractFetchInput",
        "inputFields": [
          {
            "name": "by",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ContractSortOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ContractSortOptions",
        "inputFields": [
          {
            "name": "chain_id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "contract_id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ContractWhereInput",
        "inputFields": [
          {
            "name": "chain_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IdSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "EthBigInt"
      },
      {
        "kind": "OBJECT",
        "name": "Fraction",
        "fields": [
          {
            "name": "creation_block_number",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "fraction_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "last_update_block_number",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "last_update_block_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "metadata",
            "type": {
              "kind": "OBJECT",
              "name": "Metadata",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "orders",
            "type": {
              "kind": "OBJECT",
              "name": "GetOrdersResponse",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "owner_address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sales",
            "type": {
              "kind": "OBJECT",
              "name": "GetSalesResponse",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "units",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FractionFetchInput",
        "inputFields": [
          {
            "name": "by",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "FractionSortOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FractionSortOptions",
        "inputFields": [
          {
            "name": "creation_block_number",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_number",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_timestamp",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "owner_address",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "units",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FractionWhereInput",
        "inputFields": [
          {
            "name": "creation_block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "fraction_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "hypercerts",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BasicHypercertWhereArgs",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IdSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "owner_address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "units",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "GetAllowlistRecordResponse",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "AllowlistRecord",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Int"
      },
      {
        "kind": "OBJECT",
        "name": "GetAttestationsResponse",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Attestation",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GetAttestationsSchemaResponse",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "AttestationSchema",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GetContractsResponse",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Contract",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GetFractionsResponse",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Fraction",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GetHyperboardsResponse",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Hyperboard",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GetHypercertsResponse",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Hypercert",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GetMetadataResponse",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Metadata",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GetOrdersForHypercertResponse",
        "fields": [
          {
            "name": "cheapestOrder",
            "type": {
              "kind": "OBJECT",
              "name": "Order",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Order",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "totalUnitsForSale",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GetOrdersResponse",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Order",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GetSalesResponse",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Sale",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "GetUsersResponse",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "User",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Hyperboard",
        "fields": [
          {
            "name": "admins",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "User",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "background_image",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chain_ids",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "EthBigInt",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "grayscale_images",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "sections",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SectionWrapper",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "tile_border_color",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HyperboardFetchInput",
        "inputFields": [
          {
            "name": "by",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "HyperboardSortOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HyperboardSortOptions",
        "inputFields": [
          {
            "name": "admin_id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "chainId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HyperboardWhereInput",
        "inputFields": [
          {
            "name": "admin_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "chain_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IdSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Hypercert",
        "fields": [
          {
            "name": "attestations",
            "type": {
              "kind": "OBJECT",
              "name": "GetAttestationsResponse",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "attestations_count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "contract",
            "type": {
              "kind": "OBJECT",
              "name": "Contract",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "contracts_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creation_block_number",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creator_address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "fractions",
            "type": {
              "kind": "OBJECT",
              "name": "GetFractionsResponse",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "last_update_block_number",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "last_update_block_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "metadata",
            "type": {
              "kind": "OBJECT",
              "name": "Metadata",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "orders",
            "type": {
              "kind": "OBJECT",
              "name": "GetOrdersForHypercertResponse",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sales",
            "type": {
              "kind": "OBJECT",
              "name": "GetSalesResponse",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sales_count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "token_id",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "units",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "uri",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "HypercertBaseType",
        "fields": [
          {
            "name": "attestations_count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "contracts_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creation_block_number",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creator_address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "last_update_block_number",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "last_update_block_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "metadata",
            "type": {
              "kind": "OBJECT",
              "name": "Metadata",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "sales_count",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "token_id",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "units",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "uri",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HypercertFetchInput",
        "inputFields": [
          {
            "name": "by",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "HypercertSortOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HypercertSortOptions",
        "inputFields": [
          {
            "name": "attestations_count",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "creation_block_number",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "last_block_update_timestamp",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_number",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_timestamp",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "owner_address",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "sales_count",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "units",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "uri",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HypercertsWhereArgs",
        "inputFields": [
          {
            "name": "attestations",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BasicAttestationWhereInput",
              "ofType": null
            }
          },
          {
            "name": "attestations_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "contract",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BasicContractWhereInput",
              "ofType": null
            }
          },
          {
            "name": "creation_block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creator_address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "fractions",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BasicFractionWhereInput",
              "ofType": null
            }
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IdSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_update_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "metadata",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BasicMetadataWhereInput",
              "ofType": null
            }
          },
          {
            "name": "sales_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "uri",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "IdSearchOptions",
        "inputFields": [
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "JSON"
      },
      {
        "kind": "OBJECT",
        "name": "Metadata",
        "fields": [
          {
            "name": "allow_list_uri",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "contributors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "external_url",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "image",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "impact_scope",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "impact_timeframe_from",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "impact_timeframe_to",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "properties",
            "type": {
              "kind": "SCALAR",
              "name": "JSON",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "rights",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "uri",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "work_scope",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "work_timeframe_from",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "work_timeframe_to",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "MetadataFetchInput",
        "inputFields": [
          {
            "name": "by",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "MetadataSortOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "MetadataSortOptions",
        "inputFields": [
          {
            "name": "allow_list_uri",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "external_url",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "metadata_id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "uri",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "MetadataWhereInput",
        "inputFields": [
          {
            "name": "contributors",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringArraySearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "hypercerts",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BasicHypercertWhereArgs",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IdSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "impact_scope",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringArraySearchOptions",
              "ofType": null
            }
          },
          {
            "name": "impact_timeframe_from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "impact_timeframe_to",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "last_block_update_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "rights",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringArraySearchOptions",
              "ofType": null
            }
          },
          {
            "name": "uri",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "work_scope",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringArraySearchOptions",
              "ofType": null
            }
          },
          {
            "name": "work_timeframe_from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "work_timeframe_to",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NumberArraySearchOptions",
        "inputFields": [
          {
            "name": "contains",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigInt",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NumberSearchOptions",
        "inputFields": [
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Order",
        "fields": [
          {
            "name": "additionalParameters",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amounts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Float",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "chainId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "EthBigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collection",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collectionType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "currency",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "endTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "globalNonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "hypercert",
            "type": {
              "kind": "OBJECT",
              "name": "HypercertBaseType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "invalidated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "itemIds",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "String",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "orderNonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "price",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "pricePerPercentInToken",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "pricePerPercentInUSD",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "quoteType",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "signature",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "signer",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "startTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "strategyId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "subsetNonce",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "validator_codes",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrderFetchInput",
        "inputFields": [
          {
            "name": "by",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OrderSortOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrderSortOptions",
        "inputFields": [
          {
            "name": "amounts",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "chainId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "collection",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "collectionType",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "createdAt",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "currency",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "endTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "globalNonce",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "invalidated",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "orderNonce",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "price",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "quoteType",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "signer",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "startTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "strategyId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OrderWhereInput",
        "inputFields": [
          {
            "name": "chainId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IdSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "signer",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "allowlistRecords",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GetAllowlistRecordResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AllowlistRecordFetchInput",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AllowlistRecordWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "attestationSchemas",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GetAttestationsSchemaResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "attestations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GetAttestationsResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationFetchInput",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "contracts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GetContractsResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ContractFetchInput",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ContractWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "fractions",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GetFractionsResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "FractionFetchInput",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "FractionWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "hyperboards",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GetHyperboardsResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "HyperboardFetchInput",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "HyperboardWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "hypercerts",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GetHypercertsResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "HypercertFetchInput",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "HypercertsWhereArgs",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "metadata",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GetMetadataResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "MetadataFetchInput",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "MetadataWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "orders",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GetOrdersResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OrderFetchInput",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OrderWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "sales",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GetSalesResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "sort",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SaleFetchInput",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SaleWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "users",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "GetUsersResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "offset",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "UserWhereInput",
                  "ofType": null
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Sale",
        "fields": [
          {
            "name": "amounts",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "EthBigInt",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "buyer",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "collection",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "creation_block_number",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "currency",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "hypercert",
            "type": {
              "kind": "OBJECT",
              "name": "HypercertBaseType",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "item_ids",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "EthBigInt",
                  "ofType": null
                }
              }
            },
            "args": []
          },
          {
            "name": "seller",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "strategy_id",
            "type": {
              "kind": "SCALAR",
              "name": "EthBigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "transaction_hash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SaleFetchInput",
        "inputFields": [
          {
            "name": "by",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SaleSortOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SaleSortOptions",
        "inputFields": [
          {
            "name": "amounts",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "buyer",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "collection",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "creationBlockNumber",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "creationBlockTimestamp",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "currency",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "hypercertId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "seller",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "strategyId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "transactionHash",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SaleWhereInput",
        "inputFields": [
          {
            "name": "amounts",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberArraySearchOptions",
              "ofType": null
            }
          },
          {
            "name": "buyer",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "collection",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "currency",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "hypercert_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "item_ids",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringArraySearchOptions",
              "ofType": null
            }
          },
          {
            "name": "seller",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "strategy_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigIntSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "transaction_hash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IdSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Section",
        "fields": [
          {
            "name": "collection",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Collection",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "entries",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "SectionEntry",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "label",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "owners",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "SectionOwner",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SectionEntry",
        "fields": [
          {
            "name": "display_size",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "is_blueprint",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "owners",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "SectionEntryOwner",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "percentage_of_section",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "total_units",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SectionEntryOwner",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "avatar",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "display_name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "percentage",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "units",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SectionOwner",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "avatar",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "display_name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "percentage_owned",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SectionWrapper",
        "fields": [
          {
            "name": "count",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Section",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "SortOrder",
        "enumValues": [
          {
            "name": "ascending"
          },
          {
            "name": "descending"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "StringArraySearchOptions",
        "inputFields": [
          {
            "name": "contains",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "String",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "StringSearchOptions",
        "inputFields": [
          {
            "name": "contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "endsWith",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "startsWith",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "UUID"
      },
      {
        "kind": "OBJECT",
        "name": "User",
        "fields": [
          {
            "name": "address",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "avatar",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "chain_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Float",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "display_name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "UserWhereInput",
        "inputFields": [
          {
            "name": "address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          }
        ]
      }
    ],
    "directives": []
  }
};

import * as gqlTada from "gql.tada";

declare module "gql.tada" {
  interface setupSchema {
    introspection: introspection;
  }
}
