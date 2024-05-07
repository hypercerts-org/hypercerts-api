import {Field, ID, ObjectType} from "type-graphql";
import {Metadata} from "./metadataTypeDefs.js";
import type {Database} from "../../../types/supabase.js";
import {GraphQLBigInt} from "graphql-scalars";
import {Contract} from "./contractTypeDefs.js";
import {Fraction} from "./fractionTypeDefs.js";
import GetAttestationsResponse from "../resolvers/attestationResolver.js";
import {EthBigInt} from "../../scalars/ethBigInt.js";


@ObjectType()
class Hypercert {
    @Field(_ => ID, {nullable: true})
    id?: string;
    @Field({nullable: true})
    contracts_id?: string;
    @Field(_ => Metadata, {nullable: true})
    metadata?: Metadata;
    @Field(_ => Contract, {nullable: true})
    contracts?: Contract;
    @Field(_ => GetAttestationsResponse, {nullable: true})
    attestations?: GetAttestationsResponse;
    @Field(_ => [Fraction], {nullable: true})
    fractions?: Fraction[];
    @Field({nullable: true})
    uri?: string;

    @Field(_ => GraphQLBigInt, {nullable: true})
    creation_block_timestamp?: bigint | number;
    @Field({nullable: true})
    hypercert_id?: string;
    @Field(_ => GraphQLBigInt, {nullable: true})
    last_block_update_timestamp?: bigint | number;
    @Field({nullable: true})
    owner_address?: string;
    @Field(_ => EthBigInt, {nullable: true})
    token_id?: bigint | number;
    @Field(_ => String, {nullable: true})
    type?: Database["public"]["Enums"]["token_type"];
    @Field(_ => EthBigInt, {nullable: true})
    units?: bigint | number;
}


export {Hypercert}
