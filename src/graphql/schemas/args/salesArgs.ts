import { ArgsType, Field } from "type-graphql";
import { PaginationArgs } from "./paginationArgs.js";
import {
  BasicCollectionWhereInput,
  CollectionFetchInput,
} from "../inputs/collectionInput.js";

@ArgsType()
export class GetSalesArgs extends PaginationArgs {
  @Field({ nullable: true })
  where?: BasicCollectionWhereInput;
  @Field({ nullable: true })
  sort?: CollectionFetchInput;
}

@ArgsType()
export class GetSaleByIdArgs {
  @Field({ nullable: true })
  transaction_hash?: string;
}
