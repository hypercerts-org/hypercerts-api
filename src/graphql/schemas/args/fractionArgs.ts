import { ArgsType, Field, InputType } from "type-graphql";
import { BasicFractionWhereInput, FractionFetchInput } from "../inputs/fractionInput.js";
import { BasicHypercertWhereInput } from "../inputs/hypercertsInput.js";
import { withPagination } from "./baseArgs.js";

@InputType()
export class FractionWhereInput extends BasicFractionWhereInput {
  @Field(() => BasicHypercertWhereInput, { nullable: true })
  hypercerts?: BasicHypercertWhereInput;
}

@ArgsType()
export class FractionArgs {
  @Field({ nullable: true })
  where?: FractionWhereInput;
  @Field({ nullable: true })
  sort?: FractionFetchInput;
}

@ArgsType()
export class GetFractionsArgs extends withPagination(FractionArgs) {
}

