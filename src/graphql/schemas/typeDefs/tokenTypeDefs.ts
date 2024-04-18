import {Field, ObjectType} from "type-graphql";
import {GraphQLBigInt} from "graphql-scalars";


@ObjectType()
class Token {
    @Field(type => String)
    id!: string;
    @Field({nullable: true})
    owner_address?: `0x${string}`;
    @Field(type => GraphQLBigInt, {nullable: true})
    units?: bigint | number | null;
    @Field(type => String, {nullable: true})
    contracts_id?: string;
}


export {Token}
