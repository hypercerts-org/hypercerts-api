import { createYoga } from "graphql-yoga";
import { resolvers } from "../graphql/schemas/resolvers/composed.js";
import { buildSchema } from "type-graphql";
import { container } from "tsyringe";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { CONSTANTS } from "@hypercerts-org/sdk";
import { indexerEnvironment } from "../utils/constants.js";
import {
  useResponseCache,
  createInMemoryCache,
} from "@graphql-yoga/plugin-response-cache";

const defaultQuery = `{
  hypercerts(first: 10) {
    count
    data {
      contract {
        contract_address
      }
      hypercert_id
      fractions {
        count
        data {
          owner_address
        }
      }
      metadata {
        name
        description
      }
      sales {
        count
        data {
          transaction_hash
        }
      }
      units
    }
  }
}`;

export const cache = createInMemoryCache();

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
      ttl: 300_000,
      cache,
      idFields: ["id", "address", "chain_id"],
    }),
  ],
});

export const urqlClient = new Client({
  url: `${CONSTANTS.ENDPOINTS[indexerEnvironment as "production" | "test"]}/v1/graphql`,
  exchanges: [cacheExchange, fetchExchange],
});
