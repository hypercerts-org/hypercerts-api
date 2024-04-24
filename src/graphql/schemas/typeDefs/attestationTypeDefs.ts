import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLBigInt, GraphQLJSON} from 'graphql-scalars';
import type {Json} from "../../../types/supabase.js";
import {Hypercert} from "./hypercertTypeDefs.js";

@ObjectType()
class Attestation {
    @Field(_ => ID, {nullable: true})
    id?: string;
    @Field(_ => ID, {nullable: true})
    supported_schemas_id?: string | null;
    @Field(_ => ID, {nullable: true})
    attestation_uid?: string | null;
    @Field(_ => GraphQLBigInt, {nullable: true})
    block_timestamp?: bigint | number | string | null;

    @Field(_ => String, {nullable: true})
    attester_address?: string | null;
    @Field(_ => String, {nullable: true})
    recipient_address?: string | null;
    @Field(_ => String, {nullable: true})
    resolver?: string | null;
    @Field(_ => String, {nullable: true})
    schema?: string | null;
    @Field(_ => GraphQLJSON, {nullable: true})
    attestation?: Json | null;

    @Field(_ => [Hypercert], {nullable: true})
    hypercerts?: Hypercert[] | null;
}


export {Attestation}
