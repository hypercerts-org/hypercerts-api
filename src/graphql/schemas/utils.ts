import {
    NumberArraySearchOptions,
    NumberSearchOptions,
    StringArraySearchOptions,
    StringSearchOptions
} from "./inputs/searchOptions.js";
import {FetchParams} from "./inputs/fetchOptions.js";

export const applyPagination = (query: any, fetch: unknown) => {

    if (!fetch) return query;

    if (fetch instanceof FetchParams) {
       query = query.range(fetch.offset, fetch.limit);
    }

    return query;
}

//TODO typed queries
export const applyFilters = (query: any, where: unknown) => {

    if (!where) return query;

    for (const [column, value] of Object.entries(where)) {
        if (!value) continue;

        if (value instanceof NumberSearchOptions) {
            for (const [operator, operand] of Object.entries(value)) {
                if (!operand) continue;

                switch (operator) {
                    case 'eq':
                        query = query.eq(column, operand);
                        break;
                    case 'gt':
                        query = query.gt(column, operand);
                        break;
                    case 'gte':
                        query = query.gte(column, operand);
                        break;
                    case 'lt':
                        query = query.lt(column, operand);
                        break;
                    case 'lte':
                        query = query.lte(column, operand);
                        break;
                }
            }
        }

        if (value instanceof StringSearchOptions) {
            for (const [operator, operand] of Object.entries(value)) {
                if (!operand) continue;

                switch (operator) {
                    case 'eq':
                        query = query.eq(column, operand);
                        break;
                    case 'contains':
                        query = query.textSearch(column, operand);
                        break;
                    case 'startsWith':
                        query = query.textSearch(column, operand);
                        break;
                    case 'endsWith':
                        query = query.textSearch(column, operand);
                        break;
                }
            }
        }

        if ( value instanceof StringArraySearchOptions) {
            for (const [operator, operand] of Object.entries(value)) {
                if (!operand) continue;

                switch (operator) {
                    case 'contains':
                        query = query.textSearch(column, operand);
                        break;
                }
            }
        }

        if ( value instanceof NumberArraySearchOptions) {
            for (const [operator, operand] of Object.entries(value)) {
                if (!operand) continue;

                switch (operator) {
                    case 'contains':
                        query = query.textSearch(column, operand);
                        break;
                }
            }
        }
    }

    return query;
}