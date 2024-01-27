import { join } from "node:path";
import { writeFile } from "node:fs/promises";

export const addNewFile = async (currentDirectory, newFileName) => {
  const newFilePath = join(currentDirectory, newFileName);

  try {
    await writeFile(newFileName, "");
    console.log("File created successfully");
  } catch (err) {
    console.error("FS operation failed", err.message);
  }
};
