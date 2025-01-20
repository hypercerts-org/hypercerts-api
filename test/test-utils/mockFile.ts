import { Buffer } from "buffer";
import { Readable } from "node:stream";

export const createMockFile = (
  content: string = "test content",
  filename: string = "test.txt",
  mimetype: string = "text/plain",
): Express.Multer.File => ({
  buffer: Buffer.from(content),
  mimetype,
  originalname: filename,
  fieldname: "files",
  encoding: "7bit",
  size: Buffer.from(content).length,
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
