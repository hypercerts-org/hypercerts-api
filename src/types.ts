export type ResponseData<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string | string[]>;
};
