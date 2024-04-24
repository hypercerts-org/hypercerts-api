import {supabase} from "../client/supabase.js";
import type {SupabaseClient} from "@supabase/supabase-js";
import type {Database} from "../types/supabase.js";
import {applyFilters, applyPagination} from "../graphql/schemas/utils.js";
import type {GetContractByIdArgs, GetContractsArgs} from "../graphql/schemas/args/contractArgs.js";
import type {GetMetadataArgs, GetMetadataByUriArgs} from "../graphql/schemas/args/metadataArgs.js";
import {GetHypercertArgs, GetHypercertByChainContractTokenArgs,} from "../graphql/schemas/args/hypercertsArgs.js";
import {GetAttestationSchemaArgs} from "../graphql/schemas/args/attestationSchemaArgs.js";
import {
    type GetAttestationArgs,
    GetAttestationByChainContractTokenArgs, GetAttestationByClaimIdArgs,
    GetAttestationBySchemaIdArgs
} from "../graphql/schemas/args/attestationArgs.js";
import type {Contract} from "../graphql/schemas/typeDefs/contractTypeDefs.js";
import type {Metadata} from "../graphql/schemas/typeDefs/metadataTypeDefs.js";
import type {Hypercert} from "../graphql/schemas/typeDefs/hypercertTypeDefs.js";
import type {AttestationSchema} from "../graphql/schemas/typeDefs/attestationSchemaTypeDefs.js";
import type {Attestation} from "../graphql/schemas/typeDefs/attestationTypeDefs.js";
import type {Fraction} from "../graphql/schemas/typeDefs/fractionTypeDefs";
import {GetFractionArgs, GetFractionsByClaimId} from "../graphql/schemas/args/fractionArgs.js";


export class SupabaseService {
    private supabase: SupabaseClient<Database>;

    constructor() {
        this.supabase = supabase;
    }

    // Contracts

    async getContracts({where, page}: GetContractsArgs) {
        let query = this.supabase.from('contracts').select('*');

        query = applyFilters<Contract, typeof query>({query, where});
        query = applyPagination<typeof query>({query, fetch: page})

        console.log(query);

        return query;
    }

    async getContractsById(args: GetContractByIdArgs) {
        if (!args.id) {
            return null;
        }

        return this.supabase.from('contracts').select('*').eq('id', args.id).single();

    }

    // Claims

    async getHypercerts(args: GetHypercertArgs) {
        let query = this.supabase.from('claims').select('*');

        const {where, page} = args;

        query = applyFilters<Hypercert, typeof query>({query, where: {...where, type: {eq: "claim"}}});
        query = applyPagination<typeof query>({query, fetch: page})

        return query;
    }

    async getHypercertsByChainContractToken(args: GetHypercertByChainContractTokenArgs) {
        if (!args.chain_id || !args.contract_address || !args.token_id) {
            return null;
        }

        return this.supabase.from('claims').select('*, contracts (*)').eq('token_id', args.token_id)
            .eq('contracts.contract_address', args.contract_address)
            .eq('contracts.chain_id', args.chain_id);
    }

    // Fractions

    async getFractions(args: GetFractionArgs) {
        let query = this.supabase.from('fractions').select('*');
        const {where, page} = args;

        query = applyFilters<Fraction, typeof query>({query, where});
        query = applyPagination<typeof query>({query, fetch: page})

        return query;
    }

    async getFractionsByClaimId(args: GetFractionsByClaimId) {
        let query = this.supabase.from('fractions').select('*').eq('claims_id', args.claim_id);
        const {where, page} = args;

        query = applyFilters<Fraction, typeof query>({query, where});
        query = applyPagination<typeof query>({query, fetch: page})

        return query;
    }

    // Metadata

    async getMetadata(args: GetMetadataArgs) {
        let query = this.supabase.from('metadata').select('*');
        const {where, page} = args;

        query = applyFilters<Metadata, typeof query>({query, where});
        query = applyPagination<typeof query>({query, fetch: page})

        return query;
    }

    async getMetadataByUri(args: GetMetadataByUriArgs) {
        if (!args.uri) {
            return null;
        }

        return this.supabase.from('metadata').select('*').eq('uri', args.uri).single();
    }

    // Allow lists


    // Attestations

    async getAttestationSchemas(args: GetAttestationSchemaArgs) {
        let query = this.supabase.from('supported_schemas').select('*');

        const {where, page} = args;

        query = applyFilters<AttestationSchema, typeof query>({query, where});
        query = applyPagination<typeof query>({query, fetch: page})

        return query;
    }

    async getAttestations(args: GetAttestationArgs) {
        let query = this.supabase.from('attestations').select('*');

        const {where, page} = args;

        query = applyFilters<Attestation, typeof query>({query, where});
        query = applyPagination<typeof query>({query, fetch: page})

        return query;
    }

    async getAttestationsByClaimId(args: GetAttestationByClaimIdArgs) {
        if (!args.claim_id) {
            return null;
        }

        return this.supabase.rpc("get_attestations_for_claim", {
            claim_id: args.claim_id
        })
    }

    async getAttestationsByChainContractToken(args: GetAttestationByChainContractTokenArgs) {
        if (!args.chain_id || !args.contract_address || !args.token_id) {
            return null;
        }

        return this.getAttestations({
            where: {
                contract_address: {eq: args.contract_address},
                token_id: {eq: args.token_id.toString()},
            }
        })

    }

    async getAttestationsBySchemaId(args: GetAttestationBySchemaIdArgs
    ) {
        if (!args.supported_schema_id) {
            return null;
        }

        return this.supabase.from('attestations').select('*').eq('supported_schemas_id', args.supported_schema_id);
    }

}