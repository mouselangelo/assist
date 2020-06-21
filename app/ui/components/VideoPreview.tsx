import { Video } from "expo-av";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
import { theme } from "../style/theme";

type props = { file: string; height: number };

class VideoPreview extends React.Component<props> {
  videoRef: Video | null = null;

  isScrubbing = false;

  state = {
    isLoading: true,
    isPlaying: false,
    isEnded: false,
    totalTime: 0,
  };

  play = () => {
    this.setState({ isPlaying: true });
    this.videoRef?.playAsync();
  };

  pause = () => {
    this.videoRef?.pauseAsync();
    this.setState({ isPlaying: false });
  };

  playerStateUpdated = ({
    isLoaded = false,
    isPlaying = false,
    didJustFinish = false,
    durationMillis = NaN,
  }: {
    isLoaded?: boolean;
    isPlaying?: boolean;
    didJustFinish?: boolean;
    durationMillis?: number;
    positionMillis?: number;
  }) => {
    if (this.isScrubbing || !this.videoRef) {
      return;
    }
    const isLoading = !isLoaded && isNaN(durationMillis);
    this.setState({
      isLoading,
      totalTime: isNaN(durationMillis) ? 0 : durationMillis,
      isPlaying,
      isEnded: didJustFinish && !isPlaying,
    });
  };

  render() {
    const { file, height } = this.props;
    const { isPlaying, isLoading, isEnded } = this.state;

    const action = () => {};

    return (
      <View>
        <Video
          ref={(ref) => {
            this.videoRef = ref;
          }}
          source={{ uri: `file://${file}` }}
          rate={1.0}
          volume={0.5}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={false}
          isLooping={false}
          style={{ width: "100%", height }}
          onPlaybackStatusUpdate={(status) => {
            this.playerStateUpdated(status);
          }}
        />
        {!isLoading && (
          <View style={styles.previewControls}>
            <View
              style={{
                width: 66,
                height: 66,
                borderRadius: 33,
                backgroundColor: "#00000088",
                alignItems: "center",
                justifyContent: "center",
                opacity: isPlaying ? 0.2 : 0.8,
              }}
            >
              <IconButton
                onPress={() => {
                  isPlaying ? this.pause() : this.play();
                }}
                icon={isPlaying ? "pause" : isEnded ? "refresh" : "play"}
                color={theme.colors.surface}
                size={44}
              />
            </View>
          </View>
        )}
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator animating={true} />
          </View>
        )}
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
  },
  previewControls: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    backgroundColor: "#00000055",
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

export default VideoPreview;
