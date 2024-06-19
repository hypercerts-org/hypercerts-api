import { ArgsType, Field } from "type-graphql";
import { PaginationArgs } from "./paginationArgs.js";
import {BasicCollectionWhereInput, CollectionFetchInput} from "../inputs/collectionInput.js";

@ArgsType()
export class GetCollectionArgs extends PaginationArgs {
  @Field({ nullable: true })
  where?: BasicCollectionWhereInput;
  @Field({ nullable: true })
  sort?: CollectionFetchInput;
}

@ArgsType()
export class GetCollectionByIdArgs {
  @Field({ nullable: true })
  id?: string;
}
