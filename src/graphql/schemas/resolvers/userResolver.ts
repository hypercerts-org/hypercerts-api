import { Args, ObjectType, Query, Resolver } from "type-graphql";
import { createBaseResolver, DataResponse } from "./baseTypes.js";
import { User } from "../typeDefs/userTypeDefs.js";
import { GetUserArgs } from "../args/userArgs.js";

@ObjectType()
export default class GetUsersResponse extends DataResponse(User) {}

const UserBaseResolver = createBaseResolver("user");

@Resolver(() => User)
class UserResolver extends UserBaseResolver {
  @Query(() => GetUsersResponse)
  async users(@Args() args: GetUserArgs) {
    return this.getUsers(args);
  }
}

export { UserResolver };
