import { ArgsType, Field, InputType } from "type-graphql";
import {
  AttestationSchemaFetchInput,
  BasicAttestationSchemaWhereInput,
} from "../inputs/attestationSchemaInput.js";
import { PaginationArgs } from "./paginationArgs.js";

@InputType()
export class AttestationSchemaWhereInput extends BasicAttestationSchemaWhereInput {
  @Field({ nullable: true })
  attestations?: BasicAttestationSchemaWhereInput;
}

@ArgsType()
export class GetAttestationSchemaArgs extends PaginationArgs {
  @Field({ nullable: true })
  where?: AttestationSchemaWhereInput;
  @Field({ nullable: true })
  sort?: AttestationSchemaFetchInput;
}

@ArgsType()
export class GetAttestationSchemaBySchemaIdArgs {
  @Field()
  supported_schema_id?: string;
}
