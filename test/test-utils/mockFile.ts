import { Buffer } from "buffer";
import { Readable } from "node:stream";

export const createMockFile = (
  content: string | Buffer,
  filename: string,
  mimetype = "text/plain",
): Express.Multer.File => ({
  buffer: Buffer.isBuffer(content) ? content : Buffer.from(content),
  originalname: filename,
  mimetype,
  size: Buffer.isBuffer(content) ? content.length : Buffer.byteLength(content),
  fieldname: "files",
  encoding: "7bit",
  stream: null as unknown as Readable,
  destination: "",
  filename: filename,
  path: "",
});

export const mockTextFile = createMockFile(
  "test content",
  "test.txt",
  "text/plain",
);

export const mockJsonFile = createMockFile(
  JSON.stringify({ test: "content" }),
  "test.json",
  "application/json",
);
