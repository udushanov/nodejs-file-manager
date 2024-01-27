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

    console.log("+-------+-------+----------+");
    console.log("| Index\t| Name\t| Type\t\t|");
    console.log("+-------+-------+----------+");

    for (let i = 0; i < data.length; i++) {
      let fileType = "directory";

      if (i > directoriesCount - 1) {
        fileType = "file";
      }

      console.log(`| ${i}\t| ${data[i]}\t| ${fileType}\t|`);
      console.log("+-------+-------+----------+");
    }
  } catch (err) {
    console.error("Operation failed:", err.message);
  }

  // try {
  //   const contents = await fs.readdir(currentDirectory);
  //   const directories = [];
  //   const files = [];

  //   for (const item of contents) {
  //     const itemPath = path.join(currentDirectory, item);
  //     const stats = await fs.stat(itemPath);

  //     if (stats.isDirectory()) {
  //       directories.push(item);
  //     } else if (stats.isFile()) {
  //       files.push(item);
  //     }
  //   }

  //   const sortedContents = [...directories, ...files].sort();
  //   console.log("\nList of contents:");
  //   sortedContents.forEach((item) => {
  //     console.log(item);
  //   });
  // } catch (error) {
  //   console.error("Operation failed:", error.message);
  // }
};
