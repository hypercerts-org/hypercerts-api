import { ArgsType, Field, InputType } from "type-graphql";
import { withPagination } from "./baseArgs.js";
import type { OrderOptions } from "../inputs/orderOptions.js";
import { BasicBlueprintWhereInput } from "../inputs/blueprintInput.js";
import { Blueprint } from "../typeDefs/blueprintTypeDefs.js";
import { BlueprintSortOptions } from "../inputs/sortOptions.js";

@InputType()
export class BlueprintWhereInput extends BasicBlueprintWhereInput {}

@InputType()
export class BlueprintFetchInput implements OrderOptions<Blueprint> {
  @Field(() => BlueprintSortOptions, { nullable: true })
  by?: BlueprintSortOptions;
}

@ArgsType()
export class BlueprintArgs {
  @Field(() => BlueprintWhereInput, { nullable: true })
  where?: BlueprintWhereInput;
  @Field(() => BlueprintFetchInput, { nullable: true })
  sort?: BlueprintFetchInput;
}

@ArgsType()
export class GetBlueprintArgs extends withPagination(BlueprintArgs) {}
