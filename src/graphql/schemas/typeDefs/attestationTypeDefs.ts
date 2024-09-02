import { Field, ObjectType } from "type-graphql";
import { AttestationBaseType } from "./baseTypes/attestationBaseType.js";
import { HypercertBaseType } from "./baseTypes/hypercertBaseType.js";

@ObjectType({
  description: "Attestation on the Ethereum Attestation Service",
  simpleResolvers: true,
})
class Attestation extends AttestationBaseType {
  @Field(() => HypercertBaseType, {
    nullable: true,
    description: "Hypercert related to the attestation",
  })
  hypercert?: HypercertBaseType;
}

export { Attestation };
