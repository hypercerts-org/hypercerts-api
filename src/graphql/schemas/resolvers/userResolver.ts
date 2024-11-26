import {
  Args,
  ObjectType,
  Query,
  Resolver,
  FieldResolver,
  Root,
} from "type-graphql";

import { User } from "../typeDefs/userTypeDefs.js";
import { GetUserArgs } from "../args/userArgs.js";
import { SignatureRequest } from "../typeDefs/signatureRequestTypeDefs.js";

import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType()
export default class GetUsersResponse extends DataResponse(User) {}

const UserBaseResolver = createBaseResolver("user");

@Resolver(() => User)
class UserResolver extends UserBaseResolver {
  @Query(() => GetUsersResponse)
  async users(@Args() args: GetUserArgs) {
    return this.getUsers(args);
  }

  @FieldResolver(() => [SignatureRequest])
  async signature_requests(@Root() user: User) {
    if (!user.address) {
      return [];
    }

    try {
      const queryResult = await this.getSignatureRequests({
        where: {
          safe_address: {
            eq: user.address,
          },
        },
      });
      return queryResult.data || [];
    } catch (error) {
      console.error("Error fetching signature requests:", error);
      return [];
    }
  }
}

export { UserResolver };
