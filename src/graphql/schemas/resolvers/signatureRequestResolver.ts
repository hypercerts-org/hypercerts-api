import {
  Args,
  ObjectType,
  Query,
  Resolver,
  FieldResolver,
  Root,
} from "type-graphql";

import { SignatureRequest } from "../typeDefs/signatureRequestTypeDefs.js";
import { GetSignatureRequestArgs } from "../args/signatureRequestArgs.js";

import { createBaseResolver, DataResponse } from "./baseTypes.js";

@ObjectType()
class GetSignatureRequestResponse extends DataResponse(SignatureRequest) {}

const SignatureRequestBaseResolver = createBaseResolver("signatureRequest");

@Resolver(() => SignatureRequest)
class SignatureRequestResolver extends SignatureRequestBaseResolver {
  @Query(() => GetSignatureRequestResponse)
  async signatureRequests(@Args() args: GetSignatureRequestArgs) {
    return await this.getSignatureRequests(args);
  }

  @FieldResolver(() => String)
  message(@Root() signatureRequest: SignatureRequest): string {
    return typeof signatureRequest.message === "object"
      ? JSON.stringify(signatureRequest.message)
      : signatureRequest.message || "could not parse message";
  }
}

export { SignatureRequestResolver };
