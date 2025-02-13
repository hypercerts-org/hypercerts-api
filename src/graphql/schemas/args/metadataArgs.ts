import { Metadata } from "../typeDefs/metadataTypeDefs.js";
import { createEntityArgs } from "./argGenerator.js";
import { BaseQueryArgs } from "./baseArgs.js";

// @InputType()
// export class MetadataWhereInput extends BasicMetadataWhereInput {
//   @Field(() => BasicHypercertWhereArgs, { nullable: true })
//   hypercerts?: BasicHypercertWhereArgs;
// }

// @InputType()
// export class MetadataFetchInput implements OrderOptions<Metadata> {
//   @Field(() => MetadataSortOptions, { nullable: true })
//   by?: MetadataSortOptions;
// }

// @ArgsType()
// export class MetadataArgs {
//   @Field(() => MetadataWhereInput, { nullable: true })
//   where?: MetadataWhereInput;
//   @Field(() => MetadataFetchInput, { nullable: true })
//   sort?: MetadataFetchInput;
// }

// @ArgsType()
// export class GetMetadataArgs extends withPagination(MetadataArgs) {}

const {
  WhereArgs: MetadataWhereArgs,
  EntitySortOptions: MetadataSortOptions,
  SortArgs: MetadataSortArgs,
} = createEntityArgs<Metadata>("Metadata", {
  id: "id",
  name: "string",
  description: "string",
  uri: "string",
  allow_list_uri: "string",
  contributors: "stringArray",
  external_url: "string",
  impact_scope: "stringArray",
  rights: "stringArray",
  work_scope: "stringArray",
  work_timeframe_from: "bigint",
  work_timeframe_to: "bigint",
  impact_timeframe_from: "bigint",
  impact_timeframe_to: "bigint",
});

export const GetMetadataArgs = BaseQueryArgs(
  MetadataWhereArgs,
  MetadataSortArgs,
);
export type GetMetadataArgs = InstanceType<typeof GetMetadataArgs>;

export { MetadataSortArgs, MetadataSortOptions, MetadataWhereArgs };
