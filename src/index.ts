import './instrument.js';
import express, {type Express, Router} from "express";
import "reflect-metadata";
import cors from "cors";
import {assertExists} from "./utils/assertExists.js";
import {yoga} from "./client/graphql.js";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./__generated__/swagger.json" assert {type: "json"}
import {RegisterRoutes} from "./__generated__/routes/routes.js";
import bodyParser from "body-parser";
import * as Sentry from '@sentry/node';

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

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/health', (req, res) => {
    const data = {
        uptime: process.uptime(),
        message: 'OK',
        date: new Date()
    }

    res.status(200).send(data);
});

// Bind GraphQL Yoga to the graphql endpoint to avoid rendering the playground on any path
app.use(yoga.graphqlEndpoint, yoga);

app.use(
    "/spec",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJson)
);

RegisterRoutes(app);

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(
        `🕸️ Running a GraphQL API server at http://localhost:${PORT}/graphql`
    );

    console.log(`🚀 Running Swagger docs at http://localhost:${PORT}/`);

});

