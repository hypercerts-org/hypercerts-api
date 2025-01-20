import { UploadResponse } from "../../types/api.js";

export class FileUploadError extends Error {
  code: number;
  public errors: UploadResponse["errors"];

  constructor(code: number, message: string) {
    super(message);
    this.name = "FileUploadError";
    this.code = code;
  }
}

export class NoFilesUploadedError extends FileUploadError {
  constructor() {
    super(400, "No files uploaded");
    this.name = "NoFilesUploadedError";
    this.errors = { upload: "No files uploaded" };
  }
}

export class PartialUploadError extends FileUploadError {
  constructor(
    message: string,
    public results: UploadResponse["data"],
  ) {
    super(207, message);
    this.name = "PartialUploadError";
  }
}

export class UploadFailedError extends FileUploadError {
  constructor(
    message: string,
    public fileName: string,
    public errorDetail: string,
  ) {
    super(500, message);
    this.name = "UploadFailedError";
    this.errors = { upload: message };
  }
}
