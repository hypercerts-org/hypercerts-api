import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLBigInt} from "graphql-scalars";
import GetAttestationsResponse from "../resolvers/attestationResolver.js";
import {EthBigInt} from "../../scalars/ethBigInt.js";
import {BasicTypeDef} from "./basicTypeDef.js";
import GetFractionsResponse from "../resolvers/fractionResolver.js";
import {Metadata} from "./metadataTypeDefs.js";
import {Contract} from "./contractTypeDefs.js";


@ObjectType()
class Hypercert extends BasicTypeDef {


    // Hypercert table fields
    @Field(_ => ID, {nullable: true})
    contracts_id?: string;
    @Field(_ => GraphQLBigInt, {nullable: true})
    creation_block_timestamp?: bigint | number;
    @Field(_ => ID, {nullable: true})
    hypercert_id?: string;
    @Field(_ => GraphQLBigInt, {nullable: true})
    last_block_update_timestamp?: bigint | number;
    @Field({nullable: true})
    owner_address?: string;
    @Field(_ => EthBigInt, {nullable: true})
    token_id?: bigint | number;
    @Field(_ => EthBigInt, {nullable: true})
    units?: bigint | number;
    @Field({nullable: true})
    uri?: string;

    // Resolved fields
    @Field(_ => Contract, {nullable: true})
    contract?: Contract;
    @Field(_ => Metadata, {nullable: true})
    metadata?: Metadata;
    @Field(_ => GetFractionsResponse, {nullable: true})
    fractions?: GetFractionsResponse;
    @Field(_ => GetAttestationsResponse, {nullable: true})
    attestations?: GetAttestationsResponse;
}


export {Hypercert}
