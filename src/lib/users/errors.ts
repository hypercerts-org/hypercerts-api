import { AddOrUpdateUserResponse } from "../../types/api.js";

export class UserUpsertError extends Error {
  code: number;
  public errors: AddOrUpdateUserResponse["errors"];
  constructor(code: number, message: string) {
    super(message);
    this.name = "UserUpdateError";
    this.code = code;
  }
}
