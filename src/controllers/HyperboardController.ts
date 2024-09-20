import {
  Body,
  Controller,
  Delete,
  Path,
  Post,
  Response,
  Route,
  Query,
  SuccessResponse,
  Tags,
} from "tsoa";
import type {
  ApiResponse,
  HyperboardCreateRequest,
  HyperboardCreateResponse,
} from "../types/api.js";
import { z } from "zod";
import { isValidHypercertId } from "../utils/hypercertIds.js";
import { parseClaimOrFractionId } from "@hypercerts-org/sdk";
import { getEvmClient } from "../utils/getRpcUrl.js";
import { SupabaseDataService } from "../services/SupabaseDataService.js";
import { CONSTANTS } from "@hypercerts-org/sdk";

const allChains = Object.keys(CONSTANTS.DEPLOYMENTS).map((chain) =>
  parseInt(chain),
);

@Route("v1/hyperboards")
@Tags("Hyperboards")
export class HyperboardController extends Controller {
  /**
   * Create a new hyperboard. Creates the collections passed to it automatically.
   */
  @Post()
  @SuccessResponse(201, "Data uploaded successfully", "application/json")
  @Response<ApiResponse>(422, "Unprocessable content", {
    success: false,
    message: "Errors while validating hyperboard",
  })
  public async createHyperboard(
    @Body() requestBody: HyperboardCreateRequest,
  ): Promise<HyperboardCreateResponse> {
    const inputSchema = z
      .object({
        chainId: z
          .number()
          .int()
          .refine((value) => allChains.includes(value), {
            message: "Chain is not supported",
          }),
        title: z
          .string()
          .trim()
          .min(1, "Title is required")
          .max(100, "Use at most 100 characters"),
        collections: z.array(
          z.object({
            title: z
              .string()
              .trim()
              .min(1, "Title is required")
              .max(100, "Use at most 100 characters"),
            description: z
              .string()
              .trim()
              .min(10, "Use at least 10 characters")
              .max(500, "Use at most 500 characters"),
            hypercerts: z
              .array(
                z.object({
                  hypercertId: z
                    .string()
                    .trim()
                    .refine((value) => {
                      if (!value || value === "") {
                        return true;
                      }

                      try {
                        return isValidHypercertId(value);
                      } catch (e) {
                        console.error(e);
                        return false;
                      }
                    }, "Invalid hypercert ID"),
                  factor: z
                    .number()
                    .int()
                    .min(1, "Factor must be greater than 0"),
                }),
              )
              .min(1, "At least one hypercert is required")
              .refine(
                (hypercerts) => {
                  const hypercertIds = hypercerts.map((hc) => hc.hypercertId);
                  return hypercertIds.length === new Set(hypercertIds).size;
                },
                {
                  message: "Hypercerts must be unique",
                  path: ["hypercerts"],
                },
              ),
          }),
        ),
        backgroundImg: z
          .string()
          .url("Background image URL is not valid")
          .optional(),
        borderColor: z
          .string()
          .regex(/^#(?:[0-9a-f]{3}){1,2}$/i, "Must be a color hex code")
          .min(1, "Border color is required"),
        adminAddress: z.string(),
        signature: z.string(),
      })
      .refine(
        (values) => {
          // Check if all chainsIds are the same
          try {
            const chainId = values.chainId;
            const allHypercertIds = values.collections
              .flatMap((collection) =>
                collection.hypercerts.map((hc) => hc.hypercertId),
              )
              .filter((x) => !!x && x !== "")
              .map((id) => parseClaimOrFractionId(id))
              .map((hc) => hc.chainId);

            if (allHypercertIds.length === 0) {
              return true;
            }

            return allHypercertIds.every((id) => id === chainId);
          } catch (err) {
            console.error(err);
            return false;
          }
        },
        {
          message: "All hypercerts must be from the same chain",
          path: ["hypercerts"],
        },
      );
    const parsedBody = inputSchema.safeParse(requestBody);

    if (!parsedBody.success) {
      this.setStatus(400);
      return {
        success: false,
        message: "Invalid input",
        data: null,
        errors: JSON.parse(parsedBody.error.toString()),
      };
    }

    const { signature, adminAddress, chainId } = parsedBody.data;
    const client = getEvmClient(chainId);
    const success = await client.verifyMessage({
      signature: signature as `0x${string}`,
      address: adminAddress as `0x${string}`,
      message: "Create hyperboard",
    });

    if (!success) {
      this.setStatus(400);
      return {
        success: false,
        message: "Invalid signature",
        data: null,
      };
    }

    const dataService = new SupabaseDataService();
    let hyperboardId: string;
    try {
      const hyperboard = await dataService.createHyperboard({
        admin_id: adminAddress,
        background_image: parsedBody.data.backgroundImg,
        tile_border_color: parsedBody.data.borderColor,
        chain_id: chainId,
        name: parsedBody.data.title,
        grayscale_images: false,
      });
      if (!hyperboard.data?.id) {
        throw new Error("Hyperboard must have an id to add collections.");
      }
      hyperboardId = hyperboard.data.id;
    } catch (err) {
      console.error(err);
      this.setStatus(400);
      return {
        success: false,
        message: "Error creating hyperboard",
        data: null,
      };
    }

    for (const collection of parsedBody.data.collections) {
      try {
        console.log("Creating collection", collection);
        const collectionCreateResponse = await dataService.createCollection(
          {
            admin_id: adminAddress,
            name: collection.title,
            description: collection.description,
            chain_id: chainId,
          },
          collection.hypercerts.map((hc) => ({
            hypercert_id: hc.hypercertId,
            display_size: hc.factor,
            admin_id: adminAddress,
            chain_id: chainId,
          })),
        );
        if (!collectionCreateResponse.data?.id) {
          throw new Error("Collection must have an id to add claims.");
        }
        console.log(
          "Adding collection to hyperboard",
          collectionCreateResponse.error,
        );
        await dataService.addCollectionToHyperboard(
          hyperboardId,
          collectionCreateResponse.data.id,
        );
      } catch (e) {
        console.error(e);
        this.setStatus(400);
        return {
          success: false,
          message: "Error creating collection",
          data: null,
        };
      }
    }

    this.setStatus(201);
    return {
      success: true,
      data: {
        id: hyperboardId,
      },
    };
  }

  @Delete("{hyperboardId}")
  @SuccessResponse(204, "Hyperboard deleted successfully")
  @Response<ApiResponse>(422, "Unprocessable content", {
    success: false,
    message: "Errors while deleting hyperboard",
  })
  public async deleteHyperboard(
    @Path() hyperboardId: string,
    // @Body() requestBody: HyperboardDeleteRequest,
    @Query() adminAddress: string,
    @Query() signature: string,
  ): Promise<ApiResponse> {
    const inputSchema = z.object({
      adminAddress: z.string(),
      signature: z.string(),
    });

    const parsedBody = inputSchema.safeParse({
      adminAddress,
      signature,
    });

    if (!parsedBody.success) {
      this.setStatus(422);
      return {
        success: false,
        errors: JSON.parse(parsedBody.error.toString()),
      };
    }

    const dataService = new SupabaseDataService();
    const hyperboard = await dataService.getHyperboardById(hyperboardId);

    if (!hyperboard.data) {
      this.setStatus(404);
      return {
        success: false,
        message: "Hyperboard not found",
      };
    }

    const { admin_id, chain_id } = hyperboard.data;
    if (!(admin_id === adminAddress)) {
      this.setStatus(401);
      return {
        success: false,
        message: "Not authorized to delete hyperboard",
      };
    }

    const client = getEvmClient(chain_id);
    const success = await client.verifyMessage({
      signature: signature as `0x${string}`,
      address: adminAddress as `0x${string}`,
      message: "Delete hyperboard",
    });

    if (!success) {
      this.setStatus(401);
      return {
        success: false,
        message: "Invalid signature",
      };
    }

    try {
      await dataService.deleteHyperboard(hyperboardId);
      this.setStatus(204);
      return {
        success: true,
      };
    } catch (err) {
      console.error(err);
      this.setStatus(400);
      return {
        success: false,
        message: "Error deleting hyperboard",
      };
    }
  }
}
