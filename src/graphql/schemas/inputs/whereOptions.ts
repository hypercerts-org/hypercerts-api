import { SearchOptionType } from "../args/argGenerator.js";

type GetSearchOption<T> = T extends keyof SearchOptionType
  ? SearchOptionType[T]
  : never;

export type WhereOptions<T extends object> = {
  [P in keyof T]: GetSearchOption<T[P]> | null;
};
