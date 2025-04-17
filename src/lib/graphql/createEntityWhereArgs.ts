import { ClassType, InputType } from "type-graphql";

import { Field } from "type-graphql";

import { EntityTypeDefs } from "../../graphql/schemas/typeDefs/typeDefs.js";
import { SearchOptionMap } from "../../types/argTypes.js";
import {
  BaseFieldType,
  BaseReferenceDefinition,
  EntityFields,
  FilterTypeMap,
  isReferenceDefinition,
} from "./createEntityArgs.js";
import { registry } from "./TypeRegistry.js";
/**
 * Type representing where clause arguments for entity fields.
 * Maps field names to their filter types, handling both primitive and reference fields.
 * @template TEntity - The entity type as defined in EntityTypeDefs
 * @template TFields - The entity fields type
 */
export type WhereArgsType<
  TEntity extends EntityTypeDefs,
  TFields extends EntityFields,
> = {
  [K in keyof TFields]?: TFields[K] extends BaseFieldType
    ? FilterTypeMap<TFields[K]>
    : TFields[K] extends BaseReferenceDefinition
      ? WhereArgsType<TEntity, TFields[K]["references"]["fields"]>
      : never;
};

/**
 * Creates a unique name for a where input type based on its context.
 *
 * @param entity - The entity type
 * @param context - Optional context string to create unique names for nested types
 * @returns A unique name for the where input type
 *
 * @example
 * ```typescript
 * createTypeName(EntityTypeDefs.Contract) // "ContractWhereInput"
 * createTypeName(EntityTypeDefs.Metadata, "Contract") // "ContractMetadataWhereInput"
 * ```
 */
function createTypeName(entity: EntityTypeDefs, context?: string): string {
  // If there's no context, just return the entity name with WhereInput
  if (!context) {
    return `${entity}WhereInput`;
  }

  // Remove the WhereInput suffix from the context if it exists
  const cleanContext = context.replace(/WhereInput$/, "");

  // Create the name with context before entity
  return `${cleanContext}${entity}WhereInput`;
}

/**
 * Creates a GraphQL input type class for entity filtering.
 *
 * @description
 * This function generates a class that can be used to specify filter conditions for entity queries.
 * The generated class supports both primitive fields (string, number, bigint) and nested reference fields.
 * Each field can be filtered using type-specific operators (e.g., eq, contains, gt, lt).
 *
 * @example
 * ```typescript
 * const WhereArgs = createEntityWhereArgs(EntityTypeDefs.Contract, {
 *   address: "string",
 *   chain_id: "number",
 *   metadata: {
 *     type: "id",
 *     references: {
 *       entity: EntityTypeDefs.Metadata,
 *       fields: { name: "string" }
 *     }
 *   }
 * });
 *
 * const instance = new WhereArgs();
 * instance.address = { contains: "0x123" };
 * instance.chain_id = { eq: 1 };
 * instance.metadata.name = { contains: "Test" };
 * ```
 *
 * @param entityName - The name of the entity (must be a valid EntityTypeDefs value)
 * @param fieldDefinitions - Object defining the fields and their types for the entity
 * @param context - Optional context string for creating unique names for nested types
 * @returns A class that can be used as a GraphQL input type for filtering
 *
 * @remarks
 * - Supports primitive fields (string, number, bigint) with type-specific filter operators
 * - Handles nested reference fields by creating separate where input types
 * - All fields are nullable and default to undefined
 * - Validates field types against SearchOptionMap at creation time
 * - Creates unique names for nested types using context
 * - Registers created types in the TypeRegistry for future reference
 *
 * @throws {Error} If a field type is not found in SearchOptionMap
 * @throws {Error} If a nested class cannot be found during creation
 */
export function createEntityWhereArgs<
  TEntity extends EntityTypeDefs,
  TFields extends EntityFields,
