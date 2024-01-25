import { parse } from "node:path";
import { navigateUp } from "./nwd/up.js";
import { changeDirectory } from "./nwd/cd.js";

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
      //
      break;
    default:
      console.error("Invalid input: Unknown operation");
  }
};
