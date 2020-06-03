import React from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Foundation";
import Slider from "@react-native-community/slider";
import moment from "moment";
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);

// https://oblador.github.io/react-native-vector-icons/
const VideoControlButton = ({
  name,
  largeSize = false,
  onPress,
}: {
  name: string;
  largeSize?: boolean;
  onPress: () => void;
}) => {
  return (
    <Icon
      selectable={false}
      name={name}
      size={largeSize ? 40 : 30}
      color="#fffc"
      onPress={onPress}
      style={{
        marginHorizontal: 20,
        width: largeSize ? 40 : 30,
        height: largeSize ? 40 : 30,
      }}
    />
  );
};

const ProgressTime = ({
  time = "00:00",
  onPress,
  isRightAligned = false,
}: {
  time: string;
  onPress?: () => void;
  isRightAligned?: boolean;
}) => {
  return (
    <Text
      selectable={false}
      onPress={onPress}
      style={{
        color: "#eee",
        fontSize: 13,
        fontVariant: ["tabular-nums"],
        paddingLeft: isRightAligned ? 12 : 0,
        paddingRight: isRightAligned ? 0 : 12,
        textAlign: isRightAligned ? "left" : "right",
      }}
    >
      {time}
    </Text>
  );
};

type Params = {
  isPlaying: boolean;
  totalTime: number;
  currentTime: number;
  togglePlay: () => void;
  rewind: () => void;
  forward: () => void;
};

class VideoPlayerControls extends React.Component<Params> {
  state = {
    showRemainingTime: false,
  };

  render() {
    const { isPlaying, currentTime, totalTime } = this.props;
    const { togglePlay, rewind, forward } = this.props;
    const { showRemainingTime } = this.state;

    const elapsedTime = moment
      .duration(currentTime)
      .format("mm:ss", { trim: false });

    const videoTime = moment
      .duration(showRemainingTime ? totalTime - currentTime : totalTime)
      .format("mm:ss", { trim: false });

    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <VideoControlButton name="rewind" onPress={rewind} />
          <VideoControlButton
            largeSize
            name={isPlaying ? "pause" : "play"}
            onPress={togglePlay}
          />
          <VideoControlButton name="fast-forward" onPress={forward} />
        </View>
        <View style={styles.progress}>
          <ProgressTime time={elapsedTime} />
          <Slider
            style={{ width: 300, height: 10, paddingBottom: 5 }}
            minimumValue={0}
            maximumValue={totalTime}
            minimumTrackTintColor="#fffc"
            maximumTrackTintColor="#fff5"
            thumbTintColor="#fffc"
            thumbSize={10}
            value={currentTime}
            step={1}
          />
          <ProgressTime
            time={showRemainingTime ? `-${videoTime}` : videoTime}
            isRightAligned={true}
            onPress={() => {
              this.setState({ showRemainingTime: !showRemainingTime });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2228",
    borderRadius: 8,
    height: 72,
    width: 440,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 200,
    alignSelf: "center",
    flex: 1,
  },
  buttons: {
    flex: 1,
    height: 40,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  progress: {
    height: 30,
    paddingTop: 8,
    alignItems: "flex-end",
    flexDirection: "row",
  },
});

export default VideoPlayerControls;
