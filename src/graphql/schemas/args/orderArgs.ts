import { HypercertBaseType } from "../typeDefs/baseTypes/hypercertBaseType.js";
import { Order } from "../typeDefs/orderTypeDefs.js";
import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";
import { WhereFieldDefinitions } from "./whereFieldDefinitions.js";

// @InputType()
// export class OrderWhereInput extends BasicOrderWhereInput {}

// @InputType()
// export class OrderFetchInput implements OrderOptions<Order> {
//   @Field(() => OrderSortOptions, { nullable: true })
//   by?: OrderSortOptions;
// }

// @ArgsType()
// class OrderArgs {
//   @Field(() => OrderWhereInput, { nullable: true })
//   where?: OrderWhereInput;
//   @Field(() => OrderFetchInput, { nullable: true })
//   sort?: OrderFetchInput;
// }

// @ArgsType()
// export class GetOrdersArgs extends withPagination(OrderArgs) {}

const {
  WhereArgs: OrderWhereArgs,
  EntitySortOptions: OrderSortOptions,
  SortArgs: OrderSortArgs,
} = createEntityArgs<Order>("Order", {
  hypercert_id: "string",
  createdAt: "string",
  quoteType: "number",
  globalNonce: "string",
  orderNonce: "string",
  strategyId: "number",
  collectionType: "number",
  collection: "string",
  currency: "string",
  signer: "string",
  startTime: "number",
  endTime: "number",
  price: "string",
  chainId: "bigint",
  subsetNonce: "number",
  itemIds: "stringArray",
  amounts: "numberArray",
  invalidated: "boolean",
  hypercert: {
    type: "id",
    references: {
      entity: HypercertBaseType,
      fields: WhereFieldDefinitions.Hypercert.fields,
    },
  },
});

export const GetOrdersArgs = BaseQueryArgs(OrderWhereArgs, OrderSortArgs);
export type GetOrdersArgs = InstanceType<typeof GetOrdersArgs>;

export { OrderSortArgs, OrderSortOptions, OrderWhereArgs };
