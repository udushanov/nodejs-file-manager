import { join } from "node:path";
import { rm } from "node:fs/promises";

export const removeFile = async (currentDirectory, fileName) => {
  const filePath = join(currentDirectory, fileName);

  try {
    await rm(filePath);
    console.log("File removed successfully");
  } catch (err) {
    console.error("FS operation failed", err.message);
  }
};
