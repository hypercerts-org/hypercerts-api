import { DataResponse } from "../../types/api.js";
import { SupabaseDataService } from "../../services/SupabaseDataService.js";

export abstract class MarketplaceStrategy {
  protected readonly dataService: SupabaseDataService;

  constructor() {
    this.dataService = new SupabaseDataService();
  }

  abstract executeCreate(): Promise<DataResponse<unknown>>;

  protected returnSuccess(
    message: string,
    data: unknown,
  ): DataResponse<unknown> {
    return { success: true, message, data };
  }
}
