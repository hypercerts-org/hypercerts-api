import { ControllerError } from "../errors/controller.js";

export class SignerMismatch extends ControllerError {
  constructor() {
    super("Recovered address is not equal to signer of order", 401);
  }
}

export class InvalidOrder extends ControllerError {
  constructor(validationResult?: Record<string, unknown>) {
    super("Order is not valid within contract", 400);
    this.errors = validationResult;
  }
}

export class MissingFractions extends ControllerError {
  constructor() {
    super("Not all fractions in itemIds exist", 400);
  }
}

export class FractionOwnershipMismatch extends ControllerError {
  constructor() {
    super("Not all fractions are owned by signer", 400);
  }
}

export class InvalidMessageFormat extends ControllerError {
  constructor() {
    super("Invalid message format", 400);
  }
}
