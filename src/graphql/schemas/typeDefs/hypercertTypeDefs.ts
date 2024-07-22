import { Field, ObjectType } from "type-graphql";
import GetAttestationsResponse from "../resolvers/attestationResolver.js";
import GetFractionsResponse from "../resolvers/fractionResolver.js";
import { Metadata } from "./metadataTypeDefs.js";
import { Contract } from "./contractTypeDefs.js";
import GetOrdersResponse from "../resolvers/orderResolver.js";
import GetSalesResponse from "../resolvers/salesResolver.js";
import { HypercertBaseType } from "./hypercertBaseType.js";

@ObjectType()
class Hypercert extends HypercertBaseType {
  // Resolved fields
  @Field(() => Contract, {
    nullable: true,
    description: "The contract that the hypercert is associated with",
  })
  contract?: Contract;
  @Field(() => Metadata, {
    nullable: true,
    description: "The metadata for the hypercert as referenced by the uri",
  })
  metadata?: Metadata;
  @Field(() => GetFractionsResponse, {
    nullable: true,
    description:
      "Transferable fractions representing partial ownership of the hypercert",
  })
  fractions?: GetFractionsResponse;
  @Field(() => GetAttestationsResponse, {
    nullable: true,
    description: "Attestations for the hypercert or parts of its data",
  })
  attestations?: GetAttestationsResponse;
  @Field(() => GetOrdersResponse, {
    nullable: true,
    description: "Marketplace orders related to this hypercert",
  })
  orders?: GetOrdersResponse;

  @Field(() => GetSalesResponse, {
    nullable: true,
    description: "Sales related to this hypercert",
  })
  sales?: GetSalesResponse;
}

export { Hypercert };
