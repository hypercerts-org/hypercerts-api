import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLBigInt} from "graphql-scalars";
import {EthBigInt} from "../../scalars/ethBigInt.js";
import {BasicTypeDef} from "./basicTypeDef.js";
import GetOrdersResponse from "../resolvers/orderResolver.js";
import {Metadata} from "./metadataTypeDefs.js";

@ObjectType()
class Fraction extends BasicTypeDef {
    @Field({nullable: true, description: "Address of the owner of the fractions"})
    owner_address?: string;
    @Field((_) => EthBigInt, {nullable: true, "Units held by the fraction"})
    units?: bigint | number;
    @Field((_) => GraphQLBigInt, {nullable: true})
    creation_block_timestamp?: bigint | number;
    @Field((_) => GraphQLBigInt, {nullable: true})
    last_block_update_timestamp?: bigint | number;
    @Field((_) => ID, {
        name: "fraction_id",
        nullable: true,
        description: "The ID of the fraction concatenated from the chain ID, contract address, and token ID"
    })
    hypercert_id?: string;

    // Resolved fields
    @Field(() => GetOrdersResponse, {nullable: true, description: "Marketplace orders related to this fraction"})
    orders?: GetOrdersResponse;
    @Field(() => Metadata, {nullable: true, description: "The metadata for the fraction"})
    metadata?: Metadata;
}

export {Fraction};
