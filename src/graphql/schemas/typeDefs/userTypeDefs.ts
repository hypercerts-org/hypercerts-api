import { Field, ObjectType } from "type-graphql";
import { DataResponse } from "../../../lib/graphql/DataResponse.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";
import { GetSignatureRequestResponse } from "./signatureRequestTypeDefs.js";

@ObjectType()
export class User {
  @Field({ description: "The address of the user" })
  address?: string;

  @Field({ description: "The display name of the user", nullable: true })
  display_name?: string;

  @Field({ description: "The avatar of the user", nullable: true })
  avatar?: string;

  @Field(() => EthBigInt, {
    description: "The chain ID of the user",
    nullable: true,
  })
  chain_id?: bigint | number | string;

  @Field(() => GetSignatureRequestResponse, {
    nullable: true,
    description: "Pending signature requests for the user",
  })
  signature_requests?: GetSignatureRequestResponse;
}

@ObjectType()
export default class GetUsersResponse extends DataResponse(User) {}
