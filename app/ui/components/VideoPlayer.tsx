import { Video } from "expo-av";
import React from "react";
import { StyleSheet, View } from "react-native";
import VideoPlayerControls from "./VideoPlayerControls";

type props = { file: string };

class VideoPlayer extends React.Component<props> {
  videoRef: Video | null = null;

  state = {
    isPlaying: false,
  };

  play = () => {
    this.videoRef?.playAsync();
    this.setState({ isPlaying: true });
  };

  pause = () => {
    this.videoRef?.pauseAsync();
    this.setState({ isPlaying: false });
  };

  render() {
    const { file } = this.props;
    const { isPlaying } = this.state;

    console.log(isPlaying);

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
        />
        <VideoPlayerControls
          isPlaying={isPlaying}
          togglePlay={() => {
            if (isPlaying) {
              this.pause();
            } else {
              this.play();
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  video: { flex: 1, backgroundColor: "#000000" },
});

export default VideoPlayer;
