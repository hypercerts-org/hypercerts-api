export const WhereFieldDefinitions = {
  Attestation: {
    fields: {
      uid: "string",
      creation_block_timestamp: "bigint",
      attester: "string",
      recipient: "string",
      resolver: "string",
    },
  },
  AttestationSchema: {
    fields: {
      uid: "string",
      name: "string",
      description: "string",
    },
  },
  Blueprint: {
    fields: {
      id: "string",
      created_at: "string",
      minter_address: "string",
      minted: "boolean",
    },
  },
  Contract: {
    fields: {
      address: "string",
      chain_id: "number",
    },
  },
  Fraction: {
    fields: {
      hypercert_id: "string",
      fraction_id: "string",
      units: "bigint",
      owner_address: "string",
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
  Metadata: {
    fields: {
      name: "string",
      description: "string",
      uri: "string",
      contributors: "stringArray",
      work_scope: "stringArray",
      impact_scope: "stringArray",
      rights: "stringArray",
      creation_block_timestamp: "bigint",
      work_timeframe_from: "bigint",
      work_timeframe_to: "bigint",
      impact_timeframe_from: "bigint",
      impact_timeframe_to: "bigint",
    },
  },
  User: {
    fields: {
      address: "string",
      display_name: "string",
      chain_id: "number",
    },
  },
} as const;

export type WhereFieldDefinition = typeof WhereFieldDefinitions;
