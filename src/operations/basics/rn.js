import { join } from "node:path";
import { access, constants, rename } from "node:fs/promises";

export const renameFile = async (
  currentDirectory,
  oldFileName,
  newFileName
) => {
  const oldPath = join(currentDirectory, oldFileName);
  const newPath = join(currentDirectory, newFileName);

  try {
    await access(oldPath, constants.F_OK);
    await rename(oldPath, newPath);
    console.log("File renamed successfully");
  } catch (err) {
    console.error("FS operation failed:", err.message);
  }
};
