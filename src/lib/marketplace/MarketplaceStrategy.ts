import { DataResponse } from "../../types/api.js";

export abstract class MarketplaceStrategy {
  constructor() {}

  abstract executeCreate(): Promise<DataResponse<unknown>>;

  protected returnSuccess(
    message: string,
    data: unknown,
  ): DataResponse<unknown> {
    return { success: true, message, data };
  }
}
