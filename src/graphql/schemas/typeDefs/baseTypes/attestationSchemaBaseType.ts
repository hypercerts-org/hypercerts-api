import { Field, ID, ObjectType } from "type-graphql";
import { EthBigInt } from "../../../scalars/ethBigInt.js";
import { BasicTypeDef } from "./basicTypeDef.js";

@ObjectType({
  description: "Supported EAS attestation schemas and their related records",
})
class AttestationSchemaBaseType extends BasicTypeDef {
  @Field(() => EthBigInt, {
    description:
      "Chain ID of the chains where the attestation schema is supported",
  })
  chain_id?: bigint | number | string;
  @Field(() => ID, {
    description: "Unique identifier for the attestation schema",
  })
  uid?: string;
  @Field({
    description: "Address of the resolver contract for the attestation schema",
  })
  resolver?: string;
  @Field({
    description: "Whether the attestation schema is revocable",
  })
  revocable?: boolean;
  @Field({
    description: "String representation of the attestation schema",
  })
  schema?: string;
}

export { AttestationSchemaBaseType };
