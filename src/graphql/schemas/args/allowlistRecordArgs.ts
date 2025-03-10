import { ArgsType } from "type-graphql";
import { BaseQueryArgs } from "../../../lib/graphql/BaseQueryArgs.js";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { EntityTypeDefs } from "../typeDefs/typeDefs.js";
import { WhereFieldDefinitions } from "../../../lib/graphql/whereFieldDefinitions.js";

const {
  WhereInput: AllowlistRecordWhereInput,
  SortOptions: AllowlistRecordSortOptions,
} = createEntityArgs("AllowlistRecord", {
  ...WhereFieldDefinitions.AllowlistRecord.fields,
  hypercert: {
    type: "id",
    references: {
      entity: EntityTypeDefs.Hypercert,
      fields: WhereFieldDefinitions.Hypercert.fields,
    },
  },
});

@ArgsType()
export class GetAllowlistRecordsArgs extends BaseQueryArgs(
  AllowlistRecordWhereInput,
  AllowlistRecordSortOptions,
) {}

export { AllowlistRecordSortOptions, AllowlistRecordWhereInput };