>(
  entityName: TEntity,
  fieldDefinitions: TFields,
  context?: string,
): ClassType<WhereArgsType<TEntity, TFields>> {
  // Add validation at the start
  Object.entries(fieldDefinitions).forEach(([key, definition]) => {
    if (typeof definition === "string" && !(definition in SearchOptionMap)) {
      throw new Error(`Invalid field type "${definition}" for field "${key}"`);
    }
  });

  // Create a map to store all classes that need to be created
  const classesToCreate = new Map<
    string,
    { entity: EntityTypeDefs; fields: EntityFields; context?: string }
  >();

  // First pass: collect all classes that need to be created
  function collectClassesToCreate(
    entity: EntityTypeDefs,
    fields: EntityFields,
    context?: string,
  ) {
    // Create a unique name for this type
    const typeName = createTypeName(entity, context);

    // Add this class to the map if not already present
    if (!classesToCreate.has(typeName)) {
      classesToCreate.set(typeName, { entity, fields, context });
    }

    // Recursively collect nested classes
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(fields).forEach(([_, definition]) => {
      if (typeof definition === "object" && isReferenceDefinition(definition)) {
        const nestedEntity = definition.references.entity;
        const nestedFields = definition.references.fields;

        // Recursively collect nested classes with the current type name as context
        collectClassesToCreate(nestedEntity, nestedFields, typeName);
      }
    });
  }

  // Collect all classes that need to be created
  collectClassesToCreate(entityName, fieldDefinitions, context);

  // Second pass: create all classes from deepest to shallowest
  // This ensures that when we create a class, all its dependencies are already created
  const createdClasses = new Map<string, ClassType<object>>();

  // Create classes in reverse order (deepest first)
  Array.from(classesToCreate.entries())
    .reverse()
    .forEach(([typeName, { fields }]) => {
      if (!createdClasses.has(typeName)) {
        // Create the class
        @InputType(typeName)
        class EntityWhereInput {
          // TODO remover any declarations in this file
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [key: string]: any;

          constructor() {
            Object.entries(fields).forEach(([key, definition]) => {
              if (
                typeof definition === "object" &&
                isReferenceDefinition(definition)
              ) {
                const nestedEntity = definition.references.entity;
                const nestedTypeName = createTypeName(nestedEntity, typeName);
                const NestedClass = createdClasses.get(nestedTypeName);
                if (NestedClass) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (this as any)[key] = new NestedClass();
                } else {
                  throw new Error(`Class for ${nestedTypeName} not found`);
                }
              } else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (this as any)[key] = undefined;
              }
            });
          }
        }

        // Define properties on the prototype
        Object.entries(fields).forEach(([key]) => {
          Object.defineProperty(EntityWhereInput.prototype, key, {
            enumerable: true,
            writable: true,
            value: undefined,
          });
        });

        // Set the class name
        Object.defineProperty(EntityWhereInput, "name", {
          value: typeName,
        });

        // Apply field decorators
        Object.entries(fields).forEach(([key, definition]) => {
          if (typeof definition === "string") {
            Field(() => SearchOptionMap[definition as BaseFieldType], {
              nullable: true,
            })(EntityWhereInput.prototype, key);
          } else if (definition && isReferenceDefinition(definition)) {
            const nestedEntity = definition.references.entity;
            const nestedTypeName = createTypeName(nestedEntity, typeName);
            const NestedClass = createdClasses.get(nestedTypeName);
            if (NestedClass) {
              Field(() => NestedClass, { nullable: true })(
                EntityWhereInput.prototype,
                key,
              );
            }
          }
        });

        // Store the created class
        createdClasses.set(typeName, EntityWhereInput);

        // Also register it in the registry using the public method
        // This ensures the class is available for future references
        registry.getOrCreateWhereInput(
          typeName as EntityTypeDefs,
          () => EntityWhereInput,
        );
      }
    });

  // Return the class for the requested entity
  const result = createdClasses.get(createTypeName(entityName, context));
  if (!result) {
    throw new Error(
      `Class for ${createTypeName(entityName, context)} not found`,
    );
  }

  return result as ClassType<WhereArgsType<TEntity, TFields>>;
}
