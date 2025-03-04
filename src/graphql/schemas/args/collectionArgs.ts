import { EntityTypeDefs } from "../typeDefs/typeDefs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";
import { ArgsType } from "type-graphql";

const { WhereInput: CollectionWhereInput, SortOptions: CollectionSortOptions } =
  createEntityArgs("Collection", {
    ...WhereFieldDefinitions.Collection.fields,
    admins: {
      type: "id",
      references: {
        entity: EntityTypeDefs.User,
        fields: WhereFieldDefinitions.User.fields,
      },
    },
    hypercerts: {
      type: "id",
      references: {
        entity: EntityTypeDefs.Hypercert,
        fields: WhereFieldDefinitions.Hypercert.fields,
      },
    },
    blueprints: {
      type: "id",
      references: {
        entity: EntityTypeDefs.Blueprint,
        fields: WhereFieldDefinitions.Blueprint.fields,
      },
    },
  });

@ArgsType()
export class GetCollectionsArgs extends BaseQueryArgs(
  CollectionWhereInput,
  CollectionSortOptions,
) {}

export { CollectionSortOptions, CollectionWhereInput };
