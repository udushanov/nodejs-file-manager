import { join } from "node:path";
import { access, constants } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";

export const hashFile = async (currentDirectory, fileName) => {
  const filePath = join(currentDirectory, fileName);

  try {
    await access(filePath, constants.F_OK);
    const readStream = createReadStream(filePath);
    const hash = createHash("sha256");

    readStream.on("data", (chunk) => {
      hash.update(chunk);
    });

    readStream.on("end", () => {
      const fileHash = hash.digest("hex");
      console.log(`File hashed successfully: ${fileHash}`);
    });
  } catch (err) {
    console.error("Hash operation failed", err.message);
  }
};
