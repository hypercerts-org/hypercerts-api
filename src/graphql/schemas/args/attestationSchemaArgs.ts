import { EntityTypeDefs } from "../typeDefs/typeDefs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";
import { ArgsType } from "type-graphql";

const {
  WhereInput: AttestationSchemaWhereInput,
  SortOptions: AttestationSchemaSortOptions,
} = createEntityArgs("AttestationSchema", {
  ...WhereFieldDefinitions.AttestationSchema.fields,
  attestations: {
    type: "id",
    references: {
      entity: EntityTypeDefs.Attestation,
      fields: WhereFieldDefinitions.Attestation.fields,
    },
  },
});

@ArgsType()
export class GetAttestationSchemasArgs extends BaseQueryArgs(
  AttestationSchemaWhereInput,
  AttestationSchemaSortOptions,
) {}

export { AttestationSchemaSortOptions, AttestationSchemaWhereInput };
