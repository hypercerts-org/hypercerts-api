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
        "name": "Attestation",
        "fields": [
          {
            "name": "attestation",
            "type": {
              "kind": "SCALAR",
              "name": "JSON",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "attestation_uid",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "attester_address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "block_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hypercerts",
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
          },
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "recipient_address",
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
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "ID"
      },
      {
        "kind": "SCALAR",
        "name": "String"
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
          },
          {
            "name": "order",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
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
              "name": "BigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "eas_schema_id",
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
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
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
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Boolean"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationSchemaFetchInput",
        "inputFields": [
          {
            "name": "by",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationSchemaSortOptions",
              "ofType": null
            }
          },
          {
            "name": "order",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "AttestationSchemaSortKeys",
        "enumValues": [
          {
            "name": "resolver"
          },
          {
            "name": "schema_id"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationSchemaSortOptions",
        "inputFields": [
          {
            "name": "schema",
            "type": {
              "kind": "ENUM",
              "name": "AttestationSchemaSortKeys",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationSchemaWhereInput",
        "inputFields": [
          {
            "name": "chain_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "eas_schema_id",
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
            "name": "revocable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BooleanSearchOptions",
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
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "AttestationSortKeys",
        "enumValues": [
          {
            "name": "attestation_id"
          },
          {
            "name": "attestation_uid"
          },
          {
            "name": "attester_address"
          },
          {
            "name": "block_timestamp"
          },
          {
            "name": "recipient_address"
          },
          {
            "name": "schema"
          },
          {
            "name": "supported_schemas_id"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationSortOptions",
        "inputFields": [
          {
            "name": "attestation",
            "type": {
              "kind": "ENUM",
              "name": "AttestationSortKeys",
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
            "name": "attestation_uid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "attester_address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "chain_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberSearchOptions",
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
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "recipient_address",
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
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "BigInt"
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
        "name": "Contract",
        "fields": [
          {
            "name": "chain_id",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
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
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "start_block",
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
          },
          {
            "name": "order",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "ContractSortKeys",
        "enumValues": [
          {
            "name": "chain_id"
          },
          {
            "name": "contract_address"
          },
          {
            "name": "contract_id"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ContractSortOptions",
        "inputFields": [
          {
            "name": "contracts",
            "type": {
              "kind": "ENUM",
              "name": "ContractSortKeys",
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
              "name": "NumberSearchOptions",
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
              "name": "StringSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "CountKeys",
        "enumValues": [
          {
            "name": "COUNT"
          },
          {
            "name": "HEAD"
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
            "name": "claims_id",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
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
            "name": "last_block_update_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
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
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "order",
            "type": {
              "kind": "SCALAR",
              "name": "String",
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
            "name": "claims_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberSearchOptions",
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
            "name": "last_block_update_timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberSearchOptions",
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
              "name": "NumberSearchOptions",
              "ofType": null
            }
          },
          {
            "name": "units",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberSearchOptions",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "GetAttestationsResponse",
        "fields": [
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
                    "name": "Attestation",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "totalCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
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
        "name": "GetHypercertsResponse",
        "fields": [
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
                    "name": "Hypercert",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "totalCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
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
            "name": "contracts",
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
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creation_block_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "fractions",
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
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "last_block_update_timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
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
            "name": "owner_address",
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
            "name": "type",
            "type": {
              "kind": "SCALAR",
              "name": "String",
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
          },
          {
            "name": "order",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "HypercertSortKeys",
        "enumValues": [
          {
            "name": "creation_block_timestamp"
          },
          {
            "name": "hypercert_id"
          },
          {
            "name": "token_id"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HypercertSortOptions",
        "inputFields": [
          {
            "name": "contracts",
            "type": {
              "kind": "ENUM",
              "name": "ContractSortKeys",
              "ofType": null
            }
          },
          {
            "name": "hypercert",
            "type": {
              "kind": "ENUM",
              "name": "HypercertSortKeys",
              "ofType": null
            }
          },
          {
            "name": "metadata",
            "type": {
              "kind": "ENUM",
              "name": "MetadataSortKeys",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "HypercertsWhereInput",
        "inputFields": [
          {
            "name": "attestations",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationWhereInput",
              "ofType": null
            }
          },
          {
            "name": "contracts",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ContractWhereInput",
              "ofType": null
            }
          },
          {
            "name": "creation_block_timestamp",
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
              "name": "FractionWhereInput",
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
            "name": "metadata",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "MetadataWhereInput",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NumberSearchOptions",
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
              "kind": "SCALAR",
              "name": "ID",
              "ofType": null
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
              "name": "BigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "impact_timeframe_to",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
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
              "name": "BigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "work_timeframe_to",
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
          },
          {
            "name": "order",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "MetadataSortKeys",
        "enumValues": [
          {
            "name": "allowList"
          },
          {
            "name": "description"
          },
          {
            "name": "metadata_id"
          },
          {
            "name": "name"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "MetadataSortOptions",
        "inputFields": [
          {
            "name": "metadata",
            "type": {
              "kind": "ENUM",
              "name": "MetadataSortKeys",
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
            "name": "description",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
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
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringSearchOptions",
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
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "attestationSchemas",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AttestationSchema",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "count",
                "type": {
                  "kind": "ENUM",
                  "name": "CountKeys",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "limit",
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
                  "name": "AttestationSchemaFetchInput",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationSchemaWhereInput",
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
                "name": "count",
                "type": {
                  "kind": "ENUM",
                  "name": "CountKeys",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "limit",
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
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Contract",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "count",
                "type": {
                  "kind": "ENUM",
                  "name": "CountKeys",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "limit",
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
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Fraction",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "count",
                "type": {
                  "kind": "ENUM",
                  "name": "CountKeys",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "limit",
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
                "name": "count",
                "type": {
                  "kind": "ENUM",
                  "name": "CountKeys",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "limit",
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
                  "name": "HypercertsWhereInput",
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
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Metadata",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "count",
                "type": {
                  "kind": "ENUM",
                  "name": "CountKeys",
                  "ofType": null
                }
              },
              {
                "name": "first",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "limit",
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
      }
    ],
    "directives": []
  }
};

import * as gqlTada from 'gql.tada';

declare module 'gql.tada' {
  interface setupSchema {
    introspection: introspection
  }
}