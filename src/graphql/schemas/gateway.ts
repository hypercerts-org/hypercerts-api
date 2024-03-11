import {stitchSchemas} from "@graphql-tools/stitch";
import {delegateToSchema} from '@graphql-tools/delegate'

import {hypercertsGraphSubschema} from "./hypercertsGraph.js";
import {metadataSubschema} from "./metadata.js";
import {supabase} from "@/client/supabase.js";
import {OperationTypeNode} from "graphql";

const metadata = {
    ...metadataSubschema,
    batch: true,
};

const tokens = {
    ...hypercertsGraphSubschema,
    batch: true,
};

const makeGatewaySchema = async () => {
    return stitchSchemas({
        subschemas: [tokens, metadata],
        typeDefs: `
      extend type Claim {
        metadata: hypercerts
      }
      extend type hypercerts {
        claim: Claim 
        tokens: [ClaimToken]
        attestations: [attestations]
      }
      type Query {
        hypercerts_total: Int
        attestations_total: Int
      }
    `,
        resolvers: {
            Query: {
                hypercerts_total: {
                    resolve: async () => {
                        const {count} = await supabase
                            .from("hypercerts")
                            .select('*', {count: 'exact', head: true})
                        return count;
                    }
                },
                attestations_total: {
                    resolve: async () => {
                        const {count} = await supabase
                            .from("attestations")
                            .select('*', {count: 'exact', head: true})
                        return count;
                    }
                }
            },
            hypercerts: {
                attestations: {
                    selectionSet: `{ hypercert_contract }`,
                    resolve: async (root, args, context, info) => {
                        return await delegateToSchema({
                            schema: tokens,
                            operation: OperationTypeNode.QUERY,
                            fieldName: 'attestations',
                            args: {where: {tokenID: root.token_id, contract: root.contract_address}},
                            context,
                            info
                        })
                    }
                },
                claim: {
                    selectionSet: `{ hypercert_contract }`,
                    resolve: async (root, args, context, info) => {
                        const res = await delegateToSchema({
                            schema: tokens,
                            operation: OperationTypeNode.QUERY,
                            fieldName: 'claims',
                            args: {where: {tokenID: root.token_id, contract: root.contract_address}},
                            context,
                            info
                        })

                        return res[0];

                    }
                },
                tokens: {
                    selectionSet: `{ hypercert_contract }`,
                    resolve: async (root, args, context, info) => {
                        return await delegateToSchema({
                            schema: tokens,
                            operation: OperationTypeNode.QUERY,
                            fieldName: 'claimTokens',
                            args: {where: {claim_: {tokenID: root.token_id, contract: root.contract_address}}},
                            context,
                            info
                        })
                    }
                }
            },
            Claim: {
                metadata: {
                    selectionSet: `{ tokenID, contract }`, // Necessary for ensuring tokenID is fetched with the Claim
                    resolve: async (claim) => {
                        const {data} = await supabase
                            .from("hypercerts")
                            .select("*")
                            .eq("token_id", claim.tokenID)
                            .eq("contract_address", claim.contract)
                            .select();

                        if (data === null || data.length === 0) {
                            return null;
                        }

                        // Hack because metadata returns a float (e.g. tokenID 1020847100762815390390123822295304634368 becomes token_id "1.0208471007628154e+39" )
                        data[0].token_id = claim.tokenID;

                        // return data;
                        return data[0];
                    },
                },
            },
        },
    });
};

export {makeGatewaySchema};
