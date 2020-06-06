import { convertToAudio } from "../helpers/ffmpeg";

type Subtitles = {
  file: string;
};
// stages:
// convert to audio
// save file & data
// upload audio to aws s3
// create transcribe job
// save data
// wait for job to complete
// download transcription
// save file & data
// convert to vtt
// save file & data

const convertAudioStage = 0.5;

export const generateSubtitles = async ({
  videoFile,
  onProgress,
}: {
  videoFile: string;
  onProgress: (progress: number, stage: string) => void;
}): Promise<Subtitles> => {
  const audioFile = await extractAudio({
    source: videoFile,
    target: "test.mp3",
    onProgress: (progress) => {
      onProgress(progress * convertAudioStage, "audio");
    },
  });
  return Promise.resolve({ file: audioFile });
};

const extractAudio = ({
  source,
  target,
  onProgress,
}: {
  source: string;
  target: string;
  onProgress: (progress: number) => void;
}): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    await convertToAudio({
      file: source,
      audioFile: target,
      onComplete: (file: string) => {
        resolve(file);
      },
      onProgress: (progress: number) => {
        onProgress(progress / 100);
      },
      onError: (error: Error) => {
        reject(error);
      },
    });
  });
};
