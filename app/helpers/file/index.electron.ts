import { remote } from "electron";
import path from "path";

const { dialog, app } = remote;

export const applicatonDir = app.getAppPath();
export const documentsDir = app.getPath("documents");

var lastDir: string | undefined;

export const importVideo = async () => {
  const result = await dialog.showOpenDialog({
    title: "Import video",
    message: "Import video",
    buttonLabel: "Import",
    filters: [{ name: "Videos", extensions: ["mp4", "mov", "avi"] }],
    properties: ["openFile"],
  });
  const { filePaths } = result;
  if (!filePaths || filePaths.length <= 0) {
    return;
  }
  return filePaths[0];
};

export const selectProjectLocation = async (title?: string) => {
  const result = await dialog.showSaveDialog({
    title: "Create Project",
    message: "Create Project",
    buttonLabel: "Save",
    nameFieldLabel: "Project File",
    defaultPath: path.format({
      dir: lastDir ?? documentsDir,
      name: title ?? "untitled",
    }),
  });

  if (!result.filePath) {
    return;
  }

  const fileParts = path.parse(result.filePath);
  lastDir = fileParts.dir;

  return path.format({
    dir: fileParts.dir,
    name: fileParts.name,
    ext: ".adp",
  });
};
