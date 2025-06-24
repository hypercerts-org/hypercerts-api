import { GraphQLBigInt } from "graphql-scalars";
import { Field, ObjectType } from "type-graphql";
import { DataResponse } from "../../../lib/graphql/DataResponse.js";
import { GetAttestationsResponse } from "./attestationTypeDefs.js";
import { HypercertBaseType } from "./baseTypes/hypercertBaseType.js";
import { Contract } from "./contractTypeDefs.js";
import { Metadata } from "./metadataTypeDefs.js";
import { GetOrdersResponse, Order } from "./orderTypeDefs.js";
import { GetSalesResponse } from "./salesTypeDefs.js";
import { GetFractionsResponse } from "./fractionTypeDefs.js";
@ObjectType({
  description:
    "Hypercert with metadata, contract, orders, sales and fraction information",
})
class GetOrdersForHypercertResponse extends GetOrdersResponse {
  @Field(() => Order, { nullable: true })
  cheapestOrder?: Order;

  @Field(() => GraphQLBigInt, { nullable: true })
  totalUnitsForSale?: bigint;
}

@ObjectType({
  description:
    "Hypercert with metadata, contract, orders, sales and fraction information",
  simpleResolvers: true,
})
export class Hypercert extends HypercertBaseType {
  // Resolved fields
  @Field(() => Metadata, {
    nullable: true,
    description: "The metadata for the hypercert as referenced by the uri",
  })
  metadata?: Metadata;

  @Field(() => Contract, {
    nullable: true,
    description: "The contract that the hypercert is associated with",
  })
  contract?: Contract;

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

  @Field(() => GetOrdersForHypercertResponse, {
    nullable: true,
    description: "Marketplace orders related to this hypercert",
  })
  orders?: GetOrdersForHypercertResponse;

  @Field(() => GetSalesResponse, {
    nullable: true,
    description: "Sales related to this hypercert",
  })
  sales?: GetSalesResponse;
}

@ObjectType({
  description:
    "Hypercert with metadata, contract, orders, sales and fraction information",
})
export class GetHypercertsResponse extends DataResponse(Hypercert) {}

@ObjectType({
  description:
    "Hypercert without metadata, contract, orders, sales and fraction information",
})
export class HypercertsResponse extends DataResponse(HypercertBaseType) {}
