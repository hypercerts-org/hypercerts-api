import {ArgsType, Field, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {inject, injectable} from "tsyringe";
import {SupabaseService} from "../services/supabaseService.js";
import {GraphQLBigInt} from "graphql-scalars";
import {Contract} from "../typeDefs/contractTypeDefs.js";

@ArgsType()
export class GetContractArgs {
    @Field(type => String, {nullable: true})
    id?: string;
    @Field(type => String, {nullable: true})
    contract_address?: string;
    @Field(type => GraphQLBigInt, {nullable: true})
    chain_id?: bigint | number | string;
    @Field(type => GraphQLBigInt, {nullable: true})
    start_block?: bigint | number | null;
}

@injectable()
@Resolver(of => Contract)
class ContractResolver {

    constructor(
        @inject(SupabaseService)
        private readonly supabaseService: SupabaseService) {
    }

    @Query(returns => [Contract])
    async contracts() {
        return await this.supabaseService.getContracts();
    }

    @FieldResolver({nullable: true})
    tokens(@Root() contract: Partial<Contract>) {
        return this.supabaseService.getTokensByContractId({contracts_id: contract.id!});
    }
}

export {ContractResolver};