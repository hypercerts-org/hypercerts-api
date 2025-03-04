import { Field, ObjectType } from "type-graphql";
import { AttestationBaseType } from "./baseTypes/attestationBaseType.js";
import { HypercertBaseType } from "./baseTypes/hypercertBaseType.js";
import { AttestationSchemaBaseType } from "./baseTypes/attestationSchemaBaseType.js";
import { Metadata } from "./metadataTypeDefs.js";
import { DataResponse } from "../../../lib/graphql/DataResponse.js";

@ObjectType({
  description: "Attestation on the Ethereum Attestation Service",
  simpleResolvers: true,
})
class Attestation extends AttestationBaseType {
  @Field(() => HypercertBaseType, {
    description: "Hypercert related to the attestation",
  })
  hypercert?: HypercertBaseType;

  @Field(() => AttestationSchemaBaseType, {
    description: "Schema related to the attestation",
  })
  eas_schema?: AttestationSchemaBaseType;

  @Field(() => Metadata, {
    description: "Metadata related to the attestation",
  })
  metadata?: Metadata;
}

@ObjectType()
class GetAttestationsResponse extends DataResponse(Attestation) {}

export { Attestation, GetAttestationsResponse };
