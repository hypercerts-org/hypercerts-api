import {ArgsType, Field, Query, Resolver} from "type-graphql";
import {inject, injectable} from "tsyringe";
import {SupabaseService} from "../services/supabaseService.js";
import {GraphQLBigInt} from "graphql-scalars";
import {Token} from "../typeDefs/tokenTypeDefs.js";

@ArgsType()
export class GetTokenArgs {
    @Field(type => String, {nullable: true})
    id?: string;
    @Field(type => String, {nullable: true})
    contracts_id?: string;
    @Field(type => String, {nullable: true})
    owner_address?: string;
    @Field(type => GraphQLBigInt, {nullable: true})
    units?: bigint | number;

}

@injectable()
@Resolver(of => Token)
class TokenResolver {

    constructor(
        @inject(SupabaseService)
        private readonly supabaseService: SupabaseService) {
    }

    @Query(returns => [Token])
    async tokens() {
        return await this.supabaseService.getTokens();
    }
}

export {TokenResolver};