import { Video } from "expo-av";
import React from "react";
import { StyleSheet, View } from "react-native";
import VideoPlayerControls from "./VideoPlayerControls";

type props = { file: string };

class VideoPlayer extends React.Component<props> {
  videoRef: Video | null = null;

  isScrubbing = false;

  state = {
    isPlaying: false,
    totalTime: 0,
    currentTime: 0,
  };

  play = () => {
    this.setState({ isPlaying: true });
    this.videoRef?.playAsync();
  };

  pause = () => {
    this.videoRef?.pauseAsync();
    this.setState({ isPlaying: false });
  };

  rewind = () => {
    this.videoRef?.setPositionAsync(this.state.currentTime - 5000);
  };

  forward = () => {
    this.videoRef?.setPositionAsync(this.state.currentTime + 5000);
  };

  scrubTo = (position: number) => {
    this.videoRef?.setPositionAsync(position);
  };

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
    if (this.isScrubbing) {
      return;
    }
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
          onScrubStart={() => {
            this.isScrubbing = true;
            this.pause();
          }}
          onScrubEnd={() => {
            this.isScrubbing = false;

            this.play();
          }}
          scrubTo={this.scrubTo}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    backgroundColor: "#000000",
    width: 1280 * 0.8,
    height: 720 * 0.8,
  },
});

export default VideoPlayer;
