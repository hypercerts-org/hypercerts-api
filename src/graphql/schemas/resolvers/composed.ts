import {HypercertResolver} from "./hypercertResolver.js";
import {MetadataResolver} from "./metadataResolver.js";
import {ContractResolver} from "./contractResolver.js";
import {FractionResolver} from "./fractionResolver.js";
import {AttestationResolver} from "./attestationResolver.js";
import {AttestationSchemaResolver} from "./attestationSchemaResolver.js";

export const resolvers = [ContractResolver, FractionResolver, MetadataResolver, HypercertResolver, AttestationResolver, AttestationSchemaResolver] as const;