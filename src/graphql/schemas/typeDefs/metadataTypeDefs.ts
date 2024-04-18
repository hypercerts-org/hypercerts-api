import {Field, ID, ObjectType} from "type-graphql";
import {Json, Tables} from "../../../types/supabase.js";
import {GraphQLBigInt} from 'graphql-scalars';


@ObjectType()
class Metadata {
    @Field(type => ID)
    id!: string;
    @Field(type => String, {nullable: true})
    name?: string | null;
    @Field(type => String, {nullable: true})
    description?: string | null;
    @Field(type => String, {nullable: true})
    image?: string | null;
    @Field(type => String, {nullable: true})
    uri?: string | null;
    @Field(type => String, {nullable: true})
    allow_list_uri?: string | null;
    @Field(type => [String], {nullable: true})
    contributors?: string[] | null;
    @Field(type => String, {nullable: true})
    external_url?: string | null;
    @Field(type => [String], {nullable: true})
    impact_scope?: string[] | null;
    @Field(type => GraphQLBigInt, {nullable: true})
    impact_timeframe_from?: bigint | number | null;
    @Field(type => GraphQLBigInt, {nullable: true})
    impact_timeframe_to?: bigint | number | null;
    @Field(type => String, {nullable: true})
    properties?: Json | null;
    @Field(type => [String], {nullable: true})
    rights?: string[] | null;
    @Field(type => [String], {nullable: true})
    work_scope?: string[] | null;
    @Field(type => GraphQLBigInt, {nullable: true})
    work_timeframe_from?: bigint | number | null;
    @Field(type => GraphQLBigInt, {nullable: true})
    work_timeframe_to?: bigint | number | null;
}


export {Metadata}
