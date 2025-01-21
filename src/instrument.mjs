import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from "@sentry/profiling-node";

// Ensure to call this before importing any other modules!
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        nodeProfilingIntegration(),
    ],
    enabled:
        process.env.SENTRY_ENVIRONMENT === "production" ||
        process.env.SENTRY_ENVIRONMENT === "staging",

    // Add Performance Monitoring by setting tracesSampleRate
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});
