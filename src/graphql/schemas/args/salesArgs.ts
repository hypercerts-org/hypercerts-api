import { ArgsType, Field } from "type-graphql";
import { PaginationArgs } from "./paginationArgs.js";
import { BasicSaleWhereInput, SaleFetchInput } from "../inputs/salesInput.js";

@ArgsType()
export class GetSalesArgs extends PaginationArgs {
  @Field({ nullable: true })
  where?: BasicSaleWhereInput;
  @Field({ nullable: true })
  sort?: SaleFetchInput;
}

@ArgsType()
export class GetSaleByIdArgs {
  @Field({ nullable: true })
  transaction_hash?: string;
}
