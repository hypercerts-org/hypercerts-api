# Hypercerts API

The hypercerts API is the touchpoint for developers to interact with the hypercerts ecosystem. It provides endpoints for data upload and fetch, a GraphQL API for querying (on-chain) state and a health check endpoint.

## Endpoints

`/health` - Health check endpoint
`/docs` - Swagger UI for API documentation
`/graphql` - GraphQL API to access hypercerts data like claims, fractions, attestations, allow lists
`/v1/metadata` - Metadata endpoint for the API
`/v1/allowlists` - Allow list endpoints

## Scripts

- `dev`: Starts the development server using `nodemon`, which will automatically restart the server whenever you save a file that the server uses.
- `build`: Denerates the OpenAPI specification and routes using `tsoa`, and then compiles the TypeScript code into JavaScript using `swc`. The compiled code is output to the `dist` directory.
- `start`: Starts the application in production mode.
- `lint`: Runs `eslint` on the codebase to check for linting errors.
- `test`: Runs tests using `vitest`.
