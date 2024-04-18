import {Args, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {Hypercert} from "../typeDefs/hypercertTypeDefs.js";
import {inject, injectable} from "tsyringe";
import {GetHypercertArgs, SupabaseService} from "../services/supabaseService.js";
import {MalformedDataError} from "@hypercerts-org/sdk";

@injectable()
@Resolver(of => Hypercert)
class HypercertResolver {

    constructor(
        @inject(SupabaseService)
        private readonly supabaseService: SupabaseService) {
    }

    @Query(_ => [Hypercert])
    async hypercerts(@Args() {where}: GetHypercertArgs) {
        return await this.supabaseService.getHypercerts({where});

    }

    @FieldResolver({nullable: true})
    async metadata(@Root() hypercert: Partial<Hypercert>) {
        if (!hypercert.uri) {
            return null;
        }

        const res = await this.supabaseService.getMetadataByUri({uri: hypercert?.uri})

        if (!res) {
            return null;
        }

        return res;
    }

    @FieldResolver()
    async contract(@Root() hypercert: Partial<Hypercert>) {
        const res = this.supabaseService.getContractsById({id: hypercert.contracts_id})

        if (!res) {
            console.log(`Contract with id ${hypercert.contracts_id} not found: `, res)
            throw new MalformedDataError(`Contract with id ${hypercert.contracts_id} not found`, {response: res})
        }

        return res;
    }
}

export {HypercertResolver};