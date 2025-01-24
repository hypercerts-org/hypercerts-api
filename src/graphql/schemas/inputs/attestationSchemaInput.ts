import { Field, InputType } from "type-graphql";
import type { AttestationSchema } from "../typeDefs/attestationSchemaTypeDefs.js";
import {
  BigIntSearchOptions,
  BooleanSearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";
import type { WhereOptions } from "./whereOptions.js";

@InputType()
export class BasicAttestationSchemaWhereInput
  implements WhereOptions<AttestationSchema>
{
  @Field(() => StringSearchOptions, { nullable: true })
  uid?: StringSearchOptions | null;
  @Field(() => BigIntSearchOptions, { nullable: true })
  chain_id?: BigIntSearchOptions | null;
  @Field(() => StringSearchOptions, { nullable: true })
  resolver?: BigIntSearchOptions | null;
  @Field(() => StringSearchOptions, { nullable: true })
  schema?: StringSearchOptions | null;
  @Field(() => BooleanSearchOptions, { nullable: true })
  revocable?: BooleanSearchOptions | null;
}
