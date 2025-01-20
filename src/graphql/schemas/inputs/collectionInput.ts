import { Field, InputType } from "type-graphql";

import { Collection } from "../typeDefs/collectionTypeDefs.js";

import { IdSearchOptions, StringSearchOptions } from "./searchOptions.js";
import type { WhereOptions } from "./whereOptions.js";

@InputType()
export class BasicCollectionWhereInput implements WhereOptions<Collection> {
  @Field(() => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions | null;

  @Field(() => StringSearchOptions, { nullable: true })
  name?: StringSearchOptions;

  @Field(() => StringSearchOptions, { nullable: true })
  description?: StringSearchOptions;
}
