import fs from "fs";
import path from "path";

export function ErrorLogWithFolderName(folderName: string, logMessage: string) {
  try {
    let rootdirectory: string = process.env.NEXT_PUBLIC_Directory as string;
    let parentFolder: string = process.env
      .NEXT_PUBLIC_PARENTFOLDERNAME as string;

    const dirPath = path.join(rootdirectory, parentFolder); // D:/LogError

    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    const folderdirPath = path.join(dirPath, folderName); // D:/LogError/folderName

    if (!fs.existsSync(folderdirPath))
      fs.mkdirSync(folderdirPath, { recursive: true });

    // Get today's date in DDMMYYYY format
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const fileName = `${dd}${mm}${yyyy}.txt`;
    const filePath = path.join(folderdirPath, fileName); // D:/LogError/folderName/18042025.txt

    // Create the file if it doesn't exist
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, "");
    }

    // Format datetime as "DD-MM-YYYY HH.mm.ss"
    const timeNow = today
      .toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/:/g, ".");

    // Append the log message to the file
    fs.appendFileSync(filePath, `${timeNow} => ${logMessage}\n`);
  } catch (error) {
    console.error(" Error occure while writeing log in TXT File ", error);
  }
}
