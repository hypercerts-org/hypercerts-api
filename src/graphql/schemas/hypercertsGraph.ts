import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { schemaFromExecutor } from "@graphql-tools/wrap";

const remoteExecutor = buildHTTPExecutor({
  endpoint:
    "https://api.thegraph.com/subgraphs/name/hypercerts-admin/hypercerts-sepolia",
});

export const hypercertsGraphSubschema = {
  schema: await schemaFromExecutor(remoteExecutor),
  executor: remoteExecutor,
};
