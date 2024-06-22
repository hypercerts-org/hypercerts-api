import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  IdSearchOptions,
  StringArraySearchOptions,
  StringSearchOptions,
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
}

@InputType()
export class SaleFetchInput implements SaleOptions<Sale> {
  @Field(() => ContractSortOptions, { nullable: true })
  by?: ContractSortOptions;
}
