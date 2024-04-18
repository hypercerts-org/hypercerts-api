import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLBigInt} from 'graphql-scalars';
import {Token} from "./tokenTypeDefs.js";

@ObjectType()
class Contract {
    @Field(type => ID, {nullable: true})
    id?: string;
    @Field(type => GraphQLBigInt, {nullable: true})
    chain_id?: bigint | number | string;
    @Field(type => String, {nullable: true})
    contract_address?: `0x${string}`;
    @Field(type => GraphQLBigInt, {nullable: true})
    start_block?: bigint | number | null;
    @Field(returns => [Token], {nullable: true})
    tokens?: Token[] | null;
}


export {Contract}
