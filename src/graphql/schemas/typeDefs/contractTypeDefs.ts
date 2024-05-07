import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLBigInt} from 'graphql-scalars';

@ObjectType()
class Contract {
    @Field(_ => ID, {nullable: true})
    id?: string;
    @Field(_ => GraphQLBigInt, {nullable: true})
    chain_id?: bigint | number | string;
    @Field({nullable: true})
    contract_address?: string;
    @Field(_ => GraphQLBigInt, {nullable: true})
    start_block?: bigint | number | null;
}


export {Contract}
