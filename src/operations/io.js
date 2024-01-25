export const printWelcomeMessage = (username) => {
  console.log(`Welcome to the File Manager, ${username}!`);
};

export const printGoodByeMessage = (username) => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
};

export const printCurrentDirectory = (currentDirectory) => {
  console.log(`You are currently in ${currentDirectory}`);
};
