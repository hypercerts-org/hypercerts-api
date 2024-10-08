import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import { BigIntSearchOptions, StringSearchOptions } from "./searchOptions.js";
import { User } from "../typeDefs/userTypeDefs.js";

@InputType()
export class BasicUserWhereInput implements WhereOptions<User> {
  @Field(() => StringSearchOptions, { nullable: true })
  address?: StringSearchOptions | null;

  @Field(() => BigIntSearchOptions, { nullable: true })
  chain_id?: BigIntSearchOptions | null;
}
