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
import { GetSignatureRequestArgs } from "../args/signatureRequestArgs.js";

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
    const args: GetSignatureRequestArgs = {
      where: {
        safe_address: {
          eq: user.address,
        },
      },
    };

    const response = await this.supabaseDataService.getSignatureRequests(args);
    const signatureRequests = await this.supabaseDataService.db
      .transaction()
      .execute(async (transaction) => {
        const dataRes = await transaction.executeQuery(response.data);
        return dataRes.rows;
      });
    return signatureRequests || [];
  }
}

export { UserResolver };
