import { ArgsType, Field } from "type-graphql";
import { BasicSaleWhereInput, SaleFetchInput } from "../inputs/salesInput.js";
import { withPagination } from "./baseArgs.js";

@ArgsType()
class SalesArgs {
  @Field({ nullable: true })
  where?: BasicSaleWhereInput;
  @Field({ nullable: true })
  sort?: SaleFetchInput;
}

@ArgsType()
export class GetSalesArgs extends withPagination(SalesArgs) {
}
