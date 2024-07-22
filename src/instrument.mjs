import * as Sentry from "@sentry/node";
import { assertExists } from "./utils/assertExists.js";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

const SENTRY_DSN = assertExists(process.env.SENTRY_DSN, "SENTRY_DSN");
// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [nodeProfilingIntegration()],
  enabled:
    process.env.SENTRY_ENVIRONMENT === "production" ||
    process.env.SENTRY_ENVIRONMENT === "staging",

  // Add Performance Monitoring by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
