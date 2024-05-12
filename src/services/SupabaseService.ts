import {supabase} from "../client/supabase.js";
import type {SupabaseClient} from "@supabase/supabase-js";
import type {Database} from "../types/supabase.js";
import {applyFilters} from "../graphql/schemas/utils/filters.js";
import type {GetContractsArgs} from "../graphql/schemas/args/contractArgs.js";
import type {GetMetadataArgs} from "../graphql/schemas/args/metadataArgs.js";
import {GetHypercertArgs,} from "../graphql/schemas/args/hypercertsArgs.js";
import {GetAttestationSchemaArgs} from "../graphql/schemas/args/attestationSchemaArgs.js";
import {
    type GetAttestationArgs,
    GetAttestationByClaimIdArgs,
    GetAttestationBySchemaIdArgs
} from "../graphql/schemas/args/attestationArgs.js";
import type {AttestationSchema} from "../graphql/schemas/typeDefs/attestationSchemaTypeDefs.js";
import {GetFractionArgs} from "../graphql/schemas/args/fractionArgs.js";
import {applySorting} from "../graphql/schemas/utils/sorting.js";
import {applyPagination} from "../graphql/schemas/utils/pagination.js";
import {CountKeys} from "../graphql/schemas/enums/countEnums.js";


export class SupabaseService {
    private supabase: SupabaseClient<Database>;

    constructor() {
        this.supabase = supabase;
    }

    // Contracts

    async getContracts(args: GetContractsArgs) {
        let query = this.supabase.from('contracts').select('*');

        const {where, sort, limit, offset, first} = args;

        query = applyFilters<AttestationSchema, typeof query>({query, where});
        query = applySorting({query, sort, table: 'contracts'});
        query = applyPagination({query, pagination: {first, offset, limit}});

        return query;
    }

    // Claims

    async getHypercerts(args: GetHypercertArgs) {

        const fromString = `* ${args.where?.contracts || args.sort?.by?.contracts ? ', contracts!inner (*)' : ''} ${args.where?.metadata || args.sort?.by?.metadata  ? ', metadata!inner (*)' : ''} ${args.where?.attestations || args.sort?.by?.attestations ? ', attestations!inner (*)' : ''} ${args.where?.fractions || args.sort?.by?.fractions ? ', fractions!inner (*)' : ''}`

        let query = this.supabase.from('claims').select(fromString, {
            count: args?.count ? 'exact' : undefined,
            head: args?.count && args.count === CountKeys.HEAD
        });


        const {where, first, offset, limit, sort} = args;

        query = applyFilters({query, where});
        query = applySorting({query, sort, table: 'hypercerts'});
        query = applyPagination({query, pagination: {first, offset, limit}});

        return query;
    }

    // Fractions

    async getFractions(args: GetFractionArgs) {
        const fromString = `* ${args.where?.hypercerts ? ', claims!inner (*)' : ''}`;

        let query = this.supabase.from('fractions').select(fromString, {
            count: args?.count ? 'exact' : undefined,
            head: args?.count && args.count === CountKeys.HEAD
        });

        const {where, first, offset, limit, sort} = args;

        query = applyFilters({query, where});
        query = applySorting({query, sort, table: 'fractions'});
        query = applyPagination({query, pagination: {first, offset, limit}});

        return query;
    }

    // Metadata

    async getMetadata(args: GetMetadataArgs) {
        let query = this.supabase.from('metadata').select('*');
        const {where, sort, limit, offset, first} = args;

        query = applyFilters({query, where});
        query = applySorting({query, sort, table: 'metadata'});
        query = applyPagination({query, pagination: {first, offset, limit}});

        return query;
    }

    // Allow lists


    // Attestations

    async getAttestationSchemas(args: GetAttestationSchemaArgs) {
        let query = this.supabase.from('supported_schemas').select('*');

        const {where, sort, limit, offset, first} = args;

        query = applyFilters({query, where});
        query = applySorting({query, sort, table: 'attestation_schemas'});
        query = applyPagination({query, pagination: {first, offset, limit}});

        return query;
    }

    async getAttestations(args: GetAttestationArgs) {
        let query = this.supabase.from('attestations').select('*');

        const {where, sort, limit, offset, first} = args;

        query = applyFilters({query, where});
        query = applySorting({query, sort, table: 'attestations'});
        query = applyPagination({query, pagination: {first, offset, limit}});

        return query;
    }

    async getAttestationsByClaimId(args: GetAttestationByClaimIdArgs) {
        if (!args.claim_id) {
            return null;
        }

        let query = this.supabase.from('attestations').select('*', {
            count: args?.count ? 'exact' : undefined,
            head: args?.count && args.count === CountKeys.HEAD
        })

        const {where, sort, limit, offset, first} = args;

        query = applyFilters({query, where: {...where, claims_id: {eq: args.claim_id}}});
        query = applySorting({query, sort, table: 'attestations'});
        query = applyPagination({query, pagination: {first, offset, limit}});

        return query;
    }

    async getAttestationsBySchemaId(args: GetAttestationBySchemaIdArgs
    ) {
        if (!args.supported_schema_id) {
            return null;
        }

        return this.supabase.from('attestations').select('*').eq('supported_schemas_id', args.supported_schema_id);
    }

}