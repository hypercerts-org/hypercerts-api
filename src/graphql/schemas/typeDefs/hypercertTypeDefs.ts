import {Field, ObjectType} from "type-graphql";
import {Metadata} from "./metadataTypeDefs.js";
import {Database, Tables} from "../../../types/supabase.js";
import {GraphQLBigInt} from "graphql-scalars";
import {Contract} from "./contractTypeDefs.js";
import {Token} from "./tokenTypeDefs.js";

@ObjectType()
class Hypercert {
    @Field()
    id!: string;
    @Field(type => Metadata, {nullable: true})
    metadata?: Metadata;
    @Field(type => Contract)
    contract?: Contract;
    // @Field(type => [Token])
    // fractions?: [Token];
    @Field(type => String, {nullable: true})
    uri?: string | null;

    @Field(type => GraphQLBigInt, {nullable: true})
    creation_block_timestamp?: bigint | number | null;
    @Field(type => String, {nullable: true})
    hypercert_id?: string | null;
    @Field(type => GraphQLBigInt, {nullable: true})
    last_block_update_timestamp?: bigint | number | null;
    @Field(type => String, {nullable: true})
    owner_address?: string | null;
    @Field(type => GraphQLBigInt, {nullable: true})
    token_id?: bigint | number;
    @Field(type => String, {nullable: true})
    type?: Database["public"]["Enums"]["token_type"] | null;
    @Field(type => GraphQLBigInt, {nullable: true})
    units?: bigint | number | null;
}


export {Hypercert}
