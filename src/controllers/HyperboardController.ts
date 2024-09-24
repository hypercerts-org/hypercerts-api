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
  Patch,
} from "tsoa";
import type {
  ApiResponse,
  HyperboardCreateRequest,
  HyperboardCreateResponse,
  HyperboardUpdateRequest,
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
    const success = await client.verifyTypedData({
      address: adminAddress as `0x${string}`,
      signature: signature as `0x${string}`,
      domain: {
        name: "Hypercerts",
        version: "1",
        chainId: chainId,
      },
      types: {
        Hyperboard: [{ name: "title", type: "string" }],
        CreateRequest: [{ name: "hyperboard", type: "Hyperboard" }],
      },
      primaryType: "CreateRequest",
      message: {
        hyperboard: {
          title: parsedBody.data.title,
        },
      },
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
      const hyperboard = await dataService.upsertHyperboards([
        {
          admin_id: adminAddress,
          background_image: parsedBody.data.backgroundImg,
          tile_border_color: parsedBody.data.borderColor,
          chain_id: chainId,
          name: parsedBody.data.title,
          grayscale_images: false,
        },
      ]);
      if (!hyperboard.data?.[0]?.id) {
        throw new Error("Hyperboard must have an id to add collections.");
      }
      hyperboardId = hyperboard.data?.[0]?.id;
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
        const collectionCreateResponse = await dataService.upsertCollections([
          {
            admin_id: adminAddress,
            name: collection.title,
            description: collection.description,
            chain_id: chainId,
          },
        ]);

        const collectionId = collectionCreateResponse.data?.[0]?.id;
        if (!collectionId) {
          throw new Error("Collection must have an id to add claims.");
        }

        const hypercerts = collection.hypercerts.map((hc) => ({
          hypercert_id: hc.hypercertId,
          display_size: hc.factor,
          admin_id: adminAddress,
          chain_id: chainId,
          collection_id: collectionId,
        }));
        await dataService.upsertHypercerts(hypercerts);

        await dataService.addCollectionToHyperboard(hyperboardId, collectionId);
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

  @Patch("{hyperboardId}")
  @SuccessResponse(204, "Hyperboard updated successfully")
  @Response<ApiResponse>(422, "Unprocessable content", {
    success: false,
    message: "Errors while updating hyperboard",
  })
  public async updateHyperboard(
    @Path() hyperboardId: string,
    @Body() requestBody: HyperboardUpdateRequest,
  ): Promise<ApiResponse<{ id: string } | null>> {
    const inputSchema = z
      .object({
        id: z.string().uuid(),
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
            id: z.string().uuid().optional(),
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
                  id: z.string().uuid().optional(),
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
    const success = await client.verifyTypedData({
      address: adminAddress as `0x${string}`,
      signature: signature as `0x${string}`,
      domain: {
        name: "Hypercerts",
        version: "1",
        chainId: chainId,
      },
      types: {
        Hyperboard: [{ name: "id", type: "string" }],
        UpdateRequest: [{ name: "hyperboard", type: "Hyperboard" }],
      },
      primaryType: "UpdateRequest",
      message: {
        hyperboard: {
          id: parsedBody.data.id,
        },
      },
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

    try {
      dataService.upsertHyperboards([
        {
          id: hyperboardId,
          admin_id: adminAddress,
          background_image: parsedBody.data.backgroundImg || null,
          tile_border_color: parsedBody.data.borderColor,
          chain_id: chainId,
          name: parsedBody.data.title,
          grayscale_images: false,
        },
      ]);
    } catch (err) {
      console.error(err);
      this.setStatus(400);
      return {
        success: false,
        message: "Error updating hyperboard",
        data: null,
      };
    }

    const collectionsToUpdate = parsedBody.data.collections.filter(
      (collection) => !!collection.id,
    );
    for (const collection of collectionsToUpdate) {
      try {
        const collectionsResult = await dataService.upsertCollections([
          {
            id: collection.id,
            admin_id: adminAddress,
            name: collection.title,
            description: collection.description,
            chain_id: chainId,
          },
        ]);
        const collectionId = collectionsResult.data?.[0]?.id;
        if (!collectionId) {
          throw new Error("Collection must have an id to add claims.");
        }
        await dataService.upsertHypercerts(
          collection.hypercerts.map((hc) => ({
            id: hc.id,
            hypercert_id: hc.hypercertId,
            display_size: hc.factor,
            admin_id: adminAddress,
            chain_id: chainId,
            collection_id: collectionId,
          })),
        );
      } catch (e) {
        console.error(e);
        this.setStatus(400);
        return {
          success: false,
          message: "Error updating collection",
          data: null,
        };
      }
    }

    const collectionsToCreate = parsedBody.data.collections.filter(
      (collection) => !collection.id,
    );
    for (const collection of collectionsToCreate) {
      try {
        const collectionCreateResponse = await dataService.upsertCollections([
          {
            admin_id: adminAddress,
            name: collection.title,
            description: collection.description,
            chain_id: chainId,
          },
        ]);

        const collectionId = collectionCreateResponse.data?.[0]?.id;
        if (!collectionId) {
          throw new Error("Collection must have an id to add claims.");
        }

        const hypercerts = collection.hypercerts.map((hc) => ({
          hypercert_id: hc.hypercertId,
          display_size: hc.factor,
          admin_id: adminAddress,
          chain_id: chainId,
          collection_id: collectionId,
        }));
        await dataService.upsertHypercerts(hypercerts);

        await dataService.addCollectionToHyperboard(hyperboardId, collectionId);
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

    this.setStatus(202);
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
    const success = await client.verifyTypedData({
      address: adminAddress as `0x${string}`,
      signature: signature as `0x${string}`,
      domain: {
        name: "Hypercerts",
        version: "1",
        chainId: chain_id,
      },
      types: {
        Hyperboard: [{ name: "id", type: "string" }],
        DeleteRequest: [{ name: "hyperboard", type: "Hyperboard" }],
      },
      primaryType: "DeleteRequest",
      message: {
        hyperboard: {
          id: hyperboardId,
        },
      },
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
      this.setStatus(202);
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
