import {
  addressesByNetwork,
  HypercertExchangeClient,
  utils,
} from "@hypercerts-org/marketplace-sdk";
import { ethers, verifyTypedData } from "ethers";
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
import { z } from "zod";
import { ApiResponse } from "../types/api.js";

import { isAddress, verifyMessage } from "viem";
import { SupabaseDataService } from "../services/SupabaseDataService.js";
import { getFractionsById } from "../utils/getFractionsById.js";
import { getRpcUrl } from "../utils/getRpcUrl.js";
import { isParsableToBigInt } from "../utils/isParsableToBigInt.js";
import { getHypercertTokenId } from "../utils/tokenIds.js";

export interface CreateOrderRequest {
  signature: string;
  chainId: number;
  quoteType: number;
  globalNonce: string;
  subsetNonce: number;
  orderNonce: string;
  strategyId: number;
  collectionType: number;
  collection: string;
  currency: string;
  signer: string;
  startTime: number;
  endTime: number;
  price: string;
  itemIds: string[];
  amounts: number[];
  additionalParameters: string;
}

interface UpdateOrderNonceRequest {
  address: string;
  chainId: number;
}

interface ValidateOrderRequest {
  tokenIds: string[];
  chainId: number;
}

@Route("v1/marketplace")
@Tags("Marketplace")
export class MarketplaceController extends Controller {
  /**
   * Submits a new order for validation and storage on the database.
   *
   */
  @Post("/orders")
  @SuccessResponse(201, "Order created successfully")
  @Response<ApiResponse>(422, "Unprocessable content", {
    success: false,
    message: "Order could not be created",
  })
  public async storeOrder(@Body() requestBody: CreateOrderRequest) {
    // Validate inputs
    const inputSchema = z
      .object({
        signature: z.string(),
        chainId: z.number(),
        quoteType: z.number(),
        globalNonce: z.string(),
        subsetNonce: z.number(),
        orderNonce: z.string(),
        strategyId: z.number(),
        collectionType: z.number(),
        collection: z.string(),
        currency: z.string(),
        signer: z.string(),
        startTime: z.number(),
        endTime: z.number(),
        price: z.string(),
        itemIds: z.array(z.string()),
        amounts: z.array(z.number()),
        additionalParameters: z.string(),
      })
      .refine(
        ({ chainId }) => isParsableToBigInt(chainId),
        `ChainId is not parseable as bigint`,
      )
      .refine(
        ({ globalNonce }) => isParsableToBigInt(globalNonce),
        `globalNonce is not parseable as bigint`,
      )
      .refine(
        ({ orderNonce }) => isParsableToBigInt(orderNonce),
        `orderNonce is not parseable as bigint`,
      )
      .refine(
        ({ price }) => isParsableToBigInt(price),
        `price is not parseable as bigint`,
      )
      .refine(({ price }) => {
        const priceBigInt = BigInt(price);
        return priceBigInt > 0n;
      }, `Price must be greater than 0`)
      .refine(({ currency }) => isAddress(currency), `Invalid currency address`)
      .refine(({ signer }) => isAddress(signer), `Invalid signer address`)
      .refine(({ itemIds }) => itemIds.length > 0, `itemIds must not be empty`)
      .refine(({ amounts }) => amounts.length > 0, `amounts must not be empty`)
      .refine(
        ({ itemIds, amounts }) => itemIds.length === amounts.length,
        "itemIds and amounts must have the same length",
      )
      .refine(
        ({ startTime, endTime }) => startTime < endTime,
        "startTime must be less than endTime",
      )
      .refine(
        ({ collection }) => isAddress(collection),
        `Invalid collection address`,
      )
      .refine(
        ({ collection, chainId }) =>
          // @ts-expect-error Typing issue with chainId
          addressesByNetwork[chainId]?.MINTER?.toLowerCase() ===
          collection.toLowerCase(),
        `Collection address does not match the minter address for chainId`,
      );
    const parsedBody = inputSchema.safeParse(requestBody);

    if (!parsedBody.success) {
      this.setStatus(400);
      return {
        success: false,
        message: "Invalid input",
        data: null,
        error: JSON.parse(parsedBody.error.toString()),
      };
    }
    const { signature, chainId, ...makerOrder } = parsedBody.data;

    const hec = new HypercertExchangeClient(
      chainId,
      // @ts-expect-error Typing issue with provider
      new ethers.JsonRpcProvider(getRpcUrl(chainId)),
    );
    const typedData = hec.getTypedDataDomain();

    const recoveredAddress = verifyTypedData(
      typedData,
      utils.makerTypes,
      makerOrder,
      signature,
    );

    if (!(recoveredAddress.toLowerCase() === makerOrder.signer.toLowerCase())) {
      this.setStatus(401);
      return {
        message: "Recovered address is not equal to signer of order",
        success: false,
        data: null,
      };
    }

    const [validationResult] = await hec.checkOrdersValidity([
      { ...makerOrder, signature, chainId },
    ]);
    if (!validationResult.valid) {
      this.setStatus(401);
      return {
        message: "Order is not valid within contract",
        success: false,
        data: validationResult,
      };
    }

    const tokenIds = makerOrder.itemIds.map(
      (id) => `${chainId}-${makerOrder.collection}-${id}`,
    );

    const fractions = await Promise.all(
      tokenIds.map((fractionId) => getFractionsById(fractionId)),
    );

    // Check if all fractions exist
    if (fractions.some((fraction) => !fraction)) {
      this.setStatus(401);
      return {
        message: "Not all fractions in itemIds exist",
        success: false,
        data: null,
      };
    }

    const allFractions = fractions.flatMap((fraction) => fraction || []);

    // Check if all fractions are owned by signer
    if (
      !allFractions.every(
        (claimToken) =>
          claimToken?.owner_address?.toLowerCase() ===
          recoveredAddress.toLowerCase(),
      )
    ) {
      this.setStatus(401);
      return {
        message: "Not all fractions are owned by signer",
        success: false,
        data: null,
      };
    }

    try {
      const tokenId = makerOrder.itemIds[0];
      const hypercertTokenId = getHypercertTokenId(BigInt(tokenId));
      const formattedHypercertId = `${chainId}-${makerOrder.collection}-${hypercertTokenId.toString()}`;
      // Add to database
      const insertEntity = {
        ...makerOrder,
        chainId,
        signature,
        hypercert_id: formattedHypercertId,
      };
      console.log("[marketplace-api] Inserting order entity", insertEntity);

      const supabaseService = new SupabaseDataService();
      const result = await supabaseService.storeOrder(insertEntity);

      this.setStatus(200);
      return {
        message: "Added to database",
        success: true,
        data: result.data
          ? {
              ...result.data,
              itemIds: result.data.itemIds as string[],
              amounts: result.data.amounts as number[],
              status: "VALID",
              hash: "0x",
            }
          : null,
      };
    } catch (error) {
      console.error(error);
      if (error) {
        this.setStatus(500);
        return {
          message: "Could not add to database",
          success: false,
          data: null,
        };
      }
    }
  }

