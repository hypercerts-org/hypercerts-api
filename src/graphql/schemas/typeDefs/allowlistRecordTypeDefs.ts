import {Field, ObjectType} from "type-graphql";
import {GraphQLBigInt} from "graphql-scalars";
import {BasicTypeDef} from "./basicTypeDef.js";

@ObjectType({description: "Records of allow list entries for claimable fractions"})
class AllowlistRecord extends BasicTypeDef {
    @Field({nullable: true, description: "The hypercert ID the claimable fraction belongs to"})
    hypercert_id?: string;
    @Field({nullable: true, description: "The token ID of the hypercert"})
    token_id?: string;
    @Field({nullable: true, description: "The leaf of the Merkle tree for the claimable fraction"})
    leaf?: string;
    @Field({nullable: true, description: "The entry index of the Merkle tree for the claimable fraction"})
    entry?: number;
    @Field({nullable: true, description: "The address of the user who can claim the fraction"})
    user_address?: string;
    @Field({nullable: true, description: "Whether the fraction has been claimed"})
    claimed?: boolean;
    @Field(() => [String], {nullable: true, description: "The proof for the claimable fraction"})
    proof?: string[];
    @Field(() => GraphQLBigInt, {nullable: true, description: "The number of units of the claimable fraction"})
    units?: bigint | number;
    @Field(() => GraphQLBigInt, {nullable: true, description: "The total number of units held by the hypercert"})
    total_units?: bigint | number;
    @Field(() => String, {nullable: true, description: "The root of the allow list Merkle tree"})
    root?: string;
}

export {AllowlistRecord};