import { resolve } from "node:path";
import { stat } from "node:fs/promises";
import { printCurrentDirectory } from "../io.js";

export const changeDirectory = async (currentDirectory, newPath) => {
  const absolutePath = resolve(currentDirectory, newPath);
  console.log(absolutePath);

  try {
    const stats = await stat(absolutePath);

    if (stats.isDirectory()) {
      printCurrentDirectory(absolutePath);
      return absolutePath;
    } else {
      console.error("Invalid input: Path is not a valid directory.");
    }
  } catch (err) {
    console.error("Operation failed:", err.message);
  }
};
