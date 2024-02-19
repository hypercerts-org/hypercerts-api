import express, { Express, Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import dotenv from "dotenv";
import cors from "cors";
import http from "http";

dotenv.config({ path: ".env.local" });

import { gatewaySchema } from "./graphql/schemas/gateway";

const app: Express = express();

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);
const port = process.env.PORT || 3000;

const server = new ApolloServer({
  schema: gatewaySchema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Note you must call `start()` on the `ApolloServer`
// instance before passing the instance to `expressMiddleware`
await server.start();

app.use(
  "/v1/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server)
);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/v1/graphql", (req: Request, res: Response) => {
  res.send("Express + TypeScript + GraphQL Server");
});

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
