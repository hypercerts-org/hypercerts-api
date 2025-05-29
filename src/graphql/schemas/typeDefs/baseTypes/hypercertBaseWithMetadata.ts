import { ObjectType } from "type-graphql";

import { Field } from "type-graphql";
import { Metadata } from "../metadataTypeDefs.js";
import { HypercertBaseType } from "./hypercertBaseType.js";

@ObjectType({
  description:
    "Hypercert with metadata, contract, orders, sales and fraction information",
  simpleResolvers: true,
})
export class HypercertWithMetadata extends HypercertBaseType {
  // Resolved fields
  @Field(() => Metadata, {
    nullable: true,
    description: "The metadata for the hypercert as referenced by the uri",
  })
  metadata?: Metadata;
}
