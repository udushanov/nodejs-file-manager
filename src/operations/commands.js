import { parse } from "node:path";
import { navigateUp } from "./nwd/up.js";
import { changeDirectory } from "./nwd/cd.js";
import { listDirectoryContents } from "./nwd/ls.js";
import { fileContent } from "./basics/cat.js";
import { addNewFile } from "./basics/add.js";
import { renameFile } from "./basics/rn.js";

const rootDirectory = parse(process.cwd()).root;
let currentDirectory = process.cwd();

export const processCommand = async (command) => {
  const [operation, ...args] = command.split(" ");

  switch (operation.toLowerCase()) {
    case "up":
      currentDirectory = await navigateUp(rootDirectory, currentDirectory);
      break;
    case "cd":
      currentDirectory = await changeDirectory(currentDirectory, args[0]);
      break;
    case "ls":
      await listDirectoryContents(currentDirectory);
      break;
    case "cat":
      await fileContent(currentDirectory, args[0]);
      break;
    case "add":
      await addNewFile(currentDirectory, args[0]);
      break;
    case "rn":
      await renameFile(currentDirectory, ...args);
      break;
    default:
      console.error("Invalid input: Unknown operation");
  }
};
