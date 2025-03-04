import { ArgsType } from "type-graphql";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";

const { WhereInput: MetadataWhereInput, SortOptions: MetadataSortOptions } =
  createEntityArgs("Metadata", {
    ...WhereFieldDefinitions.Metadata.fields,
  });

@ArgsType()
export class GetMetadataArgs extends BaseQueryArgs(
  MetadataWhereInput,
  MetadataSortOptions,
) {}

export { MetadataSortOptions, MetadataWhereInput };
