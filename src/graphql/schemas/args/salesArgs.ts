import { HypercertBaseType } from "../typeDefs/baseTypes/hypercertBaseType.js";
import { Sale } from "../typeDefs/salesTypeDefs.js";
import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";
import { WhereFieldDefinitions } from "./whereFieldDefinitions.js";

// @InputType()
// export class SaleWhereInput extends BasicSaleWhereInput {}

// @InputType()
// export class SaleFetchInput implements OrderOptions<Sale> {
//   @Field(() => SaleSortOptions, { nullable: true })
//   by?: SaleSortOptions;
// }

// @ArgsType()
// class SalesArgs {
//   @Field(() => SaleWhereInput, { nullable: true })
//   where?: SaleWhereInput;
//   @Field(() => SaleFetchInput, { nullable: true })
//   sort?: SaleFetchInput;
// }

// @ArgsType()
// export class GetSalesArgs extends withPagination(SalesArgs) {}

const {
  WhereArgs: SaleWhereArgs,
  EntitySortOptions: SaleSortOptions,
  SortArgs: SaleSortArgs,
} = createEntityArgs<Sale>("Sale", {
  buyer: "string",
  seller: "string",
  strategy_id: "number",
  currency: "string",
  collection: "string",
  item_ids: "stringArray",
  hypercert_id: "string",
  amounts: "numberArray",
  transaction_hash: "string",
  creation_block_number: "bigint",
  creation_block_timestamp: "bigint",
  hypercert: {
    type: "id",
    references: {
      entity: HypercertBaseType,
      fields: WhereFieldDefinitions.Hypercert.fields,
    },
  },
});

export const GetSalesArgs = BaseQueryArgs(SaleWhereArgs, SaleSortArgs);
export type GetSalesArgs = InstanceType<typeof GetSalesArgs>;

export { SaleSortArgs, SaleSortOptions, SaleWhereArgs };
