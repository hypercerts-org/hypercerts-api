import {Field, InputType, Int} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {BooleanSearchOptions, NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import {FetchParams} from "./fetchOptions.js";
import type {AttestationSchema} from "../typeDefs/attestationSchemaTypeDefs.js";

@InputType()
export class AttestationSchemaWhereInput implements WhereOptions<AttestationSchema> {
    @Field(_ => StringSearchOptions, {nullable: true})
    id?: StringSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    eas_schema_id?: StringSearchOptions | null;
    @Field(_ => NumberSearchOptions, {nullable: true})
    chain_id?: NumberSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    resolver?: NumberSearchOptions | null;
    @Field(_ => StringSearchOptions, {nullable: true})
    schema?: StringSearchOptions | null;
    @Field(_ => BooleanSearchOptions, {nullable: true})
    revocable?: BooleanSearchOptions | null;
}

@InputType()
export class AttestationSchemaFetchInput implements FetchParams {
    @Field(_ => Int, {nullable: true})
    offset = 0;
    @Field(_ => Int, {nullable: true})
    limit = 100;
}