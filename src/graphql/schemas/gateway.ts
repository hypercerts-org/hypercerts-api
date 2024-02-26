import { stitchSchemas } from "@graphql-tools/stitch";

import { easSubschema } from "./eas.js";
import { hypercertsGraphSubschema } from "./hypercertsGraph.js";
import { metadataSubschema } from "./metadata.js";
import { supabase } from "@/client/supabase.js";

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
          selectionSet: `{ tokenID, contract }`, // Necessary for ensuring tokenID is fetched with the Claim
          resolve: async (claim, args, context, info) => {
            const { data } = await supabase
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

export { makeGatewaySchema };
