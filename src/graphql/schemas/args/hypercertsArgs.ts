import { Attestation } from "../typeDefs/attestationTypeDefs.js";
import { Contract } from "../typeDefs/contractTypeDefs.js";
import { Fraction } from "../typeDefs/fractionTypeDefs.js";
import { Hypercert } from "../typeDefs/hypercertTypeDefs.js";
import { Metadata } from "../typeDefs/metadataTypeDefs.js";
import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";
import { WhereFieldDefinitions } from "./whereFieldDefinitions.js";

const {
  SortArgs: HypercertSortArgs,
  EntitySortOptions: HypercertSortOptions,
  WhereArgs: HypercertWhereArgs,
} = createEntityArgs<Hypercert>("Hypercert", {
  id: "id",
  creation_block_timestamp: "bigint",
  creation_block_number: "bigint",
  last_update_block_number: "bigint",
  last_update_block_timestamp: "bigint",
  token_id: "bigint",
  creator_address: "string",
  uri: "string",
  hypercert_id: "string",
  attestations_count: "number",
  sales_count: "number",
  contracts_id: "id",
  units: "bigint",
  contract: {
    type: "id",
    references: {
      entity: Contract,
      fields: WhereFieldDefinitions.Contract.fields,
    },
  },
  metadata: {
    type: "id",
    references: {
      entity: Metadata,
      fields: WhereFieldDefinitions.Metadata.fields,
    },
  },
  attestations: {
    type: "id",
    references: {
      entity: Attestation,
      fields: WhereFieldDefinitions.Attestation.fields,
    },
  },
  fractions: {
    type: "id",
    references: {
      entity: Fraction,
      fields: WhereFieldDefinitions.Fraction.fields,
    },
  },
});

export const GetHypercertsArgs = BaseQueryArgs(
  HypercertWhereArgs,
  HypercertSortArgs,
);
export type GetHypercertsArgs = InstanceType<typeof GetHypercertsArgs>;

export { HypercertSortArgs, HypercertSortOptions, HypercertWhereArgs };
