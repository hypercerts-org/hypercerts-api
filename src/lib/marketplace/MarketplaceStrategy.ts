import { OrderValidatorCode } from "@hypercerts-org/marketplace-sdk";
import { DataResponse } from "../../types/api.js";

export abstract class MarketplaceStrategy {
  abstract executeCreate(): Promise<DataResponse<unknown>>;

  protected returnSuccess(
    message: string,
    data: unknown,
  ): DataResponse<unknown> {
    return { success: true, message, data };
  }

  abstract evaluateOrderValidationResult(validationResult: {
    valid: boolean;
    validatorCodes: OrderValidatorCode[];
  }): boolean;
}