  /**
   * Updates and returns the order nonce for a user on a specific chain.
   */
  @Post("/order-nonce")
  @Response<ApiResponse>(422, "Unprocessable content", {
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

    const supabase = new SupabaseDataService();
    const { data: currentNonce, error: currentNonceError } =
      await supabase.getNonce(lowerCaseAddress, chainId);

    if (currentNonceError) {
      this.setStatus(500);
      return {
        success: false,
        message: currentNonceError.message,
        data: null,
      };
    }

    if (!currentNonce) {
      const { data: newNonce, error } = await supabase.createNonce(
        lowerCaseAddress,
        chainId,
      );
      if (error) {
        this.setStatus(500);
        return {
          success: false,
          message: error.message,
          data: null,
        };
      }
      this.setStatus(200);
      return {
        success: true,
        message: "Success aaa",
        data: newNonce,
      };
    }

    const { data: updatedNonce, error: updatedNonceError } =
      await supabase.updateNonce(
        lowerCaseAddress,
        chainId,
        currentNonce.nonce_counter + 1,
      );

    if (updatedNonceError) {
      this.setStatus(500);
      return {
        success: false,
        message: updatedNonceError.message,
        data: null,
      };
    }

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
  @Response<ApiResponse>(422, "Unprocessable content", {
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
    const supabase = new SupabaseDataService();

    try {
      const ordersToUpdate = await supabase.validateOrdersByTokenIds({
        tokenIds,
        chainId,
      });
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
  @Response<ApiResponse>(422, "Unprocessable content", {
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

    const supabase = new SupabaseDataService();
    const orders = await supabase.getOrders({
      where: {
        id: {
          eq: orderId,
        },
      },
    });

    if (!orders.data?.length) {
      this.setStatus(404);
      return {
        success: false,
        message: "Order not found",
        data: null,
      };
    }

    const signerAddress = orders.data[0].signer;

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
      await supabase.deleteOrder(orderId);
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
