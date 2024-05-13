import {Field, ObjectType} from "type-graphql";
import {GraphQLBigInt} from 'graphql-scalars';
import {BasicTypeDef} from "./basicTypeDef.js";

@ObjectType()
class Contract extends BasicTypeDef {
    @Field(_ => GraphQLBigInt, {nullable: true})
    chain_id?: bigint | number | string;
    @Field({nullable: true})
    contract_address?: string;
    @Field(_ => GraphQLBigInt, {nullable: true})
    start_block?: bigint | number | null;
}


export {Contract}
