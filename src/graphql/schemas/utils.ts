import {
    NumberArraySearchOptions,
    NumberSearchOptions,
    StringArraySearchOptions,
    StringSearchOptions
} from "./inputs/searchOptions.js";
import type {WhereOptions} from "./inputs/whereOptions.js";
import type {Database} from "../../types/supabase.js";
import {PostgrestFilterBuilder} from "@supabase/postgrest-js";
import {MetadataWhereInput} from "./inputs/metadataInput.js";
import {HypercertsWhereInput} from "./inputs/hypercertsInput.js";
import {ContractWhereInput} from "./inputs/contractInput.js";
import {AttestationWhereInput} from "./inputs/attestationInput.js";
import {FractionWhereInput} from "./inputs/fractionInput.js";
import {AttestationSchemaWhereInput} from "./inputs/attestationSchemaInput.js";


interface ApplyFilters<
    T extends object,
    QueryType extends PostgrestFilterBuilder<Database['public'], Record<string, unknown>, unknown, unknown, unknown>
> {
    query: QueryType;
    where?: WhereOptions<T>;
}

const generateNumberFilters = (value: NumberSearchOptions, column: string): [string, string, any][] => {
    const filters: [string, string, any][] = [];
    for (const [operator, operand] of Object.entries(value)) {
        if (!operand) continue;
        switch (operator) {
            case 'eq':
            case 'gt':
            case 'gte':
            case 'lt':
            case 'lte':
                filters.push([operator, column, operand]);
                break;
        }
    }
    return filters;
}

const generateStringFilters = (value: StringSearchOptions, column: string): [string, string, any][] => {
    const filters: [string, string, any][] = [];
    for (const [operator, operand] of Object.entries(value)) {
        if (!operand) continue;

        // Assert operand is a string
        if (typeof operand !== 'string') {
            throw new Error(`Expected operand to be a string, but got ${typeof operand}`);
        }

        switch (operator) {
            case 'eq':
                filters.push(['eq', column, operand]);
                break;
            case 'contains':
                filters.push(['ilike', column, `%${operand}%`]);
                break;
            case 'startsWith':
                filters.push(['ilike', column, `${operand}%`]);
                break;
            case 'endsWith':
                filters.push(['ilike', column, `%${operand}`]);
                break;
        }
    }
    console.log(filters)
    return filters;
}

const generateStringArrayFilters = (value: StringArraySearchOptions, column: string): [string, string, any][] => {
    const filters: [string, string, any][] = [];
    for (const [operator, operand] of Object.entries(value)) {
        if (!operand) continue;

        // Assert operand is an array of strings
        if (!Array.isArray(operand) || !operand.every(item => typeof item === 'string')) {
            throw new Error(`Expected operand to be an array of strings, but got ${typeof operand}`);
        }

        switch (operator) {
            case 'contains':
                filters.push(['contains', column, operand]);
                break;
        }
    }
    return filters;
}

const generateNumberArrayFilters = (value: NumberArraySearchOptions, column: string): [string, string, any][] => {
    const filters: [string, string, any][] = [];
    for (const [operator, operand] of Object.entries(value)) {
        if (!operand) continue;

        // Assert operand is an array of numbers
        if (!Array.isArray(operand) || !operand.every(item => typeof item === 'number')) {
            throw new Error(`Expected operand to be an array of numbers, but got ${typeof operand}`);
        }

        switch (operator) {
            case 'contains':
                filters.push(['contains', column, operand]);
                break;
        }
    }
    return filters;
}

function isStringSearchOptions(value: unknown): value is StringSearchOptions {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const possibleStringSearchOptions = value as Partial<StringSearchOptions>;

    // Check for properties unique to StringSearchOptions
    const keys = ['contains', 'startsWith', 'endsWith'];
    return keys.some(key => key in possibleStringSearchOptions);
}

function isNumberSearchOptions(value: unknown): value is NumberSearchOptions {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    const possibleNumberSearchOptions = value as Partial<NumberSearchOptions>;

    // Check for properties unique to NumberSearchOptions
    const keys = ['gt', 'gte', 'lt', 'lte'];
    return keys.some(key => key in possibleNumberSearchOptions);
}

function isStringArraySearchOptions(value: unknown): value is StringArraySearchOptions {
    if (!Array.isArray(value) || value === null) {
        return false;
    }

    const possibleStringArraySearchOptions = value as Partial<StringArraySearchOptions>;

    // Check for properties unique to StringArraySearchOptions
    const keys = ['contains'];
    return keys.some(key => key in possibleStringArraySearchOptions);
}

function isNumberArraySearchOptions(value: unknown): value is NumberArraySearchOptions {
    if (!Array.isArray(value) || value === null) {
        return false;
    }

    const possibleNumberArraySearchOptions = value as Partial<NumberArraySearchOptions>;

    // Check for properties unique to NumberArraySearchOptions
    const keys = ['contains'];
    return keys.some(key => key in possibleNumberArraySearchOptions);
}

export const applyFilters =
    <T extends object, QueryType extends PostgrestFilterBuilder<Database['public'], Record<string, unknown>, unknown, unknown, unknown>>({
                                                                                                                                             query,
                                                                                                                                             where
                                                                                                                                         }: ApplyFilters<T, QueryType>) => {
        if (!where) return query;

        const filters = [];
        for (const [column, value] of Object.entries(where)) {
            if (!value) continue;

            const generateFilters = (value: unknown, column: string) => {
                console.log("Generate: ", column, value)
                if (isNumberSearchOptions(value)) {
                    return generateNumberFilters(value, column);
                }

                if (isStringSearchOptions(value)) {
                    return generateStringFilters(value, column);
                }

                if (isStringArraySearchOptions(value)) {
                    return generateStringArrayFilters(value, column);
                }

                if (isNumberArraySearchOptions(value)) {
                    return generateNumberArrayFilters(value, column);
                }

                return []
            }

            filters.push(...generateFilters(value, column));

            // If the value is an object, recursively apply filters
            if (value instanceof MetadataWhereInput || value instanceof HypercertsWhereInput || value instanceof ContractWhereInput || value instanceof AttestationWhereInput || value instanceof FractionWhereInput || value instanceof AttestationSchemaWhereInput) {
                const nestedFilters = [];
                for (const [_column, _value] of Object.entries(value)) {
                    if (!_value) continue;
                    nestedFilters.push(...generateFilters(_value, `${column}.${_column}`));
                }
                filters.push(...nestedFilters);
            }


        }

        query = filters
            .reduce(
                (acc, [filter, ...args]) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return acc[filter](...args)
                },
                query
            )

        return query as unknown as QueryType;
    }


