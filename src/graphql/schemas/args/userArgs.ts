import { ArgsType } from "type-graphql";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";

const { WhereInput: UserWhereInput, SortOptions: UserSortOptions } =
  createEntityArgs("User", {
    address: "string",
    display_name: "string",
    avatar: "string",
    chain_id: "bigint",
  });

@ArgsType()
export class GetUsersArgs extends BaseQueryArgs(
  UserWhereInput,
  UserSortOptions,
) {}

export { UserSortOptions, UserWhereInput };
