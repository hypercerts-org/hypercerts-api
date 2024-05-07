import {Args, Query, Resolver} from "type-graphql";
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
        return await this.supabaseService.getContracts(args);
    }

}

export {ContractResolver};