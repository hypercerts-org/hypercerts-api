import { AttestationSchema } from "../typeDefs/attestationSchemaTypeDefs.js";
import type { Attestation } from "../typeDefs/attestationTypeDefs.js";
import { HypercertBaseType } from "../typeDefs/baseTypes/hypercertBaseType.js";
import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";
import { WhereFieldDefinitions } from "./whereFieldDefinitions.js";

// @InputType()
// class AttestationWhereInput extends BasicAttestationWhereInput {
//   @Field(() => BasicHypercertWhereArgs, { nullable: true })
//   hypercerts?: BasicHypercertWhereArgs;
//   @Field(() => BasicMetadataWhereInput, { nullable: true })
//   metadata?: BasicMetadataWhereInput;
//   @Field(() => BasicAttestationSchemaWhereInput, { nullable: true })
//   eas_schema?: BasicAttestationSchemaWhereInput;
// }

// @InputType()
// class AttestationFetchInput implements OrderOptions<Attestation> {
//   @Field(() => AttestationSortOptions, { nullable: true })
//   by?: AttestationSortOptions;
// }

// @ArgsType()
// class AttestationArgs {
//   @Field(() => AttestationWhereInput, { nullable: true })
//   where?: AttestationWhereInput;
//   @Field(() => AttestationFetchInput, { nullable: true })
//   sort?: AttestationFetchInput;
// }

// @ArgsType()
// export class GetAttestationsArgs extends withPagination(AttestationArgs) {}

const {
  WhereArgs: AttestationWhereArgs,
  EntitySortOptions: AttestationSortOptions,
  SortArgs: AttestationSortArgs,
} = createEntityArgs<Attestation>("Attestation", {
  uid: "id",
  creation_block_timestamp: "bigint",
  creation_block_number: "bigint",
  last_update_block_number: "bigint",
  last_update_block_timestamp: "bigint",
  attester: "string",
  recipient: "string",
  resolver: "string",
  schema_uid: "string",
  hypercert: {
    type: "id",
    references: {
      entity: HypercertBaseType,
      fields: WhereFieldDefinitions.Hypercert.fields,
    },
  },
  eas_schema: {
    type: "id",
    references: {
      entity: AttestationSchema,
      fields: WhereFieldDefinitions.AttestationSchema.fields,
    },
  },
});

export const GetAttestationsArgs = BaseQueryArgs(
  AttestationWhereArgs,
  AttestationSortArgs,
);
export type GetAttestationsArgs = InstanceType<typeof GetAttestationsArgs>;

export { AttestationSortArgs, AttestationSortOptions, AttestationWhereArgs };
