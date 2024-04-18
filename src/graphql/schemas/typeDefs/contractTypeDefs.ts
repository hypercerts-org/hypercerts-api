import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLBigInt} from 'graphql-scalars';
import {Token} from "./tokenTypeDefs.js";

@ObjectType()
class Contract {
    @Field(type => String)
    id!: string;
    @Field(type => GraphQLBigInt)
    chain_id!: bigint | number | string;
    @Field(type => String)
    contract_address!: string;
    @Field(type => GraphQLBigInt, {nullable: true})
    start_block?: bigint | number | null;
    @Field(returns => [Token], {nullable: true})
    tokens?: Token[] | null;
}


export {Contract}
