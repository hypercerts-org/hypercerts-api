import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";

import { GetUsersArgs } from "../../../graphql/schemas/args/userArgs.js";
import { SignatureRequest } from "../../../graphql/schemas/typeDefs/signatureRequestTypeDefs.js";
import GetUsersResponse, {
  User,
} from "../../../graphql/schemas/typeDefs/userTypeDefs.js";

import { inject, injectable } from "tsyringe";
import { SignatureRequestsService } from "../../database/entities/SignatureRequestsEntityService.js";
import { UsersService } from "../../database/entities/UsersEntityService.js";

/**
 * GraphQL resolver for User operations.
 * Handles queries for users and resolves related fields.
 *
 * This resolver provides:
 * - Query for fetching users with optional filtering
 * - Field resolution for signature requests associated with a user
 *
 * Error Handling:
 * If an operation fails, it will:
 * - Log the error internally for monitoring
 * - Return null/empty data to the client
 * - Include error information in the GraphQL response errors array
 *
 * @injectable Marks the class as injectable for dependency injection with tsyringe
 * @resolver Marks the class as a GraphQL resolver for the User type
 */
@injectable()
@Resolver(() => User)
class UserResolver {
  /**
   * Creates a new instance of UserResolver.
   *
   * @param usersService - Service for handling user operations
   * @param signatureRequestsService - Service for handling signature request operations
   */
  constructor(
    @inject(UsersService)
    private usersService: UsersService,
    @inject(SignatureRequestsService)
    private signatureRequestsService: SignatureRequestsService,
  ) {}

  /**
   * Queries users based on provided arguments.
   * Returns both the matching users and a total count.
   *
   * @param args - Query arguments for filtering users
   * @returns A promise that resolves to an object containing:
   *          - data: Array of users matching the query
   *          - count: Total number of matching users
   *
   * @example
   * ```graphql
   * query {
   *   users(
   *     where: {
   *       address: { eq: "0x..." },
   *       chain_id: { eq: 1 }
   *     }
   *   ) {
   *     data {
   *       id
   *       address
   *       display_name
   *       avatar
   *     }
   *     count
   *   }
   * }
   * ```
   */
  @Query(() => GetUsersResponse)
  async users(@Args() args: GetUsersArgs) {
    try {
      return await this.usersService.getUsers(args);
    } catch (e) {
      console.error(
        `[UserResolver::users] Error fetching users: ${(e as Error).message}`,
      );
      return null;
    }
  }

  /**
   * Resolves the signature_requests field for a user.
   * This field resolver is called automatically when the signature_requests field is requested in a query.
   *
   * @param user - The user for which to resolve signature requests
   * @returns A promise resolving to:
   *          - Array of signature requests if found
   *          - null if:
   *            - No user address is available
   *            - An error occurs during retrieval
   *
   * @example
   * ```graphql
   * query {
   *   users {
   *     data {
   *       id
   *       address
   *       signature_requests {
   *         id
   *         message
   *         status
   *       }
   *     }
   *   }
   * }
   * ```
   */
  @FieldResolver(() => [SignatureRequest])
  async signature_requests(@Root() user: User) {
    if (!user.address) {
      return null;
    }

    try {
      return await this.signatureRequestsService.getSignatureRequests({
        where: {
          safe_address: {
            eq: user.address,
          },
        },
      });
    } catch (e) {
      console.error(
        `[UserResolver::signature_requests] Error fetching signature requests for user ${user.id}: ${(e as Error).message}`,
      );
      return null;
    }
  }
}

export { UserResolver };
