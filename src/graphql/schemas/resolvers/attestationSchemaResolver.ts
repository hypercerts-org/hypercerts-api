import {Args, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {inject, injectable} from "tsyringe";
import {SupabaseService} from "../../../services/SupabaseService.js";
import {AttestationSchema} from "../typeDefs/attestationSchemaTypeDefs.js";
import {GetAttestationSchemaArgs} from "../args/attestationSchemaArgs.js";

@injectable()
@Resolver(_ => AttestationSchema)
class AttestationSchemaResolver {

    constructor(
        @inject(SupabaseService)
        private readonly supabaseService: SupabaseService) {
    }

    @Query(_ => [AttestationSchema])
    async attestationSchemas(@Args() args: GetAttestationSchemaArgs) {
        try {
            const res = await this.supabaseService.getAttestationSchemas(args);

            if (!res) {
                return [];
            }

            const {data, error} = res;

            if (error) {
                console.warn(`[AttestationSchemaResolver] Error fetching attestation schemas: `, error);
                return [];
            }

            return data;
        } catch (e) {
            throw new Error(`[AttestationSchemaResolver] Error fetching attestation schemas: ${e}`)
        }
    }

    @FieldResolver({nullable: true})
    async records(@Root() schema: Partial<AttestationSchema>) {
        try {
            console.log(schema)
            const res = await this.supabaseService.getAttestationsBySchemaId({supported_schema_id: schema.id!});

            if (!res) {
                return [];
            }

            const {data, error} = res;

            if (error) {
                console.warn(`[AttestationSchemaResolver] Error fetching attestations: `, error);
                return [];
            }

            return data.map((attestation) => {
                return {
                    ...attestation,
                    attestation: JSON.parse(attestation.decoded_attestation as string)
                }
            });
        } catch (e) {
            throw new Error(`[AttestationSchemaResolver] Error fetching attestations: ${e}`)
        }
    }
}

export {AttestationSchemaResolver};