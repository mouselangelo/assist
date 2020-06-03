import React from "react";
import { Video } from "expo-av";
import { View, StyleSheet, Button } from "react-native";
import { threadId } from "worker_threads";

type props = { file: string };

class VideoPlayer extends React.Component<props> {
  videoRef: Video | null = null;

  state = {
    isPlaying: false,
  };

  render() {
    const { file } = this.props;
    const { isPlaying } = this.state;

    const action = () => {};
    return (
      <View style={styles.container}>
        <Video
          ref={(ref) => {
            this.videoRef = ref;
          }}
          source={{ uri: `file://${file}` }}
          rate={1.0}
          volume={0.5}
          isMuted={false}
          resizeMode="contain"
          shouldPlay={false}
          isLooping={false}
          style={styles.video}
          onPlaybackStatusUpdate={(data) => {
            console.log("onPlaybackStatusUpdate", data);
          }}
          progressUpdateIntervalMillis={100}
        />
        <View style={styles.controls}>
          <Button
            onPress={() => {
              if (isPlaying) {
                this.setState({ isPlaying: false });
                this.videoRef?.pauseAsync();
              } else {
                this.setState({ isPlaying: true });
                this.videoRef?.playAsync();
              }
            }}
            title={isPlaying ? "Pause" : "Play"}
          />
          <Button
            onPress={() => {
              if (!isPlaying) {
                return;
              }
              this.videoRef?.playFromPositionAsync(10 * 1000, {
                toleranceMillisAfter: 100,
                toleranceMillisBefore: 100,
              });
            }}
            title="<<"
          />
          <Button onPress={action} title=">>" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  video: { flex: 1, backgroundColor: "#000000" },
  controls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#00000055",
    height: 30,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default VideoPlayer;
