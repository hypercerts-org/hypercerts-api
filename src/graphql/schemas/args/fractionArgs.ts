import { EntityTypeDefs } from "../typeDefs/typeDefs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";
import { ArgsType } from "type-graphql";

const { WhereInput: FractionWhereInput, SortOptions: FractionSortOptions } =
  createEntityArgs("Fraction", {
    ...WhereFieldDefinitions.Fraction.fields,
    metadata: {
      type: "id",
      references: {
        entity: EntityTypeDefs.Metadata,
        fields: WhereFieldDefinitions.Metadata.fields,
      },
    },
  });

@ArgsType()
export class GetFractionsArgs extends BaseQueryArgs(
  FractionWhereInput,
  FractionSortOptions,
) {}

export { FractionSortOptions, FractionWhereInput };
