import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { getAddress, isAddress } from "viem";
import { z } from "zod";
import { AttestationService } from "../../../services/database/entities/AttestationEntityService.js";
import { AttestationSchemaService } from "../../../services/database/entities/AttestationSchemaEntityService.js";
import { HypercertsService } from "../../../services/database/entities/HypercertsEntityService.js";
import { MetadataService } from "../../../services/database/entities/MetadataEntityService.js";
import { GetAttestationsArgs } from "../args/attestationArgs.js";
import {
  Attestation,
  GetAttestationsResponse,
} from "../typeDefs/attestationTypeDefs.js";

const HypercertPointer = z.object({
  chain_id: z.coerce.bigint(),
  contract_address: z
    .string()
    .refine(isAddress, { message: "Invalid contract address" }),
  token_id: z.coerce.bigint(),
});

@injectable()
@Resolver(() => Attestation)
class AttestationResolver {
  constructor(
    @inject(AttestationService)
    private attestationService: AttestationService,
    @inject(HypercertsService)
    private hypercertService: HypercertsService,
    @inject(AttestationSchemaService)
    private attestationSchemaService: AttestationSchemaService,
    @inject(MetadataService)
    private metadataService: MetadataService,
  ) {}

  @Query(() => GetAttestationsResponse)
  async attestations(@Args() args: GetAttestationsArgs) {
    return await this.attestationService.getAttestations(args);
  }

  @FieldResolver()
  async hypercert(@Root() attestation: Attestation) {
    if (!attestation.data) return null;

    const attested_hypercert_id = this.getHypercertIdFromAttestationData(
      attestation.data,
    );

    return await this.hypercertService.getHypercert({
      where: {
        hypercert_id: { eq: attested_hypercert_id },
      },
    });
  }

  @FieldResolver()
  async eas_schema(@Root() attestation: Attestation) {
    if (!attestation.supported_schemas_id) return;

    return await this.attestationSchemaService.getAttestationSchema({
      where: {
        id: { eq: attestation.supported_schemas_id },
      },
    });
  }

  @FieldResolver()
  async metadata(@Root() attestation: Attestation) {
    if (!attestation.data) return;

    const attested_hypercert_id = this.getHypercertIdFromAttestationData(
      attestation.data,
    );

    return await this.metadataService.getMetadataSingle({
      where: { hypercert: { hypercert_id: { eq: attested_hypercert_id } } },
    });
  }

  getHypercertIdFromAttestationData(attestationData: unknown) {
    const { success, data } = HypercertPointer.safeParse(attestationData);

    if (!success) return;

    const { chain_id, contract_address, token_id } = data;
    return `${chain_id}-${getAddress(contract_address)}-${token_id.toString()}`;
  }
}

export { AttestationResolver };
