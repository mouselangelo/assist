import { Video } from "expo-av";
import React from "react";
import { StyleSheet, View } from "react-native";
import VideoPlayerControls from "./VideoPlayerControls";

type props = { file: string };

class VideoPlayer extends React.Component<props> {
  videoRef: Video | null = null;

  state = {
    isPlaying: false,
    totalTime: 0,
    currentTime: 0,
  };

  play = () => {
    this.videoRef?.playAsync();
    this.setState({ isPlaying: true });
  };

  pause = () => {
    this.videoRef?.pauseAsync();
    this.setState({ isPlaying: false });
  };

  rewind = () => {};

  forward = () => {};

  playerStateUpdated = ({
    isLoaded,
    durationMillis,
    positionMillis,
    playableDurationMillis,
    didJustFinish,
  }: {
    isLoaded: boolean;
    didJustFinish: boolean;
    durationMillis: number;
    positionMillis: number;
    playableDurationMillis: number;
  }) => {
    this.setState({
      totalTime: durationMillis,
      currentTime: positionMillis,
    });
  };

  render() {
    const { file } = this.props;
    const { isPlaying, currentTime, totalTime } = this.state;

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
          onPlaybackStatusUpdate={(status) => {
            this.playerStateUpdated({ ...status });
          }}
        />
        <VideoPlayerControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          totalTime={totalTime}
          togglePlay={() => {
            if (isPlaying) {
              this.pause();
            } else {
              this.play();
            }
          }}
          rewind={this.rewind}
          forward={this.forward}
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
