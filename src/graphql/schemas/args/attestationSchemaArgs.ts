import { ArgsType, Field, InputType } from "type-graphql";
import { AttestationSchemaFetchInput, BasicAttestationSchemaWhereInput } from "../inputs/attestationSchemaInput.js";
import { withPagination } from "./baseArgs.js";

@InputType()
export class AttestationSchemaWhereInput extends BasicAttestationSchemaWhereInput {
  @Field({ nullable: true })
  attestations?: BasicAttestationSchemaWhereInput;
}

@ArgsType()
export class AttestationSchemaArgs {
  @Field({ nullable: true })
  where?: AttestationSchemaWhereInput;
  @Field({ nullable: true })
  sort?: AttestationSchemaFetchInput;
}

@ArgsType()
export class GetAttestationSchemasArgs extends withPagination(AttestationSchemaArgs) {
}
