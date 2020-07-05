import { remote } from "electron";
import path from "path";
import fs from "fs";

const { dialog, app } = remote;

export const applicatonDir = path.join(
  app.getPath("appData"),
  "com.mouselangelo.assist"
);
export const documentsDir = app.getPath("documents");

var lastDir: string | undefined;

export const importVideo = async () => {
  const result = await dialog.showOpenDialog({
    title: "Import video",
    message: "Import video",
    buttonLabel: "Import",
    filters: [{ name: "Videos", extensions: ["mp4", "mov", "avi"] }],
    defaultPath: documentsDir,
    properties: ["openFile"],
  });
  const { filePaths } = result;
  if (!filePaths || filePaths.length <= 0) {
    return;
  }
  return filePaths[0];
};

export const selectProjectLocation = async (title?: string) => {
  const projectFolder = title ?? "new AD project";
  const result = await dialog.showOpenDialog({
    title: "Create Project",
    message: "Create Project",
    buttonLabel: "Save",
    properties: ["openDirectory", "createDirectory"],
    defaultPath: path.format({
      dir: lastDir ?? documentsDir,
      name: projectFolder,
    }),
  });

  const filePaths = result.filePaths;

  if (!filePaths || filePaths.length <= 0) {
    return;
  }

  const location = filePaths[0];

  const fileParts = path.parse(location);
  lastDir = fileParts.dir;

  if (fs.readdirSync(location).length !== 0) {
    throw new Error("Choose empty folder");
  }

  return location;
};
