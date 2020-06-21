import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Foundation";
import Slider from "@react-native-community/slider";
import moment from "moment";
var momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);

// https://oblador.github.io/react-native-vector-icons/

class VideoControlButton extends React.Component<{
  name: string;
  largeSize?: boolean;
  onPress: () => void;
  onLongPressRepeat?: () => void;
}> {
  timer = 0;

  triggerRepeat() {
    if (this.props.onLongPressRepeat) {
      this.props.onLongPressRepeat();
      this.timer = setTimeout(this.triggerRepeat, 200);
    }
  }

  stopRepeat() {
    clearTimeout(this.timer);
  }

  render() {
    const { name, largeSize, onPress, onLongPressRepeat } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => {
          if (onLongPressRepeat) {
            this.triggerRepeat();
          }
        }}
        onPressOut={this.stopRepeat}
      >
        <Icon
          selectable={false}
          name={name}
          size={largeSize ? 40 : 30}
          color="#fffc"
          style={{
            marginHorizontal: 20,
            width: largeSize ? 40 : 30,
            height: largeSize ? 40 : 30,
          }}
        />
      </TouchableOpacity>
    );
  }
}

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
  onScrubStart: () => void;
  onScrubEnd: () => void;
  scrubTo: (position: number) => void;
};

const format = (time: number) => {
  return moment.duration(time).format("mm:ss", { trim: false });
};

class VideoPlayerControls extends React.Component<Params> {
  state = {
    showRemainingTime: false,
    scrubMode: false,
    scrubPosition: -1,
  };

  scrub(position: number) {
    this.setState({ scrubPosition: position });
    this.props.scrubTo(position);
  }

  render() {
    const { isPlaying, currentTime, totalTime } = this.props;
    const { togglePlay, rewind, forward } = this.props;
    const { onScrubStart, onScrubEnd, scrubTo } = this.props;
    const { showRemainingTime, scrubMode, scrubPosition } = this.state;

    const elapsedTime = scrubMode ? scrubPosition : currentTime;
    const videoTime = showRemainingTime ? totalTime - elapsedTime : totalTime;
    const elapsedTimeFormatted = format(elapsedTime);
    const videoTimeFormatted = format(videoTime);

    return (
      <View style={styles.container}>
        <View style={styles.buttons}>
          <VideoControlButton
            name="rewind"
            onPress={rewind}
            // onLongPressRepeat={rewind}
          />

          <VideoControlButton
            largeSize
            name={isPlaying ? "pause" : "play"}
            onPress={togglePlay}
          />

          <VideoControlButton
            name="fast-forward"
            onPress={forward}
            //  onLongPressRepeat={forward}
          />
        </View>

        <View style={styles.progress}>
          <ProgressTime time={elapsedTimeFormatted} />

          <Slider
            style={{ width: 300, height: 10, paddingBottom: 5 }}
            minimumValue={0}
            maximumValue={totalTime}
            minimumTrackTintColor="#fffc"
            maximumTrackTintColor="#fff5"
            thumbTintColor="#fffc"
            thumbSize={10}
            value={currentTime}
            onSlidingStart={() => {
              onScrubStart();
              this.setState({ scrubMode: true });
            }}
            onSlidingComplete={() => {
              onScrubEnd();
              this.setState({ scrubMode: false });
            }}
            onValueChange={(value) => {
              if (scrubMode) {
                this.scrub(value);
              }
            }}
          />

          <ProgressTime
            time={
              showRemainingTime ? `-${videoTimeFormatted}` : videoTimeFormatted
            }
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
    backgroundColor: "#0008",
    borderRadius: 8,
    height: 72,
    width: 440,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 100,
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
