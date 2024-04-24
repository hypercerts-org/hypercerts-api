import {Args, Field, FieldResolver, ObjectType, Query, Resolver, Root} from "type-graphql";
import {Hypercert} from "../typeDefs/hypercertTypeDefs.js";
import {inject, injectable} from "tsyringe";
import {SupabaseService} from "../../../services/SupabaseService.js";
import {GetHypercertArgs} from "../args/hypercertsArgs.js";
import {Int} from "type-graphql";

@ObjectType()
export default class GetHypercertsResponse {
    @Field(() => [Hypercert])
    data?: Hypercert[];

    @Field(() => Int)
    totalCount?: number;
}

@injectable()
@Resolver(_ => Hypercert)
class HypercertResolver {

    constructor(
        @inject(SupabaseService)
        private readonly supabaseService: SupabaseService) {
    }

    @Query(_ => GetHypercertsResponse)
    async hypercerts(@Args() args: GetHypercertArgs) {
        try {
            const res = await this.supabaseService.getHypercerts(args);

            if (!res) {
                return [];
            }

            const {data, error} = res;

            if (error) {
                console.warn(`[HypercertResolver::hypercerts] Error fetching hypercerts: `, error);
                return [];
            }

            return {data, totalCount: data.length};
        } catch (e) {
            throw new Error(`[HypercertResolver::hypercerts] Error fetching hypercerts: ${e}`)
        }
    }

    @FieldResolver({nullable: true})
    async metadata(@Root() hypercert: Partial<Hypercert>) {
        if (!hypercert.uri) {
            return null;
        }

        try {
            const res = await this.supabaseService.getMetadataByUri({uri: hypercert?.uri})

            if (!res) {
                return null;
            }

            const {data, error} = res;

            if (error) {
                console.warn(`[HypercertResolver::metadata] Error fetching metadata for uri ${hypercert.uri}: `, error);
                return null;
            }

            return data;
        } catch (e) {
            throw new Error(`[HypercertResolver::metadata] Error fetching metadata for uri ${hypercert.uri}: ${e}`)
        }
    }

    @FieldResolver()
    async contract(@Root() hypercert: Partial<Hypercert>) {
        if (!hypercert.contracts_id) {
            return null;
        }

        try {
            const res = await this.supabaseService.getContractsById({id: hypercert.contracts_id})

            if (!res) {
                console.log(`[HypercertResolver::contract] Contract with id ${hypercert.contracts_id} not found: `, res)
                return null;
            }

            const {data, error} = res;

            if (error) {
                console.warn(`[HypercertResolver::contract] Error fetching contract with id ${hypercert.contracts_id}: `, error);
                return null;
            }

            return data;
        } catch (e) {
            throw new Error(`[HypercertResolver::contract] Error fetching contract with id ${hypercert.contracts_id}: ${e}`)
        }
    }

    @FieldResolver()
    async attestations(@Root() hypercert: Hypercert) {
        if (!hypercert.id) {
            return null;
        }

        try {
            const res = await this.supabaseService.getAttestationsByClaimId({
                claim_id: hypercert.id
            })

            if (!res) {
                console.debug(`[HypercertResolver::attestations] Attestations for ${hypercert.hypercert_id} not found: `, res)
                return null;
            }

            const {data, error} = res;

            if (error) {
                console.error(`[HypercertResolver::attestations] Error fetching attestations for ${hypercert.hypercert_id}}: `, error);
                return null;
            }

            const attestationsAsObject = data.map((att) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                return {...att, attestation: att.decoded_attestation ? JSON.parse(att.decoded_attestation as string) : undefined}
            });

            return {data: attestationsAsObject, totalCount: attestationsAsObject.length}
        } catch (e) {
            throw new Error(`[HypercertResolver::attestations] Error fetching attestations for ${hypercert.hypercert_id}}}: ${e}`)
        }
    }

    @FieldResolver()
    async fractions(@Root() hypercert: Hypercert) {
        if (!hypercert.id) {
            return null;
        }

        try {
            const res = await this.supabaseService.getFractionsByClaimId({
                claim_id: hypercert.id
            })

            if (!res) {
                console.debug(`[HypercertResolver::fractions] Fractions for ${hypercert.hypercert_id} not found: `, res)
                return null;
            }

            const {data, error} = res;

            if (error) {
                console.error(`[HypercertResolver::fractions] Error fetching fractions for ${hypercert.hypercert_id}}: `, error);
                return null;
            }

            return data
        } catch (e) {
            throw new Error(`[HypercertResolver::attestations] Error fetching attestations for ${hypercert.hypercert_id}}}: ${e}`)
        }
    }
}

export {HypercertResolver};