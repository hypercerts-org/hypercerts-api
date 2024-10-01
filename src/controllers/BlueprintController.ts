import {
  Body,
  Controller,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import type {
  AddOrCreateBlueprintResponse,
  ApiResponse,
  BlueprintCreateRequest,
} from "../types/api.js";
import { z } from "zod";
import { SupabaseDataService } from "../services/SupabaseDataService.js";
import { verifyAuthSignedData } from "../utils/verifyAuthSignedData.js";
import { isAddress } from "viem";
import { Json } from "../types/supabaseData.js";

@Route("v1/blueprints")
@Tags("Blueprints")
export class BlueprintController extends Controller {
  @Post()
  @SuccessResponse(201, "Blueprint created successfully")
  @Response<ApiResponse>(422, "Unprocessable content", {
    success: false,
    message: "Validation failed",
    errors: { blueprint: "Invalid blueprint." },
  })
  public async createBlueprint(
    @Body() requestBody: BlueprintCreateRequest,
  ): Promise<AddOrCreateBlueprintResponse> {
    const inputSchema = z.object({
      form_values: z.object({
        title: z
          .string()
          .trim()
          .min(1, "We need a title for your hypercert")
          .max(100, "Max 100 characters"),
        logo: z.string().url("Logo URL is not valid"),
        banner: z.string().url("Banner URL is not valid"),
        description: z
          .string()
          .trim()
          .min(10, {
            message: "We need a longer description for your hypercert",
          })
          .max(5000, "max 5000 characters"),
        link: z
          .string()
          .url("Please enter a valid link")
          .optional()
          .or(z.literal("")),
        tags: z
          .array(z.string())
          .min(1, "We need at least one tag")
          .max(20, "Maximum 20 tags allowed")
          .refine(
            (data) =>
              data.every((tag) => tag.trim() !== "" && tag.length <= 50),
            {
              message:
                "Please ensure all tags are filled in and no longer than 50 characters",
            },
          ),
        projectDates: z
          .object(
            {
              from: z.date({ coerce: true }).refine((date) => date !== null, {
                message: "Please enter a start date",
              }),
              to: z.date({ coerce: true }).refine((date) => date !== null, {
                message: "Please enter an end date",
              }),
            },
            {
              required_error: "Please select a date range",
            },
          )
          .refine((data) => data.from && data.to && data.from <= data.to, {
            path: ["projectDates"],
            message: "From date must be before to date",
          }),
        contributors: z
          .array(z.string())
          .refine(
            (data) =>
              data.filter((contributor) => contributor !== "").length > 0,
            {
              message: "We need at least one contributor",
            },
          )
          .refine(
            (data) => data.every((contributor) => contributor.length <= 50),
            {
              message: "Each contributor must be 50 characters or less",
            },
          ),
        acceptTerms: z.boolean().refine((data) => data, {
          message: "You must accept the terms and conditions",
        }),
        confirmContributorsPermission: z.boolean().refine((data) => data, {
          message:
            "You must confirm that all contributors gave their permission",
        }),
        allowlistEntries: z
          .array(z.object({ address: z.string(), units: z.bigint() }))
          .optional(),
        allowlistURL: z
          .string()
          .trim()
          .refine((input) => input && !input?.endsWith("/"), {
            message: "URI cannot end with a trailing slash",
          })
          .optional()
          .or(z.literal("")),
      }),
      signature: z.string(),
      chain_id: z.number(),
      admin_address: z
        .string()
        .refine((value) => isAddress(value), "Invalid admin address"),
      minter_address: z
        .string()
        .refine((value) => isAddress(value), "Invalid minter address"),
    });
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

    const { signature, chain_id, admin_address, form_values, minter_address } =
      parsedBody.data;
    const verified = verifyAuthSignedData({
      types: { Message: [{ name: "message", type: "string" }] },
      primaryType: "Message",
      message: {
        message: `Create blueprint for ${admin_address}`,
      },
      address: admin_address,
      signature: signature as `0x${string}`,
      requiredChainId: chain_id,
    });

    if (!verified) {
      this.setStatus(422);
      return {
        success: false,
        message: "Validation failed",
        errors: { signature: "Invalid signature." },
      };
    }

    const dataService = new SupabaseDataService();

    let blueprintId: number;
    try {
      const blueprint = await dataService.upsertBlueprints([
        {
          form_values: form_values as unknown as Json,
          minter_address,
        },
      ]);
      blueprintId = blueprint[0].id;
    } catch (error) {
      this.setStatus(500);
      return {
        success: false,
        message: "Failed to create blueprint",
        errors: { blueprint: "Failed to create blueprint" },
      };
    }

    if (!blueprintId) {
      this.setStatus(500);
      return {
        success: false,
        message: "Failed to create blueprint",
        errors: { blueprint: "Failed to create blueprint" },
      };
    }

    try {
      await dataService.addAdminToBlueprint(
        blueprintId,
        admin_address,
        chain_id,
      );
    } catch (error) {
      this.setStatus(500);
      return {
        success: false,
        message: "Failed to add admin to blueprint",
        errors: { blueprint: "Failed to add admin to blueprint" },
      };
    }

    this.setStatus(201);
    return {
      success: true,
      data: { blueprint_id: blueprintId },
    };
  }
}
