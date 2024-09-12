import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  IdSearchOptions,
  BigIntSearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";
import { Collection } from "../typeDefs/collectionTypeDefs.js";

@InputType()
export class BasicCollectionWhereInput implements WhereOptions<Collection> {
  @Field(() => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions | null;
  @Field(() => BigIntSearchOptions, { nullable: true })
  chain_id?: BigIntSearchOptions | null;
  @Field(() => StringSearchOptions, { nullable: true })
  admin_id?: StringSearchOptions | null;
}
