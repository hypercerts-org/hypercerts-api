import { EntityTypeDefs } from "../typeDefs/typeDefs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";
import { ArgsType } from "type-graphql";

const { WhereInput: BlueprintWhereInput, SortOptions: BlueprintSortOptions } =
  createEntityArgs("Blueprint", {
    ...WhereFieldDefinitions.Blueprint.fields,
    admins: {
      type: "id",
      references: {
        entity: EntityTypeDefs.User,
        fields: WhereFieldDefinitions.User.fields,
      },
    },
  });

@ArgsType()
export class GetBlueprintsArgs extends BaseQueryArgs(
  BlueprintWhereInput,
  BlueprintSortOptions,
) {}

export { BlueprintSortOptions, BlueprintWhereInput };
