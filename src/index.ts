import express, { Express, Request, Response } from "express";
import { createYoga } from "graphql-yoga";

import { makeGatewaySchema } from "./graphql/schemas";
import { allowlistHandler } from "./handlers/v1/web3up/allowlist";
import { metadataHandler } from "./handlers/v1/web3up/metadata";

import cors from "cors";
import { assertExists } from "./utils";

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
  schema: await makeGatewaySchema(),
  graphiql: { defaultQuery },
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