import { createYoga } from "graphql-yoga";
import { resolvers } from "../graphql/schemas/resolvers/composed.js";
import { buildSchema } from "type-graphql";
import { container } from "tsyringe";
import { useResponseCache } from "@graphql-yoga/plugin-response-cache";
import { Client, cacheExchange, fetchExchange } from "@urql/core";
import { CONSTANTS } from "@hypercerts-org/sdk";
import { indexerEnvironment } from "../utils/constants.js";

const defaultQuery = `{
  hypercerts(count: COUNT, first: 10) {
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
      orders {
        count
        lowestAvailablePrice
      }
      units
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
  plugins: [],
});

export const urqlClient = new Client({
  url: `${CONSTANTS.ENDPOINTS[indexerEnvironment as "production" | "test"]}/v1/graphql`,
  exchanges: [cacheExchange, fetchExchange],
});
