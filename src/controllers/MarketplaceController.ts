import {Body, Controller, Post, Response, Route, SuccessResponse, Tags} from "tsoa";
import {ApiResponse, } from "../types/api.js";
import {HypercertClient, } from "@hypercerts-org/sdk";
import {HypercertExchangeClient, utils} from "@hypercerts-org/marketplace-sdk";
import { ethers, verifyTypedData } from "ethers";
import { z } from "zod";

import {SupabaseDataService} from "../services/SupabaseDataService.js";
import {isAddress} from "viem";

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

@Route("v1/marketplace")
@Tags("Marketplace")
export class MarketplaceController extends Controller {

    /**
     * Submits a new order for validation and storage on the database.
     *
     */
    @Post("/order")
    @SuccessResponse(201, "Order created successfully")
    @Response<ApiResponse>(422, "Unprocessable content", {
        success: false,
        message: "Order could not be created",
    })
    public async storeMetadata(@Body() requestBody: CreateOrderRequest) {
        // Validate inputs
        const inputSchema = z.object({
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
        });
        const parsedBody = inputSchema.safeParse(requestBody);
        if (!parsedBody.success) {
            console.error(parsedBody.error);
            this.setStatus(400);
            return {
                success: false,
                message: "Invalid input",
                data: null,
            };
        }
        const { signature, chainId, ...makerOrder } = parsedBody.data;

        const hec = new HypercertExchangeClient(
          chainId,
          // @ts-expect-error Typing issue with provider
          new ethers.JsonRpcProvider(),
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

        const hypercertClient = new HypercertClient({
            chain: { id: chainId },
            indexerEnvironment: "all",
        });
        const tokenIds = makerOrder.itemIds.map(
          (id) => `${chainId}-${makerOrder.collection.toLowerCase()}-${id}`,
        );

        const claimTokens = await Promise.all(
          tokenIds.map(
            (id) => hypercertClient.indexer.fractionById({ fractionId: id })
          ),
        );

        // Check if all fractions exist
        if (claimTokens.some((claimToken) => !claimToken?.fractions)) {
            this.setStatus(401);
            return {
                message: "Not all fractions in itemIds exist",
                success: false,
                data: null,
            };
        }

        const allFractions = claimTokens.flatMap((claimToken) => claimToken?.fractions?.data || []);

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
            // Add to database
            const insertEntity = {
                ...makerOrder,
                chainId,
                signature,
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
            return{
                success: false,
                message: parsedQuery.error.message,
                data: null,
            };
        }

        const { address, chainId } = parsedQuery.data;
        const lowerCaseAddress = address.toLowerCase();

        const supabase = new SupabaseDataService();
        const { data: currentNonce, error: currentNonceError } = await supabase.getNonce(lowerCaseAddress, chainId);

        if (currentNonceError) {
            this.setStatus(500);
            return {
                success: false,
                message: currentNonceError.message,
                data: null,
            };
        }

        if (!currentNonce) {
            const { data: newNonce, error } = await supabase.createNonce(lowerCaseAddress, chainId);
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

        const { data: updatedNonce, error: updatedNonceError } = await supabase
          .updateNonce(lowerCaseAddress, chainId, currentNonce.nonce_counter + 1);


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
}