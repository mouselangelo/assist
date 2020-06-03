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

  const importVideoAction: NavigationAction = {
    title: "Import video",
    action: async () => {
      const file = await importVideo();
      setVideoSrc(file);
    },
  };
  info();
  return (
    <View style={styles.container}>
      <NavigationBar actions={[importVideoAction]} />
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
