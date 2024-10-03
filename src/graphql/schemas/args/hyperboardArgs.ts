import { ArgsType, InputType, Field } from "type-graphql";
import { BasicHyperboardWhereInput } from "../inputs/hyperboardInput.js";
import { withPagination } from "./baseArgs.js";
import { OrderOptions } from "../inputs/orderOptions.js";
import { Hyperboard } from "../typeDefs/hyperboardTypeDefs.js";
import { HyperboardSortOptions } from "../inputs/sortOptions.js";

@InputType()
class HyperboardWhereInput extends BasicHyperboardWhereInput {}

@InputType()
class HyperboardFetchInput implements OrderOptions<Hyperboard> {
  @Field(() => HyperboardSortOptions, { nullable: true })
  by?: HyperboardSortOptions;
}

@ArgsType()
export class HyperboardArgs {
  @Field(() => HyperboardWhereInput, { nullable: true })
  where?: HyperboardWhereInput;
  @Field(() => HyperboardFetchInput, { nullable: true })
  sort?: HyperboardFetchInput;
}

@ArgsType()
export class GetHyperboardsArgs extends withPagination(HyperboardArgs) {}
