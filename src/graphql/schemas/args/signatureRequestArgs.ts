import { SignatureRequest } from "../typeDefs/signatureRequestTypeDefs.js";

import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";

// @InputType()
// export class SignatureRequestWhereInput extends BasicSignatureRequestWhereInput {}

// @InputType()
// export class SignatureRequestFetchInput
//   implements OrderOptions<SignatureRequest>
// {
//   @Field(() => SignatureRequestSortOptions, { nullable: true })
//   by?: SignatureRequestSortOptions;
// }

// @ArgsType()
// class SignatureRequestArgs {
//   @Field(() => SignatureRequestWhereInput, { nullable: true })
//   where?: SignatureRequestWhereInput;
//   @Field(() => SignatureRequestFetchInput, { nullable: true })
//   sort?: SignatureRequestFetchInput;
// }

// @ArgsType()
// export class GetSignatureRequestArgs extends withPagination(
//   SignatureRequestArgs,
// ) {}

// TODO enable filtering on status enum and purpose enum
const {
  WhereArgs: SignatureRequestWhereArgs,
  EntitySortOptions: SignatureRequestSortOptions,
  SortArgs: SignatureRequestSortArgs,
} = createEntityArgs<SignatureRequest>("SignatureRequest", {
  safe_address: "string",
  message_hash: "string",
  timestamp: "bigint",
  chain_id: "bigint",
});

export const GetSignatureRequestsArgs = BaseQueryArgs(
  SignatureRequestWhereArgs,
  SignatureRequestSortArgs,
);

export type GetSignatureRequestsArgs = InstanceType<
  typeof GetSignatureRequestsArgs
>;

export {
  SignatureRequestSortArgs,
  SignatureRequestSortOptions,
  SignatureRequestWhereArgs,
};
