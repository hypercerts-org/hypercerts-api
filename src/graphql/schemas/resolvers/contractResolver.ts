import {Args, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {inject, injectable} from "tsyringe";
import {SupabaseService} from "../../../services/SupabaseService.js";
import {Contract} from "../typeDefs/contractTypeDefs.js";
import {GetContractsArgs} from "../args/contractArgs.js";


@injectable()
@Resolver(_ => Contract)
class ContractResolver {

    constructor(
        @inject(SupabaseService)
        private readonly supabaseService: SupabaseService) {
    }

    @Query(_ => [Contract])
    async contracts(@Args() args: GetContractsArgs) {
        return this.supabaseService.getContracts(args);
    }

}

export {ContractResolver};