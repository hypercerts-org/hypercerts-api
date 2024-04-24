import express, {type Express, type Request, type Response} from "express";
import {createYoga} from "graphql-yoga";
import "reflect-metadata";
import {useResponseCache} from '@graphql-yoga/plugin-response-cache'

import {allowlistHandler} from "./handlers/v1/web3up/allowlist.js";
import {metadataHandler} from "./handlers/v1/web3up/metadata.js";

import cors from "cors";
import {assertExists} from "./utils/assertExists.js";
import {buildSchema} from "type-graphql";
import {resolvers} from "./graphql/schemas/resolvers/composed.js";
import {container} from "tsyringe";

// @ts-expect-error BigInt is not supported by JSON
BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};

// @ts-expect-error BigInt is not supported by JSON
BigInt.prototype.fromJSON = function () {
    return BigInt(this.toString());
};

const PORT = assertExists(process.env.PORT, "PORT");

const app: Express = express();

app.use(cors());

const defaultQuery = `{
 hypercerts(page: {limit: 7}) {
    totalCount
    data {
      attestations {
        totalCount
        data {
          attestation
        }
      }
      contract {
        chain_id
        contract_address
      }
      fractions {
        owner_address
      }
      metadata {
        description
        name
      }
      units
      uri
    }
  }
}`;

//TODO ESlint runs with react config, remove NextJS traces
const yoga = createYoga({
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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useResponseCache({
            // global cache
            session: () => null
        })
    ]
});

app.get("/", (_: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.post("/api/v1/:dataToStore", (req: Request, res: Response) => {
    if (req.params.dataToStore === "allowlist") {
        console.log("allowlistHandler");
        return allowlistHandler(req, res);
    }

    if (req.params.dataToStore === "metadata") {
        console.log("metadataHandler");
        return metadataHandler(req, res);
    }

    return res.status(404).send("Not Found");
});

// Bind GraphQL Yoga to the graphql endpoint to avoid rendering the playground on any path
app.use(yoga.graphqlEndpoint, yoga);

app.listen(PORT, () => {
    console.log(
        `Running a GraphQL API server at http://localhost:${PORT}/graphql`
    );
});

console.log(`🚀 Server ready at http://localhost:${PORT}/`);
