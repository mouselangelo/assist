import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { importVideo } from "./helpers/file";
import { info } from "./lib/device";
import NavigationBar, { NavigationAction } from "./ui/components/NavigationBar";
import VideoPlayer from "./ui/components/VideoPlayer";
import { generateSubtitles } from "./lib/subtitles";
import ProgressModal from "./ui/components/ProgressModal";

const testFile = "/Users/chetan/Documents/videos/clips/hello.mp4";

const TestApp = () => {
  const [videoFile, setVideoFile] = useState<string | null>(null);

  const [subtitles, setSubtitles] = useState<object | null>(null);
  const [showSubtitlesProgress, setShowSubtitlesProgress] = useState(false);
  const [subProgress, setSubProgress] = useState({ progress: 0, stage: "" });

  const actions = [] as NavigationAction[];

  if (!videoFile) {
    actions.push({
      title: "Import video",
      icon: "import",
      action: async () => {
        const file = await importVideo();
        setVideoFile(file);
      },
    });
  }

  if (videoFile && !subtitles) {
    actions.push({
      title: "Generate Subtitles",
      icon: "card-text-outline",
      action: async () => {
        setShowSubtitlesProgress(true);
        const subtitles = await generateSubtitles({
          videoFile,
          onProgress: (progress: number, stage: string) => {
            setSubProgress({ progress, stage });
          },
        });
        setSubtitles(subtitles);
        setShowSubtitlesProgress(false);
      },
    });
  }

  info();
  return (
    <View style={styles.container}>
      <NavigationBar actions={actions} />
      {videoFile && <VideoPlayer file={videoFile} />}
      {showSubtitlesProgress && (
        <ProgressModal
          progress={subProgress.progress}
          stage={subProgress.stage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});

export default TestApp;
