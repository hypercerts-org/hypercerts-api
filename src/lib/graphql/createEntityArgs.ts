import { EntityTypeDefs } from "../../graphql/schemas/typeDefs/typeDefs.js";
import { SearchOptionMap } from "../../types/argTypes.js";
import { createEntitySortArgs } from "./createEntitySortArgs.js";
import { createEntityWhereArgs } from "./createEntityWhereArgs.js";
import { registry } from "./TypeRegistry.js";

/**
 * Represents the primitive field types that can be used in entity definitions.
 * These types map directly to the search options available in SearchOptionMap.
 */
export type BaseFieldType = keyof typeof SearchOptionMap;

/**
 * Represents a reference to another entity in the schema.
 * References must have a type (usually "id") and specify the referenced entity and its fields.
 *
 * @example
 * ```typescript
 * const referenceDefinition: BaseReferenceDefinition = {
 *   type: "id",
 *   references: {
 *     entity: EntityTypeDefs.Metadata,
 *     fields: { name: "string" }
 *   }
 * };
 * ```
 */
export type BaseReferenceDefinition = {
  type: Exclude<BaseFieldType, "stringArray" | "numberArray">;
  references: {
    entity: EntityTypeDefs;
    fields: Record<string, BaseFieldType | BaseReferenceDefinition>;
  };
};

/**
 * Represents the structure of entity fields.
 * Each field can be either a primitive type (string, number, etc.) or a reference to another entity.
 */
export type EntityFields = Record<
  string,
  BaseFieldType | BaseReferenceDefinition
>;

/**
 * A strongly-typed version of BaseReferenceDefinition that enforces field types.
 *
 * @template TFields - The type of fields in the referenced entity
 * @template TRefEntity - The type of the referenced entity (must be in EntityTypeDefs)
 */
export type ReferenceDefinition<
  TFields extends EntityFields,
  TRefEntity extends EntityTypeDefs = EntityTypeDefs,
> = {
  type: Exclude<BaseFieldType, "stringArray" | "numberArray">;
  references: {
    entity: TRefEntity;
    fields: TFields;
  };
};

/**
 * Maps field definitions to their appropriate types.
 * Handles both primitive fields and reference fields with proper type inference.
 *
 * @template TFields - The type of fields being defined
 */
export type FieldDefinition<TFields extends EntityFields> = {
  [K in keyof TFields]: TFields[K] extends BaseFieldType
    ? TFields[K]
    : TFields[K] extends BaseReferenceDefinition
      ? ReferenceDefinition<TFields[K]["references"]["fields"]>
      : never;
};

/**
 * Type guard to check if a definition is a reference definition.
 *
 * @param def - The definition to check
 * @returns True if the definition is a valid reference definition
 */
export function isReferenceDefinition(
  def: unknown,
): def is BaseReferenceDefinition {
  return (
    typeof def === "object" &&
    def !== null &&
    "references" in def &&
    "type" in def &&
    typeof (def as BaseReferenceDefinition).type === "string" &&
    (def as BaseReferenceDefinition).type in SearchOptionMap
  );
}

/**
 * Maps a base field type to its corresponding filter type.
 * Used to create the appropriate filter options for each field type.
 *
 * @template T - The base field type to map
 */
type FilterTypeMap<T extends BaseFieldType> =
  T extends keyof typeof SearchOptionMap
    ? Partial<InstanceType<(typeof SearchOptionMap)[T]>>
    : never;

/**
 * Creates GraphQL input types for entity filtering and sorting.
 *
 * @description
 * This function generates two classes:
 * 1. A WhereInput class for filtering entities based on their fields
 * 2. A SortOptions class for specifying sort order of results
 *
 * The generated classes can support both primitive fields and nested reference fields. However,
 * the current implementation does not support nested reference fields in sort options.
 * Classes are cached in the registry to prevent unnecessary re-creation of the same classes.
 *
 * @example
 * ```typescript
 * const { WhereInput, SortOptions } = createEntityArgs(EntityTypeDefs.Hypercert, {
 *   token_id: "bigint",
 *   metadata: {
 *     type: "id",
 *     references: {
 *       entity: EntityTypeDefs.Metadata,
 *       fields: { name: "string" }
 *     }
 *   }
 * });
 *
 * const filter = new WhereInput();
 * filter.token_id = { eq: 1 };
 * filter.metadata = { name: { contains: "test" } };
 *
 * const sort = new SortOptions();
 * sort.token_id = "ascending";
 * ```
 *
 * @param entityName - The name of the entity (must be a valid EntityTypeDefs value)
 * @param fieldDefinitions - Object defining the fields and their types for the entity
 * @returns An object containing the WhereInput and SortOptions classes
 *
 * @remarks
 * - Generated classes are cached in the registry
 * - Same entity name will return the same class instances
 * - Supports primitive fields (string, number, bigint) and nested references
 * - All filter fields are optional
 * - All sort fields are nullable
 */
export function createEntityArgs<
  TEntity extends EntityTypeDefs,
  TFields extends EntityFields,
>(entityName: TEntity, fieldDefinitions: FieldDefinition<TFields>) {
  // Cast fieldDefinitions to TFields since we know they are compatible
  const fields = fieldDefinitions as unknown as TFields;

  const WhereInput = registry.getOrCreateWhereInput(entityName, () =>
    createEntityWhereArgs(entityName, fields),
  );
  const SortOptions = registry.getOrCreateSortOptions<TFields>(entityName, () =>
    createEntitySortArgs(entityName, fields),
  );

  return {
    WhereInput,
    SortOptions,
  } as const;
}

export { type FilterTypeMap };
