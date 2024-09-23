import { HypercertResolver } from "./hypercertResolver.js";
import { MetadataResolver } from "./metadataResolver.js";
import { ContractResolver } from "./contractResolver.js";
import { FractionResolver } from "./fractionResolver.js";
import { AttestationResolver } from "./attestationResolver.js";
import { AttestationSchemaResolver } from "./attestationSchemaResolver.js";
import { OrderResolver } from "./orderResolver.js";
import { CollectionResolver } from "./collectionResolver.js";
import { AllowlistRecordResolver } from "./allowlistRecordResolver.js";
import { SalesResolver } from "./salesResolver.js";
import { UserResolver } from "./userResolver.js";

export const resolvers = [
  ContractResolver,
  FractionResolver,
  MetadataResolver,
  HypercertResolver,
  AttestationResolver,
  AttestationSchemaResolver,
  OrderResolver,
  CollectionResolver,
  AllowlistRecordResolver,
  SalesResolver,
  UserResolver,
] as const;
