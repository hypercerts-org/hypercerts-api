import { ArgsType, Field, InputType } from "type-graphql";

import { BasicSignatureRequestWhereInput } from "../inputs/signatureRequestInput.js";
import type { OrderOptions } from "../inputs/orderOptions.js";
import { SignatureRequest } from "../typeDefs/signatureRequestTypeDefs.js";
import { SignatureRequestSortOptions } from "../inputs/sortOptions.js";

import { withPagination } from "./baseArgs.js";

@InputType()
export class SignatureRequestWhereInput extends BasicSignatureRequestWhereInput {}

@InputType()
export class SignatureRequestFetchInput
  implements OrderOptions<SignatureRequest>
{
  @Field(() => SignatureRequestSortOptions, { nullable: true })
  by?: SignatureRequestSortOptions;
}

@ArgsType()
class SignatureRequestArgs {
  @Field(() => SignatureRequestWhereInput, { nullable: true })
  where?: SignatureRequestWhereInput;
  @Field(() => SignatureRequestFetchInput, { nullable: true })
  sort?: SignatureRequestFetchInput;
}

@ArgsType()
export class GetSignatureRequestArgs extends withPagination(
  SignatureRequestArgs,
) {}
