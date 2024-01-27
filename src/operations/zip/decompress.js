import { join } from "node:path";
import { access, constants } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliDecompress } from "node:zlib";

export const decompressFile = async (
  currentDirectory,
  fileName,
  newFileName
) => {
  const filePath = join(currentDirectory, fileName);
  const decompressedFilePath = join(currentDirectory, newFileName);

  try {
    await access(filePath, constants.F_OK);

    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(decompressedFilePath);
    const brotliStream = createBrotliDecompress();

    readStream.pipe(brotliStream);
    brotliStream.pipe(writeStream);

    await Promise.all([
      new Promise((reslove) => readStream.on("close", reslove)),
      new Promise((reslove) => brotliStream.on("end", reslove)),
      new Promise((reslove, reject) =>
        writeStream.on("finish", reslove).on("error", reject)
      ),
    ]);

    console.log(`File decompressed successfully: ${decompressedFilePath}`);
  } catch (err) {
    console.error("Decompression operation failed", err.message);
  }
};
