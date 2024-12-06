import { Field, InputType } from "type-graphql";
import { SortOrder } from "../enums/sortEnums.js";
import type { Hypercert } from "../typeDefs/hypercertTypeDefs.js";
import type { Contract } from "../typeDefs/contractTypeDefs.js";
import type { Metadata } from "../typeDefs/metadataTypeDefs.js";
import type { Attestation } from "../typeDefs/attestationTypeDefs.js";
import type { AttestationSchema } from "../typeDefs/attestationSchemaTypeDefs.js";
import type { Fraction } from "../typeDefs/fractionTypeDefs.js";
import { Order } from "../typeDefs/orderTypeDefs.js";
import { Sale } from "../typeDefs/salesTypeDefs.js";
import { Hyperboard } from "../typeDefs/hyperboardTypeDefs.js";
import { Blueprint } from "../typeDefs/blueprintTypeDefs.js";
import { SignatureRequest } from "../typeDefs/signatureRequestTypeDefs.js";

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
export class BlueprintSortOptions implements SortOptions<Blueprint> {
  @Field(() => SortOrder, { nullable: true })
  created_at?: SortOrder;
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

@InputType()
export class OrderSortOptions implements SortOptions<Order> {
  @Field(() => SortOrder, { nullable: true })
  amounts?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  chainId?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  collection?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  collectionType?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  createdAt?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  currency?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  endTime?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  globalNonce?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  hypercert_id?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  invalidated?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  orderNonce?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  price?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  quoteType?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  signer?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  startTime?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  strategyId?: SortOrder;
}

@InputType()
export class SaleSortOptions implements SortOptions<Sale> {
  @Field(() => SortOrder, { nullable: true })
  amounts?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  buyer?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  collection?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  creationBlockNumber?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  creationBlockTimestamp?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  currency?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  hypercertId?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  seller?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  strategyId?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  transactionHash?: SortOrder;
}

@InputType()
export class HyperboardSortOptions implements SortOptions<Hyperboard> {
  @Field(() => SortOrder, { nullable: true })
  name?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  admin_id?: SortOrder;
  @Field(() => SortOrder, { nullable: true })
  chainId?: SortOrder;
}

@InputType()
export class SignatureRequestSortOptions
  implements SortOptions<SignatureRequest>
{
  @Field(() => SortOrder, { nullable: true })
  safe_address?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  message_hash?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  created_at?: SortOrder;

  @Field(() => SortOrder, { nullable: true })
  purpose?: SortOrder;
}
