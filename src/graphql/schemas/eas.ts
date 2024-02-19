import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { schemaFromExecutor } from "@graphql-tools/wrap";

const remoteExecutor = buildHTTPExecutor({
  endpoint: "https://easscan.org/graphql",
});

export const easSubschema = {
  schema: await schemaFromExecutor(remoteExecutor),
  executor: remoteExecutor,
};
