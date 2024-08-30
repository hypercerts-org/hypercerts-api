import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  BooleanSearchOptions,
  IdSearchOptions,
  NumberSearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";
import type { AttestationSchema } from "../typeDefs/attestationSchemaTypeDefs.js";

@InputType()
export class BasicAttestationSchemaWhereInput
  implements WhereOptions<AttestationSchema>
{
  @Field(() => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions | null;
  @Field(() => StringSearchOptions, { nullable: true })
  uid?: StringSearchOptions | null;
  @Field(() => NumberSearchOptions, { nullable: true })
  chain_id?: NumberSearchOptions | null;
  @Field(() => StringSearchOptions, { nullable: true })
  resolver?: NumberSearchOptions | null;
  @Field(() => StringSearchOptions, { nullable: true })
  schema?: StringSearchOptions | null;
  @Field(() => BooleanSearchOptions, { nullable: true })
  revocable?: BooleanSearchOptions | null;
}
