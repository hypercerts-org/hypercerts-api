import { ArgsType, Field, InputType } from "type-graphql";

import { BasicCollectionWhereInput } from "../inputs/collectionInput.js";
import type { OrderOptions } from "../inputs/orderOptions.js";
import { Collection } from "../typeDefs/collectionTypeDefs.js";
import { CollectionSortOptions } from "../inputs/sortOptions.js";

import { withPagination } from "./baseArgs.js";

@InputType()
export class CollectionWhereInput extends BasicCollectionWhereInput {}

@InputType()
export class CollectionFetchInput implements OrderOptions<Collection> {
  @Field(() => CollectionSortOptions, { nullable: true })
  by?: CollectionSortOptions;
}

@ArgsType()
export class CollectionArgs {
  @Field(() => CollectionWhereInput, { nullable: true })
  where?: CollectionWhereInput;
  @Field(() => CollectionFetchInput, { nullable: true })
  sort?: CollectionFetchInput;
}

@ArgsType()
export class GetCollectionsArgs extends withPagination(CollectionArgs) {}
