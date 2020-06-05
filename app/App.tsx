import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { importVideo } from "./helpers/file";
import { info } from "./lib/device";
import NavigationBar, { NavigationAction } from "./ui/components/NavigationBar";
import VideoPlayer from "./ui/components/VideoPlayer";

const App = () => {
  const [videoSrc, setVideoSrc] = useState<string | null>(
    "/Users/chetan/Documents/videos/clips/hello.mp4"
  );

  const [subtitles, setSubtitles] = useState<object | null>(null);

  const actions = [] as NavigationAction[];

  if (!videoSrc) {
    actions.push({
      title: "Import video",
      action: async () => {
        const file = await importVideo();
        setVideoSrc(file);
      },
    });
  }

  if (videoSrc && !subtitles) {
    actions.push({
      title: "Generate Subtitles",
      action: async () => {
        //
      },
    });
  }

  info();
  return (
    <View style={styles.container}>
      <NavigationBar actions={actions} />
      {videoSrc && <VideoPlayer file={videoSrc} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
