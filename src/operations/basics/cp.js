import { join } from "node:path";
import { access, constants } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";

export const copyFile = async (currentDirectory, oldFileName, newFileName) => {
  const oldPath = join(currentDirectory, oldFileName);
  const newPath = join(currentDirectory, newFileName);

  try {
    await access(oldPath, constants.F_OK);
    const readStream = createReadStream(oldPath);
    readStream.pipe(createWriteStream(newPath));
    console.log("File copied successfully");
  } catch (err) {
    console.error("FS operation failed", err.message);
  }
};
