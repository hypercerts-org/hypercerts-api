import { Args, FieldResolver, ObjectType, Query, Resolver, Root } from "type-graphql";
import { GetAttestationsArgs } from "../args/attestationArgs.js";
import { Attestation } from "../typeDefs/attestationTypeDefs.js";
import { z } from "zod";
import { getAddress, isAddress } from "viem";
import { createBaseResolver, DataResponse } from "./baseTypes.js";

const HypercertPointer = z.object({
  chain_id: z.coerce.bigint(),
  contract_address: z.string().refine(isAddress, { message: "Invalid contract address" }),
  token_id: z.coerce.bigint()
});

@ObjectType()
export default class GetAttestationsResponse extends DataResponse(Attestation) {
}

const AttestationBaseResolver = createBaseResolver("attestations", Attestation, "caching");

@Resolver(() => Attestation)
class AttestationResolver extends AttestationBaseResolver {

  @Query(() => GetAttestationsResponse)
  async attestations(@Args() args: GetAttestationsArgs) {
    const res = await this.getAttestations(args);
    return { data: res, count: res?.length };
  }

  @FieldResolver({ nullable: true })
  async hypercerts(@Root() attestation: Attestation) {
    if (!attestation.data) return null;

    const _att = attestation.data;

    if (!HypercertPointer.safeParse(_att).success) return null;

    const pointer = HypercertPointer.parse(_att);

    const hypercertId = `${pointer.chain_id}-${getAddress(pointer.contract_address)}-${pointer.token_id.toString()}`;
    return await this.getHypercerts({
      where: {
        hypercert_id: { eq: hypercertId }
      }
    }, true);
  }
}

export {
  AttestationResolver
};