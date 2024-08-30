import { SortOptions } from "./sortOptions.js";

export type OrderOptions<T extends object> = {
  by?: SortOptions<T>;
};
