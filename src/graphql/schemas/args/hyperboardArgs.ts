import { EntityTypeDefs } from "../typeDefs/typeDefs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";
import { ArgsType } from "type-graphql";

const { WhereInput: HyperboardWhereInput, SortOptions: HyperboardSortOptions } =
  createEntityArgs("Hyperboard", {
    ...WhereFieldDefinitions.Hyperboard.fields,
    collections: {
      type: "id",
      references: {
        entity: EntityTypeDefs.Collection,
        fields: WhereFieldDefinitions.Collection.fields,
      },
    },
    admins: {
      type: "id",
      references: {
        entity: EntityTypeDefs.User,
        fields: WhereFieldDefinitions.User.fields,
      },
    },
  });

@ArgsType()
export class GetHyperboardsArgs extends BaseQueryArgs(
  HyperboardWhereInput,
  HyperboardSortOptions,
) {}

export { HyperboardSortOptions, HyperboardWhereInput };
