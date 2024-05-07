import {supabase} from "../client/supabase.js";
import type {SupabaseClient} from "@supabase/supabase-js";
import type {Database} from "../types/supabase.js";
import {applyFilters} from "../graphql/schemas/utils.js";
import type {GetContractByIdArgs, GetContractsArgs} from "../graphql/schemas/args/contractArgs.js";
import type {GetMetadataArgs, GetMetadataByUriArgs} from "../graphql/schemas/args/metadataArgs.js";
import {GetHypercertArgs, GetHypercertByChainContractTokenArgs,} from "../graphql/schemas/args/hypercertsArgs.js";
import {GetAttestationSchemaArgs} from "../graphql/schemas/args/attestationSchemaArgs.js";
import {
    type GetAttestationArgs,
    GetAttestationByClaimIdArgs,
    GetAttestationBySchemaIdArgs
} from "../graphql/schemas/args/attestationArgs.js";
import type {Contract} from "../graphql/schemas/typeDefs/contractTypeDefs.js";
import type {Metadata} from "../graphql/schemas/typeDefs/metadataTypeDefs.js";
import type {Hypercert} from "../graphql/schemas/typeDefs/hypercertTypeDefs.js";
import type {AttestationSchema} from "../graphql/schemas/typeDefs/attestationSchemaTypeDefs.js";
import type {Attestation} from "../graphql/schemas/typeDefs/attestationTypeDefs.js";
import type {Fraction} from "../graphql/schemas/typeDefs/fractionTypeDefs.js";
import {GetFractionArgs, GetFractionsByClaimId} from "../graphql/schemas/args/fractionArgs.js";
import {SortOrder} from "../graphql/schemas/enums/sortEnums.js";


export class SupabaseService {
    private supabase: SupabaseClient<Database>;

    constructor() {
        this.supabase = supabase;
    }

    // Contracts

    async getContracts(args: GetContractsArgs) {
        let query = this.supabase.from('contracts').select('*');

        query = applyFilters<Contract, typeof query>({query, where: args.where});

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

        const fromString = `* ${args.where?.contracts ? ', contracts!inner (*)' : ''} ${args.where?.attestations ? ', attestations!inner (*)' : ''} ${args.where?.fractions ? ', fractions!inner (*)' : ''} ${args.where?.metadata ? ', metadata!inner (*)' : ''}`

        let query = this.supabase.from('claims').select(fromString);

        const {where, first, offset, limit, sort} = args;

        query = applyFilters<Hypercert, typeof query>({query, where: {...where, type: {eq: "claim"}}});

        if (limit && !offset) query = query.limit(limit);

        if (first && offset) query = query.range(offset, offset + first - 1);

        if (sort) {
            const ascending = sort?.order !== SortOrder.descending;
            if (sort.by) {
                query = query.order(sort.by, {ascending})
            }
            if (!sort.by) {
                query = query.order('id', {ascending})
            }
        }

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
        const {where} = args;

        query = applyFilters<Fraction, typeof query>({query, where});

        return query;
    }

    async getFractionsByClaimId(args: GetFractionsByClaimId) {
        let query = this.supabase.from('fractions').select('*').eq('claims_id', args.claim_id);
        const {where} = args;

        query = applyFilters<Fraction, typeof query>({query, where});

        return query;
    }

    // Metadata

    async getMetadata(args: GetMetadataArgs) {
        let query = this.supabase.from('metadata').select('*');
        const {where} = args;

        query = applyFilters<Metadata, typeof query>({query, where});

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

        const {where} = args;

        query = applyFilters<AttestationSchema, typeof query>({query, where});

        return query;
    }

    async getAttestations(args: GetAttestationArgs) {
        let query = this.supabase.from('attestations').select('*');

        const {where} = args;

        query = applyFilters<Attestation, typeof query>({query, where});

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

    async getAttestationsBySchemaId(args: GetAttestationBySchemaIdArgs
    ) {
        if (!args.supported_schema_id) {
            return null;
        }

        return this.supabase.from('attestations').select('*').eq('supported_schemas_id', args.supported_schema_id);
    }

}