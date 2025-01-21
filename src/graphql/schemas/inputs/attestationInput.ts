import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import { BigIntSearchOptions, StringSearchOptions } from "./searchOptions.js";
import type { Attestation } from "../typeDefs/attestationTypeDefs.js";

@InputType()
export class BasicAttestationWhereInput implements WhereOptions<Attestation> {
  @Field(() => StringSearchOptions, { nullable: true })
  uid?: StringSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  creation_block_timestamp?: BigIntSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  creation_block_number?: BigIntSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  last_update_block_number?: BigIntSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  last_update_block_timestamp?: BigIntSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  attester?: StringSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  recipient?: StringSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  resolver?: StringSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  attestation?: StringSearchOptions;
  @Field(() => BigIntSearchOptions, { nullable: true })
  chain_id?: BigIntSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  contract_address?: StringSearchOptions;
  @Field(() => StringSearchOptions, { nullable: true })
  token_id?: StringSearchOptions;
}
