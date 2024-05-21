import { createYoga } from "graphql-yoga";
import {resolvers} from "../graphql/schemas/resolvers/composed.js";
import {buildSchema} from "type-graphql";
import {container} from "tsyringe";
import {useResponseCache} from "@graphql-yoga/plugin-response-cache";

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
        container: {get: cls => container.resolve(cls)},
        // Create 'schema.graphql' file with schema definition in current directory
        emitSchemaFile: true,
    }),
    graphiql: {defaultQuery},
    cors: {
        methods: ["POST"],
    },
    plugins: [
        useResponseCache({
            // global cache
            session: () => null
        })
    ]
});