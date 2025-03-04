import { Field, ObjectType } from "type-graphql";
import { DataResponse } from "../../../lib/graphql/DataResponse.js";
import { GetAttestationsResponse } from "./attestationTypeDefs.js";
import { AttestationSchemaBaseType } from "./baseTypes/attestationSchemaBaseType.js";

@ObjectType({
  description: "Supported EAS attestation schemas and their related records",
})
export class AttestationSchema extends AttestationSchemaBaseType {
  @Field(() => GetAttestationsResponse, {
    description: "List of attestations related to the attestation schema",
  })
  attestations?: GetAttestationsResponse | null;
}

@ObjectType()
export default class GetAttestationsSchemaResponse extends DataResponse(
  AttestationSchema,
) {}
