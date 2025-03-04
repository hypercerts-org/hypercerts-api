import { EntityTypeDefs } from "../typeDefs/typeDefs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";
import { ArgsType } from "type-graphql";

const { SortOptions: HypercertSortOptions, WhereInput: HypercertWhereInput } =
  createEntityArgs("Hypercert", {
    ...WhereFieldDefinitions.Hypercert.fields,
    contract: {
      type: "id",
      references: {
        entity: EntityTypeDefs.Contract,
        fields: WhereFieldDefinitions.Contract.fields,
      },
    },
    metadata: {
      type: "id",
      references: {
        entity: EntityTypeDefs.Metadata,
        fields: WhereFieldDefinitions.Metadata.fields,
      },
    },
    attestations: {
      type: "id",
      references: {
        entity: EntityTypeDefs.Attestation,
        fields: WhereFieldDefinitions.Attestation.fields,
      },
    },
    fractions: {
      type: "id",
      references: {
        entity: EntityTypeDefs.Fraction,
        fields: WhereFieldDefinitions.Fraction.fields,
      },
    },
  });

@ArgsType()
export class GetHypercertsArgs extends BaseQueryArgs(
  HypercertWhereInput,
  HypercertSortOptions,
) {}

export { HypercertSortOptions, HypercertWhereInput };
