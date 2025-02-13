import type { AttestationSchema } from "../typeDefs/attestationSchemaTypeDefs.js";
import { Attestation } from "../typeDefs/attestationTypeDefs.js";
import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";
import { WhereFieldDefinitions } from "./whereFieldDefinitions.js";

// @InputType()
// export class AttestationSchemaWhereInput extends BasicAttestationSchemaWhereInput {
//   @Field(() => BasicAttestationWhereInput, { nullable: true })
//   attestations?: BasicAttestationWhereInput;
// }

// @InputType()
// export class AttestationSchemaFetchInput
//   implements OrderOptions<AttestationSchema>
// {
//   @Field(() => AttestationSchemaSortOptions, { nullable: true })
//   by?: AttestationSchemaSortOptions;
// }

// @InputType()
// export class AttestationSchemaArgs {
//   @Field(() => AttestationSchemaWhereInput, { nullable: true })
//   where?: AttestationSchemaWhereInput;
//   @Field(() => AttestationSchemaFetchInput, { nullable: true })
//   sort?: AttestationSchemaFetchInput;
// }

// @ArgsType()
// export class GetAttestationSchemasArgs extends withPagination(
//   AttestationSchemaArgs,
// ) {}

const {
  WhereArgs: AttestationSchemaWhereArgs,
  EntitySortOptions: AttestationSchemaSortOptions,
  SortArgs: AttestationSchemaSortArgs,
} = createEntityArgs<AttestationSchema>("AttestationSchema", {
  chain_id: "number",
  uid: "id",
  resolver: "string",
  revocable: "boolean",
  schema: "string",
  records: {
    type: "id",
    references: {
      entity: Attestation,
      fields: WhereFieldDefinitions.Attestation.fields,
    },
  },
});

export const GetAttestationSchemasArgs = BaseQueryArgs(
  AttestationSchemaWhereArgs,
  AttestationSchemaSortArgs,
);

export type GetAttestationSchemasArgs = InstanceType<
  typeof GetAttestationSchemasArgs
>;

export {
  AttestationSchemaSortArgs,
  AttestationSchemaSortOptions,
  AttestationSchemaWhereArgs,
};
