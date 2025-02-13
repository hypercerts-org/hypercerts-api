import { User } from "../typeDefs/userTypeDefs.js";
import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";

// @InputType()
// export class UserWhereInput extends BasicUserWhereInput {}

// @ArgsType()
// class UserArgs {
//   @Field(() => UserWhereInput, { nullable: true })
//   where?: UserWhereInput;
// }

// @ArgsType()
// export class GetUserArgs extends withPagination(UserArgs) {}

const {
  WhereArgs: UserWhereArgs,
  EntitySortOptions: UserSortOptions,
  SortArgs: UserSortArgs,
} = createEntityArgs<User>("User", {
  address: "string",
  display_name: "string",
  avatar: "string",
  chain_id: "bigint",
});

export const GetUsersArgs = BaseQueryArgs(UserWhereArgs, UserSortArgs);
export type GetUsersArgs = InstanceType<typeof GetUsersArgs>;

export { UserSortArgs, UserSortOptions, UserWhereArgs };
