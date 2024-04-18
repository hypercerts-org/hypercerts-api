import {Args, ArgsType, Field, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {inject, injectable} from "tsyringe";
import {GetContractsArgs, SupabaseService} from "../services/supabaseService.js";
import {Contract} from "../typeDefs/contractTypeDefs.js";


@injectable()
@Resolver(_ => Contract)
class ContractResolver {

    constructor(
        @inject(SupabaseService)
        private readonly supabaseService: SupabaseService) {
    }

    @Query(returns => [Contract])
    async contracts(@Args() args: GetContractsArgs) {
        return await this.supabaseService.getContracts(args);
    }

    @FieldResolver({nullable: true})
    tokens(@Root() contract: Partial<Contract>) {
        return this.supabaseService.getTokensByContractId({contracts_id: contract.id!});
    }
}

export {ContractResolver};