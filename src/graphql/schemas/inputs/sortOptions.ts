import {
    OrderOptions
} from "./fetchOptions.js";

export type SortOptions<T extends object> = {
    [P in keyof T]: OrderOptions | null;
};
