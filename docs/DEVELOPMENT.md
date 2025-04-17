# Development Guide: Implementing a New Entity

This guide explains how to implement a new entity in the Hypercerts API, from type definition to resolver implementation.

## Overview

The Hypercerts API uses a modular architecture where each entity follows a consistent pattern:

1. Type Definition
2. Query Arguments
3. Entity Service
4. Resolver

## Step-by-Step Implementation

### 1. Define Entity Types

Create a new file in `src/graphql/schemas/typeDefs/` for your entity types:

```typescript
// src/graphql/schemas/typeDefs/yourEntityTypeDefs.ts
import { Field, ObjectType } from "type-graphql";
import { BaseEntity } from "./baseTypes.js";

@ObjectType()
export class YourEntity extends BaseEntity {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  // Add other fields as needed
}

@ObjectType()
export class GetYourEntitiesResponse {
  @Field(() => [YourEntity])
  data: YourEntity[];

  @Field(() => Int)
  count: number;
}
```

### 2. Define Query Arguments

Create a new file in `src/graphql/schemas/args/` for your query arguments:

```typescript
// src/graphql/schemas/args/yourEntityArgs.ts
import { ArgsType } from "type-graphql";
import { createEntityArgs } from "../../../lib/graphql/createEntityArgs.js";
import { EntityTypeDefs } from "../typeDefs/typeDefs.js";

// Define your entity fields
const fields = {
  name: "string",
  description: "string",
  // Add other fields as needed
} as const;

// Create query arguments
export const { WhereInput, SortOptions } = createEntityArgs(
  "YourEntity" as EntityTypeDefs,
  fields,
);

@ArgsType()
export class GetYourEntitiesArgs {
  first?: number;
  offset?: number;
  where?: typeof WhereInput;
  sortBy?: typeof SortOptions;
}
```

### 3. Create Entity Service

Create a new file in `src/services/database/entities/` for your entity service:

```typescript
// src/services/database/entities/YourEntityService.ts
import { injectable } from "tsyringe";
import { createEntityService } from "./EntityServiceFactory.js";
import { GetYourEntitiesArgs } from "../../../graphql/schemas/args/yourEntityArgs.js";
import { YourEntity } from "../../../graphql/schemas/typeDefs/yourEntityTypeDefs.js";

@injectable()
export class YourEntityService {
  private service = createEntityService<YourEntity, GetYourEntitiesArgs>(
    "your_entity_table",
    {
      // Add any custom query modifiers if needed
    },
  );

  async getYourEntities(args: GetYourEntitiesArgs) {
    return this.service.getMany(args);
  }

  async getYourEntity(args: GetYourEntitiesArgs) {
    return this.service.getSingle(args);
  }
}
```

### 4. Implement Resolver

Create a new file in `src/graphql/schemas/resolvers/` for your resolver:

```typescript
// src/graphql/schemas/resolvers/yourEntityResolver.ts
import { inject, injectable } from "tsyringe";
import { Args, Query, Resolver } from "type-graphql";
import { YourEntityService } from "../../../services/database/entities/YourEntityService.js";
import { GetYourEntitiesArgs } from "../args/yourEntityArgs.js";
import {
  GetYourEntitiesResponse,
  YourEntity,
} from "../typeDefs/yourEntityTypeDefs.js";

@injectable()
@Resolver(() => YourEntity)
class YourEntityResolver {
  constructor(
    @inject(YourEntityService)
    private yourEntityService: YourEntityService,
  ) {}

  @Query(() => GetYourEntitiesResponse)
  async yourEntities(@Args() args: GetYourEntitiesArgs) {
    return this.yourEntityService.getYourEntities(args);
  }
}
```

### 5. Register the Resolver

Add your resolver to the list of resolvers in `src/graphql/schemas/resolvers/index.ts`:

```typescript
export * from "./yourEntityResolver.js";
```

## Best Practices

1. **Type Safety**: Always use TypeScript's type system to ensure type safety across your implementation.
2. **Consistent Naming**: Follow the existing naming conventions in the codebase.
3. **Error Handling**: Implement proper error handling in your service and resolver methods.
4. **Testing**: Write unit tests for your new entity implementation.
5. **Documentation**: Add JSDoc comments to document your types, methods, and classes.

## Example Implementation

For a complete example, you can look at the implementation of existing entities like `Contract`, `Metadata`, or `AttestationSchema` in the codebase.

## Common Pitfalls

1. **Type Registration**: Ensure all your types are properly registered in the GraphQL schema.
2. **Dependency Injection**: Use the `@injectable()` and `@inject()` decorators correctly.
3. **Query Arguments**: Make sure your query arguments match the expected structure.
4. **Database Schema**: Ensure your database table matches the entity structure.

## Testing Your Implementation

1. Start the development server: `pnpm dev`
2. Access the GraphQL playground at `http://localhost:4000/v2/graphql`
3. Test your queries and mutations
4. Run the test suite: `pnpm test`

## Additional Resources

- [TypeGraphQL Documentation](https://typegraphql.com/)
- [Kysely Documentation](https://kysely.dev/docs/intro)
- [Supabase Documentation](https://supabase.com/docs)
