import { join } from "node:path";
import { access, constants, unlink } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";

export const moveFile = async (currentDirectory, oldFileName, newFileName) => {
  const oldPath = join(currentDirectory, oldFileName);
  const newPath = join(currentDirectory, newFileName);

  try {
    await access(oldPath, constants.F_OK);
    const readStream = createReadStream(oldPath);
    const writeStream = createWriteStream(newPath);
    readStream.pipe(writeStream);

    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    await unlink(oldPath)
    console.log(`File moved successfully from ${oldPath} to ${newPath}`);
  } catch (err) {
    console.error("FS operation failed", err.message);
  }
};
