# Hypercerts API

The hypercerts API is the touchpoint for developers to interact with the hypercerts ecosystem. It provides endpoints for data upload and fetching, a GraphQL API for querying (on-chain) state and a health check endpoint.

## Getting started

### Environment variables

In `env.template` you'll find KEY and PROOF which are [w3up](https://web3.storage/docs/w3up-client/) key and proofs which you need to set up yourself for local otherwise you'll be superadmin 😉

### Supabase

* Install Docker
* `git submodule init`
* `git submodule update --remote`
* `pnpm supabase:start:all`

This will spin up 2 Supabase instances in Docker, one for the indexer service (caching) and one for the data service (static data) which are both exposed by the API.

From both instances, you need to get their respective keys and add them to the env vars. When in doubt you can run `supabase status` to fetch the keys again.

### Run the API locally

`pnpm dev`

This will run a live production instance (I'm proud that it's production) by running swc

You can then find the API at localhost:4000/spec (Swagger instance) and the Graph at localhost:4000/v1/graphql

## Deployments

Production: `https://api.hypercerts.org/`
Staging: `https://staging-api.hypercerts.org`

`/spec` - Swagger instance documenting the API and exposing a playground to experiment with the endpoints
`/v1/graphql` - GraphQL API to access hypercerts data like claims, fractions, attestations, allow lists

## Scripts

- `dev`: Starts the development server using `nodemon`, which will automatically restart the server whenever you save a file that the server uses.
- `build`: Denerates the OpenAPI specification and routes using `tsoa`, and then compiles the TypeScript code into JavaScript using `swc`. The compiled code is output to the `dist` directory.
- `start`: Starts the application in production mode. 
- `lint`: Runs `eslint` on the codebase to check for linting errors.
- `test`: Runs tests using `vitest`

## Data

The API service exposes data from two sources:

- The static data service which contains off-chain data like user data, hypercert collections, signed order messages, etc.
- The indexer service which contains on-chain data about hypercerts and the linked data on IPFS (hypercerts, ownerships, metadata, attestations, etc.)

### Static data service

The static data service is a Supabase database which is exposed by the API. This means that you can create, update and delete data through the API. For read functionality we recommend using the GraphQL API and playground to carefully compose the data model needed for your use case.

### Indexer service

The indexer service monitors our supported chains for relevant events and handles those events accordingly. All data exposed by the indexer service is available in different sources as well, like IPFS for metadata and EAS for attestations.

## Validations

The API also provides an upload and validation endpoint for hypercert and allow list data. In the [live docs](https://api.hypercerts.org/spec) you can find the endpoint and docs. Generally, by using `validate` you can post the data for validation without it being uploaded to IPFS.

## Architecture

```mermaid
graph TB
    Client[Client Applications]
    API[Hypercerts API :4000]
    
    subgraph "API Endpoints"
        Swagger["/spec\nSwagger Documentation"]
        GraphQL["/v1/graphql\nGraphQL Endpoint"]
        Upload["Upload & Validation\nEndpoints"]
    end
    
    subgraph "Data Services"
        Static[("Static Data Service\n(Supabase DB)\n- User Data\n- Collections\n- Signed Orders")]
        Indexer[("Indexer Service\n(Supabase DB)\n- On-chain Data\n- IPFS Data")]
    end
    
    subgraph "External Services"
        IPFS[(IPFS\nMetadata Storage)]
        Blockchain[(Blockchain\nSupported Chains)]
        EAS[(EAS\nAttestations)]
    end
    
    Client --> API
    API --> Swagger
    API --> GraphQL
    API --> Upload
    
    GraphQL --> Static
    GraphQL --> Indexer
    Upload --> IPFS
    
    Indexer --> Blockchain
    Indexer --> IPFS
    Indexer --> EAS
    
    class Swagger,GraphQL,Upload apiEndpoint;
    class Static,Indexer database;
    class IPFS,Blockchain,EAS external;
```