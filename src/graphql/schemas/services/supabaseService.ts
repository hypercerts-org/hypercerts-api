import {supabase} from "../../../client/supabase.js";
import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "../../../types/supabase.js";
import {GetTokenArgs} from "../resolvers/tokenResolver.js";
import {ArgsType, Field} from "type-graphql";
import {ContractFetchInput, ContractWhereInput} from "../inputs/contractInput.js";
import {applyFilters, applyPagination} from "../utils.js";
import {MetadataFetchInput, MetadataWhereInput} from "../inputs/metadataInput.js";
import {HypercertFetchInput, HypercertsWhereInput} from "../inputs/hypercertsInput.js";

@ArgsType()
export class GetContractsArgs {
    @Field({nullable: true})
    where?: ContractWhereInput;
    @Field({nullable: true})
    page?: ContractFetchInput;
}

@ArgsType()
export class GetMetadataArgs {
    @Field({nullable: true})
    where?: MetadataWhereInput;
    @Field({nullable: true})
    page?: MetadataFetchInput
}

@ArgsType()
export class GetHypercertArgs {
    @Field({nullable: true})
    where?: HypercertsWhereInput;
    @Field({nullable: true})
    page?: HypercertFetchInput;
}

@ArgsType()
export class GetHypercertByIdArgs {
    @Field({nullable: true})
    id?: string;
    @Field({nullable: true})
    hypercert_id?: string;
}

@ArgsType()
export class GetContractByIdArgs {
    @Field({nullable: true})
    id?: string;
}

@ArgsType()
export class GetMetadataByUriArgs {
    @Field()
    uri?: string;
}

export class SupabaseService {
    private supabase: SupabaseClient<Database>;

    constructor() {
        this.supabase = supabase;
    }

    async getContracts(args: GetContractsArgs) {
        let _query = this.supabase.from('contracts').select('*');
        const {where} = args;

        _query = applyFilters(_query, where);
        _query = applyPagination(_query, args);

        const {data, error} = await _query;

        if (error) {
            console.error(error);
            return error;
        }

        return data;
    }

    async getMetadata(args: GetMetadataArgs) {
        let _query = this.supabase.from('metadata').select('*');
        const {where} = args;

        _query = applyFilters(_query, where);
        _query = applyPagination(_query, args);

        const {data, error} = await _query;


        if (error) {
            console.error(error);
            return error;
        }

        return data;
    }

    async getHypercerts(args: GetHypercertArgs) {
        const _query = this.supabase.from('hypercert_tokens').select('*');

        const {where} = args;

        const filteredQuery = applyFilters(_query, where);

        const {data, error} = await filteredQuery;

        if (error) {
            console.error(error);
            return error;
        }

        return data;
    }


    async getTokens() {
        const {
            data,
            error
        } = await this.supabase.from('hypercert_tokens').select('*');

        if (error) {
            console.error(error);
            return error;
        }

        return data;
    }

    async getContractsById(args: GetContractByIdArgs) {
        if (!args.id) {
            return null;
        }

        const {
            data,
            error
        } = await this.supabase.from('contracts').select('*').eq('id', args.id).single();

        if (error) {
            console.error(error);
            return error;
        }

        return data;
    }

    async getHypercertsById(args: GetHypercertByIdArgs) {
        if (!args.id && !args.hypercert_id) {
            return null;
        }

        if (args.id) {
            const {
                data,
                error
            } = await this.supabase.from('hypercert_tokens').select('*').eq('id', args.id).single();

            if (error) {
                console.error(`[SupabaseService]: fetchHypercertsById failed for ${args.toString()}`, error);
                return error;
            }

            return data;
        }

        if (args.hypercert_id) {
            const {
                data,
                error
            } = await this.supabase.from('hypercert_tokens').select('*').eq('hypercert_id', args.hypercert_id).single();

            if (error) {
                console.error(error);
                return error;

            }

            return data;
        }
    }

    async getMetadataByUri(args: GetMetadataByUriArgs) {
        if (!args.uri) {
            return null;
        }

        const {
            data,
            error
        } = await this.supabase.from('metadata').select('*').eq('uri', args.uri).single();

        if (error) {
            console.error(`[SupabaseService]: getMetadataByUri failed for ${args.uri}`, error);
            return error;
        }

        return data;
    }

    async getTokensByContractId(args: Pick<GetTokenArgs, "contracts_id">) {
        if (!args.contracts_id) {
            return null;
        }

        const {
            data,
            error
        } = await this.supabase.from('hypercert_tokens').select('*').eq('contracts_id', args.contracts_id);

        if (error) {
            console.error(`[SupabaseService]: getTokensByContractId failed for ${args.toString()}`, error);
            return error;
        }

        return data;
    }

}