import multer from "multer";

export const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5,
  },
  storage: multer.memoryStorage(),
});
