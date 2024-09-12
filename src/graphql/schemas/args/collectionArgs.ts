import { ArgsType, InputType, Field } from "type-graphql";
import { BasicCollectionWhereInput } from "../inputs/collectionInput.js";
import { withPagination } from "./baseArgs.js";
import { OrderOptions } from "../inputs/orderOptions.js";
import { Collection } from "../typeDefs/collectionTypeDefs.js";
import { CollectionSortOptions } from "../inputs/sortOptions.js";

@InputType()
class CollectionWhereInput extends BasicCollectionWhereInput {}

@InputType()
class CollectionFetchInput implements OrderOptions<Collection> {
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
