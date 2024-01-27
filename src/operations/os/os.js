import { EOL, cpus, homedir, userInfo, arch } from "node:os";

export const operationSystemInformation = (command) => {
  switch (command) {
    case "--EOL":
      console.log(JSON.stringify(EOL));
      break;
    case "--cpus":
      console.log(cpus());
      break;
    case "--homedir":
      console.log(homedir());
      break;
    case "--username":
      console.log(userInfo().username);
      break;
    case "--architecture":
      console.log(arch());
      break;
    default:
      console.error("Invalid argument", command);
  }
};
