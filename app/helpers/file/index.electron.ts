const { dialog } = require("electron").remote;

export const importVideo = async () => {
  const result = await dialog.showOpenDialog({
    title: "Import video",
    message: "Import video",
    buttonLabel: "Import",
    filters: [{ name: "Video files", extensions: ["mp4", "mov", "avi"] }],
    properties: ["openFile"],
  });
  const { filePaths } = result;
  if (!filePaths || filePaths.length <= 0) {
    return;
  }
  return filePaths[0];
};
