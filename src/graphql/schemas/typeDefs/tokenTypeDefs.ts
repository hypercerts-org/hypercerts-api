import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLBigInt} from "graphql-scalars";


@ObjectType()
class Token {
    @Field(type => ID)
    id!: string;
    @Field({nullable: true})
    owner_address?: `0x${string}`;
    @Field(type => String, {nullable: true})
    units?: bigint | number | null;
    @Field(type => ID, {nullable: true})
    contracts_id?: string;
}


export {Token}
