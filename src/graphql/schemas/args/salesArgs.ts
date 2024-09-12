import { ArgsType, InputType, Field } from "type-graphql";
import { BasicSaleWhereInput } from "../inputs/salesInput.js";
import { withPagination } from "./baseArgs.js";
import { SaleSortOptions } from "../inputs/sortOptions.js";
import { Sale } from "../typeDefs/salesTypeDefs.js";
import { OrderOptions } from "../inputs/orderOptions.js";

@InputType()
export class SaleWhereInput extends BasicSaleWhereInput {}

@InputType()
export class SaleFetchInput implements OrderOptions<Sale> {
  @Field(() => SaleSortOptions, { nullable: true })
  by?: SaleSortOptions;
}

@ArgsType()
class SalesArgs {
  @Field(() => SaleWhereInput, { nullable: true })
  where?: SaleWhereInput;
  @Field(() => SaleFetchInput, { nullable: true })
  sort?: SaleFetchInput;
}

@ArgsType()
export class GetSalesArgs extends withPagination(SalesArgs) {}
