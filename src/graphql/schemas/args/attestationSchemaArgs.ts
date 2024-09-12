import { ArgsType, Field, InputType } from "type-graphql";
import { BasicAttestationSchemaWhereInput } from "../inputs/attestationSchemaInput.js";
import { withPagination } from "./baseArgs.js";
import type { OrderOptions } from "../inputs/orderOptions.js";
import type { AttestationSchema } from "../typeDefs/attestationSchemaTypeDefs.js";
import { AttestationSchemaSortOptions } from "../inputs/sortOptions.js";
import { BasicAttestationWhereInput } from "../inputs/attestationInput.js";

@InputType()
export class AttestationSchemaWhereInput extends BasicAttestationSchemaWhereInput {
  @Field(() => BasicAttestationWhereInput, { nullable: true })
  attestations?: BasicAttestationWhereInput;
}

@InputType()
export class AttestationSchemaFetchInput
  implements OrderOptions<AttestationSchema>
{
  @Field(() => AttestationSchemaSortOptions, { nullable: true })
  by?: AttestationSchemaSortOptions;
}

@InputType()
export class AttestationSchemaArgs {
  @Field(() => AttestationSchemaWhereInput, { nullable: true })
  where?: AttestationSchemaWhereInput;
  @Field(() => AttestationSchemaFetchInput, { nullable: true })
  sort?: AttestationSchemaFetchInput;
}

@ArgsType()
export class GetAttestationSchemasArgs extends withPagination(
  AttestationSchemaArgs,
) {}
