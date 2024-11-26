import { Field, Int, ObjectType, registerEnumType } from "type-graphql";

enum SignatureRequestPurpose {
  UPDATE_USER_DATA = "update_user_data",
}

enum SignatureRequestStatus {
  PENDING = "pending",
  EXECUTED = "executed",
  CANCELED = "canceled",
}

registerEnumType(SignatureRequestPurpose, {
  name: "SignatureRequestPurpose",
  description: "Purpose of the signature request",
});

registerEnumType(SignatureRequestStatus, {
  name: "SignatureRequestStatus",
  description: "Status of the signature request",
});

@ObjectType({
  description: "Pending signature request for a user",
  simpleResolvers: true,
})
class SignatureRequest {
  @Field({
    description: "The safe address of the user who needs to sign",
  })
  safe_address?: string;

  @Field({
    description: "The hash of the Safe message (not the message to be signed)",
  })
  message_hash?: string;

  @Field(() => String, {
    description: "The message data in JSON format",
  })
  message?: string;

  @Field({
    description: "When the signature request was created",
  })
  created_at?: string;

  @Field(() => SignatureRequestPurpose, {
    description: "The purpose of the signature request",
  })
  purpose?: SignatureRequestPurpose;

  @Field(() => SignatureRequestStatus, {
    description: "The status of the signature request",
  })
  status?: SignatureRequestStatus;

  @Field(() => Int, {
    description: "The chain ID of the signature request",
  })
  chain_id?: number;
}

export { SignatureRequest, SignatureRequestPurpose, SignatureRequestStatus };
