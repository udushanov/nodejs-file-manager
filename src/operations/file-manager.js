import { processCommand } from "./commands.js";
import {
  printCurrentDirectory,
  printGoodByeMessage,
  printWelcomeMessage,
} from "./io.js";
import { createInterface } from "node:readline";

const currentDirectory = process.cwd();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const startFileManager = (username) => {
  printWelcomeMessage(username);
  printCurrentDirectory(currentDirectory);

  rl.on("line", async (input) => {
    if (input.trim() === ".exit") {
      printGoodByeMessage(username);
      rl.close();
    } else {
      await processCommand(input);
    }
  });

  rl.on("close", () => {
    printGoodByeMessage(username);
    process.exit(0);
  });
};
