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
    "mutationType": {
      "name": "Mutation"
    },
    "subscriptionType": {
      "name": "Subscription"
    },
    "types": [
      {
        "kind": "OBJECT",
        "name": "Query",
        "fields": [
          {
            "name": "aggregateAttestation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateAttestation",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "AttestationOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "findFirstAttestation",
            "type": {
              "kind": "OBJECT",
              "name": "Attestation",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "AttestationOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "AttestationScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "findFirstAttestationOrThrow",
            "type": {
              "kind": "OBJECT",
              "name": "Attestation",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "AttestationOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "AttestationScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "attestations",
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
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "AttestationOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "AttestationScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "attestation",
            "type": {
              "kind": "OBJECT",
              "name": "Attestation",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttestationWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "getAttestation",
            "type": {
              "kind": "OBJECT",
              "name": "Attestation",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttestationWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "groupByAttestation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AttestationGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "AttestationOrderByWithAggregationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "ENUM",
                        "name": "AttestationScalarFieldEnum",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "having",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "aggregateEnsName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateEnsName",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "EnsNameOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "findFirstEnsName",
            "type": {
              "kind": "OBJECT",
              "name": "EnsName",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "EnsNameOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "EnsNameScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "findFirstEnsNameOrThrow",
            "type": {
              "kind": "OBJECT",
              "name": "EnsName",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "EnsNameOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "EnsNameScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "ensNames",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EnsName",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "EnsNameOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "EnsNameScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "ensName",
            "type": {
              "kind": "OBJECT",
              "name": "EnsName",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EnsNameWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "getEnsName",
            "type": {
              "kind": "OBJECT",
              "name": "EnsName",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EnsNameWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "groupByEnsName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "EnsNameGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "EnsNameOrderByWithAggregationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "ENUM",
                        "name": "EnsNameScalarFieldEnum",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "having",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "aggregateOffchainRevocation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateOffchainRevocation",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "OffchainRevocationOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "findFirstOffchainRevocation",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocation",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "OffchainRevocationOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "OffchainRevocationScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "findFirstOffchainRevocationOrThrow",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocation",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "OffchainRevocationOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "OffchainRevocationScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "offchainRevocations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "OffchainRevocation",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "OffchainRevocationOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "OffchainRevocationScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "offchainRevocation",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocation",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OffchainRevocationWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "getOffchainRevocation",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocation",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OffchainRevocationWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "groupByOffchainRevocation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "OffchainRevocationGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "OffchainRevocationOrderByWithAggregationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "ENUM",
                        "name": "OffchainRevocationScalarFieldEnum",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "having",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "aggregateSchema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateSchema",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "SchemaOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "findFirstSchema",
            "type": {
              "kind": "OBJECT",
              "name": "Schema",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "SchemaOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "SchemaScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "findFirstSchemaOrThrow",
            "type": {
              "kind": "OBJECT",
              "name": "Schema",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "SchemaOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "SchemaScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "schemata",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Schema",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "SchemaOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "SchemaScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "schema",
            "type": {
              "kind": "OBJECT",
              "name": "Schema",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "getSchema",
            "type": {
              "kind": "OBJECT",
              "name": "Schema",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "groupBySchema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "SchemaGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "SchemaOrderByWithAggregationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "ENUM",
                        "name": "SchemaScalarFieldEnum",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "having",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "aggregateSchemaName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateSchemaName",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "SchemaNameOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "findFirstSchemaName",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaName",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "SchemaNameOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "SchemaNameScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "findFirstSchemaNameOrThrow",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaName",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "SchemaNameOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "SchemaNameScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "schemaNames",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "SchemaName",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "SchemaNameOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "SchemaNameScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "schemaName",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaName",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaNameWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "getSchemaName",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaName",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaNameWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "groupBySchemaName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "SchemaNameGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "SchemaNameOrderByWithAggregationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "ENUM",
                        "name": "SchemaNameScalarFieldEnum",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "having",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "aggregateServiceStat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateServiceStat",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "ServiceStatOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "findFirstServiceStat",
            "type": {
              "kind": "OBJECT",
              "name": "ServiceStat",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "ServiceStatOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "ServiceStatScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "findFirstServiceStatOrThrow",
            "type": {
              "kind": "OBJECT",
              "name": "ServiceStat",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "ServiceStatOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "ServiceStatScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "serviceStats",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ServiceStat",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "ServiceStatOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "ServiceStatScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "serviceStat",
            "type": {
              "kind": "OBJECT",
              "name": "ServiceStat",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ServiceStatWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "getServiceStat",
            "type": {
              "kind": "OBJECT",
              "name": "ServiceStat",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ServiceStatWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "groupByServiceStat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ServiceStatGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "ServiceStatOrderByWithAggregationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "ENUM",
                        "name": "ServiceStatScalarFieldEnum",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "having",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "aggregateTimestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AggregateTimestamp",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "TimestampOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "findFirstTimestamp",
            "type": {
              "kind": "OBJECT",
              "name": "Timestamp",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "TimestampOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "TimestampScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "findFirstTimestampOrThrow",
            "type": {
              "kind": "OBJECT",
              "name": "Timestamp",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "TimestampOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "TimestampScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "timestamps",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Timestamp",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "TimestampOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "TimestampScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "OBJECT",
              "name": "Timestamp",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TimestampWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "getTimestamp",
            "type": {
              "kind": "OBJECT",
              "name": "Timestamp",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TimestampWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "groupByTimestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "TimestampGroupBy",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "TimestampOrderByWithAggregationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "by",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "ENUM",
                        "name": "TimestampScalarFieldEnum",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "having",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "allowlist",
            "type": {
              "kind": "OBJECT",
              "name": "Allowlist",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "allowlists",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Allowlist",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Allowlist_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Allowlist_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "claim",
            "type": {
              "kind": "OBJECT",
              "name": "Claim",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "claims",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Claim",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Claim_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Claim_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "claimToken",
            "type": {
              "kind": "OBJECT",
              "name": "ClaimToken",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "claimTokens",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ClaimToken",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "ClaimToken_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ClaimToken_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "token",
            "type": {
              "kind": "OBJECT",
              "name": "Token",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "tokens",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Token",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Token_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Token_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "acceptedToken",
            "type": {
              "kind": "OBJECT",
              "name": "AcceptedToken",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "acceptedTokens",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AcceptedToken",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "AcceptedToken_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AcceptedToken_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "offer",
            "type": {
              "kind": "OBJECT",
              "name": "Offer",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "offers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Offer",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Offer_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Offer_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "trade",
            "type": {
              "kind": "OBJECT",
              "name": "Trade",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "trades",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Trade",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Trade_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Trade_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "_meta",
            "type": {
              "kind": "OBJECT",
              "name": "_Meta_",
              "ofType": null
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "hypercertsCollection",
            "type": {
              "kind": "OBJECT",
              "name": "hypercertsConnection",
              "ofType": null
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
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor",
                  "ofType": null
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor",
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
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "hypercertsFilter",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "hypercertsOrderBy",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "lastblockindexedCollection",
            "type": {
              "kind": "OBJECT",
              "name": "lastblockindexedConnection",
              "ofType": null
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
                "name": "last",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "before",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor",
                  "ofType": null
                }
              },
              {
                "name": "after",
                "type": {
                  "kind": "SCALAR",
                  "name": "Cursor",
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
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "lastblockindexedFilter",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "lastblockindexedOrderBy",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "node",
            "type": {
              "kind": "INTERFACE",
              "name": "Node",
              "ofType": null
            },
            "args": [
              {
                "name": "nodeId",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "Mutation",
        "fields": [
          {
            "name": "createManyAttestation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "AttestationCreateManyInput",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "createOneAttestation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Attestation",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttestationCreateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "deleteManyAttestation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
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
            "name": "deleteOneAttestation",
            "type": {
              "kind": "OBJECT",
              "name": "Attestation",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttestationWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateManyAttestation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttestationUpdateManyMutationInput",
                    "ofType": null
                  }
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
            "name": "updateOneAttestation",
            "type": {
              "kind": "OBJECT",
              "name": "Attestation",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttestationUpdateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttestationWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "upsertOneAttestation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Attestation",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttestationWhereUniqueInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttestationCreateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttestationUpdateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createManyEnsName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "EnsNameCreateManyInput",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "createOneEnsName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EnsName",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EnsNameCreateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "deleteManyEnsName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "deleteOneEnsName",
            "type": {
              "kind": "OBJECT",
              "name": "EnsName",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EnsNameWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateManyEnsName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EnsNameUpdateManyMutationInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "updateOneEnsName",
            "type": {
              "kind": "OBJECT",
              "name": "EnsName",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EnsNameUpdateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EnsNameWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "upsertOneEnsName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "EnsName",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EnsNameWhereUniqueInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EnsNameCreateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "EnsNameUpdateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createManyOffchainRevocation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "OffchainRevocationCreateManyInput",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "createOneOffchainRevocation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "OffchainRevocation",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OffchainRevocationCreateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "deleteManyOffchainRevocation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "deleteOneOffchainRevocation",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocation",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OffchainRevocationWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateManyOffchainRevocation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OffchainRevocationUpdateManyMutationInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "updateOneOffchainRevocation",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocation",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OffchainRevocationUpdateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OffchainRevocationWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "upsertOneOffchainRevocation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "OffchainRevocation",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OffchainRevocationWhereUniqueInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OffchainRevocationCreateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "OffchainRevocationUpdateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createManySchema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "SchemaCreateManyInput",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "createOneSchema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Schema",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaCreateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "deleteManySchema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "deleteOneSchema",
            "type": {
              "kind": "OBJECT",
              "name": "Schema",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateManySchema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaUpdateManyMutationInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "updateOneSchema",
            "type": {
              "kind": "OBJECT",
              "name": "Schema",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaUpdateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "upsertOneSchema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Schema",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaWhereUniqueInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaCreateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaUpdateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createManySchemaName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "SchemaNameCreateManyInput",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "createOneSchemaName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SchemaName",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaNameCreateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "deleteManySchemaName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "deleteOneSchemaName",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaName",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaNameWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateManySchemaName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaNameUpdateManyMutationInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "updateOneSchemaName",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaName",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaNameUpdateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaNameWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "upsertOneSchemaName",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "SchemaName",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaNameWhereUniqueInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaNameCreateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaNameUpdateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createManyServiceStat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "ServiceStatCreateManyInput",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "createOneServiceStat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ServiceStat",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ServiceStatCreateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "deleteManyServiceStat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "deleteOneServiceStat",
            "type": {
              "kind": "OBJECT",
              "name": "ServiceStat",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ServiceStatWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateManyServiceStat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ServiceStatUpdateManyMutationInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "updateOneServiceStat",
            "type": {
              "kind": "OBJECT",
              "name": "ServiceStat",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ServiceStatUpdateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ServiceStatWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "upsertOneServiceStat",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ServiceStat",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ServiceStatWhereUniqueInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ServiceStatCreateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "ServiceStatUpdateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "createManyTimestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "TimestampCreateManyInput",
                        "ofType": null
                      }
                    }
                  }
                }
              },
              {
                "name": "skipDuplicates",
                "type": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "createOneTimestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Timestamp",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TimestampCreateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "deleteManyTimestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "deleteOneTimestamp",
            "type": {
              "kind": "OBJECT",
              "name": "Timestamp",
              "ofType": null
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TimestampWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updateManyTimestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "AffectedRowsOutput",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TimestampUpdateManyMutationInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereInput",
                  "ofType": null
                }
              }
            ]
          },
          {
            "name": "updateOneTimestamp",
            "type": {
              "kind": "OBJECT",
              "name": "Timestamp",
              "ofType": null
            },
            "args": [
              {
                "name": "data",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TimestampUpdateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TimestampWhereUniqueInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "upsertOneTimestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Timestamp",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TimestampWhereUniqueInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "create",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TimestampCreateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "update",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "TimestampUpdateInput",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "deleteFromhypercertsCollection",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "hypercertsDeleteResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "hypercertsFilter",
                  "ofType": null
                }
              },
              {
                "name": "atMost",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "deleteFromlastblockindexedCollection",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "lastblockindexedDeleteResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "lastblockindexedFilter",
                  "ofType": null
                }
              },
              {
                "name": "atMost",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "insertIntohypercertsCollection",
            "type": {
              "kind": "OBJECT",
              "name": "hypercertsInsertResponse",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "hypercertsInsertInput",
                        "ofType": null
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "insertIntolastblockindexedCollection",
            "type": {
              "kind": "OBJECT",
              "name": "lastblockindexedInsertResponse",
              "ofType": null
            },
            "args": [
              {
                "name": "objects",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "LIST",
                    "ofType": {
                      "kind": "NON_NULL",
                      "ofType": {
                        "kind": "INPUT_OBJECT",
                        "name": "lastblockindexedInsertInput",
                        "ofType": null
                      }
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "updatehypercertsCollection",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "hypercertsUpdateResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "set",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "hypercertsUpdateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "hypercertsFilter",
                  "ofType": null
                }
              },
              {
                "name": "atMost",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "updatelastblockindexedCollection",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "lastblockindexedUpdateResponse",
                "ofType": null
              }
            },
            "args": [
              {
                "name": "set",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "lastblockindexedUpdateInput",
                    "ofType": null
                  }
                }
              },
              {
                "name": "filter",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "lastblockindexedFilter",
                  "ofType": null
                }
              },
              {
                "name": "atMost",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "Int",
                    "ofType": null
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AggregateAttestation",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "AttestationCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "AttestationAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "AttestationSumAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "AttestationMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "AttestationMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AttestationCountAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
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
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "attester",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "refUID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "revocable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "revoked",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "_all",
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
        "name": "AttestationAvgAggregate",
        "fields": [
          {
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "Float"
      },
      {
        "kind": "OBJECT",
        "name": "AttestationSumAggregate",
        "fields": [
          {
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "AttestationMinAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "SCALAR",
              "name": "String",
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
            "name": "attester",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "refUID",
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
            "name": "revoked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "txid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "SCALAR",
        "name": "String"
      },
      {
        "kind": "SCALAR",
        "name": "Boolean"
      },
      {
        "kind": "OBJECT",
        "name": "AttestationMaxAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "data",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "SCALAR",
              "name": "String",
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
            "name": "attester",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "refUID",
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
            "name": "revoked",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "txid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationWhereInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFilter",
              "ofType": null
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFilter",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFilter",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaRelationFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "StringFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "in",
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
          },
          {
            "name": "notIn",
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
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contains",
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
            "name": "mode",
            "type": {
              "kind": "ENUM",
              "name": "QueryMode",
              "ofType": null
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedStringFilter",
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
            "name": "ilike",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "iregex",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "is",
            "type": {
              "kind": "ENUM",
              "name": "FilterIs",
              "ofType": null
            }
          },
          {
            "name": "like",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "neq",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "regex",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "QueryMode",
        "enumValues": [
          {
            "name": "default"
          },
          {
            "name": "insensitive"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NestedStringFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "in",
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
          },
          {
            "name": "notIn",
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
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contains",
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
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedStringFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "IntFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
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
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          },
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "is",
            "type": {
              "kind": "ENUM",
              "name": "FilterIs",
              "ofType": null
            }
          },
          {
            "name": "neq",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NestedIntFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
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
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BoolFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedBoolFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NestedBoolFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedBoolFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaRelationFilter",
        "inputFields": [
          {
            "name": "is",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaWhereInput",
              "ofType": null
            }
          },
          {
            "name": "isNot",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaWhereInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaWhereInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "creator",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFilter",
              "ofType": null
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          },
          {
            "name": "attestations",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationListRelationFilter",
              "ofType": null
            }
          },
          {
            "name": "schemaNames",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameListRelationFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationListRelationFilter",
        "inputFields": [
          {
            "name": "every",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationWhereInput",
              "ofType": null
            }
          },
          {
            "name": "some",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationWhereInput",
              "ofType": null
            }
          },
          {
            "name": "none",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationWhereInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameListRelationFilter",
        "inputFields": [
          {
            "name": "every",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameWhereInput",
              "ofType": null
            }
          },
          {
            "name": "some",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameWhereInput",
              "ofType": null
            }
          },
          {
            "name": "none",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameWhereInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameWhereInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFilter",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaRelationFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationOrderByWithRelationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaOrderByWithRelationInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "SortOrder",
        "enumValues": [
          {
            "name": "asc"
          },
          {
            "name": "desc"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaOrderByWithRelationInput",
        "inputFields": [
          {
            "name": "id",
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
          },
          {
            "name": "creator",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "attestations",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationOrderByRelationAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "schemaNames",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameOrderByRelationAggregateInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationOrderByRelationAggregateInput",
        "inputFields": [
          {
            "name": "_count",
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
        "name": "SchemaNameOrderByRelationAggregateInput",
        "inputFields": [
          {
            "name": "_count",
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
        "name": "AttestationWhereUniqueInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
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
            "name": "data",
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
            "name": "decodedDataJson",
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
            "name": "recipient",
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
            "name": "attester",
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
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "refUID",
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
            "name": "revocable",
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
            "name": "revoked",
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
            "name": "txid",
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
            "name": "schemaId",
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
            "name": "ipfsHash",
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
            "name": "isOffchain",
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
            "name": "schema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Schema",
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
        "name": "Schema",
        "fields": [
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
            "name": "schema",
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
            "name": "creator",
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
            "name": "resolver",
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
            "name": "revocable",
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
            "name": "index",
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
            "name": "txid",
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
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaCount",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "attestations",
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
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "AttestationOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "AttestationScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          },
          {
            "name": "schemaNames",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "SchemaName",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereInput",
                  "ofType": null
                }
              },
              {
                "name": "orderBy",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "INPUT_OBJECT",
                      "name": "SchemaNameOrderByWithRelationInput",
                      "ofType": null
                    }
                  }
                }
              },
              {
                "name": "cursor",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereUniqueInput",
                  "ofType": null
                }
              },
              {
                "name": "take",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              },
              {
                "name": "distinct",
                "type": {
                  "kind": "LIST",
                  "ofType": {
                    "kind": "NON_NULL",
                    "ofType": {
                      "kind": "ENUM",
                      "name": "SchemaNameScalarFieldEnum",
                      "ofType": null
                    }
                  }
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SchemaCount",
        "fields": [
          {
            "name": "attestations",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "schemaNames",
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
        "kind": "ENUM",
        "name": "AttestationScalarFieldEnum",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "data"
          },
          {
            "name": "decodedDataJson"
          },
          {
            "name": "recipient"
          },
          {
            "name": "attester"
          },
          {
            "name": "time"
          },
          {
            "name": "timeCreated"
          },
          {
            "name": "expirationTime"
          },
          {
            "name": "revocationTime"
          },
          {
            "name": "refUID"
          },
          {
            "name": "revocable"
          },
          {
            "name": "revoked"
          },
          {
            "name": "txid"
          },
          {
            "name": "schemaId"
          },
          {
            "name": "ipfsHash"
          },
          {
            "name": "isOffchain"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "SchemaName",
        "fields": [
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
            "name": "schemaId",
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
            "name": "attesterAddress",
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
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "isCreator",
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
            "name": "schema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Schema",
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
        "name": "SchemaNameOrderByWithRelationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
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
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaOrderByWithRelationInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameWhereUniqueInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "SchemaNameScalarFieldEnum",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "schemaId"
          },
          {
            "name": "attesterAddress"
          },
          {
            "name": "name"
          },
          {
            "name": "time"
          },
          {
            "name": "isCreator"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AttestationGroupBy",
        "fields": [
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
            "name": "data",
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
            "name": "decodedDataJson",
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
            "name": "recipient",
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
            "name": "attester",
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
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "refUID",
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
            "name": "revocable",
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
            "name": "revoked",
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
            "name": "txid",
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
            "name": "schemaId",
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
            "name": "ipfsHash",
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
            "name": "isOffchain",
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
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "AttestationCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "AttestationAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "AttestationSumAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "AttestationMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "AttestationMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationOrderByWithAggregationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationCountOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_avg",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationAvgOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_max",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationMaxOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_min",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationMinOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_sum",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationSumOrderByAggregateInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationCountOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "isOffchain",
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
        "name": "AttestationAvgOrderByAggregateInput",
        "inputFields": [
          {
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocationTime",
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
        "name": "AttestationMaxOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "isOffchain",
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
        "name": "AttestationMinOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "isOffchain",
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
        "name": "AttestationSumOrderByAggregateInput",
        "inputFields": [
          {
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocationTime",
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
        "name": "AttestationScalarWhereWithAggregatesInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolWithAggregatesFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "StringWithAggregatesFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "in",
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
          },
          {
            "name": "notIn",
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
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contains",
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
            "name": "mode",
            "type": {
              "kind": "ENUM",
              "name": "QueryMode",
              "ofType": null
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedStringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          },
          {
            "name": "_min",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedStringFilter",
              "ofType": null
            }
          },
          {
            "name": "_max",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedStringFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NestedStringWithAggregatesFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "in",
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
          },
          {
            "name": "notIn",
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
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contains",
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
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedStringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          },
          {
            "name": "_min",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedStringFilter",
              "ofType": null
            }
          },
          {
            "name": "_max",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedStringFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "IntWithAggregatesFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
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
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          },
          {
            "name": "_avg",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedFloatFilter",
              "ofType": null
            }
          },
          {
            "name": "_sum",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          },
          {
            "name": "_min",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          },
          {
            "name": "_max",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NestedIntWithAggregatesFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "notIn",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Int",
                  "ofType": null
                }
              }
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
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          },
          {
            "name": "_avg",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedFloatFilter",
              "ofType": null
            }
          },
          {
            "name": "_sum",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          },
          {
            "name": "_min",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          },
          {
            "name": "_max",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NestedFloatFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
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
          {
            "name": "notIn",
            "type": {
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
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedFloatFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BoolWithAggregatesFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedBoolWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          },
          {
            "name": "_min",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedBoolFilter",
              "ofType": null
            }
          },
          {
            "name": "_max",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedBoolFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "NestedBoolWithAggregatesFilter",
        "inputFields": [
          {
            "name": "equals",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedBoolWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedIntFilter",
              "ofType": null
            }
          },
          {
            "name": "_min",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedBoolFilter",
              "ofType": null
            }
          },
          {
            "name": "_max",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "NestedBoolFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AggregateEnsName",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "EnsNameCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "EnsNameAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "EnsNameSumAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "EnsNameMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "EnsNameMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EnsNameCountAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
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
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "_all",
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
        "name": "EnsNameAvgAggregate",
        "fields": [
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EnsNameSumAggregate",
        "fields": [
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EnsNameMinAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
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
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "EnsNameMaxAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
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
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EnsNameWhereInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EnsNameOrderByWithRelationInput",
        "inputFields": [
          {
            "name": "id",
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
            "name": "timestamp",
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
        "name": "EnsNameWhereUniqueInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "EnsName",
        "fields": [
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
            "name": "timestamp",
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
        "kind": "ENUM",
        "name": "EnsNameScalarFieldEnum",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "name"
          },
          {
            "name": "timestamp"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "EnsNameGroupBy",
        "fields": [
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
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "EnsNameCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "EnsNameAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "EnsNameSumAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "EnsNameMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "EnsNameMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EnsNameOrderByWithAggregationInput",
        "inputFields": [
          {
            "name": "id",
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
            "name": "timestamp",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "EnsNameCountOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_avg",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "EnsNameAvgOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_max",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "EnsNameMaxOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_min",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "EnsNameMinOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_sum",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "EnsNameSumOrderByAggregateInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EnsNameCountOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
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
            "name": "timestamp",
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
        "name": "EnsNameAvgOrderByAggregateInput",
        "inputFields": [
          {
            "name": "timestamp",
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
        "name": "EnsNameMaxOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
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
            "name": "timestamp",
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
        "name": "EnsNameMinOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
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
            "name": "timestamp",
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
        "name": "EnsNameSumOrderByAggregateInput",
        "inputFields": [
          {
            "name": "timestamp",
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
        "name": "EnsNameScalarWhereWithAggregatesInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "EnsNameScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntWithAggregatesFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AggregateOffchainRevocation",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocationCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocationAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocationSumAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocationMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocationMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "OffchainRevocationCountAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "from",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "uid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "_all",
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
        "name": "OffchainRevocationAvgAggregate",
        "fields": [
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "OffchainRevocationSumAggregate",
        "fields": [
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "OffchainRevocationMinAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "from",
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
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "txid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "OffchainRevocationMaxAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "from",
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
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "txid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OffchainRevocationWhereInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "uid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OffchainRevocationOrderByWithRelationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "uid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
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
        "name": "OffchainRevocationWhereUniqueInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "OffchainRevocation",
        "fields": [
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
            "name": "from",
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
            "name": "uid",
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
            "name": "txid",
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
            "name": "timestamp",
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
        "kind": "ENUM",
        "name": "OffchainRevocationScalarFieldEnum",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "from"
          },
          {
            "name": "uid"
          },
          {
            "name": "txid"
          },
          {
            "name": "timestamp"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "OffchainRevocationGroupBy",
        "fields": [
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
            "name": "from",
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
            "name": "uid",
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
            "name": "txid",
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
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocationCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocationAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocationSumAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocationMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "OffchainRevocationMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OffchainRevocationOrderByWithAggregationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "uid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OffchainRevocationCountOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_avg",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OffchainRevocationAvgOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_max",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OffchainRevocationMaxOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_min",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OffchainRevocationMinOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_sum",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "OffchainRevocationSumOrderByAggregateInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OffchainRevocationCountOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "uid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
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
        "name": "OffchainRevocationAvgOrderByAggregateInput",
        "inputFields": [
          {
            "name": "timestamp",
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
        "name": "OffchainRevocationMaxOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "uid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
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
        "name": "OffchainRevocationMinOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "uid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
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
        "name": "OffchainRevocationSumOrderByAggregateInput",
        "inputFields": [
          {
            "name": "timestamp",
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
        "name": "OffchainRevocationScalarWhereWithAggregatesInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "OffchainRevocationScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "uid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntWithAggregatesFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AggregateSchema",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaSumAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SchemaCountAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "schema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "creator",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "revocable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "index",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "_all",
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
        "name": "SchemaAvgAggregate",
        "fields": [
          {
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SchemaSumAggregate",
        "fields": [
          {
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SchemaMinAggregate",
        "fields": [
          {
            "name": "id",
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
            "name": "creator",
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
            "name": "revocable",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "index",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "txid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SchemaMaxAggregate",
        "fields": [
          {
            "name": "id",
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
            "name": "creator",
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
            "name": "revocable",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "index",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "txid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaWhereUniqueInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "SchemaScalarFieldEnum",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "schema"
          },
          {
            "name": "creator"
          },
          {
            "name": "resolver"
          },
          {
            "name": "revocable"
          },
          {
            "name": "index"
          },
          {
            "name": "txid"
          },
          {
            "name": "time"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "SchemaGroupBy",
        "fields": [
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
            "name": "schema",
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
            "name": "creator",
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
            "name": "resolver",
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
            "name": "revocable",
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
            "name": "index",
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
            "name": "txid",
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
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaSumAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaOrderByWithAggregationInput",
        "inputFields": [
          {
            "name": "id",
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
          },
          {
            "name": "creator",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaCountOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_avg",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaAvgOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_max",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaMaxOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_min",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaMinOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_sum",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaSumOrderByAggregateInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaCountOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
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
          },
          {
            "name": "creator",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "time",
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
        "name": "SchemaAvgOrderByAggregateInput",
        "inputFields": [
          {
            "name": "time",
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
        "name": "SchemaMaxOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
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
          },
          {
            "name": "creator",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "time",
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
        "name": "SchemaMinOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
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
          },
          {
            "name": "creator",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "time",
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
        "name": "SchemaSumOrderByAggregateInput",
        "inputFields": [
          {
            "name": "time",
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
        "name": "SchemaScalarWhereWithAggregatesInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "creator",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntWithAggregatesFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AggregateSchemaName",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaNameCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaNameAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaNameSumAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaNameMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaNameMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SchemaNameCountAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "attesterAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
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
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "_all",
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
        "name": "SchemaNameAvgAggregate",
        "fields": [
          {
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SchemaNameSumAggregate",
        "fields": [
          {
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SchemaNameMinAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "attesterAddress",
            "type": {
              "kind": "SCALAR",
              "name": "String",
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
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SchemaNameMaxAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "attesterAddress",
            "type": {
              "kind": "SCALAR",
              "name": "String",
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
            "name": "time",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "SchemaNameGroupBy",
        "fields": [
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
            "name": "schemaId",
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
            "name": "attesterAddress",
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
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "isCreator",
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
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaNameCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaNameAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaNameSumAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaNameMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "SchemaNameMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameOrderByWithAggregationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
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
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameCountOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_avg",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameAvgOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_max",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameMaxOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_min",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameMinOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_sum",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameSumOrderByAggregateInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameCountOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
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
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "isCreator",
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
        "name": "SchemaNameAvgOrderByAggregateInput",
        "inputFields": [
          {
            "name": "time",
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
        "name": "SchemaNameMaxOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
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
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "isCreator",
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
        "name": "SchemaNameMinOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
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
            "name": "time",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "isCreator",
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
        "name": "SchemaNameSumOrderByAggregateInput",
        "inputFields": [
          {
            "name": "time",
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
        "name": "SchemaNameScalarWhereWithAggregatesInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolWithAggregatesFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AggregateServiceStat",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "ServiceStatCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "ServiceStatMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "ServiceStatMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ServiceStatCountAggregate",
        "fields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "_all",
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
        "name": "ServiceStatMinAggregate",
        "fields": [
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
            "name": "value",
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
        "name": "ServiceStatMaxAggregate",
        "fields": [
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
            "name": "value",
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
        "name": "ServiceStatWhereInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "value",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ServiceStatOrderByWithRelationInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "value",
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
        "name": "ServiceStatWhereUniqueInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ServiceStat",
        "fields": [
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
            "name": "value",
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
        "kind": "ENUM",
        "name": "ServiceStatScalarFieldEnum",
        "enumValues": [
          {
            "name": "name"
          },
          {
            "name": "value"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "ServiceStatGroupBy",
        "fields": [
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
            "name": "value",
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
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "ServiceStatCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "ServiceStatMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "ServiceStatMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ServiceStatOrderByWithAggregationInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "value",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ServiceStatCountOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_max",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ServiceStatMaxOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_min",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ServiceStatMinOrderByAggregateInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ServiceStatCountOrderByAggregateInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "value",
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
        "name": "ServiceStatMaxOrderByAggregateInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "value",
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
        "name": "ServiceStatMinOrderByAggregateInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "value",
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
        "name": "ServiceStatScalarWhereWithAggregatesInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "ServiceStatScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "value",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AggregateTimestamp",
        "fields": [
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "TimestampCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "TimestampAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "TimestampSumAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "TimestampMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "TimestampMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TimestampCountAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "from",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "tree",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "_all",
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
        "name": "TimestampAvgAggregate",
        "fields": [
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TimestampSumAggregate",
        "fields": [
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TimestampMinAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "from",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "txid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tree",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "TimestampMaxAggregate",
        "fields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "from",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "txid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "tree",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TimestampWhereInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "tree",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TimestampOrderByWithRelationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "tree",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
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
        "name": "TimestampWhereUniqueInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Timestamp",
        "fields": [
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
            "name": "from",
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
            "name": "txid",
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
            "name": "tree",
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
            "name": "timestamp",
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
        "kind": "ENUM",
        "name": "TimestampScalarFieldEnum",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "from"
          },
          {
            "name": "txid"
          },
          {
            "name": "tree"
          },
          {
            "name": "timestamp"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "TimestampGroupBy",
        "fields": [
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
            "name": "from",
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
            "name": "txid",
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
            "name": "tree",
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
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "_count",
            "type": {
              "kind": "OBJECT",
              "name": "TimestampCountAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_avg",
            "type": {
              "kind": "OBJECT",
              "name": "TimestampAvgAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_sum",
            "type": {
              "kind": "OBJECT",
              "name": "TimestampSumAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_min",
            "type": {
              "kind": "OBJECT",
              "name": "TimestampMinAggregate",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "_max",
            "type": {
              "kind": "OBJECT",
              "name": "TimestampMaxAggregate",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TimestampOrderByWithAggregationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "tree",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "_count",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TimestampCountOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_avg",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TimestampAvgOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_max",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TimestampMaxOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_min",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TimestampMinOrderByAggregateInput",
              "ofType": null
            }
          },
          {
            "name": "_sum",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "TimestampSumOrderByAggregateInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TimestampCountOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "tree",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
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
        "name": "TimestampAvgOrderByAggregateInput",
        "inputFields": [
          {
            "name": "timestamp",
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
        "name": "TimestampMaxOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "tree",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
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
        "name": "TimestampMinOrderByAggregateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "tree",
            "type": {
              "kind": "ENUM",
              "name": "SortOrder",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
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
        "name": "TimestampSumOrderByAggregateInput",
        "inputFields": [
          {
            "name": "timestamp",
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
        "name": "TimestampScalarWhereWithAggregatesInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "TimestampScalarWhereWithAggregatesInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "tree",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringWithAggregatesFilter",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntWithAggregatesFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "AffectedRowsOutput",
        "fields": [
          {
            "name": "count",
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
        "kind": "INPUT_OBJECT",
        "name": "AttestationCreateManyInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationCreateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaCreateNestedOneWithoutAttestationsInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaCreateNestedOneWithoutAttestationsInput",
        "inputFields": [
          {
            "name": "create",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaCreateWithoutAttestationsInput",
              "ofType": null
            }
          },
          {
            "name": "connectOrCreate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaCreateOrConnectWithoutAttestationsInput",
              "ofType": null
            }
          },
          {
            "name": "connect",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaWhereUniqueInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaCreateWithoutAttestationsInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "creator",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "schemaNames",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameCreateNestedManyWithoutSchemaInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameCreateNestedManyWithoutSchemaInput",
        "inputFields": [
          {
            "name": "create",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameCreateWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "connectOrCreate",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameCreateOrConnectWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "createMany",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameCreateManySchemaInputEnvelope",
              "ofType": null
            }
          },
          {
            "name": "connect",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereUniqueInput",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameCreateWithoutSchemaInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
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
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameCreateOrConnectWithoutSchemaInput",
        "inputFields": [
          {
            "name": "where",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaNameWhereUniqueInput",
                "ofType": null
              }
            }
          },
          {
            "name": "create",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaNameCreateWithoutSchemaInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameCreateManySchemaInputEnvelope",
        "inputFields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "SchemaNameCreateManySchemaInput",
                    "ofType": null
                  }
                }
              }
            }
          },
          {
            "name": "skipDuplicates",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameCreateManySchemaInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
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
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaCreateOrConnectWithoutAttestationsInput",
        "inputFields": [
          {
            "name": "where",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaWhereUniqueInput",
                "ofType": null
              }
            }
          },
          {
            "name": "create",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaCreateWithoutAttestationsInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationUpdateManyMutationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "StringFieldUpdateOperationsInput",
        "inputFields": [
          {
            "name": "set",
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
        "name": "IntFieldUpdateOperationsInput",
        "inputFields": [
          {
            "name": "set",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "increment",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "decrement",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "multiply",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "divide",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BoolFieldUpdateOperationsInput",
        "inputFields": [
          {
            "name": "set",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationUpdateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaUpdateOneRequiredWithoutAttestationsNestedInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaUpdateOneRequiredWithoutAttestationsNestedInput",
        "inputFields": [
          {
            "name": "create",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaCreateWithoutAttestationsInput",
              "ofType": null
            }
          },
          {
            "name": "connectOrCreate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaCreateOrConnectWithoutAttestationsInput",
              "ofType": null
            }
          },
          {
            "name": "upsert",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaUpsertWithoutAttestationsInput",
              "ofType": null
            }
          },
          {
            "name": "connect",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaWhereUniqueInput",
              "ofType": null
            }
          },
          {
            "name": "update",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaUpdateWithoutAttestationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaUpsertWithoutAttestationsInput",
        "inputFields": [
          {
            "name": "update",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaUpdateWithoutAttestationsInput",
                "ofType": null
              }
            }
          },
          {
            "name": "create",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaCreateWithoutAttestationsInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaUpdateWithoutAttestationsInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "creator",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "schemaNames",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameUpdateManyWithoutSchemaNestedInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameUpdateManyWithoutSchemaNestedInput",
        "inputFields": [
          {
            "name": "create",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameCreateWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "connectOrCreate",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameCreateOrConnectWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "upsert",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameUpsertWithWhereUniqueWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "createMany",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameCreateManySchemaInputEnvelope",
              "ofType": null
            }
          },
          {
            "name": "set",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereUniqueInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "disconnect",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereUniqueInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "delete",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereUniqueInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "connect",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameWhereUniqueInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "update",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameUpdateWithWhereUniqueWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "updateMany",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameUpdateManyWithWhereWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "deleteMany",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameScalarWhereInput",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameUpsertWithWhereUniqueWithoutSchemaInput",
        "inputFields": [
          {
            "name": "where",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaNameWhereUniqueInput",
                "ofType": null
              }
            }
          },
          {
            "name": "update",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaNameUpdateWithoutSchemaInput",
                "ofType": null
              }
            }
          },
          {
            "name": "create",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaNameCreateWithoutSchemaInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameUpdateWithoutSchemaInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameUpdateWithWhereUniqueWithoutSchemaInput",
        "inputFields": [
          {
            "name": "where",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaNameWhereUniqueInput",
                "ofType": null
              }
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaNameUpdateWithoutSchemaInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameUpdateManyWithWhereWithoutSchemaInput",
        "inputFields": [
          {
            "name": "where",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaNameScalarWhereInput",
                "ofType": null
              }
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaNameUpdateManyMutationInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameScalarWhereInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameScalarWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameScalarWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "SchemaNameScalarWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameUpdateManyMutationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EnsNameCreateManyInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
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
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EnsNameCreateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
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
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EnsNameUpdateManyMutationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "EnsNameUpdateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OffchainRevocationCreateManyInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "uid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OffchainRevocationCreateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "uid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OffchainRevocationUpdateManyMutationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "uid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OffchainRevocationUpdateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "uid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaCreateManyInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "creator",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaCreateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "creator",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "attestations",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationCreateNestedManyWithoutSchemaInput",
              "ofType": null
            }
          },
          {
            "name": "schemaNames",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameCreateNestedManyWithoutSchemaInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationCreateNestedManyWithoutSchemaInput",
        "inputFields": [
          {
            "name": "create",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationCreateWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "connectOrCreate",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationCreateOrConnectWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "createMany",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationCreateManySchemaInputEnvelope",
              "ofType": null
            }
          },
          {
            "name": "connect",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereUniqueInput",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationCreateWithoutSchemaInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationCreateOrConnectWithoutSchemaInput",
        "inputFields": [
          {
            "name": "where",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AttestationWhereUniqueInput",
                "ofType": null
              }
            }
          },
          {
            "name": "create",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AttestationCreateWithoutSchemaInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationCreateManySchemaInputEnvelope",
        "inputFields": [
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "INPUT_OBJECT",
                    "name": "AttestationCreateManySchemaInput",
                    "ofType": null
                  }
                }
              }
            }
          },
          {
            "name": "skipDuplicates",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationCreateManySchemaInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaUpdateManyMutationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "creator",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaUpdateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "creator",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "attestations",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationUpdateManyWithoutSchemaNestedInput",
              "ofType": null
            }
          },
          {
            "name": "schemaNames",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaNameUpdateManyWithoutSchemaNestedInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationUpdateManyWithoutSchemaNestedInput",
        "inputFields": [
          {
            "name": "create",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationCreateWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "connectOrCreate",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationCreateOrConnectWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "upsert",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationUpsertWithWhereUniqueWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "createMany",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationCreateManySchemaInputEnvelope",
              "ofType": null
            }
          },
          {
            "name": "set",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereUniqueInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "disconnect",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereUniqueInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "delete",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereUniqueInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "connect",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationWhereUniqueInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "update",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationUpdateWithWhereUniqueWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "updateMany",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationUpdateManyWithWhereWithoutSchemaInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "deleteMany",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationScalarWhereInput",
                  "ofType": null
                }
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationUpsertWithWhereUniqueWithoutSchemaInput",
        "inputFields": [
          {
            "name": "where",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AttestationWhereUniqueInput",
                "ofType": null
              }
            }
          },
          {
            "name": "update",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AttestationUpdateWithoutSchemaInput",
                "ofType": null
              }
            }
          },
          {
            "name": "create",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AttestationCreateWithoutSchemaInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationUpdateWithoutSchemaInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationUpdateWithWhereUniqueWithoutSchemaInput",
        "inputFields": [
          {
            "name": "where",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AttestationWhereUniqueInput",
                "ofType": null
              }
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AttestationUpdateWithoutSchemaInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationUpdateManyWithWhereWithoutSchemaInput",
        "inputFields": [
          {
            "name": "where",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AttestationScalarWhereInput",
                "ofType": null
              }
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AttestationUpdateManyMutationInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "AttestationScalarWhereInput",
        "inputFields": [
          {
            "name": "AND",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationScalarWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "OR",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationScalarWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "NOT",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "AttestationScalarWhereInput",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "data",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "decodedDataJson",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "recipient",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "attester",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          },
          {
            "name": "timeCreated",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          },
          {
            "name": "expirationTime",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          },
          {
            "name": "revocationTime",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFilter",
              "ofType": null
            }
          },
          {
            "name": "refUID",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFilter",
              "ofType": null
            }
          },
          {
            "name": "revoked",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFilter",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "ipfsHash",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "isOffchain",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameCreateManyInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "schemaId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "attesterAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
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
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameCreateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
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
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaCreateNestedOneWithoutSchemaNamesInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaCreateNestedOneWithoutSchemaNamesInput",
        "inputFields": [
          {
            "name": "create",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaCreateWithoutSchemaNamesInput",
              "ofType": null
            }
          },
          {
            "name": "connectOrCreate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaCreateOrConnectWithoutSchemaNamesInput",
              "ofType": null
            }
          },
          {
            "name": "connect",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaWhereUniqueInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaCreateWithoutSchemaNamesInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "creator",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          },
          {
            "name": "attestations",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationCreateNestedManyWithoutSchemaInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaCreateOrConnectWithoutSchemaNamesInput",
        "inputFields": [
          {
            "name": "where",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaWhereUniqueInput",
                "ofType": null
              }
            }
          },
          {
            "name": "create",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaCreateWithoutSchemaNamesInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaNameUpdateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "attesterAddress",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "isCreator",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaUpdateOneRequiredWithoutSchemaNamesNestedInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaUpdateOneRequiredWithoutSchemaNamesNestedInput",
        "inputFields": [
          {
            "name": "create",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaCreateWithoutSchemaNamesInput",
              "ofType": null
            }
          },
          {
            "name": "connectOrCreate",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaCreateOrConnectWithoutSchemaNamesInput",
              "ofType": null
            }
          },
          {
            "name": "upsert",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaUpsertWithoutSchemaNamesInput",
              "ofType": null
            }
          },
          {
            "name": "connect",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaWhereUniqueInput",
              "ofType": null
            }
          },
          {
            "name": "update",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "SchemaUpdateWithoutSchemaNamesInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaUpsertWithoutSchemaNamesInput",
        "inputFields": [
          {
            "name": "update",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaUpdateWithoutSchemaNamesInput",
                "ofType": null
              }
            }
          },
          {
            "name": "create",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "SchemaCreateWithoutSchemaNamesInput",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "SchemaUpdateWithoutSchemaNamesInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "schema",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "creator",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "resolver",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "revocable",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BoolFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "index",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "time",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "attestations",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AttestationUpdateManyWithoutSchemaNestedInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ServiceStatCreateManyInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ServiceStatCreateInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "value",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ServiceStatUpdateManyMutationInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "value",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ServiceStatUpdateInput",
        "inputFields": [
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "value",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TimestampCreateManyInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "tree",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TimestampCreateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "tree",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TimestampUpdateManyMutationInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "tree",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TimestampUpdateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "txid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "tree",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFieldUpdateOperationsInput",
              "ofType": null
            }
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IntFieldUpdateOperationsInput",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Subscription",
        "fields": [
          {
            "name": "allowlist",
            "type": {
              "kind": "OBJECT",
              "name": "Allowlist",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "allowlists",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Allowlist",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Allowlist_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Allowlist_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "claim",
            "type": {
              "kind": "OBJECT",
              "name": "Claim",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "claims",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Claim",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Claim_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Claim_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "claimToken",
            "type": {
              "kind": "OBJECT",
              "name": "ClaimToken",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "claimTokens",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "ClaimToken",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "ClaimToken_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "ClaimToken_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "token",
            "type": {
              "kind": "OBJECT",
              "name": "Token",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "tokens",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Token",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Token_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Token_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "acceptedToken",
            "type": {
              "kind": "OBJECT",
              "name": "AcceptedToken",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "acceptedTokens",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AcceptedToken",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "AcceptedToken_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AcceptedToken_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "offer",
            "type": {
              "kind": "OBJECT",
              "name": "Offer",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "offers",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Offer",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Offer_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Offer_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "trade",
            "type": {
              "kind": "OBJECT",
              "name": "Trade",
              "ofType": null
            },
            "args": [
              {
                "name": "id",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "SCALAR",
                    "name": "ID",
                    "ofType": null
                  }
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "trades",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "Trade",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Trade_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Trade_filter",
                  "ofType": null
                }
              },
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
                  "ofType": null
                }
              },
              {
                "name": "subgraphError",
                "type": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "ENUM",
                    "name": "_SubgraphErrorPolicy_",
                    "ofType": null
                  }
                }
              }
            ]
          },
          {
            "name": "_meta",
            "type": {
              "kind": "OBJECT",
              "name": "_Meta_",
              "ofType": null
            },
            "args": [
              {
                "name": "block",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Block_height",
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
        "name": "AcceptedToken",
        "fields": [
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
            "name": "token",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Token",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "minimumAmountPerUnit",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "accepted",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
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
        "name": "AcceptedToken_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_in",
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
          },
          {
            "name": "id_not_in",
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
          },
          {
            "name": "id_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_in",
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
          },
          {
            "name": "token_not_in",
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
          },
          {
            "name": "token_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Token_filter",
              "ofType": null
            }
          },
          {
            "name": "minimumAmountPerUnit",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "minimumAmountPerUnit_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "minimumAmountPerUnit_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "minimumAmountPerUnit_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "minimumAmountPerUnit_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "minimumAmountPerUnit_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "minimumAmountPerUnit_in",
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
          },
          {
            "name": "minimumAmountPerUnit_not_in",
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
          },
          {
            "name": "accepted",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "accepted_not",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "accepted_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "accepted_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Boolean",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AcceptedToken_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "AcceptedToken_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "AcceptedToken_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "token"
          },
          {
            "name": "token__id"
          },
          {
            "name": "token__name"
          },
          {
            "name": "token__symbol"
          },
          {
            "name": "token__decimals"
          },
          {
            "name": "minimumAmountPerUnit"
          },
          {
            "name": "accepted"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "Aggregation_interval",
        "enumValues": [
          {
            "name": "hour"
          },
          {
            "name": "day"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Allowlist",
        "fields": [
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
            "name": "root",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "claim",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Claim",
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
        "name": "Allowlist_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_in",
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
          },
          {
            "name": "id_not_in",
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
          },
          {
            "name": "id_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "root",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "root_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "root_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "root_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "root_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "root_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "root_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "root_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "root_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "root_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "claim",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_in",
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
          },
          {
            "name": "claim_not_in",
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
          },
          {
            "name": "claim_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Claim_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Allowlist_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Allowlist_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "Allowlist_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "root"
          },
          {
            "name": "claim"
          },
          {
            "name": "claim__id"
          },
          {
            "name": "claim__creation"
          },
          {
            "name": "claim__tokenID"
          },
          {
            "name": "claim__contract"
          },
          {
            "name": "claim__uri"
          },
          {
            "name": "claim__creator"
          },
          {
            "name": "claim__owner"
          },
          {
            "name": "claim__totalUnits"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "BigDecimal"
      },
      {
        "kind": "SCALAR",
        "name": "BigInt"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BlockChangedFilter",
        "inputFields": [
          {
            "name": "number_gte",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Block_height",
        "inputFields": [
          {
            "name": "hash",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "number",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          },
          {
            "name": "number_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Bytes"
      },
      {
        "kind": "OBJECT",
        "name": "Claim",
        "fields": [
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
            "name": "creation",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "tokenID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contract",
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
            "name": "uri",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "creator",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "owner",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "totalUnits",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "allowlist",
            "type": {
              "kind": "OBJECT",
              "name": "Allowlist",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "metadata",
            "type": {
              "kind": "OBJECT",
              "name": "hypercerts",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "ClaimToken",
        "fields": [
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
            "name": "tokenID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "claim",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Claim",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "owner",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "units",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "offers",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "OBJECT",
                  "name": "Offer",
                  "ofType": null
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "Offer_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "Offer_filter",
                  "ofType": null
                }
              }
            ]
          }
        ],
        "interfaces": []
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "ClaimToken_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_in",
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
          },
          {
            "name": "id_not_in",
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
          },
          {
            "name": "id_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "tokenID",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "tokenID_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "tokenID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "tokenID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "tokenID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "tokenID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "tokenID_in",
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
          },
          {
            "name": "tokenID_not_in",
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
          },
          {
            "name": "claim",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_in",
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
          },
          {
            "name": "claim_not_in",
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
          },
          {
            "name": "claim_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "claim_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Claim_filter",
              "ofType": null
            }
          },
          {
            "name": "owner",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "owner_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "owner_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "units",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "units_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "units_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "units_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "units_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "units_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "units_in",
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
          },
          {
            "name": "units_not_in",
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
          },
          {
            "name": "offers_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Offer_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ClaimToken_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "ClaimToken_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "ClaimToken_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "tokenID"
          },
          {
            "name": "claim"
          },
          {
            "name": "claim__id"
          },
          {
            "name": "claim__creation"
          },
          {
            "name": "claim__tokenID"
          },
          {
            "name": "claim__contract"
          },
          {
            "name": "claim__uri"
          },
          {
            "name": "claim__creator"
          },
          {
            "name": "claim__owner"
          },
          {
            "name": "claim__totalUnits"
          },
          {
            "name": "owner"
          },
          {
            "name": "units"
          },
          {
            "name": "offers"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Claim_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_in",
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
          },
          {
            "name": "id_not_in",
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
          },
          {
            "name": "id_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "creation",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "creation_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "creation_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "creation_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "creation_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "creation_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "creation_in",
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
          },
          {
            "name": "creation_not_in",
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
          },
          {
            "name": "tokenID",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "tokenID_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "tokenID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "tokenID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "tokenID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "tokenID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "tokenID_in",
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
          },
          {
            "name": "tokenID_not_in",
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
          },
          {
            "name": "contract",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_in",
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
          },
          {
            "name": "contract_not_in",
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
          },
          {
            "name": "contract_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "contract_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_in",
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
          },
          {
            "name": "uri_not_in",
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
          },
          {
            "name": "uri_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "uri_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "creator",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "creator_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "creator_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "creator_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "creator_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "creator_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "creator_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "creator_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "creator_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "creator_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "owner_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "owner_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "owner_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "totalUnits",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "totalUnits_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "totalUnits_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "totalUnits_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "totalUnits_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "totalUnits_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "totalUnits_in",
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
          },
          {
            "name": "totalUnits_not_in",
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
          },
          {
            "name": "allowlist",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_in",
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
          },
          {
            "name": "allowlist_not_in",
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
          },
          {
            "name": "allowlist_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "allowlist_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Allowlist_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Claim_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Claim_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "Claim_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "creation"
          },
          {
            "name": "tokenID"
          },
          {
            "name": "contract"
          },
          {
            "name": "uri"
          },
          {
            "name": "creator"
          },
          {
            "name": "owner"
          },
          {
            "name": "totalUnits"
          },
          {
            "name": "allowlist"
          },
          {
            "name": "allowlist__id"
          },
          {
            "name": "allowlist__root"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "ID"
      },
      {
        "kind": "SCALAR",
        "name": "Int8"
      },
      {
        "kind": "OBJECT",
        "name": "Offer",
        "fields": [
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
            "name": "fractionID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "ClaimToken",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "unitsAvailable",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "minUnitsPerTrade",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "maxUnitsPerTrade",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "status",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "ENUM",
                "name": "OfferStatus",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "acceptedTokens",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "AcceptedToken",
                    "ofType": null
                  }
                }
              }
            },
            "args": [
              {
                "name": "skip",
                "type": {
                  "kind": "SCALAR",
                  "name": "Int",
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
                "name": "orderBy",
                "type": {
                  "kind": "ENUM",
                  "name": "AcceptedToken_orderBy",
                  "ofType": null
                }
              },
              {
                "name": "orderDirection",
                "type": {
                  "kind": "ENUM",
                  "name": "OrderDirection",
                  "ofType": null
                }
              },
              {
                "name": "where",
                "type": {
                  "kind": "INPUT_OBJECT",
                  "name": "AcceptedToken_filter",
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
        "name": "OfferStatus",
        "enumValues": [
          {
            "name": "Open"
          },
          {
            "name": "Fulfilled"
          },
          {
            "name": "Cancelled"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "Offer_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_in",
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
          },
          {
            "name": "id_not_in",
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
          },
          {
            "name": "id_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_in",
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
          },
          {
            "name": "fractionID_not_in",
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
          },
          {
            "name": "fractionID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "fractionID_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "ClaimToken_filter",
              "ofType": null
            }
          },
          {
            "name": "unitsAvailable",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "unitsAvailable_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "unitsAvailable_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "unitsAvailable_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "unitsAvailable_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "unitsAvailable_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "unitsAvailable_in",
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
          },
          {
            "name": "unitsAvailable_not_in",
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
          },
          {
            "name": "minUnitsPerTrade",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "minUnitsPerTrade_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "minUnitsPerTrade_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "minUnitsPerTrade_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "minUnitsPerTrade_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "minUnitsPerTrade_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "minUnitsPerTrade_in",
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
          },
          {
            "name": "minUnitsPerTrade_not_in",
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
          },
          {
            "name": "maxUnitsPerTrade",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "maxUnitsPerTrade_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "maxUnitsPerTrade_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "maxUnitsPerTrade_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "maxUnitsPerTrade_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "maxUnitsPerTrade_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "maxUnitsPerTrade_in",
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
          },
          {
            "name": "maxUnitsPerTrade_not_in",
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
          },
          {
            "name": "status",
            "type": {
              "kind": "ENUM",
              "name": "OfferStatus",
              "ofType": null
            }
          },
          {
            "name": "status_not",
            "type": {
              "kind": "ENUM",
              "name": "OfferStatus",
              "ofType": null
            }
          },
          {
            "name": "status_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "OfferStatus",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "status_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "ENUM",
                  "name": "OfferStatus",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "acceptedTokens",
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
          },
          {
            "name": "acceptedTokens_not",
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
          },
          {
            "name": "acceptedTokens_contains",
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
          },
          {
            "name": "acceptedTokens_contains_nocase",
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
          },
          {
            "name": "acceptedTokens_not_contains",
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
          },
          {
            "name": "acceptedTokens_not_contains_nocase",
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
          },
          {
            "name": "acceptedTokens_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "AcceptedToken_filter",
              "ofType": null
            }
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Offer_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Offer_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "Offer_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "fractionID"
          },
          {
            "name": "fractionID__id"
          },
          {
            "name": "fractionID__tokenID"
          },
          {
            "name": "fractionID__owner"
          },
          {
            "name": "fractionID__units"
          },
          {
            "name": "unitsAvailable"
          },
          {
            "name": "minUnitsPerTrade"
          },
          {
            "name": "maxUnitsPerTrade"
          },
          {
            "name": "status"
          },
          {
            "name": "acceptedTokens"
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "OrderDirection",
        "enumValues": [
          {
            "name": "asc"
          },
          {
            "name": "desc"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Token",
        "fields": [
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
            "name": "symbol",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "decimals",
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
        "name": "Token_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_in",
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
          },
          {
            "name": "id_not_in",
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
          },
          {
            "name": "id_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_in",
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
          },
          {
            "name": "name_not_in",
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
          },
          {
            "name": "name_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "name_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_in",
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
          },
          {
            "name": "symbol_not_in",
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
          },
          {
            "name": "symbol_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "symbol_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "decimals",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "decimals_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "decimals_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "decimals_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "decimals_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "decimals_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "decimals_in",
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
          },
          {
            "name": "decimals_not_in",
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
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Token_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Token_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "Token_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "name"
          },
          {
            "name": "symbol"
          },
          {
            "name": "decimals"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "Trade",
        "fields": [
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
            "name": "buyer",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Bytes",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "offerID",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Offer",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "unitsSold",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "token",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "Token",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "amountPerUnit",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigInt",
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
        "name": "Trade_filter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_in",
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
          },
          {
            "name": "id_not_in",
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
          },
          {
            "name": "id_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "id_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "buyer",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "buyer_not",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "buyer_gt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "buyer_lt",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "buyer_gte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "buyer_lte",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "buyer_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "buyer_not_in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Bytes",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "buyer_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "buyer_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            }
          },
          {
            "name": "offerID",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_in",
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
          },
          {
            "name": "offerID_not_in",
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
          },
          {
            "name": "offerID_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "offerID_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Offer_filter",
              "ofType": null
            }
          },
          {
            "name": "unitsSold",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "unitsSold_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "unitsSold_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "unitsSold_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "unitsSold_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "unitsSold_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "unitsSold_in",
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
          },
          {
            "name": "unitsSold_not_in",
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
          },
          {
            "name": "token",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_gt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_lt",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_gte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_lte",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_in",
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
          },
          {
            "name": "token_not_in",
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
          },
          {
            "name": "token_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not_contains",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not_contains_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not_starts_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not_starts_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not_ends_with",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_not_ends_with_nocase",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "Token_filter",
              "ofType": null
            }
          },
          {
            "name": "amountPerUnit",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "amountPerUnit_not",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "amountPerUnit_gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "amountPerUnit_lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "amountPerUnit_gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "amountPerUnit_lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigInt",
              "ofType": null
            }
          },
          {
            "name": "amountPerUnit_in",
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
          },
          {
            "name": "amountPerUnit_not_in",
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
          },
          {
            "name": "_change_block",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BlockChangedFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Trade_filter",
                "ofType": null
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "INPUT_OBJECT",
                "name": "Trade_filter",
                "ofType": null
              }
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "Trade_orderBy",
        "enumValues": [
          {
            "name": "id"
          },
          {
            "name": "buyer"
          },
          {
            "name": "offerID"
          },
          {
            "name": "offerID__id"
          },
          {
            "name": "offerID__unitsAvailable"
          },
          {
            "name": "offerID__minUnitsPerTrade"
          },
          {
            "name": "offerID__maxUnitsPerTrade"
          },
          {
            "name": "offerID__status"
          },
          {
            "name": "unitsSold"
          },
          {
            "name": "token"
          },
          {
            "name": "token__id"
          },
          {
            "name": "token__name"
          },
          {
            "name": "token__symbol"
          },
          {
            "name": "token__decimals"
          },
          {
            "name": "amountPerUnit"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "_Block_",
        "fields": [
          {
            "name": "hash",
            "type": {
              "kind": "SCALAR",
              "name": "Bytes",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "number",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "timestamp",
            "type": {
              "kind": "SCALAR",
              "name": "Int",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "OBJECT",
        "name": "_Meta_",
        "fields": [
          {
            "name": "block",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "_Block_",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "deployment",
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
            "name": "hasIndexingErrors",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Boolean",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": []
      },
      {
        "kind": "ENUM",
        "name": "_SubgraphErrorPolicy_",
        "enumValues": [
          {
            "name": "allow"
          },
          {
            "name": "deny"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "BigFloat"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BigFloatFilter",
        "inputFields": [
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "BigFloat",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "is",
            "type": {
              "kind": "ENUM",
              "name": "FilterIs",
              "ofType": null
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "neq",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "BigIntFilter",
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
            "name": "in",
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
          },
          {
            "name": "is",
            "type": {
              "kind": "ENUM",
              "name": "FilterIs",
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
          },
          {
            "name": "neq",
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
        "name": "BooleanFilter",
        "inputFields": [
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "Boolean",
              "ofType": null
            }
          },
          {
            "name": "is",
            "type": {
              "kind": "ENUM",
              "name": "FilterIs",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Cursor"
      },
      {
        "kind": "SCALAR",
        "name": "Date"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DateFilter",
        "inputFields": [
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Date",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "is",
            "type": {
              "kind": "ENUM",
              "name": "FilterIs",
              "ofType": null
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          },
          {
            "name": "neq",
            "type": {
              "kind": "SCALAR",
              "name": "Date",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Datetime"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "DatetimeFilter",
        "inputFields": [
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "Datetime",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "Datetime",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "Datetime",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Datetime",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "is",
            "type": {
              "kind": "ENUM",
              "name": "FilterIs",
              "ofType": null
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "Datetime",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "Datetime",
              "ofType": null
            }
          },
          {
            "name": "neq",
            "type": {
              "kind": "SCALAR",
              "name": "Datetime",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "FilterIs",
        "enumValues": [
          {
            "name": "NULL"
          },
          {
            "name": "NOT_NULL"
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "FloatFilter",
        "inputFields": [
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
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
          {
            "name": "is",
            "type": {
              "kind": "ENUM",
              "name": "FilterIs",
              "ofType": null
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          },
          {
            "name": "neq",
            "type": {
              "kind": "SCALAR",
              "name": "Float",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "IDFilter",
        "inputFields": [
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "ID",
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
        "kind": "INTERFACE",
        "name": "Node",
        "fields": [
          {
            "name": "nodeId",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "ID",
                "ofType": null
              }
            },
            "args": []
          }
        ],
        "interfaces": [],
        "possibleTypes": [
          {
            "kind": "OBJECT",
            "name": "hypercerts"
          },
          {
            "kind": "OBJECT",
            "name": "lastblockindexed"
          }
        ]
      },
      {
        "kind": "SCALAR",
        "name": "Opaque"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "OpaqueFilter",
        "inputFields": [
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "Opaque",
              "ofType": null
            }
          },
          {
            "name": "is",
            "type": {
              "kind": "ENUM",
              "name": "FilterIs",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "ENUM",
        "name": "OrderByDirection",
        "enumValues": [
          {
            "name": "AscNullsFirst"
          },
          {
            "name": "AscNullsLast"
          },
          {
            "name": "DescNullsFirst"
          },
          {
            "name": "DescNullsLast"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "PageInfo",
        "fields": [
          {
            "name": "endCursor",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "hasNextPage",
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
            "name": "hasPreviousPage",
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
            "name": "startCursor",
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
        "name": "Time"
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "TimeFilter",
        "inputFields": [
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            }
          },
          {
            "name": "gt",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            }
          },
          {
            "name": "gte",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "Time",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "is",
            "type": {
              "kind": "ENUM",
              "name": "FilterIs",
              "ofType": null
            }
          },
          {
            "name": "lt",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            }
          },
          {
            "name": "lte",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
              "ofType": null
            }
          },
          {
            "name": "neq",
            "type": {
              "kind": "SCALAR",
              "name": "Time",
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
        "kind": "INPUT_OBJECT",
        "name": "UUIDFilter",
        "inputFields": [
          {
            "name": "eq",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "in",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "SCALAR",
                  "name": "UUID",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "is",
            "type": {
              "kind": "ENUM",
              "name": "FilterIs",
              "ofType": null
            }
          },
          {
            "name": "neq",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "hypercerts",
        "fields": [
          {
            "name": "nodeId",
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
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
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
                "name": "BigFloat",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contract_address",
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
            "name": "token_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigFloat",
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
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String",
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
            "name": "external_url",
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
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "work_timeframe_from",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "work_timeframe_to",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "impact_scope",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "impact_timeframe_from",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "impact_timeframe_to",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            },
            "args": []
          },
          {
            "name": "contributors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "rights",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "cid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "hypercertsConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "hypercertsEdge",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo",
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
        "name": "hypercertsDeleteResponse",
        "fields": [
          {
            "name": "affectedCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "records",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "hypercerts",
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
        "name": "hypercertsEdge",
        "fields": [
          {
            "name": "cursor",
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
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "hypercerts",
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
        "name": "hypercertsFilter",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "UUIDFilter",
              "ofType": null
            }
          },
          {
            "name": "chain_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigFloatFilter",
              "ofType": null
            }
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigFloatFilter",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "image",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "external_url",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "work_timeframe_from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigFloatFilter",
              "ofType": null
            }
          },
          {
            "name": "work_timeframe_to",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigFloatFilter",
              "ofType": null
            }
          },
          {
            "name": "impact_timeframe_from",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigFloatFilter",
              "ofType": null
            }
          },
          {
            "name": "impact_timeframe_to",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigFloatFilter",
              "ofType": null
            }
          },
          {
            "name": "cid",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "nodeId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "hypercertsFilter",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "hypercertsFilter",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "hypercertsFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "hypercertsInsertInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "chain_id",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "image",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "external_url",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "work_scope",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "work_timeframe_from",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "work_timeframe_to",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "impact_scope",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "impact_timeframe_from",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "impact_timeframe_to",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "contributors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "rights",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "cid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "hypercertsInsertResponse",
        "fields": [
          {
            "name": "affectedCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "records",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "hypercerts",
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
        "kind": "INPUT_OBJECT",
        "name": "hypercertsOrderBy",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "chain_id",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "image",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "external_url",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "work_timeframe_from",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "work_timeframe_to",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "impact_timeframe_from",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "impact_timeframe_to",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "cid",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "hypercertsUpdateInput",
        "inputFields": [
          {
            "name": "id",
            "type": {
              "kind": "SCALAR",
              "name": "UUID",
              "ofType": null
            }
          },
          {
            "name": "chain_id",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "token_id",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "name",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "description",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "image",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "external_url",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "work_scope",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "work_timeframe_from",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "work_timeframe_to",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "impact_scope",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "impact_timeframe_from",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "impact_timeframe_to",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "contributors",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "rights",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "SCALAR",
                "name": "String",
                "ofType": null
              }
            }
          },
          {
            "name": "cid",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "hypercertsUpdateResponse",
        "fields": [
          {
            "name": "affectedCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "records",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "hypercerts",
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
        "name": "lastblockindexed",
        "fields": [
          {
            "name": "nodeId",
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
            "name": "chain_id",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "BigFloat",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "contract_address",
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
            "name": "block_number",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            },
            "args": []
          }
        ],
        "interfaces": [
          {
            "kind": "INTERFACE",
            "name": "Node"
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "lastblockindexedConnection",
        "fields": [
          {
            "name": "edges",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "lastblockindexedEdge",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          },
          {
            "name": "pageInfo",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "PageInfo",
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
        "name": "lastblockindexedDeleteResponse",
        "fields": [
          {
            "name": "affectedCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "records",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "lastblockindexed",
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
        "name": "lastblockindexedEdge",
        "fields": [
          {
            "name": "cursor",
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
            "name": "node",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "OBJECT",
                "name": "lastblockindexed",
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
        "name": "lastblockindexedFilter",
        "inputFields": [
          {
            "name": "chain_id",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigFloatFilter",
              "ofType": null
            }
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "StringFilter",
              "ofType": null
            }
          },
          {
            "name": "block_number",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "BigFloatFilter",
              "ofType": null
            }
          },
          {
            "name": "nodeId",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "IDFilter",
              "ofType": null
            }
          },
          {
            "name": "and",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "lastblockindexedFilter",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "or",
            "type": {
              "kind": "LIST",
              "ofType": {
                "kind": "NON_NULL",
                "ofType": {
                  "kind": "INPUT_OBJECT",
                  "name": "lastblockindexedFilter",
                  "ofType": null
                }
              }
            }
          },
          {
            "name": "not",
            "type": {
              "kind": "INPUT_OBJECT",
              "name": "lastblockindexedFilter",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "lastblockindexedInsertInput",
        "inputFields": [
          {
            "name": "chain_id",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "block_number",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "lastblockindexedInsertResponse",
        "fields": [
          {
            "name": "affectedCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "records",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "lastblockindexed",
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
        "kind": "INPUT_OBJECT",
        "name": "lastblockindexedOrderBy",
        "inputFields": [
          {
            "name": "chain_id",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          },
          {
            "name": "block_number",
            "type": {
              "kind": "ENUM",
              "name": "OrderByDirection",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "INPUT_OBJECT",
        "name": "lastblockindexedUpdateInput",
        "inputFields": [
          {
            "name": "chain_id",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          },
          {
            "name": "contract_address",
            "type": {
              "kind": "SCALAR",
              "name": "String",
              "ofType": null
            }
          },
          {
            "name": "block_number",
            "type": {
              "kind": "SCALAR",
              "name": "BigFloat",
              "ofType": null
            }
          }
        ]
      },
      {
        "kind": "OBJECT",
        "name": "lastblockindexedUpdateResponse",
        "fields": [
          {
            "name": "affectedCount",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "SCALAR",
                "name": "Int",
                "ofType": null
              }
            },
            "args": []
          },
          {
            "name": "records",
            "type": {
              "kind": "NON_NULL",
              "ofType": {
                "kind": "LIST",
                "ofType": {
                  "kind": "NON_NULL",
                  "ofType": {
                    "kind": "OBJECT",
                    "name": "lastblockindexed",
                    "ofType": null
                  }
                }
              }
            },
            "args": []
          }
        ],
        "interfaces": []
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