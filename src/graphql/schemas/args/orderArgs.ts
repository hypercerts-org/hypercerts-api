import { ArgsType, Field, InputType } from "type-graphql";
import { BasicOrderWhereInput } from "../inputs/orderInput.js";
import { withPagination } from "./baseArgs.js";
import { OrderSortOptions } from "../inputs/sortOptions.js";
import type { OrderOptions } from "../inputs/orderOptions.js";
import { Order } from "../typeDefs/orderTypeDefs.js";

@InputType()
export class OrderWhereInput extends BasicOrderWhereInput {}

@InputType()
export class OrderFetchInput implements OrderOptions<Order> {
  @Field(() => OrderSortOptions, { nullable: true })
  by?: OrderSortOptions;
}

@ArgsType()
class OrderArgs {
  @Field(() => OrderWhereInput, { nullable: true })
  where?: OrderWhereInput;
  @Field(() => OrderFetchInput, { nullable: true })
  sort?: OrderFetchInput;
}

@ArgsType()
export class GetOrdersArgs extends withPagination(OrderArgs) {}
