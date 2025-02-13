import { Blueprint } from "../typeDefs/blueprintTypeDefs.js";
import { Hypercert } from "../typeDefs/hypercertTypeDefs.js";
import { User } from "../typeDefs/userTypeDefs.js";
import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";
import { WhereFieldDefinitions } from "./whereFieldDefinitions.js";

// @InputType()
// export class BlueprintWhereInput extends BasicBlueprintWhereInput {}

// @InputType()
// export class BlueprintFetchInput implements OrderOptions<Blueprint> {
//   @Field(() => BlueprintSortOptions, { nullable: true })
//   by?: BlueprintSortOptions;
// }

// @ArgsType()
// export class BlueprintArgs {
//   @Field(() => BlueprintWhereInput, { nullable: true })
//   where?: BlueprintWhereInput;
//   @Field(() => BlueprintFetchInput, { nullable: true })
//   sort?: BlueprintFetchInput;
// }

// @ArgsType()
// export class GetBlueprintArgs extends withPagination(BlueprintArgs) {}

const {
  WhereArgs: BlueprintWhereArgs,
  EntitySortOptions: BlueprintSortOptions,
  SortArgs: BlueprintSortArgs,
} = createEntityArgs<Blueprint>("Blueprint", {
  id: "id",
  created_at: "string",
  minter_address: "string",
  minted: "boolean",
  admins: {
    type: "id",
    references: {
      entity: User,
      fields: WhereFieldDefinitions.User.fields,
    },
  },
  hypercerts: {
    type: "id",
    references: {
      entity: Hypercert,
      fields: WhereFieldDefinitions.Hypercert.fields,
    },
  },
});

export const GetBlueprintsArgs = BaseQueryArgs(
  BlueprintWhereArgs,
  BlueprintSortArgs,
);

export type GetBlueprintsArgs = InstanceType<typeof GetBlueprintsArgs>;

export { BlueprintSortArgs, BlueprintSortOptions, BlueprintWhereArgs };
