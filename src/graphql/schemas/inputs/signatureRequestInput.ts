import { Field, InputType } from "type-graphql";

import { SignatureRequest } from "../typeDefs/signatureRequestTypeDefs.js";

import type { WhereOptions } from "./whereOptions.js";
import {
  BigIntSearchOptions,
  SignatureRequestPurposeSearchOptions,
  SignatureRequestStatusSearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";

@InputType()
export class BasicSignatureRequestWhereInput
  implements WhereOptions<SignatureRequest>
{
  @Field(() => StringSearchOptions, { nullable: true })
  safe_address?: StringSearchOptions;

  @Field(() => StringSearchOptions, { nullable: true })
  message_hash?: StringSearchOptions;

  @Field(() => BigIntSearchOptions, { nullable: true })
  timestamp?: BigIntSearchOptions;

  @Field(() => BigIntSearchOptions, { nullable: true })
  chain_id?: BigIntSearchOptions;

  @Field(() => SignatureRequestPurposeSearchOptions, { nullable: true })
  purpose?: SignatureRequestPurposeSearchOptions;

  @Field(() => SignatureRequestStatusSearchOptions, { nullable: true })
  status?: SignatureRequestStatusSearchOptions;
}
