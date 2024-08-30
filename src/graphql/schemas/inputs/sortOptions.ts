import { Field, InputType } from "type-graphql";
import { SortOrder } from "../enums/sortEnums.js";
import type { Hypercert } from "../typeDefs/hypercertTypeDefs.js";
import type { Contract } from "../typeDefs/contractTypeDefs.js";
import type { Metadata } from "../typeDefs/metadataTypeDefs.js";
import type { Attestation } from "../typeDefs/attestationTypeDefs.js";
import type { AttestationSchema } from "../typeDefs/attestationSchemaTypeDefs.js";
import type { Fraction } from "../typeDefs/fractionTypeDefs.js";

export type SortOptions<T extends object> = {
  [P in keyof T]: SortOrder | null;
};

@InputType()
export class HypercertSortOptions implements SortOptions<Hypercert> {
  @Field(() => SortOrder, { nullable: true })
  hypercert_id?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  creation_block_timestamp?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  creation_block_number?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  last_update_block_number?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  last_update_block_timestamp?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  token_id?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  units?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  owner_address?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  last_block_update_timestamp?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  uri?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  attestations_count?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  sales_count?: SortOrder;
}

@InputType()
export class ContractSortOptions implements SortOptions<Contract> {
  @Field(() => SortOrder, { nullable: true })
  contract_id?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  contract_address?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  chain_id?: SortOrder;
}

@InputType()
export class MetadataSortOptions implements SortOptions<Metadata> {
  @Field(() => SortOrder, { nullable: true })
  description?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  external_url?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  metadata_id?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  name?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  uri?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  allow_list_uri?: SortOrder;
}

@InputType()
export class AttestationSortOptions implements SortOptions<Attestation> {
  @Field(() => SortOrder, { nullable: true })
  attestation_uid?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  creation_block_timestamp?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  creation_block_number?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  last_update_block_number?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  last_update_block_timestamp?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  attester_address?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  recipient_address?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  schema?: SortOrder;
}

@InputType()
export class AttestationSchemaSortOptions
  implements SortOptions<AttestationSchema>
{
  @Field(() => SortOrder, { nullable: true })
  eas_schema_id?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  chain_id?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  resolver?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  revocable?: SortOrder;
}

@InputType()
export class FractionSortOptions implements SortOptions<Fraction> {
  @Field(() => SortOrder, { nullable: true })
  creation_block_timestamp?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  creation_block_number?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  last_update_block_number?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  last_update_block_timestamp?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  token_id?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  units?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  owner_address?: SortOrder;
}

@InputType()
export class AllowlistRecordSortOptions implements SortOptions<Hypercert> {
  @Field(() => SortOrder, { nullable: true })
  hypercert_id?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  token_id?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  leaf?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  entry?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  user_address?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  claimed?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  proof?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  units?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  total_units?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  root?: SortOrder;
}
