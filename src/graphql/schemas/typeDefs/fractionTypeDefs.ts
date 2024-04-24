import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLBigInt} from "graphql-scalars";

@ObjectType()
class Fraction {
    @Field(_ => ID)
    id?: string;
    @Field(_ => String, {nullable: true})
    owner_address?: string | null;
    @Field(_ => String, {nullable: true})
    units?: bigint | number | null;
    @Field(_ => ID, {nullable: true})
    claims_id?: string;
    @Field(_ => GraphQLBigInt, {nullable: true})
    creation_block_timestamp?: bigint | number | null;
    @Field(_ => GraphQLBigInt, {nullable: true})
    last_block_update_timestamp?: bigint | number | null;
    @Field(_ => String, {nullable: true})
    hypercert_id?: string | null;
}


export {Fraction}
