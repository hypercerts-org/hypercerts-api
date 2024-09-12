import { Field, ID, ObjectType } from "type-graphql";
import { Attestation } from "./attestationTypeDefs.js";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";

@ObjectType({
  description: "Supported EAS attestation schemas and their related records",
})
class AttestationSchema extends BasicTypeDef {
  @Field(() => EthBigInt, {
    nullable: true,
    description:
      "Chain ID of the chains where the attestation schema is supported",
  })
  chain_id?: bigint | number | string;
  @Field(() => ID, {
    nullable: true,
    description: "Unique identifier for the attestation schema",
  })
  uid?: string;
  @Field({
    nullable: true,
    description: "Address of the resolver contract for the attestation schema",
  })
  resolver?: string;
  @Field({
    nullable: true,
    description: "Whether the attestation schema is revocable",
  })
  revocable?: boolean;
  @Field({
    nullable: true,
    description: "String representation of the attestation schema",
  })
  schema?: string;

  @Field(() => [Attestation], {
    nullable: true,
    description: "List of attestations related to the attestation schema",
  })
  records?: Attestation[] | null;
}

export { AttestationSchema };
