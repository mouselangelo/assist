import child_process from "child_process";
import ffmpeg from "fluent-ffmpeg";

export const convertToAudio = async ({ file }: { file: string }) => {
  const info = await ffprobe({ file });
  await convertUsingLib({ file });
};

const ffprobe = async ({ file }: { file: string }) => {
  ffmpeg(file).ffprobe((err, data) => {
    if (err) {
      Promise.reject(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
      Promise.resolve(data);
    }
  });
};

const convertUsingLib = async ({ file }: { file: string }) => {
  const outputFile = "hello.mp3";

  ffmpeg(file)
    .noVideo()
    .output(outputFile)
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
    })
    .on(
      "end",
      //listener must be a function, so to return the callback wrapping it inside a function
      function () {
        console.log("outputFile", outputFile);
      } ||
        function () {
          console.log("Finished processing");
        }
    )
    .run();
};

const converUsingFfmpeg = async ({ file }: { file: string }) => {
  const args = ["-hide_banner", "-y", "-i", file, "test.mp3"];
  const proc = child_process.spawnSync("ffmpeg", args);
  console.log(proc.stdout.toString());
  console.log(proc.stderr.toString());
};
