import { ArgsType } from "type-graphql";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";

const {
  WhereInput: SignatureRequestWhereInput,
  SortOptions: SignatureRequestSortOptions,
} = createEntityArgs("SignatureRequest", {
  safe_address: "string",
  message_hash: "string",
  timestamp: "bigint",
  chain_id: "bigint",
});

@ArgsType()
export class GetSignatureRequestsArgs extends BaseQueryArgs(
  SignatureRequestWhereInput,
  SignatureRequestSortOptions,
) {}

export { SignatureRequestSortOptions, SignatureRequestWhereInput };
