import {Field, InputType} from "type-graphql";
import type {WhereOptions} from "./whereOptions.js";
import {BooleanSearchOptions, NumberSearchOptions, StringSearchOptions} from "./searchOptions.js";
import type {AttestationSchema} from "../typeDefs/attestationSchemaTypeDefs.js";
import type {OrderOptions} from "./orderOptions.js";
import {AttestationSchemaSortOptions} from "./sortOptions.js";
import {AttestationSchemaSortKeys, SortOrder} from "../enums/sortEnums.js";

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
export class AttestationSchemaFetchInput implements OrderOptions<AttestationSchema> {
    @Field(_ => AttestationSchemaSortOptions, {nullable: true})
    by?: { schema?: AttestationSchemaSortKeys }
    @Field({nullable: true})
    order?: SortOrder
}