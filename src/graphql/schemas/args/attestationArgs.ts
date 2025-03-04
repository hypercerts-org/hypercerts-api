import { EntityTypeDefs } from "../typeDefs/typeDefs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";
import { ArgsType } from "type-graphql";

const {
  WhereInput: AttestationWhereInput,
  SortOptions: AttestationSortOptions,
} = createEntityArgs("Attestation", {
  ...WhereFieldDefinitions.Attestation.fields,
  hypercert: {
    type: "id",
    references: {
      entity: EntityTypeDefs.Hypercert,
      fields: WhereFieldDefinitions.Hypercert.fields,
    },
  },
  eas_schema: {
    type: "id",
    references: {
      entity: EntityTypeDefs.AttestationSchema,
      fields: WhereFieldDefinitions.AttestationSchema.fields,
    },
  },
});

@ArgsType()
export class GetAttestationsArgs extends BaseQueryArgs(
  AttestationWhereInput,
  AttestationSortOptions,
) {}

export { AttestationSortOptions, AttestationWhereInput };
