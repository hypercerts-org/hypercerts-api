import { ClassType, Field, InputType } from "type-graphql";
import { SortOrder } from "../enums/sortEnums.js";
import {
  BigIntSearchOptions,
  BooleanSearchOptions,
  IdSearchOptions,
  NumberArraySearchOptions,
  NumberSearchOptions,
  StringArraySearchOptions,
  StringSearchOptions,
} from "../inputs/searchOptions.js";

type ReferenceDefinition = {
  type: keyof SearchOptionType;
  references: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    entity: ClassType<any>;
    fields?: Record<string, keyof SearchOptionType>;
  };
};

export type SearchOptionType = {
  string: typeof StringSearchOptions;
  number: typeof NumberSearchOptions;
  bigint: typeof BigIntSearchOptions;
  id: typeof IdSearchOptions;
  boolean: typeof BooleanSearchOptions;
  stringArray: typeof StringArraySearchOptions;
  numberArray: typeof NumberArraySearchOptions;
};

export const SearchOptionMap = {
  string: StringSearchOptions,
  number: NumberSearchOptions,
  bigint: BigIntSearchOptions,
  id: IdSearchOptions,
  boolean: BooleanSearchOptions,
  stringArray: StringArraySearchOptions,
  numberArray: NumberArraySearchOptions,
} as const;

// TODO: a type cache is needed to avoid creating the same types multiple times
// I mean, do we have to?
// Cache for storing generated types
export const typeCache: Record<
  string,
  ReturnType<typeof createEntityArgs>
> = {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WhereArgsType = { [key: string]: any };
type SortOptionsType = { [key: string]: SortOrder | undefined };
type SortArgsType = { by?: SortOptionsType };

type EntityArgs = {
  WhereArgs: ClassType<WhereArgsType>;
  EntitySortOptions: ClassType<SortOptionsType>;
  SortArgs: ClassType<SortArgsType>;
};

export function createEntityArgs<TEntity extends object>(
  entityName: string,
  fieldDefinitions: Partial<
    Record<keyof TEntity, keyof SearchOptionType | ReferenceDefinition>
  >,
): EntityArgs {
  // Return cached version if it exists
  if (typeCache[entityName]) {
    return typeCache[entityName];
  }

  // Create the types first
  @InputType(`${entityName}WhereArgs`)
  class WhereArgs {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;

    constructor() {
      // Only iterate over the fields that are explicitly defined
      Object.entries(fieldDefinitions).forEach(([key, definition]) => {
        if (
          typeof definition === "object" &&
          definition !== null &&
          "references" in definition &&
          "type" in definition
        ) {
          const def = definition as ReferenceDefinition;
          const referenceArgs = createEntityArgs(
            def.references.entity.name,
            def.references.fields || {},
          );
          Object.defineProperty(this, key, {
            enumerable: true,
            writable: true,
            value: new referenceArgs.WhereArgs(),
          });
        } else {
          Object.defineProperty(this, key, {
            enumerable: true,
            writable: true,
            value: undefined,
          });
        }
      });
    }
  }

  @InputType(`${entityName}SortOptions`)
  class EntitySortOptions {
    [key: string]: SortOrder | undefined;

    constructor() {
      // Only iterate over the fields that are explicitly defined
      Object.entries(fieldDefinitions).forEach(([key]) => {
        Object.defineProperty(this, key, {
          enumerable: true,
          writable: true,
          value: undefined,
        });
      });
    }
  }

  @InputType(`${entityName}SortArgs`)
  class SortArgs {
    @Field(() => EntitySortOptions, { nullable: true })
    set by(value: EntitySortOptions | undefined) {
      if (value) {
        // Validate each value is a valid SortOrder
        Object.entries(value).forEach(([key, val]) => {
          if (val && !Object.values(SortOrder).includes(val)) {
            value[key] = SortOrder.ascending; // Default to ascending if invalid
          }
        });
      }
      this._by = value;
    }
    get by(): EntitySortOptions | undefined {
      return this._by;
    }
    private _by?: EntitySortOptions;
  }

  // Apply field decorators after type creation
  Object.entries(fieldDefinitions).forEach(([key, definition]) => {
    if (typeof definition === "string") {
      Field(() => SearchOptionMap[definition as keyof typeof SearchOptionMap], {
        nullable: true,
      })(WhereArgs.prototype, key);
    } else {
      const referenceArgs = createEntityArgs(
        (definition as ReferenceDefinition).references.entity.name,
        (definition as ReferenceDefinition).references.fields || {},
      );
      Field(() => referenceArgs.WhereArgs, { nullable: true })(
        WhereArgs.prototype,
        key,
      );
    }
  });

  Object.keys(fieldDefinitions).forEach((key) => {
    Field(() => SortOrder, { nullable: true })(
      EntitySortOptions.prototype,
      key,
    );
  });

  // Cache and return the result
  typeCache[entityName] = {
    WhereArgs,
    EntitySortOptions,
    SortArgs,
  };

  return typeCache[entityName];
}
