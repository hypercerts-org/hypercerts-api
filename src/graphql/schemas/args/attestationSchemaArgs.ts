import {ArgsType, Field} from "type-graphql";
import {AttestationSchemaFetchInput, AttestationSchemaWhereInput} from "../inputs/attestationSchemaInput.js";
import {PaginationArgs} from "./paginationArgs.js";

@ArgsType()
export class GetAttestationSchemaArgs extends PaginationArgs {
    @Field({nullable: true})
    where?: AttestationSchemaWhereInput;
    @Field({nullable: true})
    sort?: AttestationSchemaFetchInput;
}


@ArgsType()
export class GetAttestationSchemaBySchemaIdArgs {
    @Field()
    supported_schema_id?: string;
}