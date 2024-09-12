import { ArgsType, InputType, Field } from "type-graphql";
import { BasicContractWhereInput } from "../inputs/contractInput.js";
import { BasicMetadataWhereInput } from "../inputs/metadataInput.js";
import { BasicAttestationWhereInput } from "../inputs/attestationInput.js";
import { BasicFractionWhereInput } from "../inputs/fractionInput.js";
import { withPagination } from "./baseArgs.js";
import { Hypercert } from "../typeDefs/hypercertTypeDefs.js";
import type { OrderOptions } from "../inputs/orderOptions.js";
import { HypercertSortOptions } from "../inputs/sortOptions.js";
import { BasicHypercertWhereArgs } from "../inputs/hypercertsInput.js";

@InputType({
  description: "Arguments for filtering hypercerts",
})
export class HypercertsWhereArgs extends BasicHypercertWhereArgs {
  @Field(() => BasicContractWhereInput, { nullable: true })
  contract?: BasicContractWhereInput;
  @Field(() => BasicMetadataWhereInput, { nullable: true })
  metadata?: BasicMetadataWhereInput;
  @Field(() => BasicAttestationWhereInput, { nullable: true })
  attestations?: BasicAttestationWhereInput;
  @Field(() => BasicFractionWhereInput, { nullable: true })
  fractions?: BasicFractionWhereInput;
}

@InputType()
export class HypercertFetchInput implements OrderOptions<Hypercert> {
  @Field(() => HypercertSortOptions, { nullable: true })
  by?: HypercertSortOptions;
}

@ArgsType()
class HypercertArgs {
  @Field(() => HypercertsWhereArgs, { nullable: true })
  where?: HypercertsWhereArgs;
  @Field(() => HypercertFetchInput, { nullable: true })
  sort?: HypercertFetchInput;
}

@ArgsType()
export class GetHypercertsArgs extends withPagination(HypercertArgs) {}
