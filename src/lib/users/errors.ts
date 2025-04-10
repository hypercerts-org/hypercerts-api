import { ControllerError } from "../errors/controller.js";

export class UserUpsertError extends ControllerError {
  constructor(code: number, message: string, errors?: Record<string, unknown>) {
    super(message, code, errors);
    this.name = "UserUpdateError";
  }
}

export function isUserUpsertError(error: unknown): error is UserUpsertError {
  return error !== null && error instanceof UserUpsertError;
}
