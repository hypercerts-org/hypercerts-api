import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  IdSearchOptions,
  NumberSearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";
import type { OrderOptions } from "./orderOptions.js";
import { ContractSortOptions } from "./sortOptions.js";
import { Order } from "../typeDefs/orderTypeDefs.js";

@InputType()
export class BasicOrderWhereInput implements WhereOptions<Order> {
  @Field(() => IdSearchOptions, { nullable: true })
  id?: IdSearchOptions | null;
  @Field(() => NumberSearchOptions, { nullable: true })
  chainId?: NumberSearchOptions | null;
  @Field(() => StringSearchOptions, { nullable: true })
  signer?: StringSearchOptions | null;
  @Field(() => StringSearchOptions, { nullable: true })
  hypercert_id?: StringSearchOptions | null;
}

@InputType()
export class OrderFetchInput implements OrderOptions<Order> {
  @Field(() => ContractSortOptions, { nullable: true })
  by?: ContractSortOptions;
}
