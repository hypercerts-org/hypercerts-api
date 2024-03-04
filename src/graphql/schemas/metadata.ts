import {buildHTTPExecutor} from "@graphql-tools/executor-http";
import {schemaFromExecutor} from "@graphql-tools/wrap";
import {supabaseApiKey, supabaseUrl} from "@/utils/constants";

const remoteExecutor = buildHTTPExecutor({
    endpoint: `${supabaseUrl}/graphql/v1`,
    headers: {
        apiKey: supabaseApiKey,
    },
});

export const metadataSubschema = {
    schema: await schemaFromExecutor(remoteExecutor),
    executor: remoteExecutor,
};
