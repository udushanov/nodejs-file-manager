import { parse } from "node:path";
import { navigateUp } from "./nwd/up.js";
import { changeDirectory } from "./nwd/cd.js";
import { listDirectoryContents } from "./nwd/ls.js";
import { fileContent } from "./basics/cat.js";
import { addNewFile } from "./basics/add.js";
import { renameFile } from "./basics/rn.js";
import { copyFile } from "./basics/cp.js";
import { moveFile } from "./basics/mv.js";
import { removeFile } from "./basics/rm.js";
import { operationSystemInformation } from "./os/os.js";
import { hashFile } from "./hash/hash.js";

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
    case "cp":
      await copyFile(currentDirectory, ...args);
      break;
    case "mv":
      await moveFile(currentDirectory, ...args);
      break;
    case "rm":
      await removeFile(currentDirectory, args[0]);
      break;
    case "os":
      operationSystemInformation(args[0]);
      break;
    case "hash":
      hashFile(currentDirectory, args[0]);
      break;
    default:
      console.error("Invalid input: Unknown operation");
  }
};
