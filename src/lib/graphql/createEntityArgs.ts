//TODO: fix import chain so we no longer get the 'used before initialization' error
import { EntityTypeDefs } from "../../graphql/schemas/typeDefs/typeDefs.js";
import { SearchOptionMap } from "../../types/argTypes.js";
import { createEntitySortArgs } from "./createEntitySortArgs.js";
import { createEntityWhereArgs } from "./createEntityWhereArgs.js";
import { registry } from "./TypeRegistry.js";

// Improved type definitions
export type BaseFieldType = keyof typeof SearchOptionMap;

export type BaseReferenceDefinition = {
  type: Exclude<BaseFieldType, "stringArray" | "numberArray">;
  references: {
    entity: EntityTypeDefs;
    fields: Record<string, BaseFieldType | BaseReferenceDefinition>;
  };
};

export type EntityFields = Record<
  string,
  BaseFieldType | BaseReferenceDefinition
>;

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

export type FieldDefinition<TFields extends EntityFields> = {
  [K in keyof TFields]: TFields[K] extends BaseFieldType
    ? TFields[K]
    : TFields[K] extends BaseReferenceDefinition
      ? ReferenceDefinition<TFields[K]["references"]["fields"]>
      : never;
};

// Type guard
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

type FilterTypeMap<T extends BaseFieldType> =
  T extends keyof typeof SearchOptionMap
    ? Partial<InstanceType<(typeof SearchOptionMap)[T]>>
    : never;

/**
 * Creates a class with the entity name and field definitions.
 * @param entityName - The name of the entity.
 * @param fieldDefinitions - The field definitions for the entity.
 * @returns The class with the entity name and field definitions.
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
