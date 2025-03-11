import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from "@sentry/profiling-node";

const env = process.env.SENTRY_ENVIRONMENT;

// Ensure to call this before importing any other modules!
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        nodeProfilingIntegration(),
    ],
    enabled:
        env === "production" ||
        env === "staging",

    // Add Performance Monitoring by setting tracesSampleRate
    tracesSampleRate: env === "production" ? 0.1 : 1.0,

    profilesSampleRate: env === "production" ? 0.1 : 1.0,
});
