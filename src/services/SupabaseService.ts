import {supabase} from "../client/supabase.js";
import type {SupabaseClient} from "@supabase/supabase-js";
import type {Database, Tables} from "../types/supabase.js";
import {applyFilters} from "../graphql/schemas/utils/filters.js";
import type {GetContractsArgs} from "../graphql/schemas/args/contractArgs.js";
import type {GetMetadataArgs} from "../graphql/schemas/args/metadataArgs.js";
import {GetHypercertArgs,} from "../graphql/schemas/args/hypercertsArgs.js";
import {GetAttestationSchemaArgs} from "../graphql/schemas/args/attestationSchemaArgs.js";
import {type GetAttestationArgs} from "../graphql/schemas/args/attestationArgs.js";
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

        const {where, sort, offset, first} = args;

        query = applyFilters<AttestationSchema, typeof query>({query, where});
        query = applySorting({query, sort});
        query = applyPagination({query, pagination: {first, offset}});

        return query;
    }

    // Claims

    async getHypercerts(args: GetHypercertArgs) {

        const fromString = `* ${args.where?.contracts ? ', contracts!inner (*)' : ''} ${args.where?.metadata ? ', metadata!inner (*)' : ''} ${args.where?.attestations ? ', attestations!inner (*)' : ''} ${args.where?.fractions ? ', fractions!inner (*)' : ''}`

        // TOOD build method to get count
        let query = this.supabase.from('claims').select(fromString, {
            count: args?.count ? 'exact' : undefined,
            head: args?.count && args.count === CountKeys.HEAD
        });


        const {where, first, offset, sort} = args;

        query = applyFilters({query, where});
        query = applySorting({query, sort});
        query = applyPagination({query, pagination: {first, offset}});

        return query;
    }

    // Fractions

    async getFractions(args: GetFractionArgs) {
        const fromString = `*`;

        let query = this.supabase.from('fractions').select(fromString, {
            count: args?.count ? 'exact' : undefined,
            head: args?.count && args.count === CountKeys.HEAD
        });

        const {where, first, offset, sort} = args;

        query = applyFilters({query, where});
        query = applySorting({query, sort});
        query = applyPagination({query, pagination: {first, offset}});

        return query;
    }

    // Metadata

    async getMetadata(args: GetMetadataArgs) {
        let query = this.supabase.from('metadata').select('*');
        const {where, sort, offset, first} = args;

        query = applyFilters({query, where});
        query = applySorting({query, sort});
        query = applyPagination({query, pagination: {first, offset}});

        return query;
    }

    // Allow lists


    // Attestations

    async getAttestationSchemas(args: GetAttestationSchemaArgs) {
        let query = this.supabase.from('supported_schemas').select('*');

        const {where, sort, offset, first} = args;

        query = applyFilters({query, where});
        query = applySorting({query, sort});
        query = applyPagination({query, pagination: {first, offset}});

        return query;
    }

    async getAttestations(args: GetAttestationArgs) {
        const fromString = `* ${args.where?.hypercerts ? ', claims!inner (*)' : ''} ${args.where?.metadata ? ', metadata!inner (*)' : ''}`

        let query = this.supabase.from('attestations').select(fromString);

        const {where, sort, offset, first} = args;

        query = applyFilters({query, where});
        query = applySorting({query, sort});
        query = applyPagination({query, pagination: {first, offset}});

        return query.returns<Partial<Tables<"attestations">>[]>();
    }
}