import { createYoga } from "graphql-yoga";
import { resolvers } from "../graphql/schemas/resolvers/composed.js";
import { buildSchema } from "type-graphql";
import { container } from "tsyringe";
import { useResponseCache } from "@graphql-yoga/plugin-response-cache";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { CONSTANTS } from "@hypercerts-org/sdk";
import { indexerEnvironment } from "../utils/constants.js";

const defaultQuery = `{
    hypercerts(
    sort: {by: {claim_attestation_count: descending}}
    count: COUNT
    first: 10
  ) {
    count
    data {
      hypercert_id
      contract {
          chain_id
      }
      metadata {
          name
      }
      attestations {
        count
        data {
          data 
        }
      }
      units
      uri
    }
  } 
}`;

export const yoga = createYoga({
  schema: await buildSchema({
    resolvers,
    // Registry 3rd party IOC container
    container: { get: (cls) => container.resolve(cls) },
    // Create 'schema.graphql' file with schema definition in current directory
    emitSchemaFile: true,
  }),
  graphiql: { defaultQuery },
  cors: {
    methods: ["POST"],
  },
  graphqlEndpoint: "/v1/graphql",
  plugins: [
    useResponseCache({
      // global cache
      session: () => null,
    }),
  ],
});

export const urqlClient = new Client({
  url: CONSTANTS.ENDPOINTS[indexerEnvironment as "production" | "test"],
  exchanges: [cacheExchange, fetchExchange],
});
