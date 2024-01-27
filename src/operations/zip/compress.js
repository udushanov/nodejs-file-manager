import { join } from "node:path";
import { access, constants } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress } from "node:zlib";

export const compressFile = async (currentDirectory, fileName, newFileName) => {
  const filePath = join(currentDirectory, fileName);
  const compressedFilePath = join(currentDirectory, newFileName);

  try {
    await access(filePath, constants.F_OK);

    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(compressedFilePath);
    const brotliStream = createBrotliCompress();

    readStream.pipe(brotliStream);
    brotliStream.pipe(writeStream);

    await Promise.all([
      new Promise((reslove) => readStream.on("close", reslove)),
      new Promise((reslove) => brotliStream.on("end", reslove)),
      new Promise((reslove, reject) =>
        writeStream.on("finish", reslove).on("error", reject)
      ),
    ]);

    console.log(`File compressed successfully: ${compressedFilePath}`);
  } catch (err) {
    console.error("Compression operation failed", err.message);
  }
};
