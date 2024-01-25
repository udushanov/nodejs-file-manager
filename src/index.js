import { startFileManager } from "./operations/file-manager.js";

const args = process.argv.slice(2);
const userInput = args[0];
const divideIndex = userInput.indexOf("=") + 1;
const username = userInput.substring(divideIndex);

startFileManager(username);

