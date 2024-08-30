import { ArgsType, Field, InputType } from "type-graphql";
import { BasicHypercertWhereInput, HypercertFetchInput } from "../inputs/hypercertsInput.js";
import { BasicContractWhereInput } from "../inputs/contractInput.js";
import { BasicMetadataWhereInput } from "../inputs/metadataInput.js";
import { BasicAttestationWhereInput } from "../inputs/attestationInput.js";
import { BasicFractionWhereInput } from "../inputs/fractionInput.js";
import { withPagination } from "./baseArgs.js";

@InputType()
export class HypercertsWhereInput extends BasicHypercertWhereInput {
  @Field(() => BasicContractWhereInput, { nullable: true })
  contract?: BasicContractWhereInput;
  @Field(() => BasicMetadataWhereInput, { nullable: true })
  metadata?: BasicMetadataWhereInput;
  @Field(() => BasicAttestationWhereInput, { nullable: true })
  attestations?: BasicAttestationWhereInput;
  @Field(() => BasicFractionWhereInput, { nullable: true })
  fractions?: BasicFractionWhereInput;
}

@ArgsType()
class HypercertArgs {
  @Field({ nullable: true })
  where?: HypercertsWhereInput;
  @Field({ nullable: true })
  sort?: HypercertFetchInput;
}

@ArgsType()
export class GetHypercertsArgs extends withPagination(HypercertArgs) {
}
