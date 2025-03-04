import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";

import { GetSignatureRequestsArgs } from "../args/signatureRequestArgs.js";
import {
  GetSignatureRequestResponse,
  SignatureRequest,
} from "../typeDefs/signatureRequestTypeDefs.js";

import { inject, injectable } from "tsyringe";
import { SignatureRequestsService } from "../../../services/database/entities/SignatureRequestsEntityService.js";

@injectable()
@Resolver(() => SignatureRequest)
export class SignatureRequestResolver {
  constructor(
    @inject(SignatureRequestsService)
    private signatureRequestsService: SignatureRequestsService,
  ) {}

  @Query(() => GetSignatureRequestResponse)
  async signatureRequests(@Args() args: GetSignatureRequestsArgs) {
    return await this.signatureRequestsService.getSignatureRequests(args);
  }

  @FieldResolver(() => String)
  message(@Root() signatureRequest: SignatureRequest): string {
    return typeof signatureRequest.message === "object"
      ? JSON.stringify(signatureRequest.message)
      : signatureRequest.message || "could not parse message";
  }
}
