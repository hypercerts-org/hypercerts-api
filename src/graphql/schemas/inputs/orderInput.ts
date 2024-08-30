import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  IdSearchOptions,
  NumberSearchOptions,
  StringSearchOptions,
} from "./searchOptions.js";
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
