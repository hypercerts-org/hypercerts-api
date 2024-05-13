import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLBigInt, GraphQLJSON} from 'graphql-scalars';
import type {Json} from "../../../types/supabase.js";
import {Hypercert} from "./hypercertTypeDefs.js";
import {BasicTypeDef} from "./basicTypeDef.js";

@ObjectType()
class Attestation extends BasicTypeDef {
    @Field(_ => ID, {nullable: true})
    supported_schemas_id?: string;
    @Field(_ => ID, {nullable: true})
    attestation_uid?: string;
    @Field(_ => GraphQLBigInt, {nullable: true})
    block_timestamp?: bigint | number | string;

    @Field({nullable: true})
    attester_address?: string;
    @Field({nullable: true})
    recipient_address?: string;
    @Field({nullable: true})
    resolver?: string;
    @Field({nullable: true})
    schema?: string;
    @Field(_ => GraphQLJSON, {nullable: true})
    attestation?: Json;

    @Field(_ => [Hypercert], {nullable: true})
    hypercerts?: Hypercert[];
}


export {Attestation}
