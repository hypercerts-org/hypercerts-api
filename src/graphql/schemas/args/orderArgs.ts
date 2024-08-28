import { ArgsType, Field } from "type-graphql";
import { BasicOrderWhereInput, OrderFetchInput } from "../inputs/orderInput.js";
import { withPagination } from "./baseArgs.js";

@ArgsType()
class OrderArgs {
  @Field({ nullable: true })
  where?: BasicOrderWhereInput;
  @Field({ nullable: true })
  sort?: OrderFetchInput;
}

@ArgsType()
export class GetOrdersArgs extends withPagination(OrderArgs) {
}
