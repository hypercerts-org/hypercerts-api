import { assertExists } from "./src/utils";
import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

// TODO setup scripts and config to support .env.${NODE_ENV}
dotenv.config({ path: ".env.local" });

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "src/generated/metadata.ts": {
      schema: {
        "https://icidusuyshxkefjmqccr.supabase.co/graphql/v1": {
          headers: {
            apiKey: assertExists(process.env.SUPABASE_HC_METADATA_API_KEY),
          },
        },
      },
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
    },
    "src/generated/hypercerts.ts": {
      schema:
        "https://api.thegraph.com/subgraphs/name/hypercerts-admin/hypercerts-sepolia",
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
    },
    "src/generated/eas.ts": {
      schema: "https://easscan.org/graphql",
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
    },
  },
};

export default config;
