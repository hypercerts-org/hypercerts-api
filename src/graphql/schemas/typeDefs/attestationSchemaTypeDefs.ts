import { Field, ObjectType } from "type-graphql";
import { AttestationBaseType } from "./baseTypes/attestationBaseType.js";
import { AttestationSchemaBaseType } from "./baseTypes/attestationSchemaBaseType.js";

@ObjectType({
  description: "Supported EAS attestation schemas and their related records",
})
class AttestationSchema extends AttestationSchemaBaseType {
  @Field(() => [AttestationBaseType], {
    description: "List of attestations related to the attestation schema",
  })
  records?: AttestationBaseType[] | null;
}

export { AttestationSchema };
