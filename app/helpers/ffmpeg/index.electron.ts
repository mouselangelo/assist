const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path.replace(
  "app.asar",
  "app.asar.unpacked"
);
import ffmpeg from "fluent-ffmpeg";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegPath);

export const convertToAudio = ({
  file,
  audioFile,
  onProgress,
  onComplete,
  onError,
}: {
  file: string;
  audioFile: string;
  onProgress: (progress: number) => void;
  onComplete: (file: string) => void;
  onError: (error: Error) => void;
}) => {
  ffmpeg(file)
    .noVideo()
    .output(audioFile)
    .on("codecData", (data) => {
      console.log(data);
    })
    .on("progress", function (progress) {
      //  progress // {"frames":null,"currentFps":null,"currentKbps":256,"targetSize":204871,"timemark":"01:49:15.90"}
      console.log(
        "Processing: " +
          progress.timemark +
          " done " +
          progress.targetSize +
          " kilobytes " +
          progress.percent +
          "%"
      );
      onProgress(progress.percent);
    })
    .on(
      "end",
      //listener must be a function, so to return the callback wrapping it inside a function
      function () {
        console.log("finished: ", audioFile);
        onComplete(audioFile);
      }
    )
    .on("error", function (error) {
      console.error(error);
      onError(error);
    })
    .run();
};

export const generateCoverImage = async ({
  source,
  target,
}: {
  source: string;
  target: string;
}) => {
  const { base: filename, root, dir } = path.parse(target);
  const folder = path.join(root, dir);
  return new Promise((resolve, reject) => {
    ffmpeg(source)
      .on(
        "end",
        //listener must be a function, so to return the callback wrapping it inside a function
        function () {
          resolve(target);
        }
      )
      .on("error", function (error) {
        reject(error);
      })
      .screenshots({
        timestamps: [0.1],
        filename,
        folder,
      });
  });
};

export const getInfo = async ({ file }: { file: string }) => {
  const info = await ffprobe({ file });
  console.log(info);
  return info;
};

const ffprobe = ({ file }: { file: string }) => {
  return new Promise((resolve, reject) => {
    ffmpeg(file).ffprobe((err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log(JSON.stringify(data, null, 2));
        resolve(data);
      }
    });
  });
};
