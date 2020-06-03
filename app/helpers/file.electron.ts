import { convertToAudio } from "./ffmpeg";

const { dialog } = require("electron").remote;

export const importVideo = async () => {
  const file = await pickVideoFile();
  // await convertToAudio({ file });
  return file;
};

export const pickVideoFile = async () => {
  const result = await dialog.showOpenDialog({
    title: "Import video",
    message: "Import video",
    buttonLabel: "Import",
    filters: [{ name: "Video files", extensions: ["mp4", "mov", "avi"] }],
    properties: ["openFile", "showHiddenFiles"],
  });
  const { filePaths } = result;
  if (!filePaths || filePaths.length <= 0) {
    return;
  }
  return filePaths[0];
};
