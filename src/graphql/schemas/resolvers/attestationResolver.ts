import {
  Args,
  FieldResolver,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { GetAttestationsArgs } from "../args/attestationArgs.js";
import { Attestation } from "../typeDefs/attestationTypeDefs.js";
import { z } from "zod";
import { getAddress, isAddress } from "viem";
import { createBaseResolver, DataResponse } from "./baseTypes.js";

const HypercertPointer = z.object({
  chain_id: z.coerce.bigint(),
  contract_address: z
    .string()
    .refine(isAddress, { message: "Invalid contract address" }),
  token_id: z.coerce.bigint(),
});

@ObjectType()
export default class GetAttestationsResponse extends DataResponse(
  Attestation,
) {}

const AttestationBaseResolver = createBaseResolver("attestations");

@Resolver(() => Attestation)
class AttestationResolver extends AttestationBaseResolver {
  @Query(() => GetAttestationsResponse)
  async attestations(@Args() args: GetAttestationsArgs) {
    return await this.getAttestations(args);
  }

  @FieldResolver()
  async hypercert(@Root() attestation: Attestation) {
    if (!attestation.data) return null;

    const { success, data } = HypercertPointer.safeParse(attestation.data);

    if (!success) return null;

    const { chain_id, contract_address, token_id } = data;
    const hypercertId = `${chain_id}-${getAddress(contract_address)}-${token_id.toString()}`;

    return await this.getHypercerts(
      {
        where: {
          hypercert_id: { eq: hypercertId },
        },
      },
      true,
    );
  }

  @FieldResolver()
  async eas_schema(@Root() attestation: Attestation) {
    if (!attestation.schema_uid) return;

    return await this.getAttestationSchemas(
      {
        where: {
          uid: { eq: attestation.schema_uid },
        },
      },
      true,
    );
  }
}

export { AttestationResolver };
