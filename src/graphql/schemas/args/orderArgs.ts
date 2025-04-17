import { ArgsType } from "type-graphql";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";
import { EntityTypeDefs } from "../typeDefs/typeDefs.js";

const { WhereInput: OrderWhereInput, SortOptions: OrderSortOptions } =
  createEntityArgs("Order", {
    ...WhereFieldDefinitions.Order.fields,
    hypercert: {
      type: "id",
      references: {
        entity: EntityTypeDefs.Hypercert,
        fields: WhereFieldDefinitions.Hypercert.fields,
      },
    },
  });

@ArgsType()
export class GetOrdersArgs extends BaseQueryArgs(
  OrderWhereInput,
  OrderSortOptions,
) {}

export { OrderSortOptions, OrderWhereInput };
