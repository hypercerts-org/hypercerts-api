import { HypercertResolver } from "./hypercertResolver.js";
import { MetadataResolver } from "./metadataResolver.js";
import { ContractResolver } from "./contractResolver.js";
import { FractionResolver } from "./fractionResolver.js";
import { AttestationResolver } from "./attestationResolver.js";
import { AttestationSchemaResolver } from "./attestationSchemaResolver.js";
import { OrderResolver } from "./orderResolver.js";
import { CollectionResolver } from "./collectionResolver.js";

export const resolvers = [
  ContractResolver,
  FractionResolver,
  MetadataResolver,
  HypercertResolver,
  AttestationResolver,
  AttestationSchemaResolver,
  OrderResolver,
  CollectionResolver
] as const;
