import {Field, ID, ObjectType} from "type-graphql";
import {Metadata} from "./metadataTypeDefs.js";
import {Database} from "../../../types/supabase.js";
import {GraphQLBigInt} from "graphql-scalars";
import {Contract} from "./contractTypeDefs.js";

@ObjectType()
class Hypercert {
    @Field(_ => ID, {nullable: true})
    id?: string;
    @Field(_ => String, {nullable: true})
    contracts_id?: string;
    @Field(_ => Metadata, {nullable: true})
    metadata?: Metadata;
    @Field(_ => Contract, {nullable: true})
    contract?: Contract;
    @Field(_ => String, {nullable: true})
    uri?: string | null;

    @Field(_ => GraphQLBigInt, {nullable: true})
    creation_block_timestamp?: bigint | number | null;
    @Field(_ => String, {nullable: true})
    hypercert_id?: string | null;
    @Field(_ => GraphQLBigInt, {nullable: true})
    last_block_update_timestamp?: bigint | number | null;
    @Field(_ => String, {nullable: true})
    owner_address?: string | null;
    @Field(_ => String, {nullable: true})
    token_id?: bigint | string | null;
    @Field(_ => String, {nullable: true})
    type?: Database["public"]["Enums"]["token_type"] | null;
    @Field(_ => String, {nullable: true})
    units?: bigint | string | null;
}


export {Hypercert}
