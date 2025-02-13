import { Hyperboard } from "../typeDefs/hyperboardTypeDefs.js";
import { User } from "../typeDefs/userTypeDefs.js";
import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";
import { WhereFieldDefinitions } from "./whereFieldDefinitions.js";

// @InputType()
// class HyperboardWhereInput extends BasicHyperboardWhereInput {}

// @InputType()
// class HyperboardFetchInput implements OrderOptions<Hyperboard> {
//   @Field(() => HyperboardSortOptions, { nullable: true })
//   by?: HyperboardSortOptions;
// }

// @ArgsType()
// export class HyperboardArgs {
//   @Field(() => HyperboardWhereInput, { nullable: true })
//   where?: HyperboardWhereInput;
//   @Field(() => HyperboardFetchInput, { nullable: true })
//   sort?: HyperboardFetchInput;
// }

// @ArgsType()
// export class GetHyperboardsArgs extends withPagination(HyperboardArgs) {}

const {
  WhereArgs: HyperboardWhereArgs,
  EntitySortOptions: HyperboardSortOptions,
  SortArgs: HyperboardSortArgs,
} = createEntityArgs<Hyperboard>("Hyperboard", {
  chain_ids: "numberArray",
  admins: {
    type: "id",
    references: {
      entity: User,
      fields: WhereFieldDefinitions.User.fields,
    },
  },
});

export const GetHyperboardsArgs = BaseQueryArgs(
  HyperboardWhereArgs,
  HyperboardSortArgs,
);

export type GetHyperboardsArgs = InstanceType<typeof GetHyperboardsArgs>;

export { HyperboardSortArgs, HyperboardSortOptions, HyperboardWhereArgs };
