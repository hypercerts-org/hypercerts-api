import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  IdSearchOptions, NumberArraySearchOptions, NumberSearchOptions,
  StringArraySearchOptions,
  StringSearchOptions
} from "./searchOptions.js";
import { ContractSortOptions } from "./sortOptions.js";
import { Sale } from "../typeDefs/salesTypeDefs.js";
import { SaleOptions } from "./saleOptions.js";

@InputType()
export class BasicSaleWhereInput implements WhereOptions<Sale> {
  @Field(() => IdSearchOptions, { nullable: true })
  transaction_hash?: IdSearchOptions | null;

  @Field(() => StringSearchOptions, { nullable: true })
  hypercert_id?: StringSearchOptions | null;

  @Field(() => StringArraySearchOptions, { nullable: true })
  item_ids?: StringArraySearchOptions | null;

  @Field(() => StringSearchOptions, { nullable: true })
  currency?: StringSearchOptions | null;

  @Field(() => StringSearchOptions, { nullable: true })
  collection?: StringSearchOptions | null;

  @Field(() => StringSearchOptions, { nullable: true })
  buyer?: StringSearchOptions | null;

  @Field(() => StringSearchOptions, { nullable: true })
  seller?: StringSearchOptions | null;

  @Field(() => NumberSearchOptions, { nullable: true })
  strategy_id?: NumberSearchOptions | null;

  @Field(() => NumberSearchOptions, { nullable: true })
  creation_block_number?: NumberSearchOptions | null;

  @Field(() => NumberSearchOptions, { nullable: true })
  creation_block_timestamp?: NumberSearchOptions | null;

  @Field(() => NumberArraySearchOptions, { nullable: true })
  amounts?: NumberArraySearchOptions | null;
}

@InputType()
export class SaleFetchInput implements SaleOptions<Sale> {
  @Field(() => ContractSortOptions, { nullable: true })
  by?: ContractSortOptions;
}
