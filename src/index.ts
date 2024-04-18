import express, {Express, Request, Response} from "express";
import {createYoga} from "graphql-yoga";
import "reflect-metadata";

import {allowlistHandler} from "./handlers/v1/web3up/allowlist.js";
import {metadataHandler} from "./handlers/v1/web3up/metadata.js";

import cors from "cors";
import {assertExists} from "./utils/assertExists.js";
import {buildSchema} from "type-graphql";
import {resolvers} from "./graphql/schemas/resolvers/index.js";
import {container} from "tsyringe";
import path, {dirname} from "node:path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = assertExists(process.env.PORT, "PORT");

const app: Express = express();

app.use(cors());

const defaultQuery = `
  query {
    claims(first: 5) {
      id
      tokenID
      metadata {
        token_id
      }
    }
  }
`;

const yoga = createYoga({
    schema: await buildSchema({
        resolvers,
        // Registry 3rd party IOC container
        container: {get: cls => container.resolve(cls)},
        // Create 'schema.graphql' file with schema definition in current directory
        emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
    }),
    graphiql: {defaultQuery},
    cors: {
        methods: ["POST"],
    },
});

app.get("/", (req: Request, res: Response) => {
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
