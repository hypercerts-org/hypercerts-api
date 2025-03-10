/**
 * Defines the field types for filtering entities in GraphQL queries.
 * This constant provides a schema-like structure that maps entity types to their
 * filterable fields and their corresponding data types.
 *
 * Each entity (like Attestation, Blueprint, Collection, etc.) has a fields object
 * that defines what properties can be used in where clauses and their expected types.
 * This is useful for:
 * - Type checking in GraphQL queries
 * - Building dynamic filters
 * - Validating query parameters
 * - Generating TypeScript types for query builders
 *
 * @example
 * // Structure for each entity:
 * // EntityName: {
 * //   fields: {
 * //     fieldName: "fieldType"
 * //   }
 * // }
 */
// TODO: key values can be keyof EntityTypeDefs
export const WhereFieldDefinitions = {
  AllowlistRecord: {
    fields: {
      hypercert_id: "string",
      token_id: "bigint",
      leaf: "string",
      entry: "number",
      user_address: "string",
      claimed: "boolean",
      proof: "stringArray",
      units: "bigint",
      total_units: "bigint",
      root: "string",
    },
  },
  Attestation: {
    fields: {
      id: "string",
      uid: "string",
      creation_block_timestamp: "bigint",
      creation_block_number: "bigint",
      last_update_block_number: "bigint",
      last_update_block_timestamp: "bigint",
      attester: "string",
      recipient: "string",
      resolver: "string",
      supported_schemas_id: "string",
    },
  },
  AttestationSchema: {
    fields: {
      id: "string",
      chain_id: "number",
      uid: "string",
      resolver: "string",
      revocable: "boolean",
    },
  },
  Blueprint: {
    fields: {
      id: "number",
      created_at: "string",
      minter_address: "string",
      minted: "boolean",
    },
  },
  Collection: {
    fields: {
      id: "string",
      name: "string",
      description: "string",
      created_at: "string",
    },
  },
  Contract: {
    fields: {
      id: "string",
      address: "string",
      chain_id: "number",
    },
  },
  Fraction: {
    fields: {
      id: "string",
      creation_block_timestamp: "bigint",
      creation_block_number: "bigint",
      last_update_block_number: "bigint",
      last_update_block_timestamp: "bigint",
      owner_address: "string",
      units: "bigint",
      hypercert_id: "string",
      fraction_id: "string",
      token_id: "bigint",
    },
  },
  Hypercert: {
    fields: {
      id: "string",
      hypercert_id: "string",
      creator_address: "string",
      token_id: "bigint",
      units: "bigint",
      creation_block_timestamp: "bigint",
      last_update_block_timestamp: "bigint",
      last_update_block_number: "bigint",
      creation_block_number: "bigint",
      sales_count: "number",
      attestations_count: "number",
      uri: "string",
    },
  },
  Hyperboard: {
    fields: {
      id: "string",
      chain_ids: "numberArray",
    },
  },
  Metadata: {
    fields: {
      id: "string",
      name: "string",
      description: "string",
      uri: "string",
      allow_list_uri: "string",
      contributors: "stringArray",
      external_url: "string",
      impact_scope: "stringArray",
      rights: "stringArray",
      work_scope: "stringArray",
      work_timeframe_from: "bigint",
      work_timeframe_to: "bigint",
      impact_timeframe_from: "bigint",
      impact_timeframe_to: "bigint",
    },
  },
  Order: {
    fields: {
      id: "string",
      hypercert_id: "string",
      createdAt: "string",
      quoteType: "number",
      globalNonce: "string",
      orderNonce: "string",
      strategyId: "number",
      collectionType: "number",
      collection: "string",
      currency: "string",
      signer: "string",
      startTime: "number",
      endTime: "number",
      price: "string",
      chainId: "bigint",
      subsetNonce: "number",
      itemIds: "stringArray",
      amounts: "numberArray",
      invalidated: "boolean",
    },
  },
  Sale: {
    fields: {
      id: "string",
      buyer: "string",
      seller: "string",
      strategy_id: "number",
      currency: "string",
      collection: "string",
      item_ids: "stringArray",
      hypercert_id: "string",
      amounts: "numberArray",
      transaction_hash: "string",
      creation_block_number: "bigint",
      creation_block_timestamp: "bigint",
    },
  },
  User: {
    fields: {
      id: "string",
      address: "string",
      display_name: "string",
      chain_id: "number",
    },
  },
} as const;

/**
 * Type definition for the WhereFieldDefinitions constant.
 * This type is used to ensure type safety when working with field definitions
 * and can be used to extract field types for specific entities.
 */
export type WhereFieldDefinition = typeof WhereFieldDefinitions;
