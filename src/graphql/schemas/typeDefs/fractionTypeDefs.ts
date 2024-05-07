import {Field, ID, InputType, ObjectType} from "type-graphql";
import {GraphQLBigInt} from "graphql-scalars";
import {EthBigInt} from "../../scalars/ethBigInt.js";

@ObjectType()
class Fraction {
    @Field(_ => ID)
    id?: string;
    @Field({nullable: true})
    owner_address?: string;
    @Field(_ => EthBigInt, {nullable: true})
    units?: bigint | number;
    @Field(_ => ID, {nullable: true})
    claims_id?: string;
    @Field(_ => GraphQLBigInt, {nullable: true})
    creation_block_timestamp?: bigint | number;
    @Field(_ => GraphQLBigInt, {nullable: true})
    last_block_update_timestamp?: bigint | number;
    @Field({nullable: true})
    hypercert_id?: string;
}


export {Fraction}
