import { ArgsType } from "type-graphql";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";

const { WhereInput: UserWhereInput, SortOptions: UserSortOptions } =
  createEntityArgs("User", {
    ...WhereFieldDefinitions.User.fields,
  });

@ArgsType()
export class GetUsersArgs extends BaseQueryArgs(
  UserWhereInput,
  UserSortOptions,
) {}

export { UserSortOptions, UserWhereInput };
