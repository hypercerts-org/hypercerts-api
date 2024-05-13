import {Args, Field, FieldResolver, Int, ObjectType, Query, Resolver, Root} from "type-graphql";
import {Hypercert} from "../typeDefs/hypercertTypeDefs.js";
import {inject, injectable} from "tsyringe";
import {SupabaseService} from "../../../services/SupabaseService.js";
import {GetHypercertArgs} from "../args/hypercertsArgs.js";

@ObjectType()
export default class GetHypercertsResponse {
    @Field(() => [Hypercert], {nullable: true})
    data?: Hypercert[];

    @Field(() => Int, {nullable: true})
    count?: number;
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
                console.warn(`[HypercertResolver::hypercerts] No response from DB`, res);
                return {data: []};
            }

            const {data, error, count} = res;

            if (error) {
                console.warn(`[HypercertResolver::hypercerts] Error fetching hypercerts: `, error);
            }

            return {data, count: count ? count : data?.length};
        } catch (e) {
            const error = e as Error;
            throw new Error(`[HypercertResolver::hypercerts] Error fetching hypercerts: ${error.message}`)
        }
    }

    @FieldResolver({nullable: true})
    async metadata(@Root() hypercert: Partial<Hypercert>) {
        if (!hypercert.uri) {
            return null;
        }

        try {
            const res = await this.supabaseService.getMetadata({where: {uri: {eq: hypercert.uri}}});

            if (!res) {
                console.warn(`[HypercertResolver::metadata] Error fetching metadata for uri ${hypercert.uri}: `, res);
                return {data: []};
            }

            const {data, error, count} = res;

            if (error) {
                console.warn(`[HypercertResolver::metadata] Error fetching metadata for uri ${hypercert.uri}: `, error);
                return {data};
            }

            return {data, count: count ? count : data?.length};
        } catch (e) {
            const error = e as Error;
            throw new Error(`[HypercertResolver::metadata] Error fetching metadata for uri ${hypercert.uri}: ${error.message}`)
        }
    }

    @FieldResolver()
    async contracts(@Root() hypercert: Partial<Hypercert>) {
        if (!hypercert.contracts_id) {
            return null;
        }

        try {
            const res = await this.supabaseService.getContracts({where: {id: {eq: hypercert.contracts_id}}})

            if (!res) {
                console.warn(`[HypercertResolver::contract] Error fetching contract with id ${hypercert.contracts_id}: `, res);
                return {data: []};
            }

            const {data, error, count} = res;

            if (error) {
                console.warn(`[HypercertResolver::contract] Error fetching contract with id ${hypercert.contracts_id}: `, error);
                return {data};
            }

            return {data, count: count ? count : data?.length}
        } catch (e) {
            const error = e as Error;
            throw new Error(`[HypercertResolver::contract] Error fetching contract with id ${hypercert.contracts_id}: ${error.message}`)
        }
    }

    @FieldResolver()
    async attestations(@Root() hypercert: Hypercert) {
        if (!hypercert.id) {
            return null;
        }

        try {

            console.log(`[HypercertResolver::attestations] Fetching attestations for ${hypercert.id}`)

            const res = await this.supabaseService.getAttestations({where: {hypercerts: {id: {eq: hypercert.id}}}})

            if (!res) {
                console.warn(`[HypercertResolver::attestations] Error fetching attestations for ${hypercert.hypercert_id}}: `, res);
                return {data: []};
            }

            const {data, error, count} = res;

            if (error) {
                console.error(`[HypercertResolver::attestations] Error fetching attestations for ${hypercert.hypercert_id}}: `, error);
                return {data};
            }

            const parsed = data.map((att) => {
                return {
                    ...att,
                    attestation: att.decoded_attestation ? JSON.parse(att.decoded_attestation as string) as object : undefined
                }
            });

            return {data: parsed, count: count ? count : parsed?.length}

        } catch (e) {
            const error = e as Error;
            throw new Error(`[HypercertResolver::attestations] Error fetching attestations for ${hypercert.hypercert_id}}}: ${error.message}`)
        }
    }

    @FieldResolver()
    async fractions(@Root() hypercert: Hypercert) {
        if (!hypercert.id) {
            return null;
        }

        try {
            console.log(`[HypercertResolver::fractions] Fetching fractions for ${hypercert.id}`);
            const res = await this.supabaseService.getFractions({where: {hypercerts: {id: {eq: hypercert.id}}}})

            if (!res) {
                console.warn(`[HypercertResolver::fractions] Error fetching fractions for ${hypercert.hypercert_id}: `, res);
                return {data: []};
            }

            const {data, error, count} = res;

            if (error) {
                console.error(`[HypercertResolver::fractions] Error fetching fractions for ${hypercert.hypercert_id}: `, error);
                return {data};
            }

            return {data, count: count ? count : data?.length}
        } catch (e) {
            throw new Error(`[HypercertResolver::attestations] Error fetching attestations for ${hypercert.hypercert_id}: ${(e as Error).toString()}`)
        }
    }
}

export {HypercertResolver};