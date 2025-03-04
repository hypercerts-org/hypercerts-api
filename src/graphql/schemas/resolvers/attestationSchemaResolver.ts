import { inject, injectable } from "tsyringe";
import { Args, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { AttestationService } from "../../../services/database/entities/AttestationEntityService.js";
import { AttestationSchemaService } from "../../../services/database/entities/AttestationSchemaEntityService.js";
import { GetAttestationSchemasArgs } from "../args/attestationSchemaArgs.js";
import GetAttestationsSchemaResponse, {
  AttestationSchema,
} from "../typeDefs/attestationSchemaTypeDefs.js";
import { GetAttestationsResponse } from "../typeDefs/attestationTypeDefs.js";

@injectable()
@Resolver(() => AttestationSchema)
class AttestationSchemaResolver {
  constructor(
    @inject(AttestationSchemaService)
    private attestationSchemaService: AttestationSchemaService,
    @inject(AttestationService)
    private attestationService: AttestationService,
  ) {}

  @Query(() => GetAttestationsSchemaResponse)
  async attestationSchemas(@Args() args: GetAttestationSchemasArgs) {
    return await this.attestationSchemaService.getAttestationSchemas(args);
  }

  @FieldResolver(() => GetAttestationsResponse, { nullable: true })
  async attestations(@Root() schema: Partial<AttestationSchema>) {
    return await this.attestationService.getAttestations({
      where: { supported_schemas_id: { eq: schema.id } },
    });
  }
}

export { AttestationSchemaResolver };
