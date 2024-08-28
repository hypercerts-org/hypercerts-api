import { ArgsType, Field, InputType } from "type-graphql";
import { AttestationFetchInput, BasicAttestationWhereInput } from "../inputs/attestationInput.js";
import { BasicHypercertWhereInput } from "../inputs/hypercertsInput.js";
import { BasicMetadataWhereInput } from "../inputs/metadataInput.js";
import { withPagination } from "./baseArgs.js";

@InputType()
export class AttestationWhereInput extends BasicAttestationWhereInput {
  @Field(() => BasicAttestationWhereInput, { nullable: true })
  attestations?: BasicAttestationWhereInput;
  @Field(() => BasicHypercertWhereInput, { nullable: true })
  hypercerts?: BasicHypercertWhereInput;
  @Field(() => BasicMetadataWhereInput, { nullable: true })
  metadata?: BasicMetadataWhereInput;
}

@ArgsType()
class AttestationArgs {
  @Field({ nullable: true })
  where?: AttestationWhereInput;
  @Field({ nullable: true })
  sort?: AttestationFetchInput;
}

@ArgsType()
export class GetAttestationsArgs extends withPagination(AttestationArgs) {
}