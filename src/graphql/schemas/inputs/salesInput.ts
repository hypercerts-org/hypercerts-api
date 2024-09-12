import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  IdSearchOptions,
  NumberArraySearchOptions,
  BigIntSearchOptions,
  StringArraySearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";
import { Sale } from "../typeDefs/salesTypeDefs.js";

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

  @Field(() => BigIntSearchOptions, { nullable: true })
  strategy_id?: BigIntSearchOptions | null;

  @Field(() => BigIntSearchOptions, { nullable: true })
  creation_block_number?: BigIntSearchOptions | null;

  @Field(() => BigIntSearchOptions, { nullable: true })
  creation_block_timestamp?: BigIntSearchOptions | null;

  @Field(() => NumberArraySearchOptions, { nullable: true })
  amounts?: NumberArraySearchOptions | null;
}
