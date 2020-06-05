import ffmpeg from "fluent-ffmpeg";

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

const ffprobe = ({ file }: { file: string }) => {
  ffmpeg(file).ffprobe((err, data) => {
    if (err) {
      Promise.reject(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
      Promise.resolve(data);
    }
  });
};
