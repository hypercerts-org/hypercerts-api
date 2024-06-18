import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLBigInt} from "graphql-scalars";
import GetAttestationsResponse from "../resolvers/attestationResolver.js";
import {EthBigInt} from "../../scalars/ethBigInt.js";
import {BasicTypeDef} from "./basicTypeDef.js";
import GetFractionsResponse from "../resolvers/fractionResolver.js";
import {Metadata} from "./metadataTypeDefs.js";
import {Contract} from "./contractTypeDefs.js";
import GetOrdersResponse from "../resolvers/orderResolver.js";

@ObjectType()
class Hypercert extends BasicTypeDef {
    // Hypercert table fields
    @Field((_) => ID, {nullable: true, description: "The UUID of the contract as stored in the database"})
    contracts_id?: string;
    @Field((_) => GraphQLBigInt, {
        nullable: true,
        description: "The block number at which the hypercert was stored on chain"
    })
    block_number?: bigint | number;
    @Field((_) => ID, {
        nullable: true,
        description: "Concatenation of [chainID]-[contractAddress]-[tokenID] to discern hypercerts across chains"
    })
    hypercert_id?: string;
    @Field((_) => GraphQLBigInt, {nullable: true})
    last_block_update_timestamp?: bigint | number;
    @Field({nullable: true, description: "The address of the creator of the hypercert"})
    creator_address?: string;
    @Field((_) => EthBigInt, {nullable: true, description: "The token ID of the hypercert"})
    token_id?: bigint | number;
    @Field((_) => EthBigInt, {nullable: true, description: "The total units held by the hypercert"})
    units?: bigint | number;
    @Field({nullable: true, description: "References the metadata for this claim"})
    uri?: string;

    // Resolved fields
    @Field((_) => Contract, {nullable: true, description: "The contract that the hypercert is associated with"})
    contract?: Contract;
    @Field((_) => Metadata, {nullable: true, description: "The metadata for the hypercert as referenced by the uri"})
    metadata?: Metadata;
    @Field((_) => GetFractionsResponse, {
        nullable: true,
        description: "Transferable fractions representing partial ownership of the hypercert"
    })
    fractions?: GetFractionsResponse;
    @Field((_) => GetAttestationsResponse, {
        nullable: true,
        description: "Attestations for the hypercert or parts of its data"
    })
    attestations?: GetAttestationsResponse;
    @Field((_) => GetOrdersResponse, {nullable: true, description: "Marketplace orders related to this hypercert"})
    orders?: GetOrdersResponse;
}

export {Hypercert};
