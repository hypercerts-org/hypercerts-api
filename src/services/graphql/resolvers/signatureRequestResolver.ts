import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";

import { GetSignatureRequestsArgs } from "../../../graphql/schemas/args/signatureRequestArgs.js";
import {
  GetSignatureRequestResponse,
  SignatureRequest,
} from "../../../graphql/schemas/typeDefs/signatureRequestTypeDefs.js";

import { inject, injectable } from "tsyringe";
import { SignatureRequestsService } from "../../database/entities/SignatureRequestsEntityService.js";

/**
 * GraphQL resolver for signature requests.
 * Handles queries for retrieving signature requests and resolves specific fields.
 *
 * A signature request represents a message that needs to be signed by a Safe wallet,
 * typically used for user data updates or other authenticated operations.
 */
@injectable()
@Resolver(() => SignatureRequest)
export class SignatureRequestResolver {
  constructor(
    @inject(SignatureRequestsService)
    private signatureRequestsService: SignatureRequestsService,
  ) {}

  /**
   * Query resolver for fetching signature requests.
   * Can be filtered by safe address and status.
   *
   * @param args - Query arguments including optional safe_address and status filters
   * @returns A paginated response containing signature requests and total count
   */
  @Query(() => GetSignatureRequestResponse)
  async signatureRequests(@Args() args: GetSignatureRequestsArgs) {
    return await this.signatureRequestsService.getSignatureRequests(args);
  }

  /**
   * Field resolver for the message field.
   * Ensures consistent string representation of messages, whether they're
   * stored as objects or strings.
   *
   * @param signatureRequest - The signature request containing the message
   * @returns The message as a string, stringified if it's an object
   */
  @FieldResolver(() => String)
  message(@Root() signatureRequest: SignatureRequest): string {
    return typeof signatureRequest.message === "object"
      ? JSON.stringify(signatureRequest.message)
      : signatureRequest.message || "could not parse message";
  }
}
