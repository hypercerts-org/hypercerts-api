import { Collection } from "../typeDefs/collectionTypeDefs.js";

import { Blueprint } from "../typeDefs/blueprintTypeDefs.js";
import { Hypercert } from "../typeDefs/hypercertTypeDefs.js";
import { User } from "../typeDefs/userTypeDefs.js";
import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";
import { WhereFieldDefinitions } from "./whereFieldDefinitions.js";

// @InputType()
// export class CollectionWhereInput extends BasicCollectionWhereInput {}

// @InputType()
// export class CollectionFetchInput implements OrderOptions<Collection> {
//   @Field(() => CollectionSortOptions, { nullable: true })
//   by?: CollectionSortOptions;
// }

// @ArgsType()
// export class CollectionArgs {
//   @Field(() => CollectionWhereInput, { nullable: true })
//   where?: CollectionWhereInput;
//   @Field(() => CollectionFetchInput, { nullable: true })
//   sort?: CollectionFetchInput;
// }

// @ArgsType()
// export class GetCollectionsArgs extends withPagination(CollectionArgs) {}

const {
  WhereArgs: CollectionWhereArgs,
  EntitySortOptions: CollectionSortOptions,
  SortArgs: CollectionSortArgs,
} = createEntityArgs<Collection>("Collection", {
  id: "id",
  name: "string",
  description: "string",
  created_at: "string",
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
  blueprints: {
    type: "id",
    references: {
      entity: Blueprint,
      fields: WhereFieldDefinitions.Blueprint.fields,
    },
  },
});

export const GetCollectionsArgs = BaseQueryArgs(
  CollectionWhereArgs,
  CollectionSortArgs,
);

export type GetCollectionsArgs = InstanceType<typeof GetCollectionsArgs>;

export { CollectionSortArgs, CollectionSortOptions, CollectionWhereArgs };
