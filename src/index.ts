import express, { Express, Request, Response } from "express";
import { createYoga } from "graphql-yoga";

import { makeGatewaySchema } from "./graphql/schemas";
import { allowlistHandler } from "./handlers/v1/web3up/allowlist";
import { metadataHandler } from "./handlers/v1/web3up/metadata";

import cors from "cors";

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
  schema: await makeGatewaySchema(),
  graphiql: { defaultQuery },
  cors: {
    origin: "http://localhost:4000",
    credentials: true,
    allowedHeaders: ["X-Custom-Header"],
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

app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});

console.log(`🚀 Server ready at http://localhost:4000/`);
