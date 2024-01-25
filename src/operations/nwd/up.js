import { dirname } from "node:path";
import { printCurrentDirectory } from "../io.js";

export const navigateUp = async (rootDirectory, currentDirectory) => {
  const parentDirectory = dirname(currentDirectory);

  if (currentDirectory !== rootDirectory) {
    printCurrentDirectory(parentDirectory);
    return parentDirectory;
  } else {
    console.error("Invalid input: Unable to navigate above root directory");
    return currentDirectory;
  }
};
