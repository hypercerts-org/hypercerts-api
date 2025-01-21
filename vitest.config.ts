import { resolve } from "node:path";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./test/setup-env.ts"],
    exclude: [...configDefaults.exclude, "./lib/**/*"],
    coverage: {
      // you can include other reporters, but 'json-summary' is required, json is recommended
      reporter: ["text", "json-summary", "json"],
      // If you want a coverage reports even if your tests are failing, include the reportOnFailure option
      reportOnFailure: true,
      thresholds: {
        lines: 20,
        branches: 63,
        functions: 52,
        statements: 20,
      },
      include: ["src/**/*.ts"],
      exclude: [
        ...(configDefaults.coverage.exclude as string[]),
        "**/*.types.ts",
        "**/types.ts",
        "src/__generated__/**/*",
        "src/graphql/**/*",
        "src/services/**/*",
        "src/types/**/*",
        "src/abis/**/*",
        "./lib/**/*",
      ],
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
