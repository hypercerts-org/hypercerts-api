import "./instrument.js";
import express, { type Express } from "express";
import "reflect-metadata";
import cors from "cors";
import { getRequiredEnvVar } from "./utils/envVars.js";
import { yoga } from "./client/graphql.js";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./__generated__/swagger.json" assert { type: "json" };
import { RegisterRoutes } from "./__generated__/routes/routes.js";
import * as Sentry from "@sentry/node";
import SignatureRequestProcessorCron from "./cron/SignatureRequestProcessing.js";
import OrderInvalidationCronjob from "./cron/OrderInvalidation.js";

// @ts-expect-error BigInt is not supported by JSON
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};

// @ts-expect-error BigInt is not supported by JSON
BigInt.prototype.fromJSON = function () {
  return BigInt(this.toString());
};

const PORT = getRequiredEnvVar("PORT");

const app: Express = express();

app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// Bind GraphQL Yoga to the graphql endpoint to avoid rendering the playground on any path
app.use(yoga.graphqlEndpoint, yoga);

app.use("/spec", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerJson);
});

RegisterRoutes(app);

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Start Safe signature request processing cron job
SignatureRequestProcessorCron.start();
OrderInvalidationCronjob.start();

app.listen(PORT, () => {
  console.log(
    `🕸️ Running a GraphQL API server at http://localhost:${PORT}/v1/graphql`,
  );

  console.log(`🚀 Running Swagger docs at http://localhost:${PORT}/spec`);
});
