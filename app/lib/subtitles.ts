import { convertToAudio } from "../helpers/ffmpeg";

export const generateSubtitles = async ({
  videoFile,
}: {
  videoFile: string;
}): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const audioFile = "test.mp3";
    await convertToAudio({
      file: videoFile,
      audioFile,
      onComplete: (file: string) => {
        console.log("onComplete", file);
        resolve(file);
      },
      onProgress: (progress: number) => {
        console.log("onProgress", progress);
      },
      onError: (error: Error) => {
        console.log("onError", error);
        reject(error);
      },
    });
  });
};
