import { Video } from "expo-av";
import React from "react";
import { StyleSheet, View } from "react-native";
import VideoPlayerControls from "./VideoPlayerControls";
import Loader from "./Loader";

type props = { file: string };

class VideoPlayer extends React.Component<props> {
  videoRef: Video | null = null;

  isScrubbing = false;

  state = {
    isLoading: true,
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
    isLoaded = false,
    durationMillis = NaN,
    positionMillis = 0,
  }: {
    isLoaded?: boolean;
    durationMillis?: number;
    positionMillis?: number;
  }) => {
    if (this.isScrubbing) {
      return;
    }
    const isLoading = !isLoaded && isNaN(durationMillis);

    this.setState({
      isLoading,
      totalTime: isNaN(durationMillis) ? 0 : durationMillis,
      currentTime: positionMillis,
    });
  };

  render() {
    const { file } = this.props;
    const { isPlaying, currentTime, totalTime, isLoading } = this.state;

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
            if (status.isLoaded) {
              const { isLoaded, durationMillis, positionMillis } = status;
              this.playerStateUpdated({
                isLoaded,
                durationMillis,
                positionMillis,
              });
            } else {
              this.playerStateUpdated({
                isLoaded: false,
              });
            }
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
        {isLoading && <Loader isLoading={isLoading} />}
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
  loading: {
    backgroundColor: "#00000055",
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
});

export default VideoPlayer;
