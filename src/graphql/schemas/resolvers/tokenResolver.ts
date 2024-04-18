import {ArgsType, Field, FieldResolver, Query, Resolver, Root} from "type-graphql";
import {inject, injectable} from "tsyringe";
import {SupabaseService} from "../services/supabaseService.js";
import {GraphQLBigInt} from "graphql-scalars";
import {Contract} from "../typeDefs/contractTypeDefs.js";
import {Tables} from "../../../types/supabase.js";
import {Token} from "../typeDefs/tokenTypeDefs.js";

@ArgsType()
export class GetTokenArgs {
    @Field(type => String, {nullable: true})
    id?: string;
    @Field(type => String, {nullable: true})
    contracts_id?: string;
    @Field(type => GraphQLBigInt, {nullable: true})
    creation_block_timestamp?: bigint | number;
    @Field(type => String, {nullable: true})
    hypercert_id?: string | null;
    @Field(type => GraphQLBigInt, {nullable: true})
    last_block_update_timestamp?: bigint | number;
    @Field(type => String, {nullable: true})
    owner_address?: string;
    @Field(type => GraphQLBigInt, {nullable: true})
    token_id?: bigint | number;
    @Field(type => String, {nullable: true})
    type?: "claim" | "fraction";
    @Field(type => GraphQLBigInt, {nullable: true})
    units?: bigint | number;
    @Field(type => String, {nullable: true})
    uri?: string;

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