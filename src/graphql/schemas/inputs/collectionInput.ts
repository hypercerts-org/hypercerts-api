import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {IdSearchOptions, NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import { ContractSortOptions } from "./sortOptions.js";
import {Collection} from "../typeDefs/collectionTypeDefs.js";
import {CollectionOptions} from "./collectionOptions.js";

@InputType()
export class BasicCollectionWhereInput implements WhereOptions<Collection> {
  @Field((_) => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions | null;
  @Field((_) => NumberSearchOptions, { nullable: true })
  chain_id?: NumberSearchOptions | null;
  @Field((_) => StringSearchOptions, { nullable: true })
  admin_id?: StringSearchOptions | null;
}

@InputType()
export class CollectionFetchInput implements CollectionOptions<Collection> {
  @Field((_) => ContractSortOptions, { nullable: true })
  by?: ContractSortOptions;
}
