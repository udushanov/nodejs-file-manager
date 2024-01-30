import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";

export const listDirectoryContents = async (currentDirectory) => {
  try {
    const contents = await readdir(currentDirectory);
    const directories = [];
    const files = [];

    for (const item of contents) {
      const itemPath = join(currentDirectory, item);
      const stats = await stat(itemPath);

      if (stats.isDirectory()) {
        directories.push(item);
      } else {
        files.push(item);
      }
    }

    const directoriesCount = directories.length;
    const data = [...directories.sort(), ...files.sort()];
    const dataToConsole = [];

    for (let i = 0; i < data.length; i++) {
      const formattedData = {};
      let fileType = "directory";

      if (i > directoriesCount - 1) {
        fileType = "file";
      }

      formattedData.Name = data[i];
      formattedData.Type = fileType;
      dataToConsole.push(formattedData);
    }

    console.table(dataToConsole);
  } catch (err) {
    console.error("Operation failed:", err.message);
  }
};
