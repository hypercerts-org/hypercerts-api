import { ArgsType, Field, InputType } from "type-graphql";
import { BasicAttestationWhereInput } from "../inputs/attestationInput.js";
import { BasicMetadataWhereInput } from "../inputs/metadataInput.js";
import { withPagination } from "./baseArgs.js";
import { BasicHypercertWhereArgs } from "../inputs/hypercertsInput.js";
import type { OrderOptions } from "../inputs/orderOptions.js";
import type { Attestation } from "../typeDefs/attestationTypeDefs.js";
import { AttestationSortOptions } from "../inputs/sortOptions.js";

@InputType()
class AttestationWhereInput extends BasicAttestationWhereInput {
  @Field(() => BasicHypercertWhereArgs, { nullable: true })
  hypercerts?: BasicHypercertWhereArgs;
  @Field(() => BasicMetadataWhereInput, { nullable: true })
  metadata?: BasicMetadataWhereInput;
}

@InputType()
class AttestationFetchInput implements OrderOptions<Attestation> {
  @Field(() => AttestationSortOptions, { nullable: true })
  by?: AttestationSortOptions;
}

@ArgsType()
class AttestationArgs {
  @Field(() => AttestationWhereInput, { nullable: true })
  where?: AttestationWhereInput;
  @Field(() => AttestationFetchInput, { nullable: true })
  sort?: AttestationFetchInput;
}

@ArgsType()
export class GetAttestationsArgs extends withPagination(AttestationArgs) {}
