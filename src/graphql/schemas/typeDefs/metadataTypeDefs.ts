import {Field, ID, ObjectType} from "type-graphql";
import {Json} from "../../../types/supabase.js";
import {GraphQLBigInt} from 'graphql-scalars';


@ObjectType()
class Metadata {
    @Field(_ => ID, {nullable: true})
    id?: string;
    @Field(_ => String, {nullable: true})
    name?: string | null;
    @Field(_ => String, {nullable: true})
    description?: string | null;
    @Field(_ => String, {nullable: true})
    image?: string | null;
    @Field(_ => String, {nullable: true})
    uri?: string | null;
    @Field(_ => String, {nullable: true})
    allow_list_uri?: string | null;
    @Field(_ => [String], {nullable: true})
    contributors?: string[] | null;
    @Field(_ => String, {nullable: true})
    external_url?: string | null;
    @Field(_ => [String], {nullable: true})
    impact_scope?: string[] | null;
    @Field(_ => GraphQLBigInt, {nullable: true})
    impact_timeframe_from?: bigint | number | null;
    @Field(_ => GraphQLBigInt, {nullable: true})
    impact_timeframe_to?: bigint | number | null;
    @Field(_ => String, {nullable: true})
    properties?: Json | null;
    @Field(_ => [String], {nullable: true})
    rights?: string[] | null;
    @Field(_ => [String], {nullable: true})
    work_scope?: string[] | null;
    @Field(_ => GraphQLBigInt, {nullable: true})
    work_timeframe_from?: bigint | number | null;
    @Field(_ => GraphQLBigInt, {nullable: true})
    work_timeframe_to?: bigint | number | null;
}


export {Metadata}
