import {
  Body,
  Controller,
  Delete,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { isAddress, verifyMessage } from "viem";
import { z } from "zod";

import { isControllerError } from "../lib/errors/controller.js";
import { createMarketplaceStrategy } from "../lib/marketplace/MarketplaceStrategyFactory.js";
import { parseCreateOrderRequest } from "../lib/marketplace/request-parser.js";
import type {
  BaseResponse,
  CreateOrderRequest,
  UpdateOrderNonceRequest,
  ValidateOrderRequest,
} from "../types/api.js";

import { inject, injectable } from "tsyringe";
import { FractionService } from "../services/database/entities/FractionEntityService.js";
import { MarketplaceOrdersService } from "../services/database/entities/MarketplaceOrdersEntityService.js";

@injectable()
@Route("v2/marketplace")
@Tags("Marketplace")
export class MarketplaceController extends Controller {
  constructor(
    @inject(MarketplaceOrdersService)
    private ordersService: MarketplaceOrdersService,
    @inject(FractionService)
    private fractionService: FractionService,
  ) {
    super();
  }

  /**
   * Submits a new order for validation and storage on the database.
   *
   * For backwards compatibility, the old v1 order format is also supported. (Example 3)
   *
   * @example requestBody {
   *   "type": "eoa",
   *   "signature": "0x1234567890abcdef",
   *   "chainId": 11155111,
   *   "quoteType": 0,
   *   "globalNonce": "1",
   *   "subsetNonce": 0,
   *   "orderNonce": "1",
   *   "strategyId": 0,
   *   "collectionType": 0,
   *   "collection": "0x1234567890abcdef",
   *   "currency": "0x1234567890abcdef",
   *   "signer": "0x1234567890abcdef",
   *   "startTime": 1620000000,
   *   "endTime": 1630000000,
   *   "price": "1000000000000000000",
   *   "itemIds": ["1"],
   *   "amounts": [1],
   *   "additionalParameters": "0x"
   * }
   *
   * @example requestBody {
   *   "type": "multisig",
   *   "messageHash": "0x1234567890abcdef",
   *   "chainId": 11155111
   * }
   *
   * @example requestBody {
   *   "signature": "0x1234567890abcdef",
   *   "chainId": 11155111,
   *   "quoteType": 0,
   *   "globalNonce": "1",
   *   "subsetNonce": 0,
   *   "orderNonce": "1",
   *   "strategyId": 0,
   *   "collectionType": 0,
   *   "collection": "0x1234567890abcdef",
   *   "currency": "0x1234567890abcdef",
   *   "signer": "0x1234567890abcdef",
   *   "startTime": 1620000000,
   *   "endTime": 1630000000,
   *   "price": "1000000000000000000",
   *   "itemIds": ["1"],
   *   "amounts": [1],
   *   "additionalParameters": "0x"
   * }
   */
  @Post("/orders")
  @SuccessResponse(201, "Order created successfully")
  @Response<BaseResponse>(422, "Unprocessable content", {
    success: false,
    message: "Order could not be created",
  })
  public async storeOrder(@Body() requestBody: CreateOrderRequest) {
    try {
      const parsedBody = parseCreateOrderRequest(requestBody);
      const strategy = createMarketplaceStrategy(parsedBody);
      const result = await strategy.executeCreate();
      this.setStatus(200);
      return result;
    } catch (error) {
      console.error(error);
      if (isControllerError(error)) {
        this.setStatus(error.statusCode);
        return error.toResponse();
      }
      this.setStatus(500);
      return {
        success: false,
        message: "Error processing order",
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Updates and returns the order nonce for a user on a specific chain.
   */
  @Post("/order-nonce")
  @Response<BaseResponse>(422, "Unprocessable content", {
    success: false,
    message: "Order nonce could not be updated",
  })
  @SuccessResponse(200, "Order nonce updated successfully")
  public async updateOrderNonce(@Body() requestBody: UpdateOrderNonceRequest) {
    const inputSchema = z
      .object({
        address: z.string({
          required_error: "Address is required",
          invalid_type_error: "Address must be a string",
        }),
        chainId: z.number({
          required_error: "Chain ID is required",
          invalid_type_error: "Chain ID must be a number",
        }),
      })
      .refine((data) => isAddress(data.address), {
        message: "Invalid address",
        path: ["address"],
      });
    const parsedQuery = inputSchema.safeParse(requestBody);
    if (!parsedQuery.success) {
      this.setStatus(422);
      return {
        success: false,
        message: parsedQuery.error.message,
        data: null,
      };
    }

    const { address, chainId } = parsedQuery.data;
    const lowerCaseAddress = address.toLowerCase();

    const nonce = await this.ordersService.getNonce({
      address: lowerCaseAddress,
      chain_id: chainId,
    });

    if (!nonce) {
      const newNonce = await this.ordersService.createNonce({
        address: lowerCaseAddress,
        chain_id: chainId,
      });

      this.setStatus(200);
      return {
        success: true,
        message: "Success aaa",
        data: newNonce,
      };
    }

    const updatedNonce = await this.ordersService.updateNonce({
      address: lowerCaseAddress,
      chain_id: chainId,
      nonce_counter: nonce.nonce_counter + 1,
    });

    this.setStatus(200);
    return {
      success: true,
      message: "Success aaa",
      data: updatedNonce,
    };
  }

  /**
   * Validates an order and marks it as invalid if validation fails.
   */
  @Post("/orders/validate")
  @SuccessResponse(200, "Order validated successfully")
  @Response<BaseResponse>(422, "Unprocessable content", {
    success: false,
    message: "Order could not be validated",
  })
  async validateOrder(@Body() requestBody: ValidateOrderRequest) {
    const inputSchema = z.object({
      tokenIds: z.array(z.string()),
      chainId: z.number(),
    });
    const parsedQuery = inputSchema.safeParse(requestBody);
    if (!parsedQuery.success) {
      this.setStatus(422);
      return {
        success: false,
        message: parsedQuery.error.message,
        data: null,
      };
    }

    const { tokenIds, chainId } = parsedQuery.data;

    try {
      const ordersToUpdate = await this.ordersService.validateOrdersByTokenIds(
        tokenIds,
        chainId,
      );
      this.setStatus(200);
      return {
        success: true,
        message: "Orders have been validated",
        data: ordersToUpdate,
      };
    } catch (error) {
      console.error(error);
      if (error) {
        this.setStatus(500);
        return {
          success: false,
          message: "Could not validate orders",
          data: null,
        };
      }
    }
  }

  /**
   * Delete order from database
   */
  @Delete("/orders")
  @SuccessResponse(200, "Order deleted successfully")
  @Response<BaseResponse>(422, "Unprocessable content", {
    success: false,
    message: "Order could not be deleted",
  })
  async deleteOrder(
    @Body() requestBody: { orderId: string; signature: string },
  ) {
    const inputSchema = z.object({
      orderId: z.string(),
      signature: z.string(),
    });
    const parsedQuery = inputSchema.safeParse(requestBody);
    if (!parsedQuery.success) {
      this.setStatus(422);
      return {
        success: false,
        message: parsedQuery.error.message,
        data: null,
      };
    }

    const { orderId, signature } = parsedQuery.data;

    const order = await this.ordersService.getOrder({
      where: {
        id: {
          eq: orderId,
        },
      },
    });

    if (!order) {
      this.setStatus(404);
      return {
        success: false,
        message: "Order not found",
        data: null,
      };
    }

    const signerAddress = order.signer;

    const signatureCorrect = await verifyMessage({
      message: `Delete listing ${orderId}`,
      signature: signature as `0x${string}`,
      address: signerAddress as `0x${string}`,
    });

    if (!signatureCorrect) {
      this.setStatus(401);
      return {
        success: false,
        message: "Invalid signature",
        data: null,
      };
    }

    try {
      await this.ordersService.deleteOrder(orderId);
      this.setStatus(200);
      return {
        success: true,
        message: "Order has been deleted",
        data: null,
      };
    } catch (error) {
      console.error(error);
      if (error) {
        this.setStatus(500);
        return {
          success: false,
          message: "Could not delete order",
          data: null,
        };
      }
    }
  }
}
