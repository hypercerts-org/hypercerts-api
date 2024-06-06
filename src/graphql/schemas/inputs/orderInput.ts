import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import { IdSearchOptions, NumberSearchOptions } from "./searchOptions.js";
import type { OrderOptions } from "./orderOptions.js";
import { ContractSortOptions } from "./sortOptions.js";
import { Order } from "../typeDefs/orderTypeDefs.js";

@InputType()
export class BasicOrderWhereInput implements WhereOptions<Order> {
  @Field((_) => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions | null;
  @Field((_) => NumberSearchOptions, { nullable: true })
  chain_id?: NumberSearchOptions | null;
}

@InputType()
export class OrderFetchInput implements OrderOptions<Order> {
  @Field((_) => ContractSortOptions, { nullable: true })
  by?: ContractSortOptions;
}
