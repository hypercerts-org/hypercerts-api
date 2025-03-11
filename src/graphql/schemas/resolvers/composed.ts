import { HypercertResolver } from "../../../services/graphql/resolvers/hypercertResolver.js";
import { MetadataResolver } from "../../../services/graphql/resolvers/metadataResolver.js";
import { ContractResolver } from "../../../services/graphql/resolvers/contractResolver.js";
import { FractionResolver } from "../../../services/graphql/resolvers/fractionResolver.js";
import { AttestationResolver } from "../../../services/graphql/resolvers/attestationResolver.js";
import { AttestationSchemaResolver } from "../../../services/graphql/resolvers/attestationSchemaResolver.js";
import { OrderResolver } from "./orderResolver.js";
import { HyperboardResolver } from "./hyperboardResolver.js";
import { AllowlistRecordResolver } from "../../../services/graphql/resolvers/allowlistRecordResolver.js";
import { SalesResolver } from "../../../services/graphql/resolvers/salesResolver.js";
import { UserResolver } from "./userResolver.js";
import { BlueprintResolver } from "../../../services/graphql/resolvers/blueprintResolver.js";
import { SignatureRequestResolver } from "./signatureRequestResolver.js";
import { CollectionResolver } from "./collectionResolver.js";

export const resolvers = [
  ContractResolver,
  FractionResolver,
  MetadataResolver,
  HypercertResolver,
  AttestationResolver,
  AttestationSchemaResolver,
  OrderResolver,
  HyperboardResolver,
  AllowlistRecordResolver,
  SalesResolver,
  UserResolver,
  BlueprintResolver,
  SignatureRequestResolver,
  CollectionResolver,
] as const;
