import {
  Args,
  Field,
  FieldResolver,
  Int,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { inject, injectable } from "tsyringe";
import { SupabaseCachingService } from "../../../services/SupabaseCachingService.js";
import { AttestationSchema } from "../typeDefs/attestationSchemaTypeDefs.js";
import { GetAttestationSchemaArgs } from "../args/attestationSchemaArgs.js";

@ObjectType()
export default class GetAttestationsSchemaResponse {
  @Field(() => [AttestationSchema])
  data?: AttestationSchema[];

  @Field(() => Int, { nullable: true })
  count?: number;
}

@injectable()
@Resolver((_) => AttestationSchema)
class AttestationSchemaResolver {
  constructor(
    @inject(SupabaseCachingService)
    private readonly supabaseService: SupabaseCachingService,
  ) {}

  @Query((_) => GetAttestationsSchemaResponse)
  async attestationSchemas(@Args() args: GetAttestationSchemaArgs) {
    try {
      const res = await this.supabaseService.getAttestationSchemas(args);

      if (!res) {
        return [];
      }

      const { data, error, count } = res;

      if (error) {
        console.warn(
          `[AttestationSchemaResolver] Error fetching attestation schemas: `,
          error,
        );
        return { data };
      }

      return { data, count };
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `[AttestationSchemaResolver] Error fetching attestation schemas: ${error.message}`,
      );
    }
  }

  @FieldResolver({ nullable: true })
  async records(@Root() schema: Partial<AttestationSchema>) {
    try {
      const res = await this.supabaseService.getAttestations({
        where: { supported_schemas_id: { eq: schema.id } },
      });

      if (!res) {
        return [];
      }

      const { data, error } = res;

      if (error) {
        console.warn(
          `[AttestationSchemaResolver] Error fetching attestations: `,
          error,
        );
        return [];
      }

      return data.map((attestation) => {
        return {
          ...attestation,
          attestation: attestation.data,
        };
      });
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `[AttestationSchemaResolver] Error fetching attestations: ${error.message}`,
      );
    }
  }
}

export { AttestationSchemaResolver };
