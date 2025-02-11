import { singleton } from "tsyringe";
import { kyselyCaching } from "../client/kysely.js";
import { CachingDatabase } from "../types/kyselySupabaseCaching.js";
import { BaseSupabaseService } from "./BaseSupabaseService.js";
import NodeCache from "node-cache";
import sharp from "sharp";

@singleton()
export class MetadataImageService extends BaseSupabaseService<CachingDatabase> {
  private cache: NodeCache;
  private readonly CACHE_TTL = 60 * 60 * 24; // 24 hours

  constructor() {
    super(kyselyCaching);
    this.cache = new NodeCache({ stdTTL: this.CACHE_TTL });
  }

  // TODO: remove these when we more refactor the services to improve typing and performance
  getDataQuery() {
    throw new Error("Method not implemented - not needed for image service");
  }

  getCountQuery() {
    throw new Error("Method not implemented - not needed for image service");
  }

  async getImageByUri(uri: string): Promise<string | null> {
    // Check cache first
    const cachedImage = this.cache.get<string>(uri);
    if (cachedImage) return cachedImage;

    // Fetch from database if not cached
    const result = await this.db
      .selectFrom("metadata")
      .select(["image"])
      .where("uri", "=", uri)
      .executeTakeFirst();

    if (!result?.image) return null;

    console.log("result", result.image.slice(0, 100));

    // Compress image
    const compressedImage = await this.compressImage(result.image);

    // Cache the compressed result
    this.cache.set(uri, compressedImage);

    return compressedImage;
  }

  private async compressImage(base64Image: string): Promise<string> {
    // TODO: if image is an URL because of 3rd party input, we should fetch and compress the image

    // Remove the data URL prefix if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

    const imageBuffer = Buffer.from(base64Data, "base64");
    const compressedBuffer = await sharp(imageBuffer)
      .webp({
        quality: 80,
        effort: 4,
      })
      .toBuffer();

    // Add back the appropriate data URL prefix for WebP
    return `data:image/webp;base64,${compressedBuffer.toString("base64")}`;
  }
}
