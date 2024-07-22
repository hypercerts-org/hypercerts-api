import { Field, ID, ObjectType } from "type-graphql";
import { Attestation } from "./attestationTypeDefs.js";
import { BasicTypeDef } from "./baseTypes/basicTypeDef.js";
import { EthBigInt } from "../../scalars/ethBigInt.js";

@ObjectType()
class AttestationSchema extends BasicTypeDef {
  @Field(() => EthBigInt, { nullable: true })
  chain_id?: bigint | number | string;
  @Field(() => ID, { nullable: true })
  uid?: string;
  @Field({ nullable: true })
  resolver?: string;
  @Field({ nullable: true })
  revocable?: boolean;
  @Field({ nullable: true })
  schema?: string;

  @Field(() => [Attestation], { nullable: true })
  records?: Attestation[] | null;
}

export { AttestationSchema };
