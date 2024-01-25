import { printGoodByeMessage, printWelcomeMessage } from "./io.js";
import { createInterface } from "node:readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const startFileManager = (username) => {
  printWelcomeMessage(username);

  rl.on('line', async (input) => {
    if (input.trim() === '.exit') {
      printGoodByeMessage(username);
      rl.close();
    } else {

    }
  })

  rl.on('close', () => {
    process.exit(0);
  })
};
