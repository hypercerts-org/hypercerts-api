import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { schemaFromExecutor } from "@graphql-tools/wrap";
import { supabaseApiKey } from "@/utils/constants";

const remoteExecutor = buildHTTPExecutor({
  endpoint: "https://icidusuyshxkefjmqccr.supabase.co/graphql/v1",
  headers: {
    apiKey: supabaseApiKey,
  },
});

export const metadataSubschema = {
  schema: await schemaFromExecutor(remoteExecutor),
  executor: remoteExecutor,
};
