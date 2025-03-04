import { ArgsType } from "type-graphql";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";
import { EntityTypeDefs } from "../typeDefs/typeDefs.js";

const { WhereInput: SalesWhereInput, SortOptions: SalesSortOptions } =
  createEntityArgs("Sale", {
    ...WhereFieldDefinitions.Sale.fields,
    hypercert: {
      type: "id",
      references: {
        entity: EntityTypeDefs.Hypercert,
        fields: WhereFieldDefinitions.Hypercert.fields,
      },
    },
  });

@ArgsType()
export class GetSalesArgs extends BaseQueryArgs(
  SalesWhereInput,
  SalesSortOptions,
) {}

export { SalesSortOptions, SalesWhereInput };
