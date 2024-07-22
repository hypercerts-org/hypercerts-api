import { Field, ID, ObjectType } from "type-graphql";
import { Attestation } from "./attestationTypeDefs.js";
import { BasicTypeDef } from "./basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";

@ObjectType()
class AttestationSchema extends BasicTypeDef {
  @Field((_) => EthBigInt, { nullable: true })
  chain_id?: bigint | number | string;
  @Field((_) => ID, { nullable: true })
  uid?: string;
  @Field({ nullable: true })
  resolver?: string;
  @Field({ nullable: true })
  revocable?: boolean;
  @Field({ nullable: true })
  schema?: string;

  @Field((_) => [Attestation], { nullable: true })
  records?: Attestation[] | null;
}

export { AttestationSchema };
