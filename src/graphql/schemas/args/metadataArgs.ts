import { ArgsType } from "type-graphql";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";
import { EntityTypeDefs } from "../typeDefs/typeDefs.js";

const { WhereInput: MetadataWhereInput, SortOptions: MetadataSortOptions } =
  createEntityArgs("Metadata", {
    ...WhereFieldDefinitions.Metadata.fields,
    hypercert: {
      type: "id",
      references: {
        entity: EntityTypeDefs.Hypercert,
        fields: WhereFieldDefinitions.Hypercert.fields,
      },
    },
  });

@ArgsType()
export class GetMetadataArgs extends BaseQueryArgs(
  MetadataWhereInput,
  MetadataSortOptions,
) {}

export { MetadataSortOptions, MetadataWhereInput };
