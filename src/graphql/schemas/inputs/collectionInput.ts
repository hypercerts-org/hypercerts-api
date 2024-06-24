import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  IdSearchOptions,
  NumberSearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";
import { ContractSortOptions } from "./sortOptions.js";
import { Collection } from "../typeDefs/collectionTypeDefs.js";
import { CollectionOptions } from "./collectionOptions.js";

@InputType()
export class BasicCollectionWhereInput implements WhereOptions<Collection> {
  @Field(() => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions | null;
  @Field(() => NumberSearchOptions, { nullable: true })
  chain_id?: NumberSearchOptions | null;
  @Field(() => StringSearchOptions, { nullable: true })
  admin_id?: StringSearchOptions | null;
}

@InputType()
export class CollectionFetchInput implements CollectionOptions<Collection> {
  @Field(() => ContractSortOptions, { nullable: true })
  by?: ContractSortOptions;
}
