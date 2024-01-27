import { join } from "node:path";
import { access, constants } from "node:fs/promises";
import { createReadStream } from "node:fs";

export const fileContent = async (currentDirectory, fileName) => {
  const filePath = join(currentDirectory, fileName);

  try {
    await access(filePath, constants.F_OK);
    const readStream = createReadStream(filePath);
    readStream.pipe(process.stdout);
  } catch (err) {
    console.error("File opeation failed:", err.message);
  }
};
