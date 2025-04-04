import { SafeParseError } from "zod";

import { ControllerError } from "./controller.js";

export class ParseError extends ControllerError {
  public input: SafeParseError<unknown>;

  constructor(input: SafeParseError<unknown>) {
    super(`Invalid input: ${JSON.stringify(input.error)}`, 400);
    this.name = "ParseError";
    this.input = input;
    // This is needed for proper inheritance with built-in Error in TypeScript
    Object.setPrototypeOf(this, ParseError.prototype);
  }

  public toJSON() {
    return JSON.parse(this.input.error.toString());
  }
}

export function isParseError(error: unknown): error is ParseError {
  return error instanceof ParseError;
}
