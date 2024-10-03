import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  IdSearchOptions,
  BigIntSearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";
import { Hyperboard } from "../typeDefs/hyperboardTypeDefs.js";

@InputType()
export class BasicHyperboardWhereInput implements WhereOptions<Hyperboard> {
  @Field(() => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions | null;
  @Field(() => BigIntSearchOptions, { nullable: true })
  chain_id?: BigIntSearchOptions | null;
  @Field(() => StringSearchOptions, { nullable: true })
  admin_id?: StringSearchOptions | null;
}
