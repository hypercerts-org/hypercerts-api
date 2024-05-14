
export type ResponseData<T> = {
    success: boolean;
    message: string;
    data?: T;
    errors?: Error[] | Record<string, string | string[]>;
};

export interface ValidationError {
    success: false;
    message: "Validation failed";
    errors: { [name: string]: unknown };
}


