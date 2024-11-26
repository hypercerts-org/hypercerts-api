import { Field, ObjectType } from "type-graphql";
import { EthBigInt } from "../../scalars/ethBigInt.js";

import { SignatureRequest } from "./signatureRequestTypeDefs.js";

@ObjectType()
class User {
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

  @Field(() => [SignatureRequest], {
    nullable: true,
    description: "Pending signature requests for the user",
  })
  signature_requests?: SignatureRequest[];
}

export { User };
