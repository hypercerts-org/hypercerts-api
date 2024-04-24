import {ArgsType, Field} from "type-graphql";
import {AttestationSchemaFetchInput, AttestationSchemaWhereInput} from "../inputs/attestationSchemaInput.js";

@ArgsType()
export class GetAttestationSchemaArgs {
    @Field({nullable: true})
    where?: AttestationSchemaWhereInput;
    @Field({nullable: true})
    page?: AttestationSchemaFetchInput;
}


@ArgsType()
export class GetAttestationSchemaBySchemaIdArgs {
    @Field()
    supported_schema_id?: string;
}