import multer from "multer";

const storage = multer.memoryStorage();

// Single upload
export const singleUpload = multer({ storage }).single("file");

// Multiple upload (e.g. up to 5 images)
export const multipleUpload = multer({ storage }).array("files", 5);