import { parse } from "node:path";
import { navigateUp } from "./nwd/up.js";

const rootDirectory = parse(process.cwd()).root;
let currentDirectory = process.cwd();

export const processCommand = async (command) => {
  const [operation, ...args] = command.split(" ");

  switch (operation.toLowerCase()) {
    case "up":
      currentDirectory = await navigateUp(rootDirectory, currentDirectory);
      break;
    case "cd":
      //
      break;
    case "ls":
      //
      break;
    default:
      console.error("Invalid input: Unknown operation");
  }
};
