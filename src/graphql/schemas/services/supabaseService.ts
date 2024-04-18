import {supabase} from "../../../client/supabase.js";
import {SupabaseClient} from "@supabase/supabase-js";
import {GetHypercertsByIdArgs} from "../resolvers/hypercertResolver.js";
import {Database, Tables} from "../../../types/supabase.js";
import {Metadata} from "../typeDefs/metadataTypeDefs.js";
import {MalformedDataError} from "@hypercerts-org/sdk";
import {GetContractArgs} from "../resolvers/contractResolver";
import {GetTokenArgs} from "../resolvers/tokenResolver";


export class SupabaseService {
    private supabase: SupabaseClient<Database>;

    constructor() {
        this.supabase = supabase;
    }

    async getContractById(args: GetContractArgs) {
        const {
            data,
            error
        } = await this.supabase.from('contracts').select('*').eq('id', args.id || "").single();

        if (error) {
            console.error(error);
            return error;
        }

        return data;
    }

    async getContracts() {

        const {
            data,
            error
        } = await this.supabase.from('contracts').select('*');

        if (error) {
            console.error(error);
            return error;
        }

        return data;
    }

    async getMetadataByUri(arg: Partial<Metadata>) {
        console.log(arg);
        if (!arg.uri) {
            return;
        }

        const {data, error} = await this.supabase.from('metadata').select('*').eq('uri', arg.uri).single();

        if (error) {
            console.error(error);
            return;
        }

        return data;
    }

    async findMetadataByDescription(arg: Partial<Metadata>) {
        if (!arg.description) {
            throw new MalformedDataError("Description is required");
        }

        const {
            data,
            error
        } = await this.supabase.from('metadata').select('*').textSearch('description', arg.description);

        if (error) {
            console.error(error);
            return;
        }

        return data;
    }

    async getHypercerts() {
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

    async getHypercertsById(args: GetHypercertsByIdArgs) {
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

    async getTokensByContractId(args: Pick<GetTokenArgs, "contracts_id">) {
        const {
            data,
            error
        } = await this.supabase.from('hypercert_tokens').select('*').eq('contracts_id', args.contracts_id);

        if (error) {
            console.error(error);
            return error;
        }

        return data;
    }

}