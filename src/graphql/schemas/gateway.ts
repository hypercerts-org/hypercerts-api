import { stitchSchemas } from "@graphql-tools/stitch";
import { delegateToSchema } from "@graphql-tools/delegate";

import { easSubschema } from "./eas.js";
import { hypercertsGraphSubschema } from "./hypercertsGraph.js";
import { metadataSubschema } from "./metadata.js";
import { OperationTypeNode } from "graphql";

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
    subschemas: [easSubschema, tokens, metadata],
    typeDefs: `
      extend type Claim {
        metadata: hypercerts
      }
    `,
    resolvers: {
      Claim: {
        metadata: {
          selectionSet: `{ tokenID }`, // Necessary for ensuring tokenID is fetched with the Claim
          resolve(claim, args, context, info) {
            const filter = {
              token_id: { eq: claim.tokenID },
            };

            

            return delegateToSchema({
              schema: metadata,
              operation: OperationTypeNode.QUERY,
              fieldName: "hypercertsCollection",
              args: {
                token_id: claim.tokenID,
              },
              context,
              info,
            });
          },
        },
      },
    },
  });
};

export { makeGatewaySchema };
