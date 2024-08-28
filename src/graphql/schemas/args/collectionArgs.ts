import { ArgsType, Field } from "type-graphql";
import { BasicCollectionWhereInput, CollectionFetchInput } from "../inputs/collectionInput.js";
import { withPagination } from "./baseArgs.js";

@ArgsType()
export class CollectionArgs {
  @Field({ nullable: true })
  where?: BasicCollectionWhereInput;
  @Field({ nullable: true })
  sort?: CollectionFetchInput;
}

@ArgsType()
export class GetCollectionsArgs extends withPagination(CollectionArgs) {}
