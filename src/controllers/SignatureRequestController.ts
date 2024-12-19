import {
  Body,
  Controller,
  Post,
  Path,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";

import { SupabaseDataService } from "../services/SupabaseDataService.js";
import { verifyAuthSignedData } from "../utils/verifyAuthSignedData.js";
import SignatureRequestProcessor from "../services/SignatureRequestProcessor.js";

interface CancelSignatureRequest {
  signature: string;
  owner_address: string;
  chain_id: number;
}

@Route("v1/signature-requests")
@Tags("SignatureRequests")
export class SignatureRequestController extends Controller {
  private readonly dataService: SupabaseDataService;

  constructor() {
    super();
    this.dataService = new SupabaseDataService();
  }

  @Post("{safe_address}-{message_hash}/cancel")
  @SuccessResponse(200, "Signature request canceled successfully")
  @Response(401, "Unauthorized")
  @Response(404, "Signature request not found")
  public async cancelSignatureRequest(
    @Path() safe_address: string,
    @Path() message_hash: string,
    @Body() requestBody: CancelSignatureRequest,
  ): Promise<{ success: boolean; message: string }> {
    if (
      !(await this.isValidSignature(safe_address, message_hash, requestBody))
    ) {
      return this.errorResponse("Unauthorized", 401);
    }

    const signatureRequest = await this.dataService.getSignatureRequest(
      safe_address,
      message_hash,
    );
    if (!signatureRequest) {
      return this.errorResponse("Signature request not found", 404);
    }

    switch (signatureRequest.status) {
      case "executed":
        return this.errorResponse(
          "Signature request has already been executed",
        );

      case "canceled":
        return this.successResponse("Signature request canceled successfully");

      case "pending":
        await this.dataService.updateSignatureRequestStatus(
          safe_address,
          message_hash,
          "canceled",
        );
        return this.successResponse("Signature request canceled successfully");

      default:
        return this.errorResponse(
          `Invalid signature request status: ${signatureRequest.status}`,
        );
    }
  }

  @Post("process")
  @SuccessResponse(200, "Signature requests processing started")
  public async processSignatureRequests(): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const processor = SignatureRequestProcessor.getInstance();
      console.log("Processing pending requests");
      await processor.processPendingRequests();
      return this.successResponse("Signature requests processing started");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      return this.errorResponse(
        `Failed to process signature requests: ${message}`,
      );
    }
  }

  async isValidSignature(
    safeAddress: string,
    messageHash: string,
    requestBody: CancelSignatureRequest,
  ): Promise<boolean> {
    const { signature, owner_address, chain_id } = requestBody;
    const id = `${safeAddress}-${messageHash}`;

    return verifyAuthSignedData({
      address: owner_address as `0x${string}`,
      types: {
        SignatureRequest: [
          { name: "cancelSignatureRequestId", type: "string" },
        ],
      },
      primaryType: "SignatureRequest",
      signature: signature as `0x${string}`,
      message: {
        cancelSignatureRequestId: id,
      },
      requiredChainId: chain_id,
    });
  }

  successResponse(message: string) {
    return { success: true, message };
  }

  errorResponse(message: string, status = 400) {
    this.setStatus(status);
    return { success: false, message };
  }
}
