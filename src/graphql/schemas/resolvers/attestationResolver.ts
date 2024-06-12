import {Args, Field, FieldResolver, Int, ObjectType, Query, Resolver, Root} from "type-graphql";
import {inject, injectable} from "tsyringe";
import {SupabaseCachingService} from "../../../services/SupabaseCachingService.js";
import {GetAttestationArgs} from "../args/attestationArgs.js";
import {Attestation} from "../typeDefs/attestationTypeDefs.js";
import {z} from "zod";
import {isAddress} from "viem"

const HypercertPointer = z.object({
    chain_id: z.coerce.bigint(),
    contract_address: z.string().refine(isAddress, {message: 'Invalid contract address'}),
    token_id: z.coerce.bigint()
});

@ObjectType()
export default class GetAttestationsResponse {
    @Field(() => [Attestation], {nullable: true})
    data?: Attestation[];

    @Field(() => Int, {nullable: true})
    count?: number;
}

@injectable()
@Resolver(_ => Attestation)
class AttestationResolver {

    constructor(
        @inject(SupabaseCachingService)
        private readonly supabaseService: SupabaseCachingService) {
    }

    @Query(_ => GetAttestationsResponse)
    async attestations(@Args() args: GetAttestationArgs) {
        try {
            const res = await this.supabaseService.getAttestations(args);

            const {data, error, count} = res;

            if (error) {
                console.warn(`[AttestationResolver] Errors found while fetching attestations: `, error);
                return {data, count: null};
            }

            console.log(data);

            const newData = data ? data.map(item => {
                return {
                    ...item,
                    attestation: item.data
                };
            }) : data;

            return {data: newData, count: count ? count : newData?.length};
        } catch (e) {
            const error = e as Error;
            throw new Error(`[AttestationResolver] Error fetching attestations: ${error.message}`)
        }
    }

    @FieldResolver({nullable: true})
    async hypercerts(@Root() attestation: Attestation) {
        if (!attestation.data) return null;

        const _att = attestation.data;

        if (!HypercertPointer.safeParse(_att).success) return null;

        const pointer = HypercertPointer.parse(_att);

        try {
            const res = await this.supabaseService.getHypercerts({
                where: {
                    contract: {chain_id: {eq: pointer.chain_id}, contract_address: {eq: pointer.contract_address}},
                    token_id: {eq: pointer.token_id}
                }
            })

            if (!res) {
                console.warn(`[AttestationResolver] Error fetching hypercerts: `, res);
                return null;
            }

            const {data, error} = res;

            if (error) {
                console.warn(`[AttestationResolver] Error fetching hypercerts: `, error);
                return null;
            }

            return data;
        } catch (e) {
            const error = e as Error;
            throw new Error(`[AttestationResolver] Error fetching hypercerts: ${error.message}`)
        }
    }
}

export {
    AttestationResolver
};