import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";

import { GetUsersArgs } from "../args/userArgs.js";
import { SignatureRequest } from "../typeDefs/signatureRequestTypeDefs.js";
import GetUsersResponse, { User } from "../typeDefs/userTypeDefs.js";

import { inject, injectable } from "tsyringe";
import { SignatureRequestsService } from "../../../services/database/entities/SignatureRequestsEntityService.js";
import { UsersService } from "../../../services/database/entities/UsersEntityService.js";

@injectable()
@Resolver(() => User)
class UserResolver {
  constructor(
    @inject(UsersService)
    private usersService: UsersService,
    @inject(SignatureRequestsService)
    private signatureRequestsService: SignatureRequestsService,
  ) {}

  @Query(() => GetUsersResponse)
  async users(@Args() args: GetUsersArgs) {
    return await this.usersService.getUsers(args);
  }

  @FieldResolver(() => [SignatureRequest])
  async signature_requests(@Root() user: User) {
    if (!user.address) {
      return null;
    }

    return await this.signatureRequestsService.getSignatureRequests({
      where: {
        safe_address: {
          eq: user.address,
        },
      },
    });
  }
}

export { UserResolver };
