import {HypercertResolver} from "./hypercertResolver.js";
import {MetadataResolver} from "./metadataResolver.js";
import {ContractResolver} from "./contractResolver.js";
import {TokenResolver} from "./tokenResolver.js";

export const resolvers = [ContractResolver, TokenResolver, MetadataResolver, HypercertResolver] as const;