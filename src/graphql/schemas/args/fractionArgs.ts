import { ArgsType, InputType, Field } from "type-graphql";
import { BasicFractionWhereInput } from "../inputs/fractionInput.js";
import { withPagination } from "./baseArgs.js";
import { BasicHypercertWhereArgs } from "../inputs/hypercertsInput.js";
import type { OrderOptions } from "../inputs/orderOptions.js";
import { Fraction } from "../typeDefs/fractionTypeDefs.js";
import { FractionSortOptions } from "../inputs/sortOptions.js";

@InputType()
export class FractionWhereInput extends BasicFractionWhereInput {
  @Field(() => BasicHypercertWhereArgs, { nullable: true })
  hypercerts?: BasicHypercertWhereArgs;
}

@InputType()
export class FractionFetchInput implements OrderOptions<Fraction> {
  @Field(() => FractionSortOptions, { nullable: true })
  by?: FractionSortOptions;
}

@ArgsType()
export class FractionArgs {
  @Field(() => FractionWhereInput, { nullable: true })
  where?: FractionWhereInput;
  @Field(() => FractionFetchInput, { nullable: true })
  sort?: FractionFetchInput;
}

@ArgsType()
export class GetFractionsArgs extends withPagination(FractionArgs) {}
