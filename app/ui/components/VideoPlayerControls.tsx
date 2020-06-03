import React from "react";
import { Button, StyleSheet, View } from "react-native";

type Params = {
  isPlaying: boolean;
  togglePlay: Function;
};

const VideoPlayerControls: React.FC<Params> = (props: Params) => {
  const { isPlaying, togglePlay } = props;
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          togglePlay();
        }}
        title={isPlaying ? "Pause" : "Play"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2228",
    borderRadius: 8,
    height: 70,
    minWidth: 200,
    width: 440,
    paddingHorizontal: 40,
    paddingVertical: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    bottom: 200,
    alignSelf: "center",
  },
});

export default VideoPlayerControls;
