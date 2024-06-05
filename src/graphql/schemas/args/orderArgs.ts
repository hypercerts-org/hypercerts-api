import { ArgsType, Field } from "type-graphql";
import { PaginationArgs } from "./paginationArgs.js";
import { BasicOrderWhereInput, OrderFetchInput } from "../inputs/orderInput.js";

@ArgsType()
export class GetOrdersArgs extends PaginationArgs {
  @Field({ nullable: true })
  where?: BasicOrderWhereInput;
  @Field({ nullable: true })
  sort?: OrderFetchInput;
}

@ArgsType()
export class GetOrderByIdArgs {
  @Field({ nullable: true })
  id?: string;
}
