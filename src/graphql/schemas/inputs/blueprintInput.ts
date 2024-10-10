import { Field, InputType } from "type-graphql";
import type { WhereOptions } from "./whereOptions.js";
import {
  StringSearchOptions,
  NumberSearchOptions,
  BooleanSearchOptions,
} from "./searchOptions.js";
import { Blueprint } from "../typeDefs/blueprintTypeDefs.js";

@InputType()
export class BasicBlueprintWhereInput implements WhereOptions<Blueprint> {
  @Field(() => NumberSearchOptions, { nullable: true })
  id?: NumberSearchOptions;

  @Field(() => StringSearchOptions, { nullable: true })
  minter_address?: StringSearchOptions | null;

  @Field(() => StringSearchOptions, { nullable: true })
  admin_address?: StringSearchOptions | null;

  @Field(() => BooleanSearchOptions, { nullable: true })
  minted?: BooleanSearchOptions | null;
}
